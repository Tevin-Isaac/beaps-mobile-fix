import { Html, Head, Main, NextScript } from "next/document";

const THEME_INIT_SCRIPT = `
try {
  var t = localStorage.getItem("beaps-theme");
  if (t === "light") document.documentElement.classList.add("theme-light");
} catch (e) {}
`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
