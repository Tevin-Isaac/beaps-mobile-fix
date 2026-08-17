import "../styles/globals.css";
import { CartProvider } from "../context/CartContext";
import { ThemeProvider } from "../context/ThemeContext";
import Layout from "../components/Layout";
import type { AppPropsWithTitle } from "../lib/types";

export default function App({ Component, pageProps }: AppPropsWithTitle) {
  return (
    <ThemeProvider>
      <CartProvider>
        <Layout title={Component.pageTitle}>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </ThemeProvider>
  );
}
