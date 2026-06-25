import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";

const NAV_LINKS = [
  { label: "Properties", to: "/properties" },
  { label: "About", to: "/about" },
  { label: "Neighbourhoods", to: "/neighbourhoods" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  return (
    <>
      <motion.header
        initial={false}
        animate={
          isHome
            ? { backgroundColor: scrolled || mobileOpen ? "rgba(26,26,26,1)" : "rgba(26,26,26,0)" }
            : { backgroundColor: "rgba(255,255,255,1)", boxShadow: "0 1px 0 rgba(26,26,26,0.08)" }
        }
        transition={{ duration: 0.4 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
          <Link
            to="/"
            className="font-serif text-[22px] tracking-wide text-copper md:text-[26px]"
          >
            AAURA REALTY
          </Link>

          {/* Desktop nav */}
          <nav className={`hidden items-center gap-10 text-sm md:flex ${isHome ? "text-white/90" : "text-ink/70"}`}>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`transition-colors hover:text-copper ${
                  location.pathname === l.to ? "text-copper" : ""
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="hidden rounded-full bg-copper px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-white md:inline-block"
              >
                Enquire Now
              </Link>
            </motion.div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className={`grid h-10 w-10 place-items-center md:hidden ${isHome ? "text-white" : "text-ink"}`}
            >
              <span className="flex flex-col gap-1.5">
                <span className={`block h-px w-6 transition-all duration-300 ${isHome ? "bg-white" : "bg-ink"} ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                <span className={`block h-px w-6 transition-all duration-300 ${isHome ? "bg-white" : "bg-ink"} ${mobileOpen ? "opacity-0" : ""}`} />
                <span className={`block h-px w-6 transition-all duration-300 ${isHome ? "bg-white" : "bg-ink"} ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
          className={`overflow-hidden md:hidden ${isHome ? "bg-ink" : "bg-white border-t border-ink/8"}`}
        >
          <nav className="flex flex-col gap-1 px-6 pb-6 pt-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`py-3 text-base font-medium transition-colors hover:text-copper ${
                  location.pathname === l.to ? "text-copper" : isHome ? "text-white/90" : "text-ink/80"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="mt-4 inline-block rounded-full bg-copper px-5 py-3 text-center text-xs font-medium uppercase tracking-[0.18em] text-white"
            >
              Enquire Now
            </Link>
          </nav>
        </motion.div>
      </motion.header>
    </>
  );
}
