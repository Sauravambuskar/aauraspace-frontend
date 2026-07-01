/* ================================================================
   Centralized data for all Aaura Realty pages
   ================================================================ */

import img1 from "@/assets/drive/img1.png.asset.json";
import img2 from "@/assets/drive/img2.png.asset.json";
import img3 from "@/assets/drive/img3.png.asset.json";
import img4 from "@/assets/drive/img4.png.asset.json";
import img5 from "@/assets/drive/img5.jpg.asset.json";
import img6 from "@/assets/drive/img6.jpg.asset.json";
import img7 from "@/assets/drive/img7.jpg.asset.json";
import img8 from "@/assets/drive/img8.jpg.asset.json";
import img9 from "@/assets/drive/img9.webp.asset.json";

const D = {
  img1: img1.url, img2: img2.url, img3: img3.url, img4: img4.url,
  img5: img5.url, img6: img6.url, img7: img7.url, img8: img8.url, img9: img9.url,
};

/* Drive images are ONLY used in the PROJECTS section below.
   All other sections use Unsplash placeholders. */
export const PROJECTS = [
  { title: "Aaura Project 01", location: "Kharadi, Pune",       img: D.img1 },
  { title: "Aaura Project 02", location: "Baner, Pune",         img: D.img2 },
  { title: "Aaura Project 03", location: "Hinjewadi, Pune",     img: D.img3 },
  { title: "Aaura Project 04", location: "Wakad, Pune",         img: D.img4 },
  { title: "Aaura Project 05", location: "Koregaon Park, Pune", img: D.img5 },
  { title: "Aaura Project 06", location: "Viman Nagar, Pune",   img: D.img6 },
  { title: "Aaura Project 07", location: "Balewadi, Pune",      img: D.img7 },
  { title: "Aaura Project 08", location: "Aundh, Pune",         img: D.img8 },
  { title: "Aaura Project 09", location: "Kalyani Nagar, Pune", img: D.img9 },
];

const U = (id: string) => `https://images.unsplash.com/${id}?w=1400&q=80&auto=format&fit=crop`;

export const HERO_SLIDES = [
  U("photo-1600585154340-be6161a56a0c"),
  U("photo-1613490493576-7fde63acd811"),
  U("photo-1512917774080-9991f1c4c750"),
];

export const SERVICES = [
  { name: "Flat",            desc: "Premium 1, 2, 3 & 4 BHK homes across Pune's finest neighborhoods.", img: U("photo-1560448204-e02f11c3d0e2") },
  { name: "Shop",            desc: "High-footfall retail spaces in prime commercial corridors.",       img: U("photo-1555529669-e69e7aa0ba9a") },
  { name: "Office",          desc: "Grade-A office spaces, fitted or shell, for every team size.",     img: U("photo-1497366216548-37526070297c") },
  { name: "Plot",            desc: "NA & RERA-approved residential and commercial plots.",             img: U("photo-1500382017468-9049fed747ef") },
  { name: "Resale & Rental", desc: "Curated resale listings and verified rentals across the city.",    img: U("photo-1580587771525-78b9dba3b914") },
];

export const STATS = [
  { n: 500, suffix: "+", label: "Properties Listed" },
  { n: 320, suffix: "+", label: "Happy Families" },
  { n: 12, suffix: "+", label: "Years in Pune" },
  { n: 50, suffix: "+", label: "Builder Partners" },
];

