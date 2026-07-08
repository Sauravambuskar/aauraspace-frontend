import { Link } from "react-router-dom";
import { Reveal } from "./shared";
import { SERVICES } from "@/lib/data";

const LOGO_URL = "/logo.png";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      {/* Golden top border */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-copper to-transparent" />

      <div className="mx-auto max-w-[1400px] px-5 pt-10 pb-6 md:px-10 md:pt-14">
        {/* Logo + Tagline */}
        <Reveal className="text-center">
          <img
            src={LOGO_URL}
            alt="Aaura Realty"
            className="mx-auto mb-4 h-14 w-auto md:h-16"
          />
          {/* Gold diamond divider */}
          <div className="flex items-center justify-center gap-3 py-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-copper/60" />
            <span className="h-2 w-2 rotate-45 bg-copper" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-copper/60" />
          </div>
        </Reveal>

        {/* Links Grid */}
        <div className="mt-8 grid grid-cols-2 gap-6 border-t border-copper/15 pt-8 md:grid-cols-4 md:gap-10">
          <div>
            <div className="eyebrow mb-4 !text-copper">Quick Links</div>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li><Link to="/" className="hover:text-copper transition">Home</Link></li>
              <li><Link to="/properties" className="hover:text-copper transition">Properties</Link></li>
              <li><Link to="/projects" className="hover:text-copper transition">Projects</Link></li>
              <li><Link to="/about" className="hover:text-copper transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-copper transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-4 !text-copper">Services</div>
            <ul className="space-y-2.5 text-sm text-white/60">
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
            <div className="eyebrow mb-4 !text-copper">Neighbourhoods</div>
            <ul className="space-y-2.5 text-sm text-white/60">
              {["Kharadi", "Baner", "Hinjewadi", "Wakad", "Koregaon Park", "Viman Nagar"].map((n) => (
                <li key={n}>
                  <Link to="/neighbourhoods" className="hover:text-copper transition">{n}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-4 !text-copper">Contact</div>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>
                <a href="tel:+919172355369" className="hover:text-copper transition">+91 9172355369</a>
              </li>
              <li>
                <a href="tel:+919156945369" className="hover:text-copper transition">+91 9156945369</a>
              </li>
              <li>
                <a href="mailto:aaurareality19@gmail.com" className="hover:text-copper transition">aaurareality19@gmail.com</a>
              </li>
              <li className="pt-2 text-white/40">Pune, Maharashtra</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col gap-2 border-t border-copper/15 pt-5 text-xs text-white/40 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Aaura Realty. All rights reserved.</p>
          <p>RERA registered. All information is for representational purposes only.</p>
        </div>
      </div>
    </footer>
  );
}
