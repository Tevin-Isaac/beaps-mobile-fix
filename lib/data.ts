import type { DeviceOption, IssueOption } from "./types";

export const FEATURED_SLUGS = ["oraimo-20-000mah-power-bank", "iphone-11-64gb", "oraimo-33w-gan-charger", "oraimo-freepods-3"];

export const DEVICES: DeviceOption[] = [
  { id: "budget", label: "Android, everyday", ex: "Tecno, Infinix, Redmi, itel", mult: 1 },
  { id: "flagship", label: "Android, flagship", ex: "Samsung S/Note, Pixel, Huawei P", mult: 1.8 },
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

export function chipStyle(active: boolean): { borderColor: string; background: string } {
  return active
    ? { borderColor: "var(--brand-solid)", background: "var(--brand-tint-strong)" }
    : { borderColor: "var(--border-default)", background: "var(--surface-raised)" };
}
