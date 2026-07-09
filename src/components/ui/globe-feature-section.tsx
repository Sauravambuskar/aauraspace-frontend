"use client";

import React from "react";
import { motion } from "motion/react";
import { MapPin, Building2, Users, Shield, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: MapPin,
    title: "6+ Prime Locations",
    description: "Kharadi, Baner, Hinjewadi, Wakad, Koregaon Park & Viman Nagar",
  },
  {
    icon: Building2,
    title: "500+ Properties",
    description: "Flats, shops, offices, plots — all verified and RERA compliant.",
  },
  {
    icon: Users,
    title: "320+ Happy Families",
    description: "Trusted by hundreds of families to find their perfect home.",
  },
  {
    icon: Shield,
    title: "100% Transparent",
    description: "No hidden charges, no vague promises. Complete documentation.",
  },
];

function AnimatedGlobe() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute h-[280px] w-[280px] rounded-full border border-copper/20 md:h-[360px] md:w-[360px]"
      />
      {/* Middle ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute h-[220px] w-[220px] rounded-full border border-copper/30 md:h-[280px] md:w-[280px]"
      />
      {/* Inner ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute h-[160px] w-[160px] rounded-full border border-dashed border-copper/20 md:h-[200px] md:w-[200px]"
      />

      {/* Center logo */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl shadow-copper/20 md:h-32 md:w-32"
      >
        <img src="/logo.png" alt="Aaura Realty" className="h-16 w-16 object-contain md:h-20 md:w-20" />
      </motion.div>

      {/* Floating location pins */}
      {[
        { label: "Kharadi", top: "5%", left: "60%", delay: 0 },
        { label: "Baner", top: "25%", left: "5%", delay: 0.5 },
        { label: "Hinjewadi", top: "70%", left: "10%", delay: 1 },
        { label: "Wakad", top: "85%", left: "55%", delay: 1.5 },
        { label: "KP", top: "45%", left: "85%", delay: 2 },
      ].map((loc) => (
        <motion.div
          key={loc.label}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: loc.delay, duration: 0.5, type: "spring" }}
          animate={{ y: [0, -5, 0] }}
          style={{ top: loc.top, left: loc.left }}
          className="absolute flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[9px] font-medium text-copper shadow-md"
        >
          <MapPin className="h-3 w-3" />
          {loc.label}
        </motion.div>
      ))}
    </div>
  );
}

export default function GlobeFeatureSection() {
  return (
    <section className="relative overflow-hidden bg-cream py-10 md:py-14">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent" />

      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — Features */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="eyebrow">Our Presence</div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl">
                Covering All of <span className="text-copper">Pune</span>
              </h2>
              <p className="mt-3 text-sm text-ink/60 md:text-base">
                From premium IT corridors to heritage neighborhoods — we've got every corner of Pune covered.
              </p>
            </motion.div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex gap-3 rounded-lg border border-copper/10 bg-white p-4"
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-copper/10">
                    <feature.icon className="h-4 w-4 text-copper" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-ink">{feature.title}</div>
                    <div className="mt-0.5 text-xs text-ink/55">{feature.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-6 flex items-center gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-copper px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white shadow-sm shadow-copper/20"
              >
                <Phone className="h-3.5 w-3.5" />
                Get in Touch
              </Link>
              <Link
                to="/neighbourhoods"
                className="inline-flex items-center gap-1 text-sm font-medium text-copper hover:text-ink transition-colors"
              >
                Explore Areas <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right — Animated Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <div className="relative h-[320px] w-[320px] md:h-[400px] md:w-[400px]">
              <AnimatedGlobe />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
