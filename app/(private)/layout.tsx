import { ReactNode } from "react";

import Header from "./header";
import NavBar from "./navbar";
import Footer from "./footer";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
