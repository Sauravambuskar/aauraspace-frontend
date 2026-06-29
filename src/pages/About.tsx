import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLenisSmoothScroll, Reveal, CountUp, PageHero } from "@/components/shared";
import { STATS, VALUES, MILESTONES, TESTIMONIALS } from "@/lib/data";

/* ============================ OUR STORY ============================ */

function OurStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="overflow-hidden bg-white px-5 py-10 md:px-10 md:py-14">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
        <Reveal>
          <div className="eyebrow mb-6">Our Story</div>
          <h2 className="display-lg text-ink">Born from a Belief<br />in Better.</h2>
          <p className="mt-8 text-base text-ink/80 leading-relaxed">
            In 2012, Rajesh and Sunita Sharma started Aaura Realty with a simple conviction:
            Pune's families deserved a broker who would put their interests first â€” always.
          </p>
          <p className="mt-5 text-base text-ink/80 leading-relaxed">
            What began as three listings in Kharadi has grown into Pune's most trusted independent
            realty practice â€” 500+ properties, 320 happy families, and 50 builder relationships
            built on nothing but integrity.
          </p>
          <p className="mt-5 text-base text-ink/80 leading-relaxed">
            We don't chase volume. We obsess over fit â€” matching the right family to the right
            home, at the right price, in the right neighbourhood.
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-10 inline-block">
            <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-copper px-7 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-white">
              Talk to Us <span aria-hidden>â†’</span>
            </Link>
          </motion.div>
        </Reveal>

        <Reveal delay={0.2} className="relative">
          <div className="relative h-[340px] overflow-hidden rounded-sm shadow-2xl sm:h-[500px] md:h-[600px]">
            <motion.img
              style={{ y }}
              src="/img4-op-329k9.jpg"
              alt="Pune real estate"
              loading="lazy"
              className="absolute inset-0 h-[120%] w-full object-cover"
            />
          </div>
          {/* Floating stat badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute -bottom-6 -left-6 hidden border-l-4 border-copper bg-white p-7 shadow-xl md:block"
          >
            <div className="font-serif text-5xl text-copper">12+</div>
            <div className="mt-1 text-xs uppercase tracking-[0.2em] text-ink/60">Years in Pune</div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ IMAGE + STATS ============================ */

function StatsWithImage() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {/* Image half */}
      <div className="relative h-[400px] lg:h-auto">
        <img
          src="/img4-op-329k9.jpg"
          alt="Happy family in new home"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/20" />
        <div className="absolute inset-0 flex items-end p-10">
          <div className="font-serif text-4xl italic text-white leading-tight">
            "Every home is a milestone.<br />We help you reach it."
          </div>
        </div>
      </div>
      {/* Stats half */}
      <div className="grid grid-cols-2 bg-ink">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="flex flex-col items-center justify-center border border-white/5 py-8 md:py-10">
            <div className="font-serif text-5xl text-copper md:text-6xl">
              <CountUp to={s.n} suffix={s.suffix} />
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.2em] text-white/60">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================ VALUES ============================ */

function Values() {
  const IMAGES = [
    "/residential-DshD8vFh.jpg",
    "/img4-op-329k9.jpg",
    "/img5-BjgfExbp.jpg",
    "/residential-DshD8vFh.jpg",
  ];

  return (
    <section className="bg-cream px-6 py-10 md:px-10 md:py-14">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-10">
          <div className="eyebrow mb-4">What Guides Us</div>
          <h2 className="display-lg text-ink">Our Values.</h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <motion.div whileHover="hover" className="group relative overflow-hidden rounded-sm bg-white shadow-sm">
                <div className="relative h-44 overflow-hidden">
                  <motion.img
                    src={IMAGES[i]}
                    alt={v.title}
                    loading="lazy"
                    variants={{ hover: { scale: 1.07 } }}
                    transition={{ duration: 0.6 }}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-ink/40 transition-colors group-hover:bg-copper/50" />
                  <div className="absolute inset-0 flex items-center justify-center font-serif text-5xl text-white/80">
                    {v.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-ink">{v.title}</h3>
                  <p className="mt-3 text-sm text-ink/60 leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ TIMELINE ============================ */

function Timeline() {
  const TIMELINE_IMGS = [
    "/img4-op-329k9.jpg",
    "/commercial-lWmdaWql.jpg",
    "/img4-op-329k9.jpg",
    "/img4-op-329k9.jpg",
    "/img4-op-329k9.jpg",
    "/residential-DshD8vFh.jpg",
  ];

  return (
    <section className="bg-white px-6 py-10 md:px-10 md:py-14">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-10">
          <div className="eyebrow mb-4">Our Journey</div>
          <h2 className="display-lg text-ink">Milestones.</h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.year} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="group overflow-hidden rounded-sm bg-cream shadow-sm"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={TIMELINE_IMGS[i]}
                    alt={m.event}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/50 group-hover:bg-copper/60 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center font-serif text-5xl font-medium text-white">
                    {m.year}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-copper mb-2">{m.year}</div>
                  <p className="font-serif text-lg text-ink">{m.event}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ TESTIMONIAL with image ============================ */

function TestimonialStrip() {
  const t = TESTIMONIALS[0];
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="relative h-[380px] lg:h-auto">
        <img
          src="/residential-DshD8vFh.jpg"
          alt="Happy clients"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/30" />
      </div>
      <div className="relative overflow-hidden bg-ink px-8 py-10 md:px-14 md:py-14">
        <div className="pointer-events-none absolute left-4 top-4 font-serif text-[160px] leading-none text-copper/15">
          "
        </div>
        <div className="relative">
          <div className="eyebrow mb-6 text-copper">Kind Words</div>
          <p className="font-serif text-3xl italic leading-tight text-white md:text-4xl">"{t.q}"</p>
          <div className="mt-8 flex gap-1 text-copper">{Array.from({ length: 5 }).map((_, i) => <span key={i}>â˜…</span>)}</div>
          <div className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-white">{t.name}</div>
          <div className="text-xs text-white/50">{t.role}</div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-10 inline-block">
            <Link to="/contact" className="inline-flex items-center gap-3 rounded-full border border-copper px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-copper hover:bg-copper hover:text-white transition-colors">
              Work with Us â†’
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================ CTA ============================ */

function CTA() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/commercial-lWmdaWql.jpg"
        alt="Pune luxury"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-cream/90" />
      <div className="relative px-6 py-10 text-center md:py-14">
        <Reveal>
          <div className="eyebrow mb-4">Ready to Begin?</div>
          <h2 className="display-xl text-ink">Let's Find<br />Your Space.</h2>
          <p className="mx-auto mt-6 max-w-md text-base text-ink/60">
            One call is all it takes. Let's understand what you're looking for and start your
            journey with Aaura.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-copper px-7 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-white">
                Enquire Now <span aria-hidden>â†’</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to="/properties" className="inline-flex items-center gap-3 rounded-full border border-ink px-7 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-ink hover:bg-ink hover:text-white transition-colors">
                Browse Properties
              </Link>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ PAGE ============================ */

export default function About() {
  useLenisSmoothScroll();
  return (
    <main className="bg-white text-ink">
      <Navbar />
      <PageHero
        eyebrow="Our Story"
        title="About Aaura Realty."
        subtitle="Pune's most trusted real estate broker â€” twelve years of integrity, local knowledge, and genuine care."
        img="/residential-DshD8vFh.jpg"
        breadcrumb={[{ label: "About" }]}
      />
      <OurStory />
      <StatsWithImage />
      <Values />
      <Timeline />
      <TestimonialStrip />
      <CTA />
      <Footer />
    </main>
  );
}
