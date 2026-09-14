import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "mano mana", template: "%s · mano mana" },
  description: "Será mano ou será mana? Faz o teu palpite antes do Dino chegar.",
  metadataBase: new URL("https://manomana.pt"),
  openGraph: { title: "mano mana", description: "Será mano ou será mana? Faz o teu palpite antes do Dino chegar.", type: "website", locale: "pt_PT" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f7f6f2" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt"><body>{children}</body></html>;
}
