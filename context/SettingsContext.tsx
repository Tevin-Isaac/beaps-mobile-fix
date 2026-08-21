import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";

export interface SiteSettings {
  phoneDisplay: string;
  phoneTel: string;
  whatsapp: string;
  email: string;
  addressLine: string;
  addressDetail: string;
  hours: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  phoneDisplay: "0720 668 668",
  phoneTel: "+254720668668",
  whatsapp: "254720668668",
  email: "bernardmacharia2013@gmail.com",
  addressLine: "Old Mutual Building, Kimathi Street",
  addressDetail: "Room 420, 4th floor",
  hours: "Mon–Fri 8:30am–6:30pm · Sat 9:00am–5:00pm",
};

interface SettingsContextValue extends SiteSettings {
  whatsappLink: (text: string) => string;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.phoneDisplay) setSettings(data);
      })
      .catch(() => {});
  }, []);

  const whatsappLink = useCallback(
    (text: string) => `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(text)}`,
    [settings.whatsapp]
  );

  return <SettingsContext.Provider value={{ ...settings, whatsappLink }}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within a SettingsProvider");
  return ctx;
}
