import "@fontsource/geist/400.css";
import "@fontsource/geist/500.css";
import "@fontsource/geist/600.css";
import "@fontsource/geist/700.css";
import "@fontsource/geist-mono/400.css";
import "@fontsource/geist-mono/600.css";
import "@fontsource/geist-mono/700.css";
import "@fontsource/geist-pixel/400.css";
import "./globals.css";

export const metadata = {
  title: "brainfartings.md",
  description: "",
  icons: {
    icon: "./brainfarts.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
