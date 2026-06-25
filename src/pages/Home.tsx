import { useEffect, useState, useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
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

/* ============================ HERO ============================ */

function Hero() {
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
    <section id="top" className="relative h-[100svh] w-full overflow-hidden bg-ink">
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {HERO_SLIDES.map((src, i) => (
            <div key={i} className="relative h-full min-w-0 flex-[0_0_100%]">
              <img
                src={src}
                alt="Luxury property in Pune"
                className="h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
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
            Find Your
            <br />
            Perfect Space.
          </h1>
          <p className="mt-6 text-sm text-white/70 md:text-base">
            Flat · Shop · Office · Plot · Resale &amp; Rental
          </p>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-block"
          >
            <Link
              to="/properties"
              className="inline-flex items-center gap-3 rounded-full bg-copper px-7 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-white"
            >
              View Properties <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-8 flex justify-center gap-2.5">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              selected === i ? "w-8 bg-copper" : "w-1.5 bg-white/50"
            }`}
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
            <img
              src={s.img}
              alt={s.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700"
              loading="lazy"
            />
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
                    <Link
                      to={`/properties?type=${encodeURIComponent(s.name)}`}
                      className="mt-6 inline-block text-sm font-medium uppercase tracking-[0.2em] text-copper hover:text-white transition-colors"
                    >
                      Explore →
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    key="collapsed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
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
              <img
                src={s.img}
                alt={s.name}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
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

function PropertyCard({ p, large }: { p: (typeof FEATURED)[number]; large?: boolean }) {
  return (
    <motion.div
      whileHover="hover"
      className={`group relative overflow-hidden ${
        large ? "row-span-2 min-h-[420px] md:min-h-[640px]" : "min-h-[300px]"
      }`}
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
        <h3
          className={`font-serif text-white ${
            large ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl"
          }`}
        >
          {p.title}
        </h3>
        <p className="mt-2 text-sm text-white/70">{p.price}</p>
        <Link
          to="/properties"
          className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-copper"
        >
          View <span aria-hidden>→</span>
        </Link>
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
          <PropertyCard p={FEATURED[2] || FEATURED[1]} />
        </Reveal>

        <Reveal className="mt-14 text-center">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.22em] text-copper hover:text-ink transition-colors"
          >
            View All Properties <span aria-hidden>→</span>
          </Link>
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
          <h2 className="display-xl text-white">
            500+ Properties.
            <br />
            One Trusted Name.
          </h2>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ STATS ============================ */

function Stats() {
  return (
    <section className="bg-cream px-6 py-4 md:px-0">
      <div className="mx-auto grid max-w-full grid-cols-2 gap-px bg-ink/10 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="bg-white px-6 py-14 text-center">
            <div className="font-serif text-5xl text-copper md:text-7xl">
              <CountUp to={s.n} suffix={s.suffix} />
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.2em] text-ink/50">{s.label}</div>
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
            <button
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous"
              className="grid h-14 w-14 place-items-center border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              ←
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next"
              className="grid h-14 w-14 place-items-center border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              →
            </button>
          </div>
        </Reveal>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5 pl-6 md:pl-10">
          {GALLERY.map((g) => (
            <div key={g.title} className="min-w-0 flex-[0_0_82%] sm:flex-[0_0_45%] lg:flex-[0_0_32%]">
              <div className="h-[400px] overflow-hidden">
                <img
                  src={g.img}
                  alt={g.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="mt-4 font-serif text-2xl text-ink">{g.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ NEIGHBOURHOODS PREVIEW ============================ */

function NeighbourhoodsPreview() {
  const preview = NEIGHBOURHOODS.slice(0, 3);
  return (
    <section className="bg-white px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="eyebrow mb-4">Explore Pune</div>
            <h2 className="display-lg text-ink">
              Neighbourhoods
              <br className="hidden md:block" /> We Know By Heart.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ink/60">
            Twelve years on the ground across Pune's finest pockets — we don't just list
            addresses, we read the lane.
          </p>
        </Reveal>

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
                variants={{ hover: { scale: 1.06 } }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <ProgressiveBlur
                direction="bottom"
                blurIntensity={0.5}
                blurLayers={6}
                className="absolute inset-x-0 bottom-0 h-2/3"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
              <motion.div
                variants={{ hover: { opacity: 1 } }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-3 rounded-sm border border-copper/60"
              />
              <div className="relative flex h-full flex-col justify-end p-7">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-copper" />
                  <span className="text-[10px] uppercase tracking-[0.25em] text-copper">
                    {n.tag}
                  </span>
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
            </motion.div>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link
            to="/neighbourhoods"
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.22em] text-copper hover:text-ink transition-colors"
          >
            Explore All Neighbourhoods <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ TESTIMONIALS ============================ */

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
      <div className="pointer-events-none absolute left-6 top-12 font-serif text-[180px] leading-none text-copper/30 md:left-16 md:text-[280px]">
        "
      </div>
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
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <div className="mt-5 text-sm font-medium uppercase tracking-[0.2em] text-ink">
              {t.name}
            </div>
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

/* ============================ ENQUIRY FORM ============================ */

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { propertyType: "Flat" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setToast(true);
      reset({ propertyType: "Flat" });
      setTimeout(() => setToast(false), 3500);
    } catch {
      alert("Something went wrong. Please call +91 9172355369.");
    }
  };

  const fieldCls =
    "w-full border-0 border-b border-white/25 bg-transparent py-4 text-white placeholder-white/40 outline-none focus:border-copper transition-colors";

  return (
    <section id="contact" className="bg-ink">
      <Toast show={toast} />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[400px] lg:min-h-[760px]">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80&auto=format&fit=crop"
            alt="Premium home"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-ink/10" />
        </div>
        <div className="flex items-center bg-ink px-6 py-20 md:px-14 lg:py-24">
          <Reveal className="w-full max-w-md">
            <div className="eyebrow mb-4">Get In Touch</div>
            <h2 className="display-lg text-white">
              Let's Find
              <br />
              Your Space.
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5">
              <div>
                <input {...register("name")} placeholder="Full Name" className={fieldCls} />
                {errors.name && (
                  <p className="mt-1 text-xs text-copper">{errors.name.message}</p>
                )}
              </div>
              <div>
                <input {...register("phone")} placeholder="Phone Number" className={fieldCls} />
                {errors.phone && (
                  <p className="mt-1 text-xs text-copper">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <input {...register("email")} placeholder="Email Address" className={fieldCls} />
                {errors.email && (
                  <p className="mt-1 text-xs text-copper">{errors.email.message}</p>
                )}
              </div>
              <div>
                <select
                  {...register("propertyType")}
                  className={`${fieldCls} appearance-none bg-ink pr-6`}
                >
                  {["Flat", "Shop", "Office", "Plot", "Resale & Rental"].map((o) => (
                    <option key={o} value={o} className="bg-ink">
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <textarea
                  {...register("message")}
                  rows={2}
                  placeholder="Message (optional)"
                  className={fieldCls}
                />
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
      <NeighbourhoodsPreview />
      <Testimonials />
      <EnquiryForm />
      <Footer />
    </main>
  );
}
