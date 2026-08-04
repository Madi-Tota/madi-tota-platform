import { Link } from "react-router-dom";
import { BRAND_IMAGES } from "@/lib/brand";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={BRAND_IMAGES.mark}
        alt="Madi-Tota gem M mark"
        width={36}
        height={36}
        className="h-9 w-9 rounded-xl object-cover"
      />
      <span className="font-display text-lg font-extrabold leading-none text-primary">
        Madi<span className="text-secondary">-</span>Tota
        <sup className="ml-0.5 text-[0.55em] font-bold text-muted-foreground">
          ™
        </sup>
      </span>
    </Link>
  );
}
