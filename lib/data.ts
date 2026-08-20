import type { Product, Repair, DeviceOption, IssueOption } from "./types";

export const PHONE_DISPLAY = "0720 668 668";
export const PHONE_TEL = "+254720668668";
export const WHATSAPP_NUMBER = "254720668668";

export const PRODUCTS: Product[] = [
  { id: "p1", name: "Samsung Galaxy A05", cat: "New phones", price: 14500, tag: "New", note: '6.7" display, 5000mAh, sealed box', image: "/products/new-phones.jpg", installments: true },
  { id: "p2", name: "Redmi 13C", cat: "New phones", price: 13900, tag: "New", note: "Dual SIM, 128GB storage", image: "/products/new-phones.jpg", installments: true },
  { id: "p3", name: "Tecno Spark 20", cat: "New phones", price: 15200, tag: "New", note: "Popular pick for students", image: "/products/new-phones.jpg", installments: true },
  { id: "p4", name: "iPhone 11 · 64GB", cat: "Refurbished", price: 32000, tag: "Refurb", note: "Battery health 88%+, tested", image: "/products/refurbished.jpg", installments: true },
  { id: "p5", name: "Samsung S21 · 128GB", cat: "Refurbished", price: 38000, tag: "Refurb", note: "Grade A, 30-day cover", image: "/products/refurbished.jpg", installments: true },
  { id: "p6", name: "Oraimo 20,000mAh power bank", cat: "Power banks", price: 3200, tag: "Best seller", note: "22.5W fast charge, dual output", image: "/products/power-banks.jpg" },
  { id: "p7", name: "Anker 10,000mAh power bank", cat: "Power banks", price: 2900, tag: "In stock", note: "Slim, USB-C in/out", image: "/products/power-banks.jpg" },
  { id: "p8", name: "Oraimo 33W GaN charger", cat: "Chargers & cables", price: 1800, tag: "In stock", note: "Fast charge for Android and iPhone", image: "/products/chargers-cables.jpg" },
  { id: "p9", name: "Braided USB-C cable · 1m", cat: "Chargers & cables", price: 450, tag: "In stock", note: "60W rated, tangle-free", image: "/products/chargers-cables.jpg" },
  { id: "p10", name: "Lightning cable · 1m", cat: "Chargers & cables", price: 550, tag: "In stock", note: "Certified chip, fast charge", image: "/products/chargers-cables.jpg" },
  { id: "p11", name: "Clear silicone case", cat: "Cases & protectors", price: 400, tag: "Any model", note: "Raised camera lip, non-yellowing", image: "/products/cases-protectors.jpg" },
  { id: "p12", name: "Tempered glass protector", cat: "Cases & protectors", price: 350, tag: "Fitted free", note: "9H, fitted while you wait", image: "/products/cases-protectors.jpg" },
  { id: "p13", name: "Oraimo FreePods 3", cat: "Earbuds", price: 2600, tag: "Best seller", note: "ENC calls, 30hr with case", image: "/products/earbuds.jpg" },
  { id: "p14", name: "Wired earphones · 3.5mm", cat: "Earbuds", price: 300, tag: "In stock", note: "In-line mic, tangle-free", image: "/products/earbuds.jpg" },
  { id: "p15", name: "SanDisk 64GB memory card", cat: "Memory cards", price: 950, tag: "In stock", note: "Class 10, sealed", image: "/products/memory-cards.jpg" },
  { id: "p16", name: "SanDisk 128GB memory card", cat: "Memory cards", price: 1650, tag: "In stock", note: "Class 10, sealed", image: "/products/memory-cards.jpg" },
  { id: "p17", name: "Oraimo Watch 3", cat: "Smartwatches", price: 3400, tag: "New", note: "Calls, SpO2, 7-day battery", image: "/products/smartwatches.jpg" },
  { id: "p18", name: "Starter bundle", cat: "Bundles", price: 1000, tag: "Save 15%", note: "Case + tempered glass + cable", image: "/products/chargers-cables.jpg" },
];

