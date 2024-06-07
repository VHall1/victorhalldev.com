import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
