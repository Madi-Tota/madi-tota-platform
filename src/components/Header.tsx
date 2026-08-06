import { useState } from "react";
import { Link, NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { NAV_LINKS } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export const PRIMARY_NAV = [
  { to: "/", label: "Home" },
  { to: "/employees", label: "For Workers" },
  { to: "/employers", label: "For Employers" },
  { to: "/#simulators", label: "Simulators" },
  { to: "/app", label: "App Demo" },
];

export const COMPANY_NAV = [
  { to: "/#founder-letter", label: "Our Story" },
  { to: "/#governance", label: "Governance" },
  { to: "/#our-journey", label: "Journey" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-lg">
      <div className="container-tight flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {PRIMARY_NAV.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Company <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover">
              {COMPANY_NAV.map((link) => (
                <DropdownMenuItem key={link.to} asChild>
                  <Link to={link.to}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Button asChild variant="hero" size="sm">
            <Link to="/pilot">Join the pilot</Link>
          </Button>
        </div>


        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="outline" size="icon" aria-label="Open menu" className="min-h-11 min-w-11">
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] overflow-y-auto p-0">
            <div className="flex items-center justify-between border-b p-4">
              <Logo />
              <SheetClose asChild>
                <Button variant="ghost" size="icon" aria-label="Close menu" className="min-h-11 min-w-11">
                  <X className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetClose>
            </div>
            <nav aria-label="Mobile" className="flex flex-col p-2">
              {[...PRIMARY_NAV, ...COMPANY_NAV].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-2 border-t" />
              {NAV_LINKS.map((link) => (
                <RouterNavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive || location.pathname === link.to
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    }`
                  }
                >
                  {link.label}
                </RouterNavLink>
              ))}
              <div className="p-2 pt-4">
                <LanguageSwitcher />
              </div>
              <div className="p-2">
                <Button asChild variant="hero" className="w-full">
                  <Link to="/pilot" onClick={() => setOpen(false)}>
                    Join the pilot
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