export const FEATURED_IDS = ["p6", "p4", "p8", "p13"];

export const REPAIRS: Repair[] = [
  { name: "Screen replacement", covers: "Cracked glass, dead touch, lines or black display", price: 2500, eta: "45–90 min", image: "/repairs/screen-replacement.jpg" },
  { name: "Battery replacement", covers: "Fast drain, sudden shutdowns, swollen battery", price: 1500, eta: "30–60 min", image: "/repairs/battery-charging.jpg" },
  { name: "Charging port", covers: "Loose cable, slow or no charging, port cleaning", price: 1200, eta: "45 min", image: "/repairs/charging-port.jpg" },
  { name: "Water damage treatment", covers: "Ultrasonic board clean, drying, corrosion removal", price: 2000, eta: "24–48 hrs", image: "/repairs/water-damage.jpg" },
  { name: "Back glass & housing", covers: "Shattered rear glass, bent frame, button repair", price: 1800, eta: "2–4 hrs", image: "/repairs/back-glass.jpg" },
  { name: "Camera repair", covers: "Blurry or shaking lens, front camera, flash", price: 2200, eta: "1–2 hrs", image: "/repairs/camera-repair.jpg" },
  { name: "Software & unlocking", covers: "Flashing, boot loops, network and carrier unlock", price: 1000, eta: "1–3 hrs", image: "/repairs/software-unlock.jpg" },
  { name: "Data recovery", covers: "Photos and contacts off dead or damaged phones", price: 2500, eta: "24–72 hrs", image: "/repairs/data-recovery.jpg" },
  { name: "Motherboard / micro-soldering", covers: "No power, no network, IC and track-level faults", price: 3500, eta: "2–5 days", image: "/repairs/motherboard.jpg" },
  { name: "Tablet repairs", covers: "iPad and Android tablet screens, batteries, ports", price: 2800, eta: "1–2 days", image: "/repairs/tablet-repair.jpg" },
  { name: "Laptop repairs", covers: "Screens, keyboards, hinges, fans and upgrades", price: 3000, eta: "1–3 days", image: "/repairs/laptop-repair.jpg" },
];

export const DEVICES: DeviceOption[] = [
  { id: "budget", label: "Android — everyday", ex: "Tecno, Infinix, Redmi, itel", mult: 1 },
  { id: "flagship", label: "Android — flagship", ex: "Samsung S/Note, Pixel, Huawei P", mult: 1.8 },
  { id: "iphone", label: "iPhone", ex: "iPhone 8 through 15 Pro Max", mult: 2.4 },
  { id: "tablet", label: "Tablet / iPad", ex: "iPad, Galaxy Tab, Lenovo", mult: 2 },
  { id: "laptop", label: "Laptop", ex: "HP, Dell, Lenovo, MacBook", mult: 2.2 },
  { id: "other", label: "Something else", ex: "Smartwatch, feature phone, console", mult: 1.4 },
];

export const ISSUES: IssueOption[] = [
  { id: "screen", label: "Cracked screen", base: 2500 },
  { id: "battery", label: "Battery", base: 1500 },
  { id: "port", label: "Charging port", base: 1200 },
  { id: "water", label: "Water damage", base: 2000 },
  { id: "back", label: "Back glass / housing", base: 1800 },
  { id: "camera", label: "Camera", base: 2200 },
  { id: "software", label: "Software / unlocking", base: 1000 },
  { id: "data", label: "Data recovery", base: 2500 },
  { id: "board", label: "Not powering on", base: 3500 },
];


export const money = (n: number): string => n.toLocaleString("en-KE");
export const round100 = (n: number): number => Math.round(n / 100) * 100;

export function whatsappLink(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function chipStyle(active: boolean): { borderColor: string; background: string } {
  return active
    ? { borderColor: "var(--brand-solid)", background: "var(--brand-tint-strong)" }
    : { borderColor: "var(--border-default)", background: "var(--surface-raised)" };
}
