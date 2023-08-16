import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { cn } from "@/lib/utils";
import { RootLayout } from "components/root-layout";
import "./globals.css";

const inter = Raleway({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Delfina Vecchietti | UX/UI Designer",
  description:
    "Delfina Vecchietti is a UX/UI Designer based in Buenos Aires, Argentina.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={cn(
        "h-full bg-neutral-950 text-base antialiased",
        inter.className
      )}
    >
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