export const GALLERY = [
  { title: "Skyline Residences", img: U("photo-1600585154340-be6161a56a0c") },
  { title: "Copper House",       img: U("photo-1613490493576-7fde63acd811") },
  { title: "Garden Heights",     img: U("photo-1512917774080-9991f1c4c750") },
  { title: "Baner Plaza",        img: U("photo-1560448204-e02f11c3d0e2") },
  { title: "Kharadi Greens",     img: U("photo-1567496898669-ee935f5f647a") },
  { title: "Wakad Towers",       img: U("photo-1502672260266-1c1ef2d93688") },
  { title: "Hinjewadi Court",    img: U("photo-1493809842364-78817add7ffb") },
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
    img: U("photo-1600585154340-be6161a56a0c"),
    desc: "Home to major IT campuses, Kharadi offers an ideal blend of professional proximity and residential comfort. Excellent connectivity via the Pune-Ahmednagar highway.",
    avgPrice: "₹ 75–95 Lakh",
    highlights: ["EON IT Park nearby", "Metro connectivity", "Schools & hospitals", "Active social scene"],
  },
  {
    name: "Baner",
    tag: "Premium Living",
    count: "85+ Homes",
    img: U("photo-1613490493576-7fde63acd811"),
    desc: "Upscale neighbourhood with leafy streets, premium restaurants, and Grade-A offices. A preferred destination for senior professionals seeking quality of life.",
    avgPrice: "₹ 90 Lakh–1.5 Cr",
    highlights: ["Premium dining & retail", "Proximity to Balewadi", "Wide roads", "Green cover"],
  },
  {
    name: "Hinjewadi",
    tag: "Tech Hub",
    count: "140+ Homes",
    img: U("photo-1512917774080-9991f1c4c750"),
    desc: "Pune's largest IT hub hosts over 300 companies. Rapid infrastructure development and affordable pricing make Hinjewadi the go-to for tech professionals.",
    avgPrice: "₹ 55–80 Lakh",
    highlights: ["IT Park Phases I–III", "Upcoming metro", "Affordable prices", "Growing infrastructure"],
  },
  {
    name: "Wakad",
    tag: "Family First",
    count: "70+ Homes",
    img: U("photo-1560448204-e02f11c3d0e2"),
    desc: "A family-friendly suburb with top schools, hospitals, and parks. Wakad's calm residential character and improving connectivity attract long-term buyers.",
    avgPrice: "₹ 50–70 Lakh",
    highlights: ["Reputed schools", "Community parks", "Kothrud proximity", "Growing social infra"],
  },
  {
    name: "Koregaon Park",
    tag: "Heritage Luxe",
    count: "40+ Homes",
    img: U("photo-1567496898669-ee935f5f647a"),
    desc: "Pune's most iconic address. Tree-lined avenues, colonial bungalows, and luxury apartments define this heritage zone that is both timeless and aspirational.",
    avgPrice: "₹ 1.5–3.5 Cr",
    highlights: ["Heritage bungalows", "Luxury apartments", "Fine dining & cafés", "Quiet prestige"],
  },
  {
    name: "Viman Nagar",
    tag: "Lifestyle",
    count: "60+ Homes",
    img: U("photo-1502672260266-1c1ef2d93688"),
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
    img: U("photo-1493809842364-78817add7ffb"),
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
    img: U("photo-1580587771525-78b9dba3b914"),
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
    img: U("photo-1580587771525-78b9dba3b914"),
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
    img: U("photo-1580587771525-78b9dba3b914"),
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
    img: U("photo-1493809842364-78817add7ffb"),
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
    img: U("photo-1493809842364-78817add7ffb"),
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
    img: U("photo-1555529669-e69e7aa0ba9a"),
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
    img: U("photo-1555529669-e69e7aa0ba9a"),
    status: "Ready to Occupy",
  },
  {
    id: 9,
    type: "Shop",
    title: "High Street Retail, Koregaon Park",
    price: "₹ 1.8 Cr onwards",
    area: "800 sq ft",
    location: "Koregaon Park, Pune",
    img: U("photo-1555529669-e69e7aa0ba9a"),
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
    img: U("photo-1497366216548-37526070297c"),
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
    img: U("photo-1497366216548-37526070297c"),
    status: "Under Construction",
  },
  {
    id: 12,
    type: "Office",
    title: "Managed Workspace, Kharadi",
    price: "₹ 65 Lakh onwards",
    area: "600 sq ft",
    location: "Kharadi, Pune",
    img: U("photo-1497366216548-37526070297c"),
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
    img: U("photo-1493809842364-78817add7ffb"),
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
    img: U("photo-1493809842364-78817add7ffb"),
    status: "RERA Approved",
  },
  {
    id: 15,
    type: "Plot",
    title: "Commercial Plot, Kharadi",
    price: "₹ 1.2 Cr onwards",
    area: "3,500 sq ft",
    location: "Kharadi, Pune",
    img: U("photo-1493809842364-78817add7ffb"),
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
    img: U("photo-1493809842364-78817add7ffb"),
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
    img: U("photo-1580587771525-78b9dba3b914"),
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
    img: U("photo-1580587771525-78b9dba3b914"),
    status: "Rental",
    beds: 1,
    baths: 1,
  },
];

export const TEAM = [
  {
    name: "Founder & CEO",
    role: "Leadership",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop",
    desc: "12+ years building Pune's most trusted real estate practice. Aaura's founding philosophy: every client deserves clarity, not just a transaction.",
  },
  {
    name: "Head of Client Relations",
    role: "Leadership",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&auto=format&fit=crop",
    desc: "Ensuring every family feels heard. Aaura's warmth and precision have made us synonymous with trust across Pune.",
  },
  {
    name: "Senior Property Consultant",
    role: "Advisory",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&auto=format&fit=crop",
    desc: "Specialising in commercial real estate — from retail spaces to Grade-A offices across Pune's business districts.",
  },
  {
    name: "Legal & Documentation Head",
    role: "Compliance",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80&auto=format&fit=crop",
    desc: "Navigating every RERA compliance, title check, and registration with meticulous care so you never face a surprise.",
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
