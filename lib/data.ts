import type { Repair, DeviceOption, IssueOption } from "./types";

export const PHONE_DISPLAY = "0720 668 668";
export const PHONE_TEL = "+254720668668";
export const WHATSAPP_NUMBER = "254720668668";

export const FEATURED_SLUGS = ["oraimo-20-000mah-power-bank", "iphone-11-64gb", "oraimo-33w-gan-charger", "oraimo-freepods-3"];

export const REPAIRS: Repair[] = [
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

export const DEVICES: DeviceOption[] = [
  { id: "budget", label: "Android — everyday", ex: "Tecno, Infinix, Redmi, itel", mult: 1 },
  { id: "flagship", label: "Android — flagship", ex: "Samsung S/Note, Pixel, Huawei P", mult: 1.8 },
  { id: "iphone", label: "iPhone", ex: "iPhone 8 through 15 Pro Max", mult: 2.4 },
  { id: "tablet", label: "Tablet / iPad", ex: "iPad, Galaxy Tab, Lenovo", mult: 2 },
  { id: "laptop", label: "Laptop", ex: "HP, Dell, Lenovo, MacBook", mult: 2.2 },
  { id: "other", label: "Something else", ex: "Smartwatch, feature phone, console", mult: 1.4 },
];

export const ISSUES: IssueOption[] = [
  { id: "screen", label: "Cracked screen", base: 2800 },
  { id: "battery", label: "Battery", base: 1800 },
  { id: "port", label: "Charging port", base: 1500 },
  { id: "water", label: "Water damage", base: 4500 },
  { id: "back", label: "Back glass / housing", base: 2200 },
  { id: "camera", label: "Camera", base: 2500 },
  { id: "software", label: "Software / unlocking", base: 1200 },
  { id: "data", label: "Data recovery", base: 3500 },
  { id: "board", label: "Not powering on", base: 5000 },
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
