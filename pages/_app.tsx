import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "../context/CartContext";
import { ThemeProvider } from "../context/ThemeContext";
import { SettingsProvider } from "../context/SettingsContext";
import Layout from "../components/Layout";
import type { AppPropsWithTitle } from "../lib/types";

export default function App({ Component, pageProps }: AppPropsWithTitle) {
  return (
    <SessionProvider session={pageProps.session}>
      <SettingsProvider>
        <ThemeProvider>
          <CartProvider>
            <Layout title={Component.pageTitle}>
              <Component {...pageProps} />
            </Layout>
          </CartProvider>
        </ThemeProvider>
      </SettingsProvider>
    </SessionProvider>
  );
}
