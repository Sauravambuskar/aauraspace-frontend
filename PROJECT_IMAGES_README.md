# Adding Project Images

## How to Add the Bramhacorp Project Images

The new **Projects** page has been created and is using temporary placeholder images. To use the actual project images from your photos:

### Step 1: Save the Images

Save the 4 project images you provided with these exact names in the `public` folder:

1. **august-towers.jpg** - The first image (August Towers with sunset sky)
2. **the-collection.jpg** - The second image (The Collection with sky pool)
3. **business-park.jpg** - The third image (Business Park buildings)
4. **sun-valley.jpg** - The fourth image (Sun Valley Bavdhan)

### Step 2: Update the Code

Open `src/pages/Projects.tsx` and update the `PROJECTS` array to use the new image paths:

```typescript
const PROJECTS = [
  {
    id: "august-towers",
    name: "August Towers",
    developer: "Bramhacorp",
    location: "New Kalyani Nagar",
    tagline: "Launching New Tower",
    cta: "Contact for Best Deal",
    type: "Residential",
    image: "/august-towers.jpg", // ← Change this
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
    image: "/the-collection.jpg", // ← Change this
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
    image: "/business-park.jpg", // ← Change this
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
    image: "/sun-valley.jpg", // ← Change this
    phone: ["+91 9881900009", "+91 9172355369"],
  },
];
```

### Step 3: Test

Run your development server and visit `/projects` to see the new page with your images.

## What's Been Added

✅ New "Projects" page at `/projects`
✅ Navigation link added to the Navbar
✅ Responsive design matching your existing website
✅ Beautiful animations and hover effects
✅ Click-to-call phone buttons
✅ Contact information displayed
✅ All 4 Bramhacorp projects included:
   - August Towers (New Kalyani Nagar)
   - The Collection (New Kalyani Nagar)
   - Business Park (New Kalyani Nagar)
   - Sun Valley (Bavdhan)

## Current Status

The page is **fully functional** and using temporary placeholder images from your existing public folder. Once you add the actual project images, the page will display them perfectly.

## Need Help?

If you need to customize anything (colors, text, layout, etc.), just let me know!
