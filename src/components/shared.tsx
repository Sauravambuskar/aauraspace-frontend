import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useMotionValue, animate } from "motion/react";
import Lenis from "lenis";

export function useLenisSmoothScroll() {
  useEffect(() => {
    // Slightly softer lerp for a premium, GSAP-like feel that plays nice with scroll-triggered reveals
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
    let raf = 0;
    const tick = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
}

export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  // Write directly to the DOM node — avoids ~60fps React re-renders per counter
  useEffect(() => {
    if (!ref.current) return;
    ref.current.textContent = `0${suffix}`;
  }, [suffix]);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
    const unsub = mv.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
    });
    return () => { controls.stop(); unsub(); };
  }, [inView, mv, to, suffix]);
  return <span ref={ref} style={{ willChange: "contents" }}>0{suffix}</span>;
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  img,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  img: string;
  breadcrumb?: Array<{ label: string; to?: string }>;
}) {
  return (
    <section className="relative h-[55vh] min-h-[360px] w-full overflow-hidden bg-ink">
      <img
        src={img}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />
      <div className="absolute inset-x-0 bottom-0 px-6 pb-10 md:px-14 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {breadcrumb && (
            <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-white/50">
              <Link to="/" className="transition-colors hover:text-copper">Home</Link>
              {breadcrumb.map((b, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="text-white/30">›</span>
                  {b.to ? (
                    <Link to={b.to} className="transition-colors hover:text-copper">{b.label}</Link>
                  ) : (
                    <span className="text-copper/90">{b.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <div className="eyebrow mb-4">{eyebrow}</div>
          <h1 className="display-xl text-white">{title}</h1>
          {subtitle && (
            <p className="mt-4 max-w-lg text-sm text-white/70 md:text-base">{subtitle}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
