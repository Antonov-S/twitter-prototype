"use client";

import { ReactNode } from "react";
import { SWRConfig } from "swr";

import Header from "./header";
import NavBar from "./navbar";
import Footer from "./footer";
import fetcher from "../util/fetcher";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <SWRConfig value={{ fetcher: fetcher }}>
      <div>
        <Header />
        <NavBar />
        {children}
        <Footer />
      </div>
    </SWRConfig>
  );
}
