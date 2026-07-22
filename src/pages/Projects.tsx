import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLenisSmoothScroll } from "@/components/shared";

/* ================================================================
   PROJECT DATA
   ================================================================ */

const PROJECTS = [
  {
    id: "august-towers",
    name: "August Towers",
    developer: "Bramhacorp",
    location: "New Kalyani Nagar",
    tagline: "Launching New Tower",
    cta: "Contact for Best Deal",
    type: "Residential",
    image: "/august-towers.jpg",
    phone: ["+91 9881900009", "+91 9172355369"],
  },
  {
    id: "the-collection",
    name: "The Collection",
    developer: "Bramhacorp",
    location: "New Kalyani Nagar",
    tagline: "Available 2BHK, 3BHK, 3.5 BHK, 4BHK",
    cta: "Contact for Best Deal",
    type: "Luxury Residential",
    image: "/the-collection.jpg",
    phone: ["+91 9881900009", "+91 9172355369"],
    features: ["Sky Pool", "Premium Amenities", "Luxury Living"],
  },
  {
    id: "business-park",
    name: "Business Park",
    developer: "Bramhacorp",
    location: "New Kalyani Nagar",
    tagline: "Built to Suite",
    cta: "Offices Available - Contact for Best Deal",
    type: "Commercial",
    image: "/business-park.jpg",
    phone: ["+91 9881900009", "+91 9172355369"],
  },
  {
    id: "sun-valley",
    name: "Sun Valley",
    developer: "Bramhacorp",
    location: "Bavdhan",
    tagline: "Luxury Unplugged",
    cta: "Available 2, 3, 3.5 & 4.5 BHK",
    type: "Residential",
    image: "/sun-valley.jpg",
    phone: ["+91 9881900009", "+91 9172355369"],
  },
];

/* ================================================================
   TYPOGRAPHY ANIMATIONS
   ================================================================ */

function WordMask({
  children,
  className,
  delay = 0,
  stagger = 0.1,
}: {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = children.split(" ");
  return (
    <span className={className} aria-label={children}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.08em" }}
        >
          <motion.span
            initial={{ y: "115%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: delay + i * stagger,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: "inline-block", willChange: "transform, opacity" }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}

function EyebrowAnim({
  children,
  delay = 0,
  dark = false,
}: {
  children: React.ReactNode;
  delay?: number;
  dark?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, letterSpacing: "0.04em" }}
      whileInView={{ opacity: 1, letterSpacing: "0.22em" }}
      viewport={{ once: true }}
      transition={{ delay, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`eyebrow ${dark ? "!text-white/60" : ""}`}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================
   HERO SECTION
   ================================================================ */

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: heroRef, 
    offset: ["start start", "end start"] 
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  return (
    <section 
      ref={heroRef} 
      className="relative h-[80vh] w-full overflow-hidden bg-white"
    >
      <motion.div 
        className="absolute inset-0"
        style={{ scale: imgScale }}
      >
        <img
          src="/the-collection.jpg"
          alt="Bramhacorp Projects"
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-white via-white/60 to-transparent" />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="absolute inset-x-0 bottom-0 px-5 pb-16 md:px-14 md:pb-28"
      >
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.03em" }}
            animate={{ opacity: 1, letterSpacing: "0.22em" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow mb-4 !text-copper"
          >
            Bramhacorp Projects
          </motion.div>

          <h1 className="display-xl text-ink leading-[0.95]">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              Premium Living
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              Spaces.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-6 max-w-xl text-base text-ink/60 md:text-lg"
          >
            Discover exceptional residential and commercial projects by Bramhacorp 
            in Pune's most coveted locations.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}

/* ================================================================
   PROJECT CARD
   ================================================================ */

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ 
        delay: index * 0.15, 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="group relative overflow-hidden rounded-lg bg-white shadow-md border border-copper/15"
    >
      {/* Image */}
      <div className="relative h-[400px] overflow-hidden md:h-[500px]">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          src={project.image}
          alt={project.name}
          className="h-full w-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
        
        {/* Type Badge */}
        <span className="absolute left-6 top-6 rounded-full border border-copper/40 bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-copper backdrop-blur-sm">
          {project.type}
        </span>

        {/* Main Content */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          {/* Developer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-2 flex items-center gap-3"
          >
            <img 
              src="/logo.png" 
              alt="Aaura Realty" 
              className="h-8 w-auto rounded bg-white/95 px-2 py-1"
            />
            <span className="text-xs uppercase tracking-[0.2em] text-white/60">
              {project.developer}
            </span>
          </motion.div>

          {/* Project Name */}
          <h3 className="font-serif text-4xl text-white md:text-5xl">
            {project.name}
          </h3>

          {/* Location */}
          <p className="mt-2 text-sm text-white/70 md:text-base">
            📍 {project.location}
          </p>

          {/* Tagline */}
          <p className="mt-3 text-base font-medium text-copper md:text-lg">
            {project.tagline}
          </p>

          {/* Features (if available) */}
          {project.features && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.features.map((feature, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}

          {/* CTA Text */}
          <p className="mt-4 text-sm font-medium uppercase tracking-wide text-white">
            {project.cta}
          </p>

          {/* Phone Numbers */}
          <div className="mt-4 flex flex-wrap gap-3">
            {project.phone.map((phone, i) => (
              <motion.a
                key={i}
                href={`tel:${phone}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-full border border-copper bg-copper/10 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-copper hover:text-white"
              >
                <svg 
                  className="h-4 w-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                  />
                </svg>
                {phone}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================
   PROJECTS GRID
   ================================================================ */

function ProjectsGrid() {
  return (
    <section className="bg-white px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 md:mb-12">
          <EyebrowAnim delay={0}>Featured Developments</EyebrowAnim>
          <h2 className="display-lg mt-4 text-ink">
            <WordMask delay={0.1}>Our Projects.</WordMask>
          </h2>
          {/* Golden diamond divider */}
          <div className="mt-5 flex items-center gap-3">
            <span className="h-px w-12 bg-copper/60" />
            <span className="h-1.5 w-1.5 rotate-45 bg-copper" />
            <span className="h-px w-12 bg-copper/60" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-12 text-center"
        >
          <p className="mb-5 text-lg text-ink/70">
            Interested in any of these projects?
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-copper px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-white shadow-lg shadow-copper/20 hover:shadow-copper/40 transition-shadow"
            >
              Schedule Site Visit
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                aria-hidden
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   MAIN COMPONENT
   ================================================================ */

export default function Projects() {
  useLenisSmoothScroll();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ProjectsGrid />
      </main>
      <Footer />
    </div>
  );
}
