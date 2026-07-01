import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValueEvent,
} from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLenisSmoothScroll, CountUp, Reveal } from "@/components/shared";
import {
  HERO_SLIDES,
  SERVICES,
  ALL_PROPERTIES,
  STATS,
  GALLERY,
  TESTIMONIALS,
  NEIGHBOURHOODS,
} from "@/lib/data";

const FEATURED = ALL_PROPERTIES.filter((p) => p.featured).slice(0, 3);

/* ================================================================
   TYPOGRAPHY ANIMATION PRIMITIVES
   ================================================================ */

/** Chars slide up one-by-one with spring — great for hero headings */
function CharReveal({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const chars = Array.from(text);
  return (
    <span className={className} aria-label={text} style={{ display: "inline" }}>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: "70%", rotateX: -50 }}
          animate={{ opacity: 1, y: "0%", rotateX: 0 }}
          transition={{
            delay: delay + i * stagger,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: "inline-block", transformOrigin: "bottom center", perspective: 400, willChange: "transform, opacity" }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}

/** Words slide up from behind an overflow clip — clean section headings */
function WordMask({
  children,
  className,
  delay = 0,
  stagger = 0.1,
}: {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = children.split(" ");
  return (
    <span className={className} aria-label={children}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.08em" }}
        >
          <motion.span
            initial={{ y: "115%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: delay + i * stagger,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: "inline-block", willChange: "transform, opacity" }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}

/** Eyebrow with letter-spacing expand + fade */
function EyebrowAnim({
  children,
  delay = 0,
  dark = false,
}: {
  children: ReactNode;
  delay?: number;
  dark?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, letterSpacing: "0.04em" }}
      whileInView={{ opacity: 1, letterSpacing: "0.22em" }}
      viewport={{ once: true }}
      transition={{ delay, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`eyebrow ${dark ? "!text-white/60" : ""}`}
    >
      {children}
    </motion.div>
  );
}

/** Words blur in from gaussian blur — dreamy body / testimonial text */
function BlurReveal({
  text,
  className,
  delay = 0,
  stagger = 0.07,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ delay: delay + i * stagger, duration: 0.65, ease: "easeOut" }}
          style={{ display: "inline-block", marginRight: i < words.length - 1 ? "0.28em" : 0, willChange: "filter, opacity" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/** Scramble text — random chars resolve to the final string (used in footer) */
function ScrambleText({ text, className }: { text: string; className?: string }) {
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ◈◉◇○";
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState<string[]>(Array.from(text).map(() => " "));

  useEffect(() => {
    if (!inView) return;
    const letters = Array.from(text);
    let frame = 0;
    const totalFrames = letters.length * 6;
    const id = setInterval(() => {
      setDisplay(
        letters.map((ch, i) => {
          if (ch === " ") return " ";
          const revealAt = i * 6;
          if (frame >= revealAt + 6) return ch;
          if (frame >= revealAt) return CHARS[Math.floor(Math.random() * CHARS.length)];
          return " ";
        })
      );
      frame++;
      if (frame > totalFrames) clearInterval(id);
    }, 38);
    return () => clearInterval(id);
  }, [inView, text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display.map((ch, i) => (
        <span key={i} style={{ display: "inline-block" }}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

/* ================================================================
   MARQUEE TICKER
   ================================================================ */

const TICKER_ITEMS = [
  "Pune's #1 Broker",
  "500+ Properties",
  "Trusted by Thousands",
  "Kharadi · Baner · Hinjewadi · Wakad",
  "Luxury Living Made Simple",
  "12 Years on the Ground",
];

function MarqueeTicker({ dark = false }: { dark?: boolean }) {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className={`overflow-hidden py-4 ${dark ? "bg-ink" : "bg-copper"}`}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {items.map((item, i) => (
          <span
            key={i}
            className={`mx-8 text-[11px] font-semibold uppercase tracking-[0.3em] ${dark ? "text-white/40" : "text-white"}`}
          >
            {item}
            <span className="mx-6 opacity-50">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** Animated underline that draws in left → right */
function DrawUnderline({ delay = 0, color = "bg-copper" }: { delay?: number; color?: string }) {
  return (
    <motion.span
      initial={{ scaleX: 0, originX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`mt-3 block h-[3px] w-32 ${color}`}
      style={{ transformOrigin: "left" }}
    />
  );
}

/* ================================================================
   HERO
   ================================================================ */

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
      <section id="top" ref={heroRef} className="relative h-[92svh] min-h-[620px] w-full overflow-hidden bg-cream">
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {HERO_SLIDES.map((src, i) => (
            <div key={i} className="relative h-full min-w-0 flex-[0_0_100%] overflow-hidden">
              <motion.img
                src={src}
                alt="Luxury property in Pune"
                style={{ scale: imgScale }}
                className="h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Soft bottom wash — only behind the text, keeps the image crisp */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-cream/85 via-cream/35 to-transparent" />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="absolute inset-x-0 bottom-0 px-5 pb-10 md:px-14 md:pb-12"
      >
        <div className="max-w-3xl" key={selected}>
          {/* Eyebrow — tracking expand */}
          <motion.div
            key={`ey-${selected}`}
            initial={{ opacity: 0, letterSpacing: "0.03em" }}
            animate={{ opacity: 1, letterSpacing: "0.22em" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow mb-4"
          >
            Pune's Trusted Broker
          </motion.div>

          {/* H1 — char-by-char perspective rise */}
          <h1 className="display-xl text-ink" style={{ perspective: 600 }}>
            <CharReveal text="Find Your" delay={0.1} stagger={0.045} />
            <br />
            <CharReveal text="Perfect Space." delay={0.45} stagger={0.04} />
          </h1>

          {/* Sub — staggered dots */}
          <motion.p
            key={`sub-${selected}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="mt-4 flex flex-wrap items-center gap-2 text-sm text-ink/70 md:mt-5 md:text-base"
          >
            {["Flat", "Shop", "Office", "Plot", "Resale & Rental"].map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15 + i * 0.1, duration: 0.45, ease: "easeOut" }}
              >
                {item}
                {i < 4 && <span className="ml-2 text-copper">·</span>}
              </motion.span>
            ))}
          </motion.p>

          {/* CTA button */}
          <motion.div
            key={`btn-${selected}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 inline-block"
          >
            <motion.div whileHover={{ scale: 1.05, boxShadow: "0 0 28px rgba(184,115,51,0.5)" }} whileTap={{ scale: 0.97 }}>
              <Link to="/properties" className="inline-flex items-center gap-3 rounded-full bg-copper px-7 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-white">
                View Properties
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                  aria-hidden
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Slide dots */}
      <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2.5">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => emblaApi?.scrollTo(i)} aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${selected === i ? "w-8 bg-copper" : "w-1.5 bg-ink/25"}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ================================================================
   SERVICES
   ================================================================ */

function Services() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="services" className="bg-ink text-white">
      <div className="mx-auto max-w-[1400px] px-6 pt-16 pb-6 md:px-10">
        <EyebrowAnim delay={0}>What We Do</EyebrowAnim>
        <h2 className="display-lg mt-4 text-white">
          <WordMask delay={0.1}>Services.</WordMask>
        </h2>
      </div>

      {/* Desktop accordion */}
      <div
        className="hidden h-[78vh] w-full gap-1.5 px-1.5 pb-1.5 md:flex"
        onMouseLeave={() => setActive(0)}
      >
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.name}
            onMouseEnter={() => setActive(i)}
            animate={{ flex: active === i ? 3 : 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
            className="relative h-full cursor-pointer overflow-hidden"
          >
            <img src={s.img} alt={s.name} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-ink/20" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <AnimatePresence mode="wait">
                {active === i ? (
                  <motion.div key="exp" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
                    <div className="eyebrow mb-3">0{i + 1}</div>
                    <h3 className="display-lg text-white">{s.name}</h3>
                    <p className="mt-4 max-w-md text-sm text-white/75">{s.desc}</p>
                    <Link to={`/properties?type=${encodeURIComponent(s.name)}`} className="mt-6 inline-block text-sm font-medium uppercase tracking-[0.2em] text-copper hover:text-white transition-colors">
                      Explore →
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div key="col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="[writing-mode:vertical-rl] rotate-180 text-xs uppercase tracking-[0.25em] text-white/80">{s.name}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile */}
      <div className="flex flex-col gap-1.5 px-1.5 pb-1.5 md:hidden">
        {SERVICES.map((s, i) => {
          const open = active === i;
          return (
            <motion.button key={s.name} onClick={() => setActive(open ? null : i)} animate={{ height: open ? 360 : 96 }} transition={{ type: "spring", stiffness: 140, damping: 22 }} className="relative w-full overflow-hidden text-left">
              <img src={s.img} alt={s.name} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/50 to-ink/20" />
              <div className="relative flex h-full flex-col justify-end p-6">
                <h3 className="font-serif text-3xl text-white">{s.name}</h3>
                <AnimatePresence>
                  {open && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-3 text-sm text-white/75">
                      {s.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

/* ================================================================
   SCROLL IMAGE SHOWCASE
   ================================================================ */

const SHOWCASE_SLIDES = SERVICES.map((s, i) => ({
  img: s.img,
  eyebrow: `0${i + 1} · ${s.name}`,
  title: s.name,
  sub: s.desc,
  href: `/properties?type=${encodeURIComponent(s.name)}`,
}));

function ScrollImageShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const N = SHOWCASE_SLIDES.length;
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(Math.floor(v * N), N - 1));
  });

  return (
    <section ref={containerRef} className="relative" style={{ height: `${N * 100}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-ink">

        {/* Background images — smooth crossfade + slow ken burns */}
        <AnimatePresence>
          {SHOWCASE_SLIDES.map((slide, i) =>
            i === active ? (
              <motion.div
                key={i}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              >
                <motion.img
                  src={slide.img}
                  alt={slide.title}
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 7, ease: "linear" }}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>

        {/* Dark gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/30 to-ink/15" />

        {/* Section label — left vertical (desktop) */}
        <div className="absolute left-5 top-1/2 hidden -translate-y-1/2 md:block">
          <div className="[writing-mode:vertical-rl] rotate-180 select-none text-[9px] uppercase tracking-[0.35em] text-white/25">
            Our Services
          </div>
        </div>

        {/* Slide counter — top right */}
        <div className="absolute right-10 top-8 flex items-baseline gap-1 text-[11px] font-medium uppercase tracking-[0.2em]">
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -7 }}
              transition={{ duration: 0.3 }}
              className="inline-block text-white/80"
            >
              0{active + 1}
            </motion.span>
          </AnimatePresence>
          <span className="text-white/30">/ 0{N}</span>
        </div>

        {/* Right side — vertical pill progress indicators */}
        <div className="absolute right-5 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2.5">
          {SHOWCASE_SLIDES.map((_, i) => (
            <motion.div
              key={i}
              className="w-px rounded-full bg-copper"
              animate={{
                height: i === active ? 38 : 7,
                opacity: i === active ? 1 : 0.3,
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>

        {/* Main text content — bottom */}
        <div className="absolute inset-x-0 bottom-0 px-5 pb-16 md:px-14 md:pb-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, letterSpacing: "0.04em" }}
                animate={{ opacity: 1, letterSpacing: "0.22em" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="eyebrow mb-4 !text-white/55"
              >
                {SHOWCASE_SLIDES[active].eyebrow}
              </motion.div>

              {/* Big title — char-by-char spring reveal */}
              <h2
                className="font-serif text-[clamp(2.5rem,10vw,9rem)] leading-none text-white"
                style={{ perspective: 600 }}
              >
                <CharReveal
                  text={SHOWCASE_SLIDES[active].title}
                  delay={0.05}
                  stagger={0.055}
                />
              </h2>

              {/* Sub-line */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.5, ease: "easeOut" }}
                className="mt-4 max-w-xs text-sm text-white/62 md:text-base"
              >
                {SHOWCASE_SLIDES[active].sub}
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  to={SHOWCASE_SLIDES[active].href}
                  className="mt-6 inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-copper transition-colors hover:text-white"
                >
                  Explore
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                    aria-hidden
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scroll progress bar — bottom edge */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] w-full bg-copper"
          style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        />

        {/* "Scroll" hint — fades out after first slide */}
        <AnimatePresence>
          {active === 0 && (
            <motion.div
              initial={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-28 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 md:hidden"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                className="text-[9px] uppercase tracking-[0.3em] text-white/40"
              >
                Scroll
              </motion.div>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut", delay: 0.1 }}
                className="text-white/30"
              >
                ↓
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ================================================================
   FEATURED PROPERTIES
   ================================================================ */

function PropertyCard({ p, large }: { p: (typeof FEATURED)[number]; large?: boolean }) {
  return (
    <motion.div whileHover="hover" className={`group relative overflow-hidden ${large ? "row-span-2 min-h-[420px] md:min-h-[640px]" : "min-h-[300px]"}`}>
      <motion.img
        src={p.img}
        alt={p.title}
        initial={{ scale: 1.08, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <motion.div variants={{ hover: { opacity: 0.85 } }} initial={{ opacity: 0.65 }} className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-7 md:p-9">
        <span className="mb-4 self-start rounded-full bg-copper px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white">{p.type}</span>
        <h3 className={`font-serif text-white ${large ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl"}`}>{p.title}</h3>
        <p className="mt-2 text-sm text-white/70">{p.price}</p>
        <Link to="/properties" className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-copper">
          View <span aria-hidden>→</span>
        </Link>
      </div>
    </motion.div>
  );
}

function Featured() {
  return (
    <section id="properties" className="bg-cream px-6 py-10 md:px-10 md:py-14">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <EyebrowAnim delay={0}>Featured</EyebrowAnim>
          <h2 className="display-xl mt-4 inline-block text-ink">
            <WordMask delay={0.1}>Properties.</WordMask>
            <DrawUnderline delay={0.5} />
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 grid grid-cols-1 gap-3 md:mt-10 md:grid-cols-2 md:grid-rows-2">
          <PropertyCard p={FEATURED[0]} large />
          <PropertyCard p={FEATURED[1]} />
          <PropertyCard p={FEATURED[2] || FEATURED[1]} />
        </Reveal>

        <Reveal className="mt-14 text-center">
          <motion.div whileHover={{ letterSpacing: "0.28em" }} transition={{ duration: 0.4 }}>
            <Link to="/properties" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.22em] text-copper hover:text-ink transition-colors">
              View All Properties <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================
   PARALLAX BREAK
   ================================================================ */

function ParallaxBreak() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 1.06]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.6]);

  return (
    <section ref={ref} className="relative h-[60vh] w-full overflow-hidden bg-ink">
      <motion.img style={{ y }} src="/commercial-lWmdaWql.jpg" alt="Pune skyline" className="absolute inset-0 h-[130%] w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-ink/50" />
      <motion.div
        style={{ scale: textScale, opacity: textOpacity }}
        className="relative flex h-full items-center justify-center px-6 text-center"
      >
        {/* Word-by-word stagger with scale */}
        <div>
          <h2 className="display-xl text-white leading-[1]">
            {["500+", "Properties."].map((word, i) => (
              <span key={word} style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.06em" }}>
                <motion.span
                  initial={{ y: "110%", opacity: 0, scale: 0.9 }}
                  whileInView={{ y: "0%", opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "inline-block" }}
                >
                  {word}
                </motion.span>
                {i === 0 && " "}
              </span>
            ))}
          </h2>
          <h2 className="display-xl text-white leading-[1]">
            {["One", "Trusted", "Name."].map((word, i) => (
              <span key={word} style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.06em" }}>
                <motion.span
                  initial={{ y: "110%", opacity: 0, scale: 0.9 }}
                  whileInView={{ y: "0%", opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "inline-block" }}
                >
                  {word}
                </motion.span>
                {i < 2 && " "}
              </span>
            ))}
          </h2>
        </div>
      </motion.div>
    </section>
  );
}

/* ================================================================
   STATS
   ================================================================ */

function Stats() {
  return (
    <section className="bg-cream px-0 py-4">
      <div className="mx-auto grid max-w-full grid-cols-2 gap-px bg-ink/10 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="bg-white px-4 py-8 text-center md:px-6 md:py-10">
            <div className="font-serif text-4xl text-copper md:text-7xl">
              <CountUp to={s.n} suffix={s.suffix} />
            </div>
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.05em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
              className="mt-2 text-[10px] uppercase text-ink/60 md:mt-3 md:text-xs"
            >
              {s.label}
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================================================================
   GALLERY
   ================================================================ */

function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", dragFree: true, loop: true });

  return (
    <section className="bg-cream py-10 md:py-14">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal className="mb-8 flex items-end justify-between">
          <div>
            <EyebrowAnim delay={0}>Showcase</EyebrowAnim>
            <h2 className="display-lg mt-4 text-ink">
              <WordMask delay={0.1} stagger={0.12}>Our Properties</WordMask>
            </h2>
          </div>
          <div className="hidden gap-3 md:flex">
            <motion.button whileHover={{ scale: 1.05, backgroundColor: "var(--color-ink)", color: "var(--color-cream)" }} onClick={() => emblaApi?.scrollPrev()} aria-label="Previous" className="grid h-14 w-14 place-items-center border border-ink/20 text-ink transition-colors">←</motion.button>
            <motion.button whileHover={{ scale: 1.05, backgroundColor: "var(--color-ink)", color: "var(--color-cream)" }} onClick={() => emblaApi?.scrollNext()} aria-label="Next" className="grid h-14 w-14 place-items-center border border-ink/20 text-ink transition-colors">→</motion.button>
          </div>
        </Reveal>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5 pl-6 md:pl-10">
          {GALLERY.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0 flex-[0_0_82%] sm:flex-[0_0_45%] lg:flex-[0_0_32%]"
            >
              <div className="h-[400px] overflow-hidden">
                <motion.img
                  src={g.img}
                  alt={g.title}
                  loading="lazy"
                  initial={{ scale: 1.1, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.06 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.06, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                  className="h-full w-full object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 + 0.2, duration: 0.5 }}
                className="mt-4 font-serif text-2xl text-ink"
              >
                {g.title}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   NEIGHBOURHOODS PREVIEW
   ================================================================ */

function NeighbourhoodsPreview() {
  const preview = NEIGHBOURHOODS.slice(0, 3);
  return (
    <section className="bg-white px-6 py-10 md:px-10 md:py-14">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <EyebrowAnim delay={0}>Explore Pune</EyebrowAnim>
            <h2 className="display-lg mt-4 text-ink">
              <WordMask delay={0.1} stagger={0.09}>Neighbourhoods</WordMask>
              <br className="hidden md:block" />
              <WordMask delay={0.55} stagger={0.08}>We Know By Heart.</WordMask>
            </h2>
          </div>
          <Reveal delay={0.3}>
            <p className="max-w-sm text-sm text-ink/60">
              Twelve years on the ground across Pune's finest pockets — we don't just list
              addresses, we read the lane.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((n, i) => (
            <motion.div
              key={n.name}
              whileHover="hover"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative block h-[420px] overflow-hidden rounded-sm"
            >
              <motion.img
                src={n.img}
                alt={`${n.name}, Pune`}
                loading="lazy"
                initial={{ scale: 1.08, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.06 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 1.0, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <ProgressiveBlur direction="bottom" blurIntensity={0.5} blurLayers={6} className="absolute inset-x-0 bottom-0 h-2/3" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
              <motion.div variants={{ hover: { opacity: 1 } }} initial={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-3 rounded-sm border border-copper/60" />
              <div className="relative flex h-full flex-col justify-end p-7">
                <div className="flex items-center gap-3">
                  <motion.span variants={{ hover: { width: 40 } }} className="h-px w-8 bg-copper block transition-all" />
                  <span className="text-[10px] uppercase tracking-[0.25em] text-copper">{n.tag}</span>
                </div>
                <h3 className="mt-3 font-serif text-4xl text-white md:text-5xl">{n.name}</h3>
                <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/70">
                  <span>{n.count}</span>
                  <motion.span variants={{ hover: { x: 6 } }} transition={{ duration: 0.35 }} className="text-copper" aria-hidden>→</motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <motion.div whileHover={{ letterSpacing: "0.3em" }} transition={{ duration: 0.4 }}>
            <Link to="/neighbourhoods" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.22em] text-copper hover:text-ink transition-colors">
              Explore All Neighbourhoods <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================
   TESTIMONIALS
   ================================================================ */

function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const DURATION = 6000;

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const interval = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / DURATION);
      setProgress(p);
      if (p >= 1) setIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, 30);
    return () => clearInterval(interval);
  }, [idx]);

  const t = TESTIMONIALS[idx];

  return (
    <section className="relative overflow-hidden bg-cream px-6 py-12 md:px-10 md:py-16">
      {/* Giant decorative quote — animates in */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute left-6 top-12 font-serif text-[180px] leading-none text-copper/25 md:left-16 md:text-[280px]"
      >
        "
      </motion.div>

      <div className="mx-auto max-w-4xl text-center">
        <EyebrowAnim delay={0}>Kind Words</EyebrowAnim>

        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
            {/* Quote text — blur word reveal */}
            <p className="mt-8 font-serif text-3xl italic leading-tight text-ink md:text-5xl">
              "<BlurReveal text={t.q} stagger={0.055} />"
            </p>

            {/* Stars — staggered pop in */}
            <div className="mt-10 flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0, rotate: -30 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 300, damping: 18 }}
                  className="text-copper"
                >
                  ★
                </motion.span>
              ))}
            </div>

            {/* Author — tracking expand */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.04em" }}
              animate={{ opacity: 1, letterSpacing: "0.2em" }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-5 text-sm font-medium uppercase text-ink"
            >
              {t.name}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-xs text-ink/60"
            >
              {t.role}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="mx-auto mt-14 h-px w-64 bg-ink/15">
          <div className="h-px bg-copper transition-none" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   ENQUIRY FORM
   ================================================================ */

const FormSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(7, "Enter a valid phone"),
  email: z.string().email("Enter a valid email"),
  propertyType: z.enum(["Flat", "Shop", "Office", "Plot", "Resale & Rental"]),
  message: z.string().optional(),
});
type FormValues = z.infer<typeof FormSchema>;

function Toast({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ x: 400, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 400, opacity: 0 }} transition={{ type: "spring", stiffness: 220, damping: 24 }} className="fixed right-6 top-24 z-[60] rounded-md border-l-4 border-copper bg-ink px-5 py-4 text-sm text-white shadow-2xl">
          We'll call you shortly!
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function EnquiryForm() {
  const [toast, setToast] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { propertyType: "Flat" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error("Failed");
      setToast(true);
      reset({ propertyType: "Flat" });
      setTimeout(() => setToast(false), 3500);
    } catch {
      alert("Something went wrong. Please call +91 9172355369.");
    }
  };

  const fieldCls = "w-full border-0 border-b border-white/25 bg-transparent py-4 text-white placeholder-white/40 outline-none focus:border-copper transition-colors";

  return (
    <section id="contact" className="bg-ink">
      <Toast show={toast} />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[280px] overflow-hidden sm:min-h-[400px] lg:min-h-[760px]">
          <motion.img
            src="/residential-DshD8vFh.jpg"
            alt="Premium home"
            initial={{ scale: 1.08, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-ink/10" />
        </div>
        <div className="flex items-center bg-ink px-5 py-10 md:px-14 md:py-14 lg:py-16">
          <div className="w-full max-w-md">
            <EyebrowAnim delay={0} dark>Get In Touch</EyebrowAnim>
            <h2 className="display-lg mt-4 text-white">
              <WordMask delay={0.1}>Let's Find</WordMask>
              <br />
              <WordMask delay={0.3}>Your Space.</WordMask>
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5">
              {[
                { key: "name", placeholder: "Full Name", type: "input" },
                { key: "phone", placeholder: "Phone Number", type: "input" },
                { key: "email", placeholder: "Email Address", type: "input" },
              ].map(({ key, placeholder }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                >
                  <input {...register(key as keyof FormValues)} placeholder={placeholder} className={fieldCls} />
                  {errors[key as keyof typeof errors] && (
                    <p className="mt-1 text-xs text-copper">{(errors[key as keyof typeof errors] as { message?: string })?.message}</p>
                  )}
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
                <select {...register("propertyType")} className={`${fieldCls} appearance-none bg-ink pr-6`}>
                  {["Flat", "Shop", "Office", "Plot", "Resale & Rental"].map(o => <option key={o} value={o} className="bg-ink">{o}</option>)}
                </select>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 }}>
                <textarea {...register("message")} rows={2} placeholder="Message (optional)" className={fieldCls} />
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.01, boxShadow: "0 0 30px rgba(184,115,51,0.5)" }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                disabled={isSubmitting}
                type="submit"
                className="mt-4 w-full rounded-none bg-copper py-4 text-xs font-medium uppercase tracking-[0.25em] text-white disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send Enquiry"}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FOOTER OVERRIDE — ScrambleText on brand name
   ================================================================ */

function AnimatedFooterBrand() {
  return (
    <div className="text-center">
      <h2 className="font-serif text-[clamp(28px,8vw,140px)] leading-none text-copper">
        <ScrambleText text="AAURA REALTY" />
      </h2>
      <BlurReveal
        text="Our Passion. Your Aaura."
        className="mt-4 block font-serif text-xl italic text-white/80 md:text-2xl"
        delay={1.2}
        stagger={0.1}
      />
    </div>
  );
}

/* ================================================================
   PAGE
   ================================================================ */

export default function Home() {
  useLenisSmoothScroll();
  return (
    <main className="bg-cream text-ink">
      <Navbar />
      <Hero />
      <Services />
      <Featured />
      <ScrollImageShowcase />
      <ParallaxBreak />
      <Stats />
      <MarqueeTicker />
      <Gallery />
      <NeighbourhoodsPreview />
      <Testimonials />
      <EnquiryForm />
      {/* Footer with scramble brand name */}
      <footer className="border-t border-copper/40 bg-ink text-white">
        <div className="mx-auto max-w-[1400px] px-5 pt-10 pb-8 md:px-10 md:pt-14">
          <Reveal>
            <AnimatedFooterBrand />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-8 border-t border-white/10 pt-8 md:mt-12 md:gap-12 md:grid-cols-4 md:pt-10">
            <div>
              <div className="eyebrow mb-5">Quick Links</div>
              <ul className="space-y-3 text-sm text-white/80">
                <li><Link to="/properties" className="hover:text-copper transition">Properties</Link></li>
                <li><Link to="/about" className="hover:text-copper transition">About Us</Link></li>
                <li><Link to="/neighbourhoods" className="hover:text-copper transition">Neighbourhoods</Link></li>
                <li><Link to="/contact" className="hover:text-copper transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <div className="eyebrow mb-5">Services</div>
              <ul className="space-y-3 text-sm text-white/80">
                {SERVICES.map(s => <li key={s.name}><Link to={`/properties?type=${encodeURIComponent(s.name)}`} className="hover:text-copper transition">{s.name}</Link></li>)}
              </ul>
            </div>
            <div>
              <div className="eyebrow mb-5">Neighbourhoods</div>
              <ul className="space-y-3 text-sm text-white/80">
                {["Kharadi", "Baner", "Hinjewadi", "Wakad", "Koregaon Park", "Viman Nagar"].map(n => (
                  <li key={n}><Link to="/neighbourhoods" className="hover:text-copper transition">{n}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow mb-5">Contact</div>
              <ul className="space-y-3 text-sm text-white/80">
                <li><a href="tel:+919172355369" className="hover:text-copper transition">+91 9172355369</a></li>
                <li><a href="tel:+919156945369" className="hover:text-copper transition">+91 9156945369</a></li>
                <li><a href="mailto:aaurareality19@gmail.com" className="hover:text-copper transition">aaurareality19@gmail.com</a></li>
                <li className="pt-2 text-white/60">Pune, Maharashtra</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:justify-between">
            <p>© {new Date().getFullYear()} Aaura Realty. All rights reserved.</p>
            <p>RERA registered. Disclaimer: All information is for representational purposes only.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
