/* ================================================================
   Centralized data for all Aaura Realty pages
   ================================================================ */

export const HERO_SLIDES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=2000&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=2000&q=80&auto=format&fit=crop",
];

export const SERVICES = [
  { name: "Flat", desc: "Premium 1, 2, 3 & 4 BHK homes across Pune's finest neighborhoods.", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=80&auto=format&fit=crop" },
  { name: "Shop", desc: "High-footfall retail spaces in prime commercial corridors.", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=80&auto=format&fit=crop" },
  { name: "Office", desc: "Grade-A office spaces, fitted or shell, for every team size.", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80&auto=format&fit=crop" },
  { name: "Plot", desc: "NA & RERA-approved residential and commercial plots.", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80&auto=format&fit=crop" },
  { name: "Resale & Rental", desc: "Curated resale listings and verified rentals across the city.", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=80&auto=format&fit=crop" },
];

export const STATS = [
  { n: 500, suffix: "+", label: "Properties Listed" },
  { n: 320, suffix: "+", label: "Happy Families" },
  { n: 12, suffix: "+", label: "Years in Pune" },
  { n: 50, suffix: "+", label: "Builder Partners" },
];

export const GALLERY = [
  { title: "Skyline Residences", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&auto=format&fit=crop" },
  { title: "Copper House", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80&auto=format&fit=crop" },
  { title: "Garden Heights", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80&auto=format&fit=crop" },
  { title: "Baner Plaza", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80&auto=format&fit=crop" },
  { title: "Kharadi Greens", img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&q=80&auto=format&fit=crop" },
  { title: "Wakad Towers", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&auto=format&fit=crop" },
  { title: "Hinjewadi Court", img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80&auto=format&fit=crop" },
];

export const TESTIMONIALS = [
  { q: "Aaura made buying our first home in Pune effortless. Honest, calm, and always one step ahead.", name: "Rohit & Sneha Patil", role: "3 BHK · Kharadi" },
  { q: "They didn't just sell us a shop — they helped us understand the locality, the footfall, the future.", name: "Anjali Mehta", role: "Retail · Baner" },
  { q: "The most transparent broker we've worked with in fifteen years. Aaura is family now.", name: "Vivek Joshi", role: "Office · Hinjewadi" },
  { q: "Found the perfect 2 BHK in Wakad within two weeks. The team's knowledge is unmatched.", name: "Priya & Sameer Kulkarni", role: "2 BHK · Wakad" },
  { q: "Aaura handled our office relocation seamlessly. Professional from day one.", name: "Deepak Sharma", role: "Office · Baner" },
];

export const NEIGHBOURHOODS = [
  {
    name: "Kharadi",
    tag: "IT Corridor",
    count: "120+ Homes",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80&auto=format&fit=crop",
    desc: "Home to major IT campuses, Kharadi offers an ideal blend of professional proximity and residential comfort. Excellent connectivity via the Pune-Ahmednagar highway.",
    avgPrice: "₹ 75–95 Lakh",
    highlights: ["EON IT Park nearby", "Metro connectivity", "Schools & hospitals", "Active social scene"],
  },
  {
    name: "Baner",
    tag: "Premium Living",
    count: "85+ Homes",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80&auto=format&fit=crop",
    desc: "Upscale neighbourhood with leafy streets, premium restaurants, and Grade-A offices. A preferred destination for senior professionals seeking quality of life.",
    avgPrice: "₹ 90 Lakh–1.5 Cr",
    highlights: ["Premium dining & retail", "Proximity to Balewadi", "Wide roads", "Green cover"],
  },
  {
    name: "Hinjewadi",
    tag: "Tech Hub",
    count: "140+ Homes",
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=80&auto=format&fit=crop",
    desc: "Pune's largest IT hub hosts over 300 companies. Rapid infrastructure development and affordable pricing make Hinjewadi the go-to for tech professionals.",
    avgPrice: "₹ 55–80 Lakh",
    highlights: ["IT Park Phases I–III", "Upcoming metro", "Affordable prices", "Growing infrastructure"],
  },
  {
    name: "Wakad",
    tag: "Family First",
    count: "70+ Homes",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80&auto=format&fit=crop",
    desc: "A family-friendly suburb with top schools, hospitals, and parks. Wakad's calm residential character and improving connectivity attract long-term buyers.",
    avgPrice: "₹ 50–70 Lakh",
    highlights: ["Reputed schools", "Community parks", "Kothrud proximity", "Growing social infra"],
  },
  {
    name: "Koregaon Park",
    tag: "Heritage Luxe",
    count: "40+ Homes",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1400&q=80&auto=format&fit=crop",
    desc: "Pune's most iconic address. Tree-lined avenues, colonial bungalows, and luxury apartments define this heritage zone that is both timeless and aspirational.",
    avgPrice: "₹ 1.5–3.5 Cr",
    highlights: ["Heritage bungalows", "Luxury apartments", "Fine dining & cafés", "Quiet prestige"],
  },
  {
    name: "Viman Nagar",
    tag: "Lifestyle",
    count: "60+ Homes",
    img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1400&q=80&auto=format&fit=crop",
    desc: "Minutes from Pune Airport, Viman Nagar is a cosmopolitan hub with malls, international schools, and a thriving expat community.",
    avgPrice: "₹ 70–1.1 Cr",
    highlights: ["Airport proximity", "Phoenix Marketcity", "International schools", "Strong rental demand"],
  },
];

export type PropertyType = "Flat" | "Shop" | "Office" | "Plot" | "Resale & Rental";

export interface Property {
  id: number;
  type: PropertyType;
  title: string;
  price: string;
  area: string;
  location: string;
  img: string;
  status: string;
  beds?: number;
  baths?: number;
  featured?: boolean;
}

export const ALL_PROPERTIES: Property[] = [
  // Flats
  {
    id: 1,
    type: "Flat",
    title: "3 BHK in Kharadi",
    price: "₹ 85 Lakh onwards",
    area: "1,450 sq ft",
    location: "Kharadi, Pune",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80&auto=format&fit=crop",
    status: "Ready to Move",
    beds: 3,
    baths: 2,
    featured: true,
  },
  {
    id: 2,
    type: "Flat",
    title: "2 BHK Premium in Baner",
    price: "₹ 68 Lakh onwards",
    area: "1,120 sq ft",
    location: "Baner, Pune",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80&auto=format&fit=crop",
    status: "Under Construction",
    beds: 2,
    baths: 2,
  },
  {
    id: 3,
    type: "Flat",
    title: "4 BHK Penthouse, Koregaon Park",
    price: "₹ 2.1 Cr onwards",
    area: "2,800 sq ft",
    location: "Koregaon Park, Pune",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80&auto=format&fit=crop",
    status: "Ready to Move",
    beds: 4,
    baths: 3,
    featured: true,
  },
  {
    id: 4,
    type: "Flat",
    title: "1 BHK Smart Home, Wakad",
    price: "₹ 42 Lakh onwards",
    area: "650 sq ft",
    location: "Wakad, Pune",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80&auto=format&fit=crop",
    status: "Under Construction",
    beds: 1,
    baths: 1,
  },
  {
    id: 5,
    type: "Flat",
    title: "3 BHK Sky Villa, Viman Nagar",
    price: "₹ 1.1 Cr onwards",
    area: "1,780 sq ft",
    location: "Viman Nagar, Pune",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80&auto=format&fit=crop",
    status: "Ready to Move",
    beds: 3,
    baths: 3,
  },
  {
    id: 6,
    type: "Flat",
    title: "2 BHK in Hinjewadi",
    price: "₹ 58 Lakh onwards",
    area: "1,050 sq ft",
    location: "Hinjewadi Phase 2, Pune",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80&auto=format&fit=crop",
    status: "Under Construction",
    beds: 2,
    baths: 2,
  },
  // Shops
  {
    id: 7,
    type: "Shop",
    title: "Retail Space, Baner Road",
    price: "₹ 95 Lakh onwards",
    area: "450 sq ft",
    location: "Baner Road, Pune",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80&auto=format&fit=crop",
    status: "Ready to Occupy",
    featured: true,
  },
  {
    id: 8,
    type: "Shop",
    title: "Corner Shop, Viman Nagar",
    price: "₹ 1.1 Cr onwards",
    area: "620 sq ft",
    location: "Viman Nagar, Pune",
    img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=80&auto=format&fit=crop",
    status: "Ready to Occupy",
  },
  {
    id: 9,
    type: "Shop",
    title: "High Street Retail, Koregaon Park",
    price: "₹ 1.8 Cr onwards",
    area: "800 sq ft",
    location: "Koregaon Park, Pune",
    img: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1600&q=80&auto=format&fit=crop",
    status: "Ready to Occupy",
  },
  // Offices
  {
    id: 10,
    type: "Office",
    title: "Premium Office, Baner",
    price: "₹ 1.2 Cr onwards",
    area: "1,200 sq ft",
    location: "Baner, Pune",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80&auto=format&fit=crop",
    status: "Ready to Move",
    featured: true,
  },
  {
    id: 11,
    type: "Office",
    title: "IT Park Office, Hinjewadi",
    price: "₹ 85 Lakh onwards",
    area: "900 sq ft",
    location: "Hinjewadi, Pune",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop",
    status: "Under Construction",
  },
  {
    id: 12,
    type: "Office",
    title: "Managed Workspace, Kharadi",
    price: "₹ 65 Lakh onwards",
    area: "600 sq ft",
    location: "Kharadi, Pune",
    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80&auto=format&fit=crop",
    status: "Ready to Move",
  },
  // Plots
  {
    id: 13,
    type: "Plot",
    title: "NA Plot, Hinjewadi",
    price: "₹ 45 Lakh onwards",
    area: "2,000 sq ft",
    location: "Hinjewadi, Pune",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80&auto=format&fit=crop",
    status: "RERA Approved",
    featured: true,
  },
  {
    id: 14,
    type: "Plot",
    title: "Residential Plot, Wakad",
    price: "₹ 65 Lakh onwards",
    area: "2,500 sq ft",
    location: "Wakad, Pune",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80&auto=format&fit=crop",
    status: "RERA Approved",
  },
  {
    id: 15,
    type: "Plot",
    title: "Commercial Plot, Kharadi",
    price: "₹ 1.2 Cr onwards",
    area: "3,500 sq ft",
    location: "Kharadi, Pune",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80&auto=format&fit=crop",
    status: "NA Approved",
  },
  // Resale & Rental
  {
    id: 16,
    type: "Resale & Rental",
    title: "2 BHK Resale, Kharadi",
    price: "₹ 72 Lakh",
    area: "1,050 sq ft",
    location: "Kharadi, Pune",
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80&auto=format&fit=crop",
    status: "Resale",
    beds: 2,
    baths: 2,
    featured: true,
  },
  {
    id: 17,
    type: "Resale & Rental",
    title: "3 BHK Furnished Rental, Baner",
    price: "₹ 35,000 / month",
    area: "1,380 sq ft",
    location: "Baner, Pune",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80&auto=format&fit=crop",
    status: "Rental",
    beds: 3,
    baths: 2,
  },
  {
    id: 18,
    type: "Resale & Rental",
    title: "1 BHK Rental, Viman Nagar",
    price: "₹ 18,000 / month",
    area: "620 sq ft",
    location: "Viman Nagar, Pune",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&q=80&auto=format&fit=crop",
    status: "Rental",
    beds: 1,
    baths: 1,
  },
];

export const TEAM = [
  {
    name: "Rajesh Ambuskar",
    role: "Founder & CEO",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop",
    desc: "12+ years building Pune's most trusted real estate practice. Rajesh's philosophy: every client deserves clarity, not just a transaction.",
  },
  {
    name: "Sunita Ambuskar",
    role: "Co-Founder & Head of Client Relations",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&auto=format&fit=crop",
    desc: "Sunita ensures every family feels heard. Her warmth and precision have made Aaura synonymous with trust across Pune.",
  },
  {
    name: "Arjun Desai",
    role: "Senior Property Consultant",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&auto=format&fit=crop",
    desc: "Arjun specializes in commercial real estate — from retail spaces to Grade-A offices across Pune's business districts.",
  },
  {
    name: "Pooja Shinde",
    role: "Legal & Documentation Head",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80&auto=format&fit=crop",
    desc: "Pooja navigates every RERA compliance, title check, and registration with meticulous care so you never face a surprise.",
  },
];

export const VALUES = [
  {
    icon: "◈",
    title: "Transparency First",
    desc: "No hidden charges, no vague promises. We walk you through every number, every clause, every step.",
  },
  {
    icon: "◉",
    title: "Deep Local Knowledge",
    desc: "Twelve years on Pune's ground. We know which lane floods in monsoon and which project will double in five years.",
  },
  {
    icon: "◇",
    title: "Your Timeline, Always",
    desc: "We close when you're ready, not when we need a target. Patience is our competitive advantage.",
  },
  {
    icon: "○",
    title: "End-to-End Support",
    desc: "From shortlisting to registration, home loans to interiors — one point of contact, zero loose ends.",
  },
];

export const MILESTONES = [
  { year: "2012", event: "Founded in Kharadi with 3 listings" },
  { year: "2015", event: "Expanded to commercial segment — offices & retail" },
  { year: "2018", event: "Crossed 100 happy families served" },
  { year: "2020", event: "Launched digital-first operations during pandemic" },
  { year: "2022", event: "Reached 300+ active listings across Pune" },
  { year: "2024", event: "500+ properties, 320 families served, 50 builder partners" },
];
