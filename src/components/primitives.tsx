import { ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-primary-glow/30 blur-3xl" />
      <div className="container-tight relative py-16 md:py-24">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
            {eyebrow}
          </span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight md:text-5xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/85">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export function Section({
  className,
  children,
  muted,
  id,
}: {
  className?: string;
  children: ReactNode;
  muted?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={cn(muted && "bg-muted/40", "py-14 md:py-20")}>
      <div className={cn("container-tight", className)}>{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function FeatureCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

export function ProtoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-warning/40 bg-warning/15 px-3 py-1 text-xs font-semibold text-warning-foreground",
        className,
      )}
    >
      <Info className="h-3.5 w-3.5" /> Prototype · mock data
    </span>
  );
}

export function Note({
  variant = "info",
  children,
}: {
  variant?: "info" | "warning";
  children: ReactNode;
}) {
  const warn = variant === "warning";
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border p-4 text-sm",
        warn
          ? "border-destructive/30 bg-destructive/10 text-destructive"
          : "border-primary/20 bg-primary/5 text-foreground",
      )}
    >
      {warn ? (
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
      ) : (
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
      )}
      <div>{children}</div>
    </div>
  );
}
