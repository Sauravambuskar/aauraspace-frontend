import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLenisSmoothScroll, Reveal, PageHero } from "@/components/shared";
import { NEIGHBOURHOODS } from "@/lib/data";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

/* ============================ NEIGHBOURHOOD GRID ============================ */

function NeighbourhoodCard({
  n,
  index,
  onClick,
}: {
  n: (typeof NEIGHBOURHOODS)[number];
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hover"
      onClick={onClick}
      className="group relative h-[460px] cursor-pointer overflow-hidden rounded-sm shadow-md"
    >
      <motion.img
        src={n.img}
        alt={`${n.name}, Pune`}
        loading="lazy"
        variants={{ hover: { scale: 1.07 } }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <ProgressiveBlur direction="bottom" blurIntensity={0.6} blurLayers={7} className="absolute inset-x-0 bottom-0 h-3/4" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-3 rounded-sm border border-copper/50"
      />
      {/* Tag badge top-right */}
      <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-copper backdrop-blur-sm">
        {n.tag}
      </div>
      <div className="relative flex h-full flex-col justify-end p-7">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-copper" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-copper">{n.count}</span>
        </div>
        <h3 className="mt-3 font-serif text-4xl text-white md:text-5xl">{n.name}</h3>
        <p className="mt-2 max-w-xs text-sm text-white/0 transition-all duration-400 group-hover:text-white/75">
          {n.desc.slice(0, 75)}…
        </p>
        <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
          <span>Avg. {n.avgPrice}</span>
          <motion.span variants={{ hover: { x: 6 } }} transition={{ duration: 0.35 }} className="text-copper" aria-hidden>→</motion.span>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================ DETAIL MODAL ============================ */

function NeighbourhoodModal({ n, onClose }: { n: (typeof NEIGHBOURHOODS)[number] | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {n && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 backdrop-blur-sm md:items-center md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-t-2xl bg-white shadow-2xl md:rounded-lg"
          >
            <div className="relative h-[260px] overflow-hidden md:h-[300px]">
              <img src={n.img} alt={n.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink hover:bg-copper hover:text-white transition-colors">
                ✕
              </button>
              <div className="absolute bottom-0 left-0 p-7">
                <span className="eyebrow text-copper">{n.tag}</span>
                <h3 className="mt-2 font-serif text-4xl text-white">{n.name}</h3>
              </div>
            </div>

            <div className="p-8">
              <p className="text-sm text-ink/70 leading-relaxed">{n.desc}</p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-sm bg-cream p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-copper">Avg. Price</div>
                  <div className="mt-2 font-serif text-xl text-ink">{n.avgPrice}</div>
                </div>
                <div className="rounded-sm bg-cream p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-copper">Available</div>
                  <div className="mt-2 font-serif text-xl text-ink">{n.count}</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-xs uppercase tracking-[0.18em] text-copper mb-3">Highlights</div>
                <div className="flex flex-wrap gap-2">
                  {n.highlights.map((h) => (
                    <span key={h} className="rounded-full border border-ink/15 bg-cream px-3 py-1 text-xs text-ink/70">{h}</span>
                  ))}
                </div>
              </div>

              <Link
                to="/properties"
                className="mt-8 block w-full bg-copper py-3.5 text-center text-xs font-medium uppercase tracking-[0.22em] text-white hover:opacity-90 transition-opacity"
              >
                View Properties in {n.name} →
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================ WHY PUNE — image cards ============================ */

function WhyPune() {
  const points = [
    {
      icon: "🏙️",
      title: "Fastest-Growing IT Hub",
      desc: "300+ MNCs, second-largest IT city in India, driving sustained property demand.",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80&auto=format&fit=crop",
    },
    {
      icon: "🎓",
      title: "World-Class Education",
      desc: "IIT Pune, Symbiosis, and 800+ schools — a magnet for aspiring families.",
      img: "https://images.unsplash.com/photo-1562774053-701939374585?w=700&q=80&auto=format&fit=crop",
    },
    {
      icon: "🌤️",
      title: "Best Weather in India",
      desc: "Year-round moderate climate — a lifestyle advantage that never gets old.",
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&q=80&auto=format&fit=crop",
    },
    {
      icon: "📈",
      title: "Strong Appreciation",
      desc: "Kharadi and Hinjewadi have seen 40–60% price growth over five years.",
      img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80&auto=format&fit=crop",
    },
  ];

  return (
    <section className="bg-white px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-end">
          <div>
            <div className="eyebrow mb-4">Why Pune?</div>
            <h2 className="display-lg text-ink">A City Built<br />for the Future.</h2>
          </div>
          <p className="text-base text-ink/60 leading-relaxed md:max-w-md">
            Pune isn't just a place to live — it's a long-term investment in quality of life,
            career growth, and community.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <motion.div whileHover="hover" className="group overflow-hidden rounded-sm bg-cream shadow-sm">
                <div className="relative h-44 overflow-hidden">
                  <motion.img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    variants={{ hover: { scale: 1.07 } }}
                    transition={{ duration: 0.6 }}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-ink/35 group-hover:bg-copper/50 transition-colors duration-400" />
                  <div className="absolute inset-0 flex items-center justify-center text-4xl">{p.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-ink">{p.title}</h3>
                  <p className="mt-3 text-sm text-ink/60 leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ SPLIT IMAGE CTA ============================ */

function CTA() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {/* Image side */}
      <div className="relative h-[400px] lg:h-auto">
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80&auto=format&fit=crop"
          alt="Pune neighbourhood"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/25" />
        <div className="absolute inset-0 flex items-end p-10">
          <div className="font-serif text-3xl italic text-white leading-tight">
            "We don't just list<br />addresses. We read the lane."
          </div>
        </div>
      </div>
      {/* Text side */}
      <div className="bg-cream px-8 py-16 md:px-14 md:py-20">
        <Reveal>
          <div className="eyebrow mb-4">Not Sure Which Area Fits?</div>
          <h2 className="display-lg text-ink">Let's Find the Right<br />Neighbourhood for You.</h2>
          <p className="mt-6 text-sm text-ink/60 leading-relaxed max-w-sm">
            Share your requirements — commute, budget, lifestyle — and we'll personally shortlist
            localities that match perfectly.
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-10 inline-block">
            <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-copper px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white">
              Get Personalised Guidance <span aria-hidden>→</span>
            </Link>
          </motion.div>
          <div className="mt-8">
            <Link to="/properties" className="text-sm font-medium uppercase tracking-[0.18em] text-ink/50 hover:text-copper transition-colors">
              Browse All Properties →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ PAGE ============================ */

export default function Neighbourhoods() {
  useLenisSmoothScroll();
  const [selected, setSelected] = useState<(typeof NEIGHBOURHOODS)[number] | null>(null);

  return (
    <main className="bg-cream text-ink">
      <Navbar />

      <PageHero
        eyebrow="Explore Pune"
        title="Neighbourhoods We Know By Heart."
        subtitle="Twelve years on the ground across Pune's finest pockets. Click any neighbourhood to explore."
        img="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=2000&q=80&auto=format&fit=crop"
        breadcrumb={[{ label: "Neighbourhoods" }]}
      />

      {/* Grid */}
      <div className="bg-white px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="mb-12">
            <div className="eyebrow mb-3">6 Locations</div>
            <h2 className="display-lg text-ink">Choose Your<br />Neighbourhood.</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {NEIGHBOURHOODS.map((n, i) => (
              <NeighbourhoodCard key={n.name} n={n} index={i} onClick={() => setSelected(n)} />
            ))}
          </div>
        </div>
      </div>

      <WhyPune />
      <CTA />

      <NeighbourhoodModal n={selected} onClose={() => setSelected(null)} />
      <Footer />
    </main>
  );
}
