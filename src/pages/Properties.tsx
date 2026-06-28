import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLenisSmoothScroll, Reveal, PageHero } from "@/components/shared";
import { ALL_PROPERTIES, type PropertyType } from "@/lib/data";

const FILTERS: Array<"All" | PropertyType> = [
  "All",
  "Flat",
  "Shop",
  "Office",
  "Plot",
  "Resale & Rental",
];

function PropertyCard({ p, index }: { p: (typeof ALL_PROPERTIES)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30, scale: 0.97 }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      layout
      className="group overflow-hidden bg-white shadow-sm ring-1 ring-ink/8 transition-shadow hover:shadow-xl"
    >
      <div className="relative h-[260px] overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          src={p.img}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-copper px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          {p.type}
        </span>
        <span className="absolute right-4 top-4 rounded-full border border-white/40 bg-white/20 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-white backdrop-blur-sm">
          {p.status}
        </span>
      </div>

      <div className="p-6">
        <h3 className="font-serif text-2xl text-ink">{p.title}</h3>
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-ink/50">
          <svg className="h-3 w-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>{p.location}</span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-ink/8 pt-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-ink/40">Price</div>
            <div className="mt-1 font-serif text-xl text-copper">{p.price}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-[0.15em] text-ink/40">Area</div>
            <div className="mt-1 text-sm font-medium text-ink">{p.area}</div>
          </div>
        </div>

        {(p.beds || p.baths) && (
          <div className="mt-3 flex gap-4 text-xs text-ink/50">
            {p.beds && <span>ðŸ› {p.beds} Bed{p.beds > 1 ? "s" : ""}</span>}
            {p.baths && <span>ðŸš¿ {p.baths} Bath{p.baths > 1 ? "s" : ""}</span>}
          </div>
        )}

        <Link
          to="/contact"
          className="mt-5 block w-full border border-copper py-2.5 text-center text-xs font-medium uppercase tracking-[0.2em] text-copper transition-colors hover:bg-copper hover:text-white"
        >
          Enquire Now
        </Link>
      </div>
    </motion.div>
  );
}

/* ============================ WHY CHOOSE US STRIP ============================ */

function TrustStrip() {
  const items = [
    { icon: "ðŸ†", label: "12+ Years", sub: "In Pune Real Estate" },
    { icon: "ðŸ ", label: "500+ Properties", sub: "Listed & Sold" },
    { icon: "ðŸ‘¨â€ðŸ‘©â€ðŸ‘§", label: "320+ Families", sub: "Served with Care" },
    { icon: "ðŸ¤", label: "50+ Builders", sub: "Trusted Partners" },
  ];
  return (
    <div className="border-y border-ink/8 bg-white">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 px-6 md:grid-cols-4 md:px-10">
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`flex items-center gap-4 py-6 ${i < items.length - 1 ? "border-r border-ink/8" : ""} px-6`}
          >
            <span className="text-3xl">{item.icon}</span>
            <div>
              <div className="font-serif text-xl text-ink">{item.label}</div>
              <div className="text-xs text-ink/50">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Properties() {
  useLenisSmoothScroll();
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get("type") as PropertyType | null;
  const [active, setActive] = useState<"All" | PropertyType>(
    typeParam && FILTERS.includes(typeParam as "All" | PropertyType) ? typeParam : "All"
  );

  const filtered = useMemo(
    () => active === "All" ? ALL_PROPERTIES : ALL_PROPERTIES.filter((p) => p.type === active),
    [active]
  );

  function selectFilter(f: "All" | PropertyType) {
    setActive(f);
    setSearchParams(f === "All" ? {} : { type: f });
  }

  return (
    <main className="bg-cream text-ink">
      <Navbar />

      <PageHero
        eyebrow="Browse Listings"
        title="All Properties."
        subtitle="500+ curated listings across Pune's finest localities."
        img="/commercial-lWmdaWql.jpg"
        breadcrumb={[{ label: "Properties" }]}
      />

      <TrustStrip />

      {/* Filter bar */}
      <div className="sticky top-[72px] z-30 border-b border-ink/10 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
            {FILTERS.map((f) => (
              <motion.button
                key={f}
                onClick={() => selectFilter(f)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex-shrink-0 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-colors ${
                  active === f
                    ? "bg-copper text-white shadow-md"
                    : "border border-ink/20 text-ink/60 hover:border-copper hover:text-copper"
                }`}
              >
                {f}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Count + image accent row */}
      <div className="bg-white">
        <div className="mx-auto max-w-[1400px] px-6 pt-10 pb-6 md:px-10">
          <Reveal className="flex items-center justify-between">
            <p className="text-sm text-ink/50">
              Showing <span className="font-semibold text-copper">{filtered.length}</span>{" "}
              {active === "All" ? "properties" : `${active} listings`}
            </p>
            <p className="hidden text-xs uppercase tracking-[0.18em] text-ink/40 md:block">
              Pune, Maharashtra
            </p>
          </Reveal>
        </div>
      </div>

      {/* Grid on white background */}
      <div className="bg-white pb-4">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <PropertyCard key={p.id} p={p} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="py-24 text-center text-ink/40">
              <p className="font-serif text-4xl">No listings found.</p>
              <p className="mt-3 text-sm">Try a different category or contact us directly.</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA â€” image background */}
      <section className="relative overflow-hidden">
        <img
          src="/img4-op-329k9.jpg"
          alt="Pune luxury home"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="relative px-6 py-24 text-center md:py-32">
          <Reveal>
            <div className="eyebrow mb-4 text-copper">Can't Find What You're Looking For?</div>
            <h2 className="display-lg text-white">Tell Us What<br />You Need.</h2>
            <p className="mx-auto mt-6 max-w-md text-sm text-white/70">
              We have access to off-market listings not shown here. Describe your requirements and
              we'll personally curate options for you.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-10 inline-block">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-copper px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white"
              >
                Talk to an Expert <span aria-hidden>â†’</span>
              </Link>
            </motion.div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
