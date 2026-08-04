import { useState, useEffect, ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Globe, ShieldCheck, Wallet, TrendingUp, BookOpen, ArrowRight, ArrowLeft,
  CheckCircle2, History, LifeBuoy, Hash, UserCog, ChevronRight, Check,
  Building2, Users, BarChart3, Ticket, FileSpreadsheet, ClipboardCheck, Zap, Snowflake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PageHero, Section, ProtoBadge, Note } from "@/components/primitives";
import { LANGUAGES, RATES, BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

type ScreenId =
  | "welcome" | "register" | "home" | "limit" | "choose" | "fee"
  | "submitted" | "history" | "learn" | "support" | "ussd" | "profile" | "employer";

const SCREENS: { id: ScreenId; label: string; icon: React.ElementType }[] = [
  { id: "welcome", label: "Welcome / language", icon: Globe },
  { id: "register", label: "Register / consent", icon: ShieldCheck },
  { id: "home", label: "Home dashboard", icon: Wallet },
  { id: "limit", label: "Available limit", icon: TrendingUp },
  { id: "choose", label: "Choose CHILL or ZAP", icon: Zap },
  { id: "fee", label: "Fee confirmation", icon: CheckCircle2 },
  { id: "submitted", label: "Request submitted", icon: Check },
  { id: "history", label: "Transaction history", icon: History },
  { id: "learn", label: "Learn / Ask Tota", icon: BookOpen },
  { id: "support", label: "Support ticket", icon: LifeBuoy },
  { id: "ussd", label: "USSD fallback", icon: Hash },
  { id: "profile", label: "Profile & privacy", icon: UserCog },
  { id: "employer", label: "Employer dashboard", icon: Building2 },
];

const fmt = (n: number) => "R" + n.toLocaleString("en-ZA");

export default function AppPrototype() {
  const [params] = useSearchParams();
  const [screen, setScreen] = useState<ScreenId>("welcome");
  const [product, setProduct] = useState<"CHILL" | "ZAP">("CHILL");
  const [amount, setAmount] = useState(600);

  useEffect(() => {
    const s = params.get("screen") as ScreenId | null;
    if (s && SCREENS.some((x) => x.id === s)) setScreen(s);
  }, [params]);

  const go = (s: ScreenId) => setScreen(s);

  return (
    <>
      <PageHero
        eyebrow="App prototype"
        title="The Madi-Tota™ app, screen by screen"
        subtitle="Click any screen on the left to explore the full employee journey and the employer dashboard. All data is mock."
      >
        <ProtoBadge className="bg-white/15 text-primary-foreground" />
      </PageHero>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Screen nav */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h3 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Screens
            </h3>
            <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-1">
              {SCREENS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => go(s.id)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors",
                    screen === s.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  <s.icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{s.label}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Phone / canvas */}
          <div className="flex justify-center">
            {screen === "employer" ? (
              <EmployerDashboard />
            ) : (
              <Phone>
                <ScreenRenderer
                  screen={screen}
                  go={go}
                  product={product}
                  setProduct={setProduct}
                  amount={amount}
                  setAmount={setAmount}
                />
              </Phone>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-[380px]">
      <div className="rounded-[2.5rem] border-[10px] border-primary bg-background p-0 shadow-lg">
        <div className="relative h-[720px] overflow-hidden rounded-[1.8rem] bg-background">
          <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-primary" />
          <div className="h-full overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- screen shells ---------------- */
function AppBar({ title, onBack }: { title: string; onBack?: () => void }) {
  return (
    <div className="sticky top-0 z-10 flex items-center gap-2 bg-gradient-card px-4 pb-3 pt-8 text-primary-foreground">
      {onBack && (
        <button onClick={onBack} aria-label="Back" className="rounded-full p-1 hover:bg-white/10">
          <ArrowLeft className="h-5 w-5" />
        </button>
      )}
      <span className="font-display font-semibold">{title}</span>
    </div>
  );
}

interface SP {
  screen: ScreenId;
  go: (s: ScreenId) => void;
  product: "CHILL" | "ZAP";
  setProduct: (p: "CHILL" | "ZAP") => void;
  amount: number;
  setAmount: (n: number) => void;
}

function ScreenRenderer({ screen, go, product, setProduct, amount, setAmount }: SP) {
  switch (screen) {
    case "welcome": return <Welcome go={go} />;
    case "register": return <Register go={go} />;
    case "home": return <HomeDash go={go} />;
    case "limit": return <Limit go={go} />;
    case "choose": return <Choose go={go} product={product} setProduct={setProduct} amount={amount} setAmount={setAmount} />;
    case "fee": return <Fee go={go} product={product} amount={amount} />;
    case "submitted": return <Submitted go={go} product={product} amount={amount} />;
    case "history": return <HistoryScreen go={go} />;
    case "learn": return <LearnScreen go={go} />;
    case "support": return <SupportScreen go={go} />;
    case "ussd": return <Ussd go={go} />;
    case "profile": return <Profile go={go} />;
    default: return null;
  }
}

/* ---------------- screens ---------------- */
function Welcome({ go }: { go: (s: ScreenId) => void }) {
  const [lang, setLang] = useState<string>(LANGUAGES[0]);
  return (
    <div className="flex h-full flex-col bg-gradient-hero px-6 pb-6 pt-16 text-primary-foreground">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
        <Globe className="h-6 w-6 text-secondary" />
      </div>
      <h2 className="mt-6 font-display text-3xl font-extrabold">Welcome to Madi-Tota™</h2>
      <p className="mt-2 text-primary-foreground/80">Choose your language to begin.</p>
      <div className="mt-6 space-y-3">
        {LANGUAGES.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={cn(
              "flex w-full items-center justify-between rounded-2xl border-2 px-4 py-4 text-left font-semibold",
              lang === l ? "border-secondary bg-white/15" : "border-white/20",
            )}
          >
            {l}
            {lang === l && <Check className="h-5 w-5 text-secondary" />}
          </button>
        ))}
      </div>
      <Button onClick={() => go("register")} variant="hero" size="lg" className="mt-auto w-full">
        Continue <ArrowRight />
      </Button>
    </div>
  );
}

function Register({ go }: { go: (s: ScreenId) => void }) {
  const consents = [
    "I understand participation is voluntary.",
    "I consent to payroll-linked recovery at payday.",
    "I understand fees are shown before I confirm.",
    "I have read the POPIA-aligned privacy notice.",
  ];
  const [checked, setChecked] = useState(consents.map(() => false));
  const all = checked.every(Boolean);
  return (
    <div className="flex h-full flex-col">
      <AppBar title="Register & consent" onBack={() => go("welcome")} />
      <div className="flex-1 space-y-4 p-5">
        <input className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm" placeholder="Full name" defaultValue="Thandi M." />
        <input className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm" placeholder="Mobile number" defaultValue="06X XXX XXXX" />
        <div className="rounded-xl bg-muted p-3 text-xs text-muted-foreground">
          Demo only — do not enter real ID, salary or banking details.
        </div>
        {consents.map((c, i) => (
          <button
            key={c}
            onClick={() => setChecked((arr) => arr.map((v, j) => (j === i ? !v : v)))}
            className="flex w-full items-start gap-3 rounded-xl border border-border p-3 text-left text-sm"
          >
            <span className={cn("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2", checked[i] ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground")}>
              {checked[i] && <Check className="h-3.5 w-3.5" />}
            </span>
            {c}
          </button>
        ))}
      </div>
      <div className="p-5">
        <Button onClick={() => go("home")} disabled={!all} variant="hero" size="lg" className="w-full">
          Create account
        </Button>
      </div>
    </div>
  );
}

function HomeDash({ go }: { go: (s: ScreenId) => void }) {
  return (
    <div className="min-h-full bg-muted/30 pb-6">
      <div className="bg-gradient-card px-5 pb-6 pt-10 text-primary-foreground">
        <p className="text-sm text-primary-foreground/80">Hello,</p>
        <h2 className="font-display text-2xl font-extrabold">Thandi 👋</h2>
        <div className="mt-4 rounded-2xl bg-white/10 p-4">
          <p className="text-xs text-primary-foreground/70">Available to access now</p>
          <p className="font-display text-4xl font-extrabold">{money0(SIM_ACCRUAL.available)}</p>
          <EarningsBar
            className="mt-4"
            tone="dark"
            netMonthlyPay={SIM_SALARY}
            workingDays={SIM_WORKING_DAYS}
            daysWorked={SIM_DAYS_WORKED}
            priorDraws={SIM_PRIOR_DRAWS}
          />
          <p className="mt-3 text-xs text-primary-foreground/70">{SIM_WINDOW.label}</p>
        </div>
      </div>
      <div className="space-y-3 p-5">
        <Button onClick={() => go("choose")} variant="hero" size="lg" className="w-full justify-between">
          <span className="flex items-center gap-2"><Snowflake className="h-4 w-4" /> Choose CHILL</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button onClick={() => go("choose")} variant="warm" size="lg" className="w-full justify-between">
          <span className="flex items-center gap-2"><Zap className="h-4 w-4" /> Choose ZAP</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button onClick={() => go("learn")} variant="soft" size="lg" className="w-full justify-between">
          <span className="flex items-center gap-2"><BookOpen className="h-4 w-4" /> Learn before I choose</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
        <div className="grid grid-cols-3 gap-2 pt-2">
          <Tile icon={History} label="History" onClick={() => go("history")} />
          <Tile icon={LifeBuoy} label="Support" onClick={() => go("support")} />
          <Tile icon={UserCog} label="Profile" onClick={() => go("profile")} />
        </div>
      </div>
    </div>
  );
}

function Tile({ icon: Icon, label, onClick }: { icon: React.ElementType; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card p-3 text-xs font-medium hover:border-primary">
      <Icon className="h-5 w-5 text-primary" />
      {label}
    </button>
  );
}

function Limit({ go }: { go: (s: ScreenId) => void }) {
  return (
    <div className="flex h-full flex-col">
      <AppBar title="Available access" onBack={() => go("home")} />
      <div className="flex-1 space-y-4 p-5">
        <div className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm">
          <p className="text-sm text-muted-foreground">Available to access now</p>
          <p className="font-display text-5xl font-extrabold text-primary">{money0(SIM_ACCRUAL.available)}</p>
          <p className="mt-1 text-xs text-muted-foreground">Earned to date, within a {RATES.capPercent}% net-pay cap</p>
        </div>
        <div className="space-y-2 rounded-2xl border border-border bg-card p-5 text-sm">
          <Row k="Monthly net pay (demo)" v={money0(SIM_SALARY)} />
          <Row k="Earned so far" v={money0(SIM_ACCRUAL.earned)} />
          <Row k={`Access cap (${RATES.capPercent}%)`} v={money0(SIM_ACCRUAL.cap)} />
          <Row k="Already accessed" v={money0(SIM_PRIOR_DRAWS)} />
          <Row k="Available now" v={money0(SIM_ACCRUAL.available)} highlight />
        </div>
        <Note>Your cap protects you from over-using wage access.</Note>
      </div>
      <div className="p-5">
        <Button onClick={() => go("choose")} variant="hero" size="lg" className="w-full">Continue <ArrowRight /></Button>
      </div>
    </div>
  );
}

function Row({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between border-b border-border/60 py-1.5 last:border-0">
      <span className="text-muted-foreground">{k}</span>
      <span className={highlight ? "font-display font-bold text-primary" : "font-medium"}>{v}</span>
    </div>
  );
}

function Choose({ go, product, setProduct, amount, setAmount }: Omit<SP, "screen">) {
  const options = [
    { id: "CHILL" as const, rate: RATES.chill, icon: Snowflake, desc: "Lower fee · planned access" },
    { id: "ZAP" as const, rate: RATES.zap, icon: Zap, desc: "Faster · higher fee" },
  ];
  return (
    <div className="flex h-full flex-col">
      <AppBar title="Choose your option" onBack={() => go("home")} />
      <div className="flex-1 space-y-4 p-5">
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => setProduct(o.id)}
            className={cn(
              "flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left",
              product === o.id ? "border-primary bg-primary/5" : "border-border",
            )}
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
              <o.icon className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="font-display font-bold">{o.id}</p>
              <p className="text-xs text-muted-foreground">{o.desc}</p>
            </div>
            <span className="font-display font-bold text-primary">{o.rate}%</span>
          </button>
        ))}
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="mb-2 text-sm font-medium">Draw amount</p>
          <p className="font-display text-3xl font-extrabold text-primary">{fmt(amount)}</p>
          <input
            type="range" min={100} max={Math.max(100, Math.round(SIM_ACCRUAL.available))} step={100} value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-3 w-full accent-[hsl(var(--primary))]"
          />
          <p className="mt-1 text-xs text-muted-foreground">Max available: {money0(SIM_ACCRUAL.available)}</p>
        </div>
      </div>
      <div className="p-5">
        <Button onClick={() => go("fee")} variant="hero" size="lg" className="w-full">See my fee <ArrowRight /></Button>
      </div>
    </div>
  );
}

function Fee({ go, product, amount }: { go: (s: ScreenId) => void; product: "CHILL" | "ZAP"; amount: number }) {
  const q = quote(amount, product);
  const rate = q.rate;
  const fee = q.fee;
  return (
    <div className="flex h-full flex-col">
      <AppBar title="Confirm your fee" onBack={() => go("choose")} />
      <div className="flex-1 space-y-4 p-5">
        <div className="rounded-2xl bg-gradient-card p-5 text-primary-foreground">
          <p className="text-sm text-primary-foreground/80">You will receive</p>
          <p className="font-display text-4xl font-extrabold">{fmt(amount)}</p>
        </div>
        <div className="space-y-2 rounded-2xl border border-border bg-card p-5 text-sm">
          <Row k="Option" v={`${product} (${rate}% per draw)`} />
          <Row k="Draw amount" v={fmt(amount)} />
          <Row k="Fee" v={fmt(fee)} />
          <Row k="You receive" v={fmt(q.workerReceives)} />
          <Row k="Deducted at payday" v={fmt(q.paydayDeduction)} highlight />
        </div>
        <Note>You are seeing your exact fee before confirming — always.</Note>
      </div>
      <div className="space-y-2 p-5">
        <Button onClick={() => go("submitted")} variant="hero" size="lg" className="w-full">Confirm request</Button>
        <Button onClick={() => go("choose")} variant="ghost" size="lg" className="w-full">Go back</Button>
      </div>
    </div>
  );
}

function Submitted({ go, product, amount }: { go: (s: ScreenId) => void; product: "CHILL" | "ZAP"; amount: number }) {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-hero p-6 text-center text-primary-foreground">
      <div className="grid h-20 w-20 place-items-center rounded-full bg-secondary text-secondary-foreground">
        <Check className="h-10 w-10" />
      </div>
      <h2 className="mt-6 font-display text-2xl font-extrabold">Request submitted</h2>
      <p className="mt-2 text-primary-foreground/85">
        Your {product} request for {fmt(amount)} has been submitted (demo).
      </p>
      <div className="mt-8 w-full space-y-2">
        <Button onClick={() => go("history")} variant="hero" size="lg" className="w-full">View history</Button>
        <Button onClick={() => go("home")} variant="outline" size="lg" className="w-full border-white/40 bg-white/10 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground">Back to home</Button>
      </div>
    </div>
  );
}

