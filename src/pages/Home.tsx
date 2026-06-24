import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, animate } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Lenis from "lenis";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

/* ============================ DATA ============================ */

const HERO_SLIDES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=2000&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=2000&q=80&auto=format&fit=crop",
];

const SERVICES = [
  { name: "Flat", desc: "Premium 1, 2, 3 & 4 BHK homes across Pune's finest neighborhoods.", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=80&auto=format&fit=crop" },
  { name: "Shop", desc: "High-footfall retail spaces in prime commercial corridors.", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=80&auto=format&fit=crop" },
  { name: "Office", desc: "Grade-A office spaces, fitted or shell, for every team size.", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80&auto=format&fit=crop" },
  { name: "Plot", desc: "NA & RERA-approved residential and commercial plots.", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80&auto=format&fit=crop" },
  { name: "Resale & Rental", desc: "Curated resale listings and verified rentals across the city.", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=80&auto=format&fit=crop" },
];

const FEATURED = [
  { type: "Flat", title: "3 BHK in Kharadi", price: "₹ 85 Lakh onwards", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80&auto=format&fit=crop", big: true },
  { type: "Office", title: "Premium Office, Baner", price: "₹ 1.2 Cr onwards", img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80&auto=format&fit=crop" },
  { type: "Plot", title: "NA Plot, Hinjewadi", price: "₹ 45 Lakh onwards", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format&fit=crop" },
];

const STATS = [
  { n: 500, suffix: "+", label: "Properties Listed" },
  { n: 320, suffix: "+", label: "Happy Families" },
  { n: 12, suffix: "+", label: "Years in Pune" },
  { n: 50, suffix: "+", label: "Builder Partners" },
];

const GALLERY = [
  { title: "Skyline Residences", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&auto=format&fit=crop" },
  { title: "Copper House", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80&auto=format&fit=crop" },
  { title: "Garden Heights", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80&auto=format&fit=crop" },
  { title: "Baner Plaza", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80&auto=format&fit=crop" },
  { title: "Kharadi Greens", img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&q=80&auto=format&fit=crop" },
  { title: "Wakad Towers", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&auto=format&fit=crop" },
  { title: "Hinjewadi Court", img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80&auto=format&fit=crop" },
];

const TESTIMONIALS = [
  { q: "Aaura made buying our first home in Pune effortless. Honest, calm, and always one step ahead.", name: "Rohit & Sneha Patil", role: "3 BHK · Kharadi" },
  { q: "They didn't just sell us a shop — they helped us understand the locality, the footfall, the future.", name: "Anjali Mehta", role: "Retail · Baner" },
  { q: "The most transparent broker we've worked with in fifteen years. Aaura is family now.", name: "Vivek Joshi", role: "Office · Hinjewadi" },
];

const NEIGHBOURHOODS = [
  { name: "Kharadi", tag: "IT Corridor", count: "120+ Homes", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80&auto=format&fit=crop" },
  { name: "Baner",   tag: "Premium Living", count: "85+ Homes",  img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80&auto=format&fit=crop" },
  { name: "Hinjewadi", tag: "Tech Hub",   count: "140+ Homes", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=80&auto=format&fit=crop" },
  { name: "Wakad",   tag: "Family First", count: "70+ Homes",  img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80&auto=format&fit=crop" },
  { name: "Koregaon Park", tag: "Heritage Luxe", count: "40+ Homes", img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1400&q=80&auto=format&fit=crop" },
  { name: "Viman Nagar", tag: "Lifestyle", count: "60+ Homes", img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1400&q=80&auto=format&fit=crop" },
];

/* ============================ HOOKS ============================ */

function useLenisSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    let raf = 0;
    const tick = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.6, ease: "easeOut" });
    const unsub = mv.on("change", (v) => setDisplay(Math.round(v).toString()));
    return () => { controls.stop(); unsub(); };
  }, [inView, mv, to]);
  return <span ref={ref}>{display}{suffix}</span>;
}

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============================ NAVBAR ============================ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={false}
      animate={{ backgroundColor: scrolled ? "rgba(26,26,26,1)" : "rgba(26,26,26,0)" }}
      transition={{ duration: 0.4 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <button onClick={() => scrollTo("top")} className="font-serif text-[22px] tracking-wide text-copper md:text-[26px]">
          AAURA REALTY
        </button>
        <nav className="hidden items-center gap-10 text-sm text-white/90 md:flex">
          <button onClick={() => scrollTo("properties")} className="hover:text-copper transition-colors">Properties</button>
          <button onClick={() => scrollTo("services")} className="hover:text-copper transition-colors">Services</button>
          <button onClick={() => scrollTo("contact")} className="hover:text-copper transition-colors">Contact</button>
        </nav>
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(184,115,51,0.55)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => scrollTo("contact")}
          className="rounded-full bg-copper px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-white"
        >
          Enquire Now
        </motion.button>
      </div>
    </motion.header>
  );
}

/* ============================ HERO ============================ */

function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden bg-ink">
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {HERO_SLIDES.map((src, i) => (
            <div key={i} className="relative h-full min-w-0 flex-[0_0_100%]">
              <img src={src} alt="Luxury property in Pune" className="h-full w-full object-cover" loading={i === 0 ? "eager" : "lazy"} />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 px-6 pb-20 md:px-14 md:pb-28">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="eyebrow mb-5">Pune's Trusted Broker</div>
          <h1 className="display-xl text-white">
            Find Your<br />Perfect Space.
          </h1>
          <p className="mt-6 text-sm text-white/70 md:text-base">
            Flat · Shop · Office · Plot · Resale &amp; Rental
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-copper px-7 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-white"
          >
            View Properties <span aria-hidden>→</span>
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-8 flex justify-center gap-2.5">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${selected === i ? "w-8 bg-copper" : "w-1.5 bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ============================ SERVICES ============================ */

function Services() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="services" className="bg-ink text-white">
      <Reveal className="mx-auto max-w-[1400px] px-6 pt-24 pb-10 md:px-10">
        <div className="eyebrow mb-4">What We Do</div>
        <h2 className="display-lg text-white">Services.</h2>
      </Reveal>

      <div className="hidden h-[78vh] w-full gap-1.5 px-1.5 pb-1.5 md:flex">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.name}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(0)}
            animate={{ flex: active === i ? 3 : 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
            className="relative h-full cursor-pointer overflow-hidden"
          >
            <img src={s.img} alt={s.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-ink/20" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <AnimatePresence mode="wait">
                {active === i ? (
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                  >
                    <div className="eyebrow mb-3">0{i + 1}</div>
                    <h3 className="display-lg text-white">{s.name}</h3>
                    <p className="mt-4 max-w-md text-sm text-white/75">{s.desc}</p>
                    <button className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-copper hover:text-white transition-colors">
                      Explore →
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="collapsed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="[writing-mode:vertical-rl] rotate-180 text-xs uppercase tracking-[0.25em] text-white">
                      {s.name}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col gap-1.5 px-1.5 pb-1.5 md:hidden">
        {SERVICES.map((s, i) => {
          const open = active === i;
          return (
            <motion.button
              key={s.name}
              onClick={() => setActive(open ? null : i)}
              animate={{ height: open ? 360 : 96 }}
              transition={{ type: "spring", stiffness: 140, damping: 22 }}
              className="relative w-full overflow-hidden text-left"
            >
              <img src={s.img} alt={s.name} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/50 to-ink/20" />
              <div className="relative flex h-full flex-col justify-end p-6">
                <h3 className="font-serif text-3xl text-white">{s.name}</h3>
                <AnimatePresence>
                  {open && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 text-sm text-white/75"
                    >
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

/* ============================ FEATURED ============================ */

function PropertyCard({ p, large }: { p: typeof FEATURED[number]; large?: boolean }) {
  return (
    <motion.div
      whileHover="hover"
      className={`group relative overflow-hidden ${large ? "row-span-2 min-h-[420px] md:min-h-[640px]" : "min-h-[300px]"}`}
    >
      <motion.img
        variants={{ hover: { scale: 1.05 } }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        src={p.img}
        alt={p.title}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <motion.div
        variants={{ hover: { opacity: 0.85 } }}
        initial={{ opacity: 0.65 }}
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent"
      />
      <div className="relative flex h-full flex-col justify-end p-7 md:p-9">
        <span className="mb-4 self-start rounded-full bg-copper px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white">
          {p.type}
        </span>
        <h3 className={`font-serif text-white ${large ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl"}`}>{p.title}</h3>
        <p className="mt-2 text-sm text-white/70">{p.price}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-copper">
          View <span aria-hidden>→</span>
        </span>
      </div>
    </motion.div>
  );
}

function Featured() {
  return (
    <section id="properties" className="bg-cream px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="eyebrow mb-4">Featured</div>
          <h2 className="display-xl inline-block text-ink">
            Properties.
            <span className="mt-3 block h-[3px] w-32 bg-copper" />
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 grid grid-cols-1 gap-3 md:grid-cols-2 md:grid-rows-2">
          <PropertyCard p={FEATURED[0]} large />
          <PropertyCard p={FEATURED[1]} />
          <PropertyCard p={FEATURED[2]} />
        </Reveal>

        <Reveal className="mt-14 text-center">
          <a href="#properties" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.22em] text-copper hover:text-ink transition-colors">
            View All Properties <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ PARALLAX ============================ */

function ParallaxBreak() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} className="relative h-[60vh] w-full overflow-hidden bg-ink">
      <motion.img
        style={{ y }}
        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=2000&q=80&auto=format&fit=crop"
        alt="Pune skyline"
        className="absolute inset-0 h-[130%] w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-ink/45" />
      <div className="relative flex h-full items-center justify-center px-6 text-center">
        <Reveal>
          <h2 className="display-xl text-white">500+ Properties.<br />One Trusted Name.</h2>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ STATS ============================ */

function Stats() {
  return (
    <section className="bg-ink px-6 py-24 text-white md:px-10">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px bg-copper/30 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="bg-ink px-6 py-12 text-center md:py-16">
            <div className="font-serif text-5xl text-copper md:text-7xl">
              <CountUp to={s.n} suffix={s.suffix} />
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.2em] text-white/80">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================ GALLERY ============================ */

function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", dragFree: true, loop: true });

  return (
    <section className="bg-cream px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-12 flex items-end justify-between">
          <div>
            <div className="eyebrow mb-4">Showcase</div>
            <h2 className="display-lg text-ink">Our Properties</h2>
          </div>
          <div className="hidden gap-3 md:flex">
            <button onClick={() => emblaApi?.scrollPrev()} aria-label="Previous" className="grid h-14 w-14 place-items-center border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-cream">←</button>
            <button onClick={() => emblaApi?.scrollNext()} aria-label="Next" className="grid h-14 w-14 place-items-center border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-cream">→</button>
          </div>
        </Reveal>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5 pl-6 md:pl-10">
          {GALLERY.map((g) => (
            <div key={g.title} className="min-w-0 flex-[0_0_82%] sm:flex-[0_0_45%] lg:flex-[0_0_32%]">
              <div className="h-[400px] overflow-hidden">
                <img src={g.img} alt={g.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="mt-4 font-serif text-2xl text-ink">{g.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ TESTIMONIALS ============================ */

/* ============================ NEIGHBOURHOODS ============================ */

function Neighbourhoods() {
  return (
    <section id="neighbourhoods" className="bg-ink px-6 py-24 text-white md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="eyebrow mb-4">Explore Pune</div>
            <h2 className="display-lg text-white">
              Neighbourhoods<br className="hidden md:block" /> We Know By Heart.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/60">
            Twelve years on the ground across Pune's finest pockets — we don't just list addresses, we read the lane.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NEIGHBOURHOODS.map((n, i) => (
            <motion.a
              key={n.name}
              href="#contact"
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
                  variants={{ hover: { scale: 1.06 } }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Progressive blur reveal at bottom */}
                <ProgressiveBlur
                  direction="bottom"
                  blurIntensity={0.5}
                  blurLayers={6}
                  className="absolute inset-x-0 bottom-0 h-2/3"
                />

                {/* Copper-tinted ink wash */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />

                {/* Hover copper outline */}
                <motion.div
                  variants={{ hover: { opacity: 1 } }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-3 rounded-sm border border-copper/60"
                />

                <div className="relative flex h-full flex-col justify-end p-7">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-copper" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-copper">{n.tag}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-4xl text-white md:text-5xl">{n.name}</h3>
                  <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/70">
                    <span>{n.count}</span>
                    <motion.span
                      variants={{ hover: { x: 6 } }}
                      transition={{ duration: 0.35 }}
                      className="text-copper"
                      aria-hidden
                    >
                      →
                    </motion.span>
                  </div>
                </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ TESTIMONIALS (original) ============================ */

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
    <section className="relative overflow-hidden bg-cream px-6 py-28 md:px-10 md:py-36">
      <div className="pointer-events-none absolute left-6 top-12 font-serif text-[180px] leading-none text-copper/30 md:left-16 md:text-[280px]">"</div>
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <div className="eyebrow mb-6">Kind Words</div>
        </Reveal>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-serif text-3xl italic leading-tight text-ink md:text-5xl">
              "{t.q}"
            </p>
            <div className="mt-10 flex justify-center gap-1 text-copper">
              {Array.from({ length: 5 }).map((_, i) => <span key={i}>★</span>)}
            </div>
            <div className="mt-5 text-sm font-medium uppercase tracking-[0.2em] text-ink">{t.name}</div>
            <div className="text-xs text-ink/60">{t.role}</div>
          </motion.div>
        </AnimatePresence>

        <div className="mx-auto mt-14 h-px w-64 bg-ink/15">
          <div className="h-px bg-copper" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </section>
  );
}

/* ============================ ENQUIRY ============================ */

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
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="fixed right-6 top-24 z-[60] rounded-md border-l-4 border-copper bg-ink px-5 py-4 text-sm text-white shadow-2xl"
        >
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
      setToast(false);
      alert("Something went wrong. Please call +91 9172355369.");
    }
  };

  const fieldCls = "w-full border-0 border-b border-white/25 bg-transparent py-4 text-white placeholder-white/40 outline-none focus:border-copper transition-colors";

  return (
    <section id="contact" className="bg-ink">
      <Toast show={toast} />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[400px] lg:min-h-[760px]">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80&auto=format&fit=crop" alt="Premium home" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-ink/10" />
        </div>
        <div className="flex items-center bg-ink px-6 py-20 md:px-14 lg:py-24">
          <Reveal className="w-full max-w-md">
            <div className="eyebrow mb-4">Get In Touch</div>
            <h2 className="display-lg text-white">Let's Find<br />Your Space.</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5">
              <div>
                <input {...register("name")} placeholder="Full Name" className={fieldCls} />
                {errors.name && <p className="mt-1 text-xs text-copper">{errors.name.message}</p>}
              </div>
              <div>
                <input {...register("phone")} placeholder="Phone Number" className={fieldCls} />
                {errors.phone && <p className="mt-1 text-xs text-copper">{errors.phone.message}</p>}
              </div>
              <div>
                <input {...register("email")} placeholder="Email Address" className={fieldCls} />
                {errors.email && <p className="mt-1 text-xs text-copper">{errors.email.message}</p>}
              </div>
              <div>
                <select {...register("propertyType")} className={`${fieldCls} appearance-none bg-ink pr-6`}>
                  {["Flat", "Shop", "Office", "Plot", "Resale & Rental"].map(o => <option key={o} value={o} className="bg-ink">{o}</option>)}
                </select>
              </div>
              <div>
                <textarea {...register("message")} rows={2} placeholder="Message (optional)" className={fieldCls} />
              </div>
              <motion.button
                whileHover={{ scale: 1.01, boxShadow: "0 0 30px rgba(184,115,51,0.5)" }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                type="submit"
                className="mt-4 w-full rounded-none bg-copper py-4 text-xs font-medium uppercase tracking-[0.25em] text-white disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send Enquiry"}
              </motion.button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================ FOOTER ============================ */

function Footer() {
  return (
    <footer className="border-t border-copper/40 bg-ink text-white">
      <div className="mx-auto max-w-[1400px] px-6 pt-20 pb-10 md:px-10">
        <Reveal className="text-center">
          <h2 className="font-serif text-[64px] leading-none text-copper md:text-[140px]">AAURA REALTY</h2>
          <p className="mt-4 font-serif text-xl italic text-white/80 md:text-2xl">Our Passion. Your Aaura.</p>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-12 border-t border-white/10 pt-14 md:grid-cols-3">
          <div>
            <div className="eyebrow mb-5">Quick Links</div>
            <ul className="space-y-3 text-sm text-white/80">
              <li><a href="#properties" className="hover:text-copper transition">Properties</a></li>
              <li><a href="#services" className="hover:text-copper transition">Services</a></li>
              <li><a href="#contact" className="hover:text-copper transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-5">Services</div>
            <ul className="space-y-3 text-sm text-white/80">
              {SERVICES.map(s => <li key={s.name}>{s.name}</li>)}
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

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Aaura Realty. All rights reserved.</p>
          <p>RERA registered. Disclaimer: All information is for representational purposes only.</p>
        </div>
      </div>
    </footer>
  );
}

/* ============================ PAGE ============================ */

export default function Home() {
  useLenisSmoothScroll();
  return (
    <main className="bg-cream text-ink">
      <Navbar />
      <Hero />
      <Services />
      <Featured />
      <ParallaxBreak />
      <Stats />
      <Gallery />
      <Neighbourhoods />
      <Testimonials />
      <EnquiryForm />
      <Footer />
    </main>
  );
}