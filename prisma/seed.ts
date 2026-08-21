import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SEED_PRODUCTS = [
  { slug: "samsung-galaxy-a05", name: "Samsung Galaxy A05", cat: "New phones", price: 14500, tag: "New", note: '6.7" display, 5000mAh, sealed box', image: "/products/new-phones.jpg", installments: true },
  { slug: "redmi-13c", name: "Redmi 13C", cat: "New phones", price: 13900, tag: "New", note: "Dual SIM, 128GB storage", image: "/products/new-phones.jpg", installments: true },
  { slug: "tecno-spark-20", name: "Tecno Spark 20", cat: "New phones", price: 15200, tag: "New", note: "Popular pick for students", image: "/products/new-phones.jpg", installments: true },
  { slug: "iphone-11-64gb", name: "iPhone 11 · 64GB", cat: "Refurbished", price: 32000, tag: "Refurb", note: "Battery health 88%+, tested", image: "/products/refurbished.jpg", installments: true },
  { slug: "samsung-s21-128gb", name: "Samsung S21 · 128GB", cat: "Refurbished", price: 38000, tag: "Refurb", note: "Grade A, 30-day cover", image: "/products/refurbished.jpg", installments: true },
  { slug: "oraimo-20-000mah-power-bank", name: "Oraimo 20,000mAh power bank", cat: "Power banks", price: 3200, tag: "Best seller", note: "22.5W fast charge, dual output", image: "/products/power-banks.jpg", installments: false },
  { slug: "anker-10-000mah-power-bank", name: "Anker 10,000mAh power bank", cat: "Power banks", price: 2900, tag: "In stock", note: "Slim, USB-C in/out", image: "/products/power-banks.jpg", installments: false },
  { slug: "oraimo-33w-gan-charger", name: "Oraimo 33W GaN charger", cat: "Chargers & cables", price: 1800, tag: "In stock", note: "Fast charge for Android and iPhone", image: "/products/chargers-cables.jpg", installments: false },
  { slug: "braided-usb-c-cable-1m", name: "Braided USB-C cable · 1m", cat: "Chargers & cables", price: 450, tag: "In stock", note: "60W rated, tangle-free", image: "/products/chargers-cables.jpg", installments: false },
  { slug: "lightning-cable-1m", name: "Lightning cable · 1m", cat: "Chargers & cables", price: 550, tag: "In stock", note: "Certified chip, fast charge", image: "/products/chargers-cables.jpg", installments: false },
  { slug: "clear-silicone-case", name: "Clear silicone case", cat: "Cases & protectors", price: 400, tag: "Any model", note: "Raised camera lip, non-yellowing", image: "/products/cases-protectors.jpg", installments: false },
  { slug: "tempered-glass-protector", name: "Tempered glass protector", cat: "Cases & protectors", price: 350, tag: "Fitted free", note: "9H, fitted while you wait", image: "/products/cases-protectors.jpg", installments: false },
  { slug: "oraimo-freepods-3", name: "Oraimo FreePods 3", cat: "Earbuds", price: 2600, tag: "Best seller", note: "ENC calls, 30hr with case", image: "/products/earbuds.jpg", installments: false },
  { slug: "wired-earphones-3-5mm", name: "Wired earphones · 3.5mm", cat: "Earbuds", price: 300, tag: "In stock", note: "In-line mic, tangle-free", image: "/products/earbuds.jpg", installments: false },
  { slug: "sandisk-64gb-memory-card", name: "SanDisk 64GB memory card", cat: "Memory cards", price: 950, tag: "In stock", note: "Class 10, sealed", image: "/products/memory-cards.jpg", installments: false },
  { slug: "sandisk-128gb-memory-card", name: "SanDisk 128GB memory card", cat: "Memory cards", price: 1650, tag: "In stock", note: "Class 10, sealed", image: "/products/memory-cards.jpg", installments: false },
  { slug: "oraimo-watch-3", name: "Oraimo Watch 3", cat: "Smartwatches", price: 3400, tag: "New", note: "Calls, SpO2, 7-day battery", image: "/products/smartwatches.jpg", installments: false },
  { slug: "starter-bundle", name: "Starter bundle", cat: "Bundles", price: 1000, tag: "Save 15%", note: "Case + tempered glass + cable", image: "/products/chargers-cables.jpg", installments: false },
];

const SEED_REPAIRS = [
  { name: "Screen replacement", covers: "Cracked glass, dead touch, lines or black display", price: 2800, eta: "45–90 min", image: "/repairs/screen-replacement.jpg" },
  { name: "Battery replacement", covers: "Fast drain, sudden shutdowns, swollen battery", price: 1800, eta: "30–60 min", image: "/repairs/battery-charging.jpg" },
  { name: "Charging port", covers: "Loose cable, slow or no charging, port cleaning", price: 1500, eta: "45 min", image: "/repairs/charging-port.jpg" },
  { name: "Water damage treatment", covers: "Ultrasonic board clean, drying, corrosion removal", price: 4500, eta: "24–48 hrs", image: "/repairs/water-damage.jpg" },
  { name: "Back glass & housing", covers: "Shattered rear glass, bent frame, button repair", price: 2200, eta: "2–4 hrs", image: "/repairs/back-glass.jpg" },
  { name: "Camera repair", covers: "Blurry or shaking lens, front camera, flash", price: 2500, eta: "1–2 hrs", image: "/repairs/camera-repair.jpg" },
  { name: "Software & unlocking", covers: "Flashing, boot loops, network and carrier unlock", price: 1200, eta: "1–3 hrs", image: "/repairs/software-unlock.jpg" },
  { name: "Data recovery", covers: "Photos and contacts off dead or damaged phones", price: 3500, eta: "24–72 hrs", image: "/repairs/data-recovery.jpg" },
  { name: "Motherboard / micro-soldering", covers: "No power, no network, IC and track-level faults", price: 5000, eta: "2–5 days", image: "/repairs/motherboard.jpg" },
  { name: "Tablet repairs", covers: "iPad and Android tablet screens, batteries, ports", price: 3500, eta: "1–2 days", image: "/repairs/tablet-repair.jpg" },
  { name: "Laptop repairs", covers: "Screens, keyboards, hinges, fans and upgrades", price: 4000, eta: "1–3 days", image: "/repairs/laptop-repair.jpg" },
];

async function main() {
  for (const p of SEED_PRODUCTS) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }
  console.log(`Seeded ${SEED_PRODUCTS.length} products.`);

  for (const r of SEED_REPAIRS) {
    await prisma.repairService.upsert({
      where: { name: r.name },
      update: {},
      create: r,
    });
  }
  console.log(`Seeded ${SEED_REPAIRS.length} repair services.`);

  await prisma.setting.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      phoneDisplay: "0720 668 668",
      phoneTel: "+254720668668",
      whatsapp: "254720668668",
      email: "bernardmacharia2013@gmail.com",
      addressLine: "Old Mutual Building, Kimathi Street",
      addressDetail: "Room 420, 4th floor",
      hours: "Mon–Fri 8:30am–6:30pm · Sat 9:00am–5:00pm",
    },
  });
  console.log("Seeded settings.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
