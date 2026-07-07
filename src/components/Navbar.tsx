import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const LOGO_URL = "/logo.png";

const NAV_LINKS = [
  { label: "Properties", to: "/properties", num: "01" },
  { label: "Projects", to: "/projects", num: "02" },
  { label: "About", to: "/about", num: "03" },
  { label: "Neighbourhoods", to: "/neighbourhoods", num: "04" },
  { label: "Contact", to: "/contact", num: "05" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menu + scroll to top on route change */
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  /* Lock body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const barColor = isHome ? "bg-white" : "bg-ink";

  return (
    <>
      {/* ── HEADER BAR ── */}
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
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-10 md:py-5">
          <Link to="/" onClick={() => setMobileOpen(false)} className="flex-shrink-0">
            <img
              src={LOGO_URL}
              alt="Aaura Realty"
              className={`h-10 w-auto object-contain md:h-12 ${isHome ? "rounded-lg bg-white/95 px-2 py-1" : "rounded-md"}`}
            />
          </Link>

          {/* Desktop nav */}
          <nav className={`hidden items-center gap-8 text-sm font-medium md:flex lg:gap-10 ${isHome ? "text-white/90" : "text-ink/80"}`}>
            {NAV_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className={`transition-colors hover:text-copper ${location.pathname === l.to ? "text-copper" : ""}`}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Desktop CTA */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact" className="hidden rounded-full bg-copper px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-white md:inline-block">
                Enquire Now
              </Link>
            </motion.div>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7, backgroundColor: "#fff" } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`block h-[1.5px] w-6 rounded-full ${barColor} origin-center`}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className={`block h-[1.5px] w-6 rounded-full ${barColor}`}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7, backgroundColor: "#fff" } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`block h-[1.5px] w-6 rounded-full ${barColor} origin-center`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── FULL-SCREEN MOBILE MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[55] bg-ink/40 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in panel from right */}
            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed inset-y-0 right-0 z-[60] flex w-[85vw] max-w-sm flex-col bg-ink md:hidden"
            >
              {/* Top bar inside panel */}
              <div className="flex items-center justify-between px-7 py-6">
                <Link to="/" onClick={() => setMobileOpen(false)}>
                  <img
                    src={LOGO_URL}
                    alt="Aaura Realty"
                    className="h-9 w-auto object-contain rounded-lg bg-white/95 px-2 py-1"
                  />
                </Link>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white hover:border-copper hover:text-copper transition-colors">
                  ✕
                </button>
              </div>

              {/* Divider */}
              <div className="mx-7 h-px bg-white/10" />

              {/* Nav links with stagger */}
              <nav className="flex flex-col px-7 pt-8 gap-1 flex-1">
                {NAV_LINKS.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ delay: i * 0.07 + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-baseline justify-between border-b border-white/8 py-5"
                    >
                      <span className={`font-serif text-4xl transition-colors ${location.pathname === l.to ? "text-copper" : "text-white group-hover:text-copper"}`}>
                        {l.label}
                      </span>
                      <span className="text-xs uppercase tracking-[0.18em] text-white/30 group-hover:text-copper transition-colors">
                        {l.num}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="px-7 pb-10 pt-6"
              >
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full rounded-full bg-copper py-4 text-center text-xs font-medium uppercase tracking-[0.22em] text-white"
                >
                  Enquire Now →
                </Link>

                {/* Quick contact */}
                <div className="mt-6 space-y-2 text-center text-xs text-white/40">
                  <a href="tel:+919172355369" className="block hover:text-copper transition-colors">+91 9172355369</a>
                  <a href="mailto:aaurareality19@gmail.com" className="block hover:text-copper transition-colors">aaurareality19@gmail.com</a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