function HistoryScreen({ go }: { go: (s: ScreenId) => void }) {
  const items = [
    { d: "12 Jun", p: "CHILL", a: 600, f: 35 },
    { d: "28 May", p: "ZAP", a: 200, f: 22 },
    { d: "14 May", p: "CHILL", a: 500, f: 29 },
    { d: "30 Apr", p: "CHILL", a: 400, f: 23 },
  ];
  return (
    <div className="flex h-full flex-col">
      <AppBar title="Transaction history" onBack={() => go("home")} />
      <div className="flex-1 space-y-3 p-5">
        {items.map((i, idx) => (
          <div key={idx} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
            <div>
              <p className="font-semibold">{i.p} draw</p>
              <p className="text-xs text-muted-foreground">{i.d} · fee {fmt(i.f)}</p>
            </div>
            <span className="font-display font-bold text-primary">{fmt(i.a)}</span>
          </div>
        ))}
        <Note>Mock history for demonstration only.</Note>
      </div>
    </div>
  );
}

function LearnScreen({ go }: { go: (s: ScreenId) => void }) {
  const topics = ["What is CHILL?", "What is ZAP?", "The 20% cap", "Budgeting basics"];
  return (
    <div className="flex h-full flex-col">
      <AppBar title="Learn / Ask Tota" onBack={() => go("home")} />
      <div className="flex-1 space-y-4 p-5">
        <div className="rounded-2xl bg-primary/5 p-4 text-sm">
          <b>Ask Tota:</b> Hi Thandi! I explain, I do not give financial advice.
          Tap a topic to learn.
        </div>
        {topics.map((t) => (
          <button key={t} className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-4 text-sm font-medium hover:border-primary">
            {t} <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
        <div className="grid aspect-video place-items-center rounded-xl bg-gradient-card text-primary-foreground">
          <BookOpen className="h-8 w-8 text-secondary" />
        </div>
      </div>
    </div>
  );
}

function SupportScreen({ go }: { go: (s: ScreenId) => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="flex h-full flex-col">
      <AppBar title="Support ticket" onBack={() => go("home")} />
      <div className="flex-1 space-y-4 p-5">
        {sent ? (
          <div className="rounded-2xl border border-success/30 bg-success/10 p-6 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
            <p className="mt-3 font-semibold">Ticket #MT-2048 created (demo)</p>
            <p className="text-sm text-muted-foreground">Routed via {BRAND.omnichannel}™.</p>
          </div>
        ) : (
          <>
            <select className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm">
              <option>How CHILL/ZAP works</option>
              <option>A draw I made</option>
              <option>Account & privacy</option>
            </select>
            <textarea rows={5} placeholder="Describe your issue…" className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm" />
            <Note>Do not include ID, salary or banking details.</Note>
            <Button onClick={() => setSent(true)} variant="hero" size="lg" className="w-full">Submit ticket</Button>
          </>
        )}
      </div>
    </div>
  );
}

function Ussd({ go }: { go: (s: ScreenId) => void }) {
  return (
    <div className="flex h-full flex-col">
      <AppBar title="USSD fallback guide" onBack={() => go("home")} />
      <div className="flex-1 space-y-4 p-5">
        <Note>No smartphone or low data? Use USSD (concept).</Note>
        <div className="rounded-2xl border-2 border-dashed border-primary/40 bg-card p-5 font-mono text-sm">
          <p className="text-muted-foreground">Dial</p>
          <p className="font-display text-2xl font-extrabold text-primary">*120*MADI#</p>
          <div className="mt-4 space-y-1 text-xs text-muted-foreground">
            <p>1. Check available access</p>
            <p>2. Request CHILL draw</p>
            <p>3. Request ZAP draw</p>
            <p>4. Recent activity</p>
            <p>5. Support</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Illustrative menu — not a live USSD service.</p>
      </div>
    </div>
  );
}

function Profile({ go }: { go: (s: ScreenId) => void }) {
  const [settings, setSettings] = useState({ marketing: false, analytics: true, language: true });
  const controls: { key: keyof typeof settings; label: string; desc: string }[] = [
    { key: "marketing", label: "Marketing messages", desc: "Receive educational campaigns" },
    { key: "analytics", label: "Usage analytics", desc: "Help improve the app (anonymised)" },
    { key: "language", label: "Keep my language", desc: "Remember my language preference" },
  ];
  return (
    <div className="flex h-full flex-col">
      <AppBar title="Profile & privacy" onBack={() => go("home")} />
      <div className="flex-1 space-y-4 p-5">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground font-display font-bold">T</span>
          <div>
            <p className="font-display font-bold">Thandi M.</p>
            <p className="text-xs text-muted-foreground">Pilot employee</p>
          </div>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Privacy controls</p>
        {controls.map((c) => (
          <div key={c.key} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
            <div className="pr-3">
              <p className="text-sm font-medium">{c.label}</p>
              <p className="text-xs text-muted-foreground">{c.desc}</p>
            </div>
            <Switch checked={settings[c.key]} onCheckedChange={(v) => setSettings((s) => ({ ...s, [c.key]: v }))} />
          </div>
        ))}
        <Note>POPIA-aligned controls being implemented. You control your data.</Note>
        <Button variant="outline" size="lg" className="w-full">Download my data (demo)</Button>
      </div>
    </div>
  );
}

/* ---------------- employer dashboard ---------------- */
function EmployerDashboard() {
  const metrics = [
    { icon: Users, label: "Pilot employees", value: "83" },
    { icon: ClipboardCheck, label: "Active opt-ins", value: "—", tag: "placeholder" },
    { icon: BarChart3, label: "Access requests", value: "—", tag: "placeholder" },
    { icon: Ticket, label: "Support tickets", value: "—", tag: "placeholder" },
  ];
  const checklist = [
    "Consent flow reviewed",
    "Employee communications prepared",
    "Payroll reconciliation mapping",
    "POPIA-aligned controls confirmed",
    "Support routing configured",
  ];
  return (
    <div className="w-full max-w-3xl space-y-6">
      <div className="rounded-2xl bg-gradient-card p-6 text-primary-foreground">
        <div className="flex items-center gap-3">
          <Building2 className="h-7 w-7 text-secondary" />
          <div>
            <h3 className="font-display text-xl font-bold">Employer dashboard</h3>
            <p className="text-sm text-primary-foreground/80">Pilot overview · mock data</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <m.icon className="h-6 w-6 text-primary" />
            <p className="mt-3 font-display text-3xl font-extrabold">{m.value}</p>
            <p className="text-sm text-muted-foreground">{m.label}</p>
            {m.tag && <span className="mt-2 inline-block rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{m.tag}</span>}
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h4 className="flex items-center gap-2 font-display text-lg font-bold">
            <FileSpreadsheet className="h-5 w-5 text-primary" /> Payroll export
          </h4>
          <p className="mt-1 text-sm text-muted-foreground">Generate a reconciliation export at payday.</p>
          <Button variant="soft" size="lg" className="mt-4 w-full">Generate export (placeholder)</Button>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h4 className="flex items-center gap-2 font-display text-lg font-bold">
            <ClipboardCheck className="h-5 w-5 text-primary" /> Compliance checklist
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            {checklist.map((c, i) => (
              <li key={c} className="flex items-center gap-2">
                <CheckCircle2 className={cn("h-4 w-4", i < 3 ? "text-success" : "text-muted-foreground")} />
                <span className={i < 3 ? "" : "text-muted-foreground"}>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Note>All employer metrics are placeholders for demonstration. No real employee or payroll data is collected.</Note>
    </div>
  );
}
