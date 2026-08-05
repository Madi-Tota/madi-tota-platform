import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { COMPLIANCE } from "@/lib/brand";

export function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <p className="border-b border-border bg-muted/60 px-4 py-1.5 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {COMPLIANCE.simLabel} Non-live prototype — no real payments or payroll data.
      </p>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
