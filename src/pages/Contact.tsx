import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLenisSmoothScroll, Reveal, PageHero } from "@/components/shared";

const FormSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(7, "Enter a valid phone"),
  email: z.string().email("Enter a valid email"),
  propertyType: z.enum(["Flat", "Shop", "Office", "Plot", "Resale & Rental"]),
  budget: z.string().min(1, "Please select a budget"),
  location: z.string().optional(),
  message: z.string().optional(),
});
type FormValues = z.infer<typeof FormSchema>;

function Toast({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="fixed right-6 top-24 z-[60] rounded-md border-l-4 border-copper bg-white px-6 py-4 text-sm text-ink shadow-2xl"
        >
          <div className="font-medium text-ink">Message received!</div>
          <div className="mt-1 text-ink/60">We'll call you shortly.</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================ CONTACT DETAIL TILES ============================ */

const CONTACT_ITEMS = [
  {
    label: "Call Us",
    lines: ["+91 9172355369", "+91 9156945369"],
    href: "tel:+919172355369",
    img: "/img4-op-329k9.jpg",
  },
  {
    label: "Email Us",
    lines: ["aaurareality19@gmail.com"],
    href: "mailto:aaurareality19@gmail.com",
    img: "/residential-DshD8vFh.jpg",
  },
  {
    label: "Find Us",
    lines: ["Pune, Maharashtra", "India"],
    href: null,
    img: "/img4-op-329k9.jpg",
  },
  {
    label: "Office Hours",
    lines: ["Mon—Sat: 10 AM — 7 PM", "Sun: By appointment"],
    href: null,
    img: "/img5-BjgfExbp.jpg",
  },
];

function ContactDetails() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {CONTACT_ITEMS.map((item) => (
        <motion.div
          key={item.label}
          whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }}
          transition={{ duration: 0.3 }}
          className="group relative overflow-hidden rounded-sm bg-white shadow-sm"
        >
          <div className="relative h-32 overflow-hidden">
            <img
              src={item.img}
              alt={item.label}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-ink/30" />
            <div className="absolute bottom-3 left-4 text-xs uppercase tracking-[0.22em] text-white/90 font-medium">
              {item.label}
            </div>
          </div>
          <div className="p-5">
            {item.lines.map((line) =>
              item.href ? (
                <a
                  key={line}
                  href={item.href}
                  className="mt-1 block font-serif text-lg text-ink transition-colors hover:text-copper"
                >
                  {line}
                </a>
              ) : (
                <div key={line} className="mt-1 font-serif text-lg text-ink">
                  {line}
                </div>
              )
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ============================ FORM ============================ */

function EnquiryForm({ onSuccess }: { onSuccess: () => void }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { propertyType: "Flat", budget: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      onSuccess();
      reset({ propertyType: "Flat", budget: "" });
    } catch {
      alert("Something went wrong. Please call +91 9172355369.");
    }
  };

  const fieldCls =
    "w-full border-0 border-b border-ink/20 bg-transparent py-3.5 text-ink text-sm placeholder-ink/35 outline-none focus:border-copper transition-colors";
  const selectCls = `${fieldCls} appearance-none bg-white pr-6`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <input {...register("name")} placeholder="Full Name *" className={fieldCls} />
          {errors.name && <p className="mt-1 text-xs text-copper">{errors.name.message}</p>}
        </div>
        <div>
          <input {...register("phone")} placeholder="Phone Number *" className={fieldCls} />
          {errors.phone && <p className="mt-1 text-xs text-copper">{errors.phone.message}</p>}
        </div>
      </div>
      <div>
        <input {...register("email")} placeholder="Email Address *" className={fieldCls} />
        {errors.email && <p className="mt-1 text-xs text-copper">{errors.email.message}</p>}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <select {...register("propertyType")} className={selectCls}>
            {["Flat", "Shop", "Office", "Plot", "Resale & Rental"].map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <select {...register("budget")} className={selectCls}>
            <option value="" disabled>Budget Range *</option>
            {["Under ₹ 50 Lakh", "₹ 50—75 Lakh", "₹ 75 Lakh—1 Cr", "₹ 1—1.5 Cr", "₹ 1.5—3 Cr", "₹ 3 Cr+"].map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {errors.budget && <p className="mt-1 text-xs text-copper">{errors.budget.message}</p>}
        </div>
      </div>
      <div>
        <input {...register("location")} placeholder="Preferred Neighbourhood (optional)" className={fieldCls} />
      </div>
      <div>
        <textarea {...register("message")} rows={3} placeholder="Tell us more (optional)" className={fieldCls} />
      </div>
      <motion.button
        whileHover={{ scale: 1.01, boxShadow: "0 0 30px rgba(184,115,51,0.4)" }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
        type="submit"
        className="w-full bg-copper py-4 text-xs font-medium uppercase tracking-[0.25em] text-white disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send Enquiry →"}
      </motion.button>
      <p className="text-xs text-ink/40">
        We respond within 2 hours on business days. Your data is kept confidential.
      </p>
    </form>
  );
}

/* ============================ FAQ ============================ */

const FAQS = [
  { q: "How quickly will I get a response?", a: "We personally respond to every enquiry within 2 hours on business days. For urgent needs, call us directly." },
  { q: "Do you charge a brokerage fee?", a: "Our standard brokerage is 1—2% of the transaction value, aligned with RERA norms. Completely transparent upfront." },
  { q: "Can you help with home loans?", a: "Yes. We have tie-ups with leading banks and NBFCs and can help you get pre-approved at competitive rates." },
  { q: "Do you handle legal documentation?", a: "Our in-house legal team handles title verification, RERA checks, and sale deed registration end-to-end." },
  { q: "Do you have off-market listings?", a: "Yes. Many of our best properties are never listed publicly. Share your requirements and we'll check our exclusive inventory." },
  { q: "Which areas of Pune do you cover?", a: "We cover all major localities including Kharadi, Baner, Hinjewadi, Wakad, Koregaon Park, Viman Nagar, and more." },
];

/* ============================ PAGE ============================ */

export default function Contact() {
  useLenisSmoothScroll();
  const [toast, setToast] = useState(false);

  function handleSuccess() {
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  }

  return (
    <main className="bg-cream text-ink">
      <Navbar />
      <Toast show={toast} />

      <PageHero
        eyebrow="Get In Touch"
        title="Let's Find Your Space."
        subtitle="Tell us what you're looking for and we'll personally curate the best options for you."
        img="/residential-DshD8vFh.jpg"
        breadcrumb={[{ label: "Contact" }]}
      />

      {/* Quick call strip */}
      <div className="bg-copper">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 py-5 md:flex-row md:px-10">
          <div className="font-serif text-lg font-bold text-white md:text-xl">Prefer to call? We're available Mon—Sat, 10 AM — 7 PM.</div>
          <div className="flex flex-wrap gap-3">
            <a href="tel:+919172355369" className="rounded-full border border-white/40 bg-white/15 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm hover:bg-white hover:text-copper transition-colors">
              +91 9172355369
            </a>
            <a href="tel:+919156945369" className="rounded-full border border-white/40 bg-white/15 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm hover:bg-white hover:text-copper transition-colors">
              +91 9156945369
            </a>
          </div>
        </div>
      </div>

      {/* Main section: white background */}
      <section className="bg-white px-5 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.5fr]">
            {/* Left */}
            <div>
              <Reveal>
                <div className="eyebrow mb-4">Contact Details</div>
                <h2 className="display-lg text-ink">Reach Us<br />Anytime.</h2>
                <p className="mt-6 text-sm text-ink/60 leading-relaxed">
                  We're a small, dedicated team and we answer every message personally. No chatbots,
                  no wait queues — just real people who know Pune real estate inside out.
                </p>
              </Reveal>
              <Reveal delay={0.1} className="mt-10">
                <ContactDetails />
              </Reveal>
              <Reveal delay={0.2} className="mt-8">
                <div className="eyebrow mb-3">Follow Us</div>
                <div className="flex gap-3">
                  {["Instagram", "Facebook", "YouTube"].map((s) => (
                    <a key={s} href="#" className="rounded-full border border-ink/20 px-4 py-2 text-xs uppercase tracking-[0.15em] text-ink/60 transition-colors hover:border-copper hover:text-copper">
                      {s}
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right: form on white card */}
            <Reveal delay={0.15}>
              <div className="rounded-sm border border-ink/8 bg-cream p-8 shadow-lg md:p-10">
                <div className="eyebrow mb-3">Enquiry Form</div>
                <h3 className="mb-8 font-serif text-3xl text-ink">Tell Us What You Need.</h3>
                <EnquiryForm onSuccess={handleSuccess} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Image strip — 3 column property imagery */}
      <section className="grid grid-cols-3 gap-1 h-[320px] md:h-[420px]">
        {[
          "/img4-op-329k9.jpg",
          "/img4-op-329k9.jpg",
          "/img4-op-329k9.jpg",
        ].map((src, i) => (
          <div key={i} className="relative overflow-hidden">
            <img src={src} alt="Pune property" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
            <div className="absolute inset-0 bg-ink/20" />
          </div>
        ))}
      </section>

      {/* Map */}
      <section className="bg-white px-6 py-8 md:px-10 md:py-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="relative h-[380px] overflow-hidden rounded-sm">
              <img
                src="/img4-op-329k9.jpg"
                alt="Pune, Maharashtra"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-ink/45" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
                <div className="rounded-sm bg-white px-8 py-4 shadow-xl">
                  <div className="eyebrow mb-1">Our Base</div>
                  <div className="font-serif text-2xl text-ink">Pune, Maharashtra</div>
                </div>
                <a
                  href="https://maps.google.com?q=Pune,Maharashtra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-copper px-6 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-white hover:opacity-90 transition-opacity"
                >
                  Open in Maps →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ on cream */}
      <section className="bg-cream px-5 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="mb-12">
            <div className="eyebrow mb-4">FAQs</div>
            <h2 className="display-lg text-ink">Common Questions.</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {FAQS.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.05} className="rounded-sm bg-white p-7 shadow-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-copper mb-3">Q.</div>
                <h4 className="font-serif text-xl text-ink">{faq.q}</h4>
                <p className="mt-3 text-sm text-ink/60 leading-relaxed">{faq.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
