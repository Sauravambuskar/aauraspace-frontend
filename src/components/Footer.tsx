import { Link } from "react-router-dom";
import { Reveal } from "./shared";
import { SERVICES } from "@/lib/data";

const LOGO_URL = "/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-copper/20 bg-white text-ink">
      <div className="mx-auto max-w-[1400px] px-5 pt-12 pb-8 md:px-10 md:pt-16">
        <Reveal className="text-center">
          <img
            src={LOGO_URL}
            alt="Aaura Realty"
            className="mx-auto mb-6 h-16 w-auto md:h-20"
          />
          <p className="font-serif text-lg italic text-ink/50 md:text-xl">
            Our Passion. Your Aaura.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-8 border-t border-copper/10 pt-10 md:mt-14 md:grid-cols-4 md:gap-12 md:pt-12">
          <div>
            <div className="eyebrow mb-5">Quick Links</div>
            <ul className="space-y-3 text-sm text-ink/60">
              <li><Link to="/properties" className="hover:text-copper transition">Properties</Link></li>
              <li><Link to="/projects" className="hover:text-copper transition">Projects</Link></li>
              <li><Link to="/about" className="hover:text-copper transition">About Us</Link></li>
              <li><Link to="/neighbourhoods" className="hover:text-copper transition">Neighbourhoods</Link></li>
              <li><Link to="/contact" className="hover:text-copper transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-5">Services</div>
            <ul className="space-y-3 text-sm text-ink/60">
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
            <ul className="space-y-3 text-sm text-ink/60">
              {["Kharadi", "Baner", "Hinjewadi", "Wakad", "Koregaon Park", "Viman Nagar"].map((n) => (
                <li key={n}>
                  <Link to="/neighbourhoods" className="hover:text-copper transition">{n}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-5">Contact</div>
            <ul className="space-y-3 text-sm text-ink/60">
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
              <li className="pt-2 text-ink/40">Pune, Maharashtra</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-copper/10 pt-6 text-xs text-ink/40 md:mt-14 md:flex-row md:justify-between md:pt-8">
          <p>© {new Date().getFullYear()} Aaura Realty. All rights reserved.</p>
          <p>RERA registered. Disclaimer: All information is for representational purposes only.</p>
        </div>
      </div>
    </footer>
  );
}
