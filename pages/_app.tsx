import "../styles/globals.css";
import { CartProvider } from "../context/CartContext";
import Layout from "../components/Layout";
import type { AppPropsWithTitle } from "../lib/types";

export default function App({ Component, pageProps }: AppPropsWithTitle) {
  return (
    <CartProvider>
      <Layout title={Component.pageTitle}>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}
