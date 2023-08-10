import type { Metadata } from "next";
import React, { ReactNode } from "react";
import Head from "next/head";
import { MainNav } from "@/components/main-nav";

type Props = {
  children?: ReactNode;
  title?: string;
};

export const metadata: Metadata = {
  title: "Work | Delfina Vecchietti | UX/UI Designer",
  description:
    "Delfina Vecchietti is a UX/UI Designer based in Buenos Aires, Argentina.",
};

export default function Page({ children, title }: Props) {
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <MainNav />
      </header>
      {children}
      <footer>
        <hr />
        <span>Work page</span>
      </footer>
    </div>
  );
}
