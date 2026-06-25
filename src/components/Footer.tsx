import { Link } from "react-router-dom";
import { Reveal } from "./shared";
import { SERVICES } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-copper/40 bg-ink text-white">
      <div className="mx-auto max-w-[1400px] px-6 pt-20 pb-10 md:px-10">
        <Reveal className="text-center">
          <h2 className="font-serif text-[64px] leading-none text-copper md:text-[140px]">
            AAURA REALTY
          </h2>
          <p className="mt-4 font-serif text-xl italic text-white/80 md:text-2xl">
            Our Passion. Your Aaura.
          </p>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-12 border-t border-white/10 pt-14 md:grid-cols-4">
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
              {SERVICES.map((s) => (
                <li key={s.name}>
                  <Link to={`/properties?type=${encodeURIComponent(s.name)}`} className="hover:text-copper transition">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-5">Neighbourhoods</div>
            <ul className="space-y-3 text-sm text-white/80">
              {["Kharadi", "Baner", "Hinjewadi", "Wakad", "Koregaon Park", "Viman Nagar"].map((n) => (
                <li key={n}>
                  <Link to="/neighbourhoods" className="hover:text-copper transition">{n}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-5">Contact</div>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <a href="tel:+919172355369" className="hover:text-copper transition">
                  +91 9172355369
                </a>
              </li>
              <li>
                <a href="tel:+919156945369" className="hover:text-copper transition">
                  +91 9156945369
                </a>
              </li>
              <li>
                <a href="mailto:aaurareality19@gmail.com" className="hover:text-copper transition">
                  aaurareality19@gmail.com
                </a>
              </li>
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
