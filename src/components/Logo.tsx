import { Link } from "react-router-dom";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-card shadow-glow">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-secondary" fill="none">
          <path
            d="M4 16c2-6 5-9 8-9s6 3 8 9"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="13.5" r="2.4" fill="currentColor" />
        </svg>
      </span>
      <span className="font-display text-lg font-extrabold leading-none text-primary">
        Madi<span className="text-secondary">-</span>Tota
        <sup className="ml-0.5 text-[0.55em] font-bold text-muted-foreground">
          ™
        </sup>
      </span>
    </Link>
  );
}
