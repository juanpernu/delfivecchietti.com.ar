import React, { ReactNode } from "react";
import Head from "next/head";
import { MainNav } from "components/main-nav";

import "./globals.css";

type Props = {
  children?: ReactNode;
  title?: string;
};

export default function Page({
  children,
  title = "This is the default title",
}: Props) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
      <footer>
        <hr />
        <span>Index page</span>
      </footer>
    </div>
  );
}
