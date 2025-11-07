import type { Metadata } from "next";
import "./globals.css";
import { MusicProvider } from "@/components/MusicProvider";

export const metadata: Metadata = {
  title: "Himalayan Saffron",
  description: "Verify your Himalayan Saffron",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MusicProvider>
          {children}
        </MusicProvider>
      </body>
    </html>
  );
}