import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";

// ─────────────────────────────────────────────────────────
// BUG FIXATO: riga ~430 originale usava "…card" (U+2026,
// carattere Unicode "ellipsis") invece di "...card"
// (tre punti separati = spread operator JS).
// Causava: SyntaxError — Unexpected token '...' / runtime crash.
// ─────────────────────────────────────────────────────────

const sections = [
  { id: "stack",    label: "Tech Stack",    icon: "⬡" },
  { id: "arch",     label: "Architettura",  icon: "◈" },
  { id: "data",     label: "Dati Real-Time",icon: "⟳" },
  { id: "calendar", label: "Calendario",    icon: "◫" },
  { id: "dashboard",label: "Dashboard",     icon: "◻" },
  { id: "layout",   label: "Layout & Nav",  icon: "▤" },
  { id: "folders",  label: "Struttura",     icon: "◱" },
  { id: "roadmap",  label: "Roadmap",       icon: "→" },
];

const GOLD  = "#c9a84c";
const GOLD2 = "#f0d080";

// ── shared style helpers ──────────────────────────────────
const card: CSSProperties = {
  background:    "rgba(255,255,255,0.05)",
  border:        "1px solid rgba(255,255,255,0.1)",
  borderRadius:  12,
  padding:       "1.1rem 1.25rem",
  marginBottom:  12,
};

const pillStyle = (color = GOLD): CSSProperties => ({
  display:      "inline-block",
  fontFamily:   "'DM Mono', monospace",
  fontSize:     10,
  letterSpacing:".07em",
  padding:      "2px 9px",
  borderRadius: 20,
  border:       `1px solid ${color}55`,
  background:   `${color}18`,
  color:        color,
  marginRight:  5,
  marginBottom: 4,
});

const heading: CSSProperties = {
  fontFamily:    "'DM Mono', monospace",
  fontSize:      10,
  letterSpacing: ".12em",
  color:         "rgba(255,255,255,.45)",
  marginBottom:  12,
  textTransform: "uppercase",
};

const h2style: CSSProperties = {
  fontSize:    14,
  fontWeight:  700,
  color:       "#fff",
  marginBottom:6,
  letterSpacing:".01em",
};

const mono: CSSProperties = {
  fontFamily: "'DM Mono', monospace",
  fontSize:   11,
  color:      "rgba(255,255,255,.7)",
  lineHeight: 1.75,
};

const divider: CSSProperties = {
  height:     "0.5px",
  background: "rgba(255,255,255,.08)",
  margin:     "14px 0",
};

// ── sub-components ────────────────────────────────────────
const Badge = ({ children, color = GOLD }: { children: ReactNode; color?: string }) => (
  <span style={pillStyle(color)}>{children}</span>
);

const Row = ({
  label, value, note,
  color = "rgba(255,255,255,.7)",
}: {
  label: string; value: string; note?: string; color?: string;
}) => (
  <div style={{
    display:"flex", alignItems:"flex-start", gap:12,
    padding:"5px 0", borderBottom:"0.5px solid rgba(255,255,255,.06)",
  }}>
    <span style={{
      fontFamily:"'DM Mono', monospace", fontSize:10,
      color:"rgba(255,255,255,.4)", minWidth:130,
      letterSpacing:".04em", paddingTop:1, flexShrink:0,
    }}>{label}</span>
    <span style={{ fontSize:12, color, fontWeight:600 }}>{value}</span>
    {note && (
      <span style={{
        fontSize:11, color:"rgba(255,255,255,.4)",
        marginLeft:"auto", textAlign:"right",
      }}>{note}</span>
    )}
  </div>
);

const Code = ({ children }: { children: ReactNode }) => (
  <pre style={{
    fontFamily:  "'DM Mono', monospace",
    fontSize:    10.5,
    color:       "#c9a84c",
    background:  "rgba(0,0,0,.35)",
    border:      "1px solid rgba(201,168,76,.15)",
    borderRadius:8,
    padding:     "10px 14px",
    overflowX:   "auto",
    lineHeight:  1.8,
    marginBottom:10,
    whiteSpace:  "pre",
  }}>{children}</pre>
);

const Alert = ({
  type = "warn", children,
}: {
  type?: "warn"|"bull"|"bear"|"gold"; children: ReactNode;
}) => {
  const colors = { warn:"#fcd34d", bull:"#86efac", bear:"#fca5a5", gold:GOLD2 };
  const bg     = {
    warn:"rgba(192,112,0,.15)", bull:"rgba(58,138,40,.15)",
    bear:"rgba(192,57,43,.15)", gold:"rgba(201,168,76,.12)",
  };
  return (
    <div style={{
      borderLeft: `2px solid ${colors[type]}`,
      background:  bg[type],
      padding:    "8px 12px",
      borderRadius:"0 8px 8px 0",
      fontSize:   11,
      color:      colors[type],
      lineHeight: 1.6,
      marginBottom:10,
    }}>{children}</div>
  );
};

// ══════════════════════════════════════════════════════════
// SECTION RENDERERS
// ══════════════════════════════════════════════════════════

function SectionStack() {
  return (
    <div>
      <p style={heading}>Stack Tecnologico — Scelte Motivate</p>
      <Alert type="gold">
        Architettura orientata a: latenza minima · offline-first · scalabilità incrementale · nessun over-engineering iniziale
      </Alert>

      <div style={card}>
        <div style={h2style}>Frontend — Next.js 14 (App Router)</div>
        <Row label="FRAMEWORK"      value="Next.js 14"                    note="App Router + Server Components" />
        <Row label="LINGUAGGIO"     value="TypeScript 5.x"                note="Type safety end-to-end" />
        <Row label="UI SYSTEM"      value="Tailwind CSS + CSS Variables"  note="Nessun component lib pesante" />
        <Row label="STATE (server)" value="TanStack Query v5"             note="Cache, refetch, stale-while-revalidate" />
        <Row label="STATE (client)" value="Zustand 4"                     note="Store leggero < 2kb" />
        <Row label="CHARTS"         value="TradingView Lightweight Charts" note="Performante, API familiare" />
        <Row label="REAL-TIME"      value="WebSocket nativo + SWR fallback" note="No socket.io — overhead inutile" />
        <Row label="DATE/TIME"      value="Day.js + timezone plugin"      note="50x più leggero di moment" />
        <div style={divider} />
        <p style={{ ...mono, fontSize:10.5 }}>
          <strong style={{ color:GOLD2 }}>Perché Next.js e non CRA/Vite SPA?</strong><br />
          → Server Components = 0-byte JS per dati statici (macro, calendario)<br />
          → Route Handler = proxy sicuro per API key (mai esporre nel client)<br />
          → Streaming SSR = first meaningful paint &lt; 1s anche su 3G
        </p>
      </div>

      <div style={card}>
        <div style={h2style}>Backend — Node.js + Fastify</div>
        <Row label="RUNTIME"       value="Node.js 20 LTS"        note="Long-term support"            color="#86efac" />
        <Row label="FRAMEWORK"     value="Fastify v4"             note="3x più veloce di Express"     color="#86efac" />
        <Row label="REAL-TIME"     value="WebSocket (ws library)" note="Broadcast dati macro/price"   color="#86efac" />
        <Row label="JOB SCHEDULER" value="node-cron + BullMQ"    note="Fetch periodico API + retry"  color="#86efac" />
        <Row label="API PROXY"     value="Route interne Next.js"  note="Fase 1 — senza backend separato" color="#fcd34d" />
        <Alert type="bull">
          Fase 1: Next.js API Routes (nessun server separato). Fase 2: estrarre microservizio Fastify quando il carico lo richiede.
        </Alert>
      </div>

      <div style={card}>
        <div style={h2style}>Database</div>
        <Row label="PRIMARIO"  value="PostgreSQL 15 (Supabase)"  note="Gratis tier, real-time integrato" color="#93c5fd" />
        <Row label="CACHE"     value="Redis (Upstash serverless)" note="TTL su dati macro, prezzi"       color="#93c5fd" />
        <Row label="SESSIONI"  value="Supabase Auth + JWT"        note="No implementazione custom"       color="#93c5fd" />
        <Row label="STORAGE"   value="Supabase Storage"           note="Avatar, export PDF"              color="#93c5fd" />
        <div style={divider} />
        <Code>{`-- Schema core
CREATE TABLE macro_snapshots (
  id          uuid DEFAULT gen_random_uuid(),
  recorded_at timestamptz DEFAULT now(),
  source      text,           -- 'worldbank' | 'fed' | 'ecb'
  indicator   text,           -- 'CPI_US' | 'FED_RATE' | 'DXY'
  value       numeric,
  period      text,
  raw         jsonb
);

CREATE TABLE economic_events (
  id          uuid DEFAULT gen_random_uuid(),
  event_time  timestamptz,
  country     char(2),        -- ISO 3166
  title       text,
  impact      smallint,       -- 1=low 2=med 3=high
  actual      text,
  forecast    text,
  previous    text,
  source      text
);

CREATE TABLE user_analyses (
  id          uuid DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES auth.users,
  created_at  timestamptz DEFAULT now(),
  scores      jsonb,          -- {macro, sentiment, cycle, …}
  notes       text,
  tags        text[]
);`}</Code>
      </div>

      <div style={card}>
        <div style={h2style}>Infrastruttura — Deploy</div>
        <Row label="HOSTING"    value="Vercel (frontend + API routes)" note="Edge network, CI/CD automatico" />
        <Row label="DB"         value="Supabase (managed Postgres)"    note="Row Level Security nativo" />
        <Row label="CACHE"      value="Upstash Redis"                  note="Pay-per-request, serverless" />
        <Row label="WS SERVER"  value="Railway.app (Fastify)"          note="Solo in Fase 2+" />
        <Row label="MONITORING" value="Vercel Analytics + Sentry"      note="Core Web Vitals + errori" />
      </div>
    </div>
  );
}

function SectionArch() {
  return (
    <div>
      <p style={heading}>Architettura Generale</p>
      <Alert type="gold">
        Principio: Data flows down, events flow up. Nessun prop drilling oltre 2 livelli — tutto tramite store o context.
      </Alert>

      <div style={card}>
        <div style={h2style}>Layers dell'applicazione</div>
        <Code>{`
┌─────────────────────────────────────────────────────────┐
│                    BROWSER (Client)                      │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  UI Layer    │  │ State Layer  │  │  Data Layer  │  │
│  │  React RSC   │  │  Zustand     │  │  TanStack Q  │  │
│  │  + Client    │  │  (UI state)  │  │  (server     │  │
│  │  Components  │  │              │  │   state)     │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         └─────────────────┴─────────────────┘          │
│                            │                            │
│              WebSocket ◄───┤───► REST/GraphQL           │
└────────────────────────────┼────────────────────────────┘
                             │
┌────────────────────────────┼────────────────────────────┐
│                    NEXT.JS (Edge)                        │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Route Handlers (API Proxy)           │   │
│  │  /api/macro  /api/calendar  /api/prices  /api/ws │   │
│  │                                                   │   │
│  │  ← Hiding API keys, rate limiting, caching →      │   │
│  └──────────────────────────────────────────────────┘   │
│                             │                            │
│       Redis Cache ◄─────────┤─────────► Supabase DB     │
└────────────────────────────┬────────────────────────────┘
                             │
┌────────────────────────────┼────────────────────────────┐
│                  EXTERNAL APIs                           │
│                                                         │
│  World Bank  ·  TradingEconomics  ·  ForexFactory       │
│  CFTC (COT)  ·  Myfxbook  ·  Alpha Vantage  ·  ECB     │
└─────────────────────────────────────────────────────────┘
`}</Code>
      </div>

      <div style={card}>
        <div style={h2style}>Componenti Core — Mappa</div>
        <Code>{`src/
├── app/                          ← Next.js App Router
│   ├── (auth)/                   ← Route group autenticato
│   │   ├── dashboard/page.tsx    ← Vista principale
│   │   ├── macro/page.tsx        ← Analisi macroeconomica
│   │   ├── calendar/page.tsx     ← Calendario eventi
│   │   ├── analysis/page.tsx     ← Analisi avanzata (Analista Pro)
│   │   └── profile/page.tsx     ← Profilo utente
│   ├── api/                      ← Route handlers (proxy sicuro)
│   │   ├── macro/route.ts
│   │   ├── calendar/route.ts
│   │   ├── prices/route.ts
│   │   └── ws/route.ts
│   └── layout.tsx               ← Root layout (topbar + sidebar)
│
├── components/
│   ├── layout/                  ← Topbar, Sidebar, Header
│   ├── dashboard/               ← Sessioni, KPI, MarketStatus
│   ├── macro/                   ← CPIChart, RealRateGauge
│   ├── calendar/                ← EventList, ImpactFilter
│   ├── charts/                  ← XAUChart, McChart, wrappers
│   ├── calculators/             ← LotSize, RR, MonteCarlo
│   └── ui/                      ← Button, Card, Badge, Modal
│
├── lib/
│   ├── api/                     ← fetch wrappers tipizzati
│   ├── ws/                      ← WebSocket client singleton
│   └── utils/                   ← formatters, math helpers
│
├── store/
│   ├── market.store.ts          ← prezzi, spread, sessione
│   ├── macro.store.ts           ← cpi, dxy, fed
│   └── ui.store.ts              ← tab attiva, theme, sidebar
│
└── types/                       ← interfacce TypeScript globali`}</Code>
      </div>
    </div>
  );
}

function SectionData() {
  return (
    <div>
      <p style={heading}>Sistema Dati Macroeconomici — Real-Time</p>

      <div style={card}>
        <div style={h2style}>API Sources & Refresh Rate</div>
        {([
          ["CPI USA",    "World Bank API v2",                       "24h (dato mensile)",  "Gratuita · no key",            "#86efac"],
          ["Fed Rate",   "Fed FRED API",                            "1h (eventi FOMC)",    "Gratuita · key richiesta",     "#86efac"],
          ["DXY",        "Alpha Vantage / Twelve Data",             "60s (market hours)",  "Free tier 500 req/day",        "#fcd34d"],
          ["XAU/USD",    "Twelve Data WebSocket",                   "1s (live tick)",      "Free tier: 8 symbols",         "#fcd34d"],
          ["COT Gold",   "CFTC (scraping / quandl)",                "7 gg (venerdì)",      "Gratuita",                     "#86efac"],
          ["Calendario", "ForexFactory / TradingEconomics",         "15m",                 "Scraping o key a pagamento",   "#fcd34d"],
          ["Sentiment",  "Myfxbook Community API",                  "60s",                 "Gratuita con account",         "#86efac"],
        ] as [string,string,string,string,string][]).map(([name, src, freq, note, color]) => (
          <Row key={name} label={name} value={src} note={freq} color={color} />
        ))}
        <Alert type="warn">
          ForexFactory non ha API pubblica ufficiale → usa TradingEconomics ($99/mese)
          oppure implementa uno scraper con Puppeteer su Railway con cache Redis 15min.
        </Alert>
      </div>

      <div style={card}>
        <div style={h2style}>Flusso Dati — Fetch → Cache → UI</div>
        <Code>{`// 1. SERVER: Route Handler con Redis cache
// src/app/api/macro/route.ts

import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

const CACHE_TTL = 3600; // 1 ora

export async function GET() {
  // 1a. Controlla cache Redis
  const cached = await redis.get("macro:cpi");
  if (cached) return NextResponse.json(JSON.parse(cached));

  // 1b. Fetch da World Bank
  const res = await fetch(
    "https://api.worldbank.org/v2/country/US/indicator/FP.CPI.TOTL.ZG" +
    "?format=json&mrv=12&per_page=12",
    { next: { revalidate: CACHE_TTL } }
  );
  const data = await res.json();

  // 1c. Processa e normalizza
  const processed = normalizeCPI(data[1]);

  // 1d. Salva su Redis + Supabase
  await redis.setex("macro:cpi", CACHE_TTL, JSON.stringify(processed));
  await supabase.from("macro_snapshots").insert(processed);

  return NextResponse.json(processed);
}

// 2. CLIENT: TanStack Query
const { data, isLoading } = useQuery({
  queryKey: ["macro", "cpi"],
  queryFn:  () => fetch("/api/macro").then(r => r.json()),
  staleTime:       1000 * 60 * 5,
  refetchInterval: 1000 * 60,
  refetchOnWindowFocus: true,
});

// 3. REAL-TIME: WebSocket per prezzi live
class PriceWebSocket {
  private ws: WebSocket | null = null;

  connect() {
    this.ws = new WebSocket("wss://ws.twelvedata.com/v1/quotes/price");
    this.ws.onmessage = (e) => {
      const tick = JSON.parse(e.data);
      useMarketStore.getState().setPrice(tick.symbol, tick.price);
    };
    this.ws.onclose = () => setTimeout(() => this.connect(), 3000);
  }
}`}</Code>
      </div>

      <div style={card}>
        <div style={h2style}>Gestione Errori & Fallback</div>
        <Code>{`// lib/api/withFallback.ts
export async function fetchWithFallback<T>(
  primary:  () => Promise<T>,
  fallback: T,
  cacheKey?: string
): Promise<{ data: T; source: "live" | "cache" | "fallback" }> {
  try {
    const data = await primary();
    return { data, source: "live" };
  } catch (err) {
    console.error("Primary fetch failed:", err);

    if (cacheKey) {
      const cached = await redis.get(cacheKey);
      if (cached) return { data: JSON.parse(cached), source: "cache" };
    }

    return { data: fallback, source: "fallback" };
  }
}

// Usage:
const { data, source } = await fetchWithFallback(
  () => fetchWorldBankCPI(),
  FALLBACK_CPI_DATA,
  "macro:cpi"
);

return NextResponse.json(data, {
  headers: { "X-Data-Source": source }
});`}</Code>
      </div>

      <div style={card}>
        <div style={h2style}>Store Zustand — Market State</div>
        <Code>{`// store/market.store.ts
interface MarketState {
  prices:    Record<string, number>;
  spread:    Record<string, number>;
  session:   "asia" | "europe" | "us" | "closed";
  lastUpdate: Date | null;
  connected: boolean;

  setPrice:     (symbol: string, price: number) => void;
  setSession:   (s: MarketState["session"]) => void;
  setConnected: (v: boolean) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  prices: {}, spread: {}, session: "closed",
  lastUpdate: null, connected: false,

  setPrice: (symbol, price) =>
    set((s) => ({
      prices:     { ...s.prices, [symbol]: price },
      lastUpdate: new Date(),
    })),

  setSession:   (session)   => set({ session }),
  setConnected: (connected) => set({ connected }),
}));`}</Code>
      </div>
    </div>
  );
}

function SectionCalendar() {
  return (
    <div>
      <p style={heading}>Calendario Economico Dinamico</p>
      <Alert type="gold">
        Fonte primaria consigliata: TradingEconomics API ($99/mese) per dati strutturati e affidabili.
        Alternativa gratuita: scraping ForexFactory con Puppeteer (meno stabile).
      </Alert>

      <div style={card}>
        <div style={h2style}>Schema Evento & Filtri</div>
        <Code>{`// types/calendar.ts
interface EconomicEvent {
  id:        string;
  eventTime: Date;
  country:   string;
  title:     string;
  category:  EventCategory;
  impact:    1 | 2 | 3;
  actual:    string | null;
  forecast:  string | null;
  previous:  string | null;
  currency:  string;
  source:    string;
}

type EventCategory =
  | "employment" | "inflation" | "gdp"
  | "rates" | "trade" | "housing" | "sentiment";

interface CalendarFilters {
  countries:  string[];
  impact:     (1 | 2 | 3)[];
  categories: EventCategory[];
  range: "today" | "week" | "month" | "custom";
  from?: Date;
  to?:   Date;
}`}</Code>
      </div>

      <div style={card}>
        <div style={h2style}>Route Handler — Calendario</div>
        <Code>{`// app/api/calendar/route.ts
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get("country") || "US,EU,UK,JP";
  const impact  = searchParams.get("impact")  || "2,3";
  const from    = searchParams.get("from")    || todayISO();
  const to      = searchParams.get("to")      || nextWeekISO();

  const cacheKey = \`calendar:\${country}:\${impact}:\${from}\`;
  const ttl = from === todayISO() ? 60 : 900;

  return fetchWithFallback(
    () => fetchTradingEconomics({ country, impact, from, to }),
    FALLBACK_EVENTS,
    cacheKey,
    ttl
  );
}

function normalizeTEEvent(raw: TEEvent): EconomicEvent {
  return {
    id:        raw.CalendarId,
    eventTime: new Date(raw.Date + "Z"),
    country:   raw.Country,
    title:     raw.Category,
    impact:    mapImpact(raw.Importance),
    actual:    raw.Actual,
    forecast:  raw.Forecast,
    previous:  raw.Previous,
    category:  inferCategory(raw.Category),
    currency:  raw.Currency,
    source:    "tradingeconomics",
  };
}`}</Code>
      </div>

      <div style={card}>
        <div style={h2style}>Componente UI — EventCard</div>
        <Code>{`// components/calendar/EventCard.tsx
const ImpactColor = { 1: "#64748b", 2: "#f59e0b", 3: "#ef4444" };

export function EventCard({ event }: { event: EconomicEvent }) {
  const isPast   = event.eventTime < new Date();
  const surprise = calcSurprise(event.actual, event.forecast);

  return (
    <div className={cn("event-card", isPast && "opacity-60")}>
      <div className="impact-dot"
           style={{ background: ImpactColor[event.impact] }} />
      <div className="event-meta">
        <Flag country={event.country} />
        <time>{formatEventTime(event.eventTime)}</time>
      </div>
      <div className="event-title">{event.title}</div>
      {event.actual && (
        <div className="event-data">
          <span className={cn("actual", surprise > 0 ? "bull" : "bear")}>
            {event.actual}
          </span>
          <span className="forecast">/ {event.forecast}</span>
        </div>
      )}
    </div>
  );
}

function calcSurprise(actual?: string | null, forecast?: string | null) {
  const a = parseFloat(actual   ?? "");
  const f = parseFloat(forecast ?? "");
  if (isNaN(a) || isNaN(f) || f === 0) return 0;
  return ((a - f) / Math.abs(f)) * 100;
}`}</Code>
      </div>
    </div>
  );
}

function SectionDashboard() {
  return (
    <div>
      <p style={heading}>Dashboard — Solo l'Essenziale</p>
      <Alert type="bull">
        Regola d'oro: il trader guarda la dashboard 50 volte al giorno per 3 secondi.
        Non 5 volte per 5 minuti. Ogni informazione non necessaria è un costo cognitivo.
      </Alert>

      <div style={card}>
        <div style={h2style}>Anatomia della Dashboard (da alto a basso)</div>
        <Code>{`
┌──────────────────────────────────────────────────────────┐
│  ROW 1 — Sessione attiva (3 indicatori)                  │
│                                                          │
│  ●ASIA (chiusa)    ●EUROPA (aperta ←)    ●USA (fra 3h)  │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  ROW 2 — KPI live (4 tiles)                              │
│                                                          │
│  XAU/USD   │   DXY    │   FED RATE │   CPI USA           │
│  $4,831    │   98.4↓  │   3.50%    │   2.6%             │
│  +0.84%    │  Debole  │   Hold     │   Stabile           │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  ROW 3 — Prossimi eventi (next 24h, max 4)               │
│                                                          │
│  ●●● NFP Aprile      Ven 25/4 · 14:30 UTC · US          │
│  ●●  Jobless Claims  Gio 24/4 · 12:30 UTC · US          │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  ROW 4 — Contesto rapido (2 badge)                       │
│                                                          │
│  [COT NC Long: 210k ↑ Rialzista] [Retail: 60% FOMO]    │
└──────────────────────────────────────────────────────────┘

NON includere in dashboard:
✗ Grafici interattivi pesanti
✗ Tabelle COT complete
✗ Calcolatori
✗ Diario/journal
→ Tutto questo appartiene alle sottosezioni dedicate
`}</Code>
      </div>

      <div style={card}>
        <div style={h2style}>SessionIndicator Component</div>
        <Code>{`// components/dashboard/SessionIndicator.tsx
const SESSIONS = [
  { name: "Asia",   utcRange: [23, 8]  as [number,number] },
  { name: "Europa", utcRange: [7,  16] as [number,number] },
  { name: "USA",    utcRange: [13, 22] as [number,number] },
];

function isOpen([start, end]: [number, number]) {
  const h = new Date().getUTCHours();
  return start < end ? h >= start && h < end : h >= start || h < end;
}

export function SessionIndicator() {
  return (
    <div className="session-row">
      {SESSIONS.map(s => (
        <div key={s.name}
             className={\`session \${isOpen(s.utcRange) ? "active" : ""}\`}>
          <span className="dot" />
          <span className="name">{s.name}</span>
        </div>
      ))}
    </div>
  );
}`}</Code>
      </div>

      <div style={card}>
        <div style={h2style}>Priorità Informazioni — Score Sistema</div>
        {([
          ["XAU/USD live price",         "Primario",    "Sempre visibile, top-left KPI",    "#fca5a5"],
          ["Sessione di mercato",         "Primario",    "Contesto immediato per orari",     "#fca5a5"],
          ["Prossimi eventi alto impatto","Primario",    "Warning preventivo",               "#fca5a5"],
          ["DXY + FED rate",             "Secondario",  "Contesto macro immediato",         "#fcd34d"],
          ["COT bias sintetico",         "Secondario",  "1 badge, non tabella",             "#fcd34d"],
          ["Retail sentiment",           "Secondario",  "1 numero + icona",                 "#fcd34d"],
          ["Grafici storici",            "Terziario",   "Solo nella tab dedicata",          "#64748b"],
          ["Analisi completa",           "Terziario",   "Tab Analisi / Analista Pro",       "#64748b"],
        ] as [string,string,string,string][]).map(([name, level, note, color]) => (
          <Row key={name} label={name} value={level} note={note} color={color} />
        ))}
      </div>
    </div>
  );
}

function SectionLayout() {
  return (
    <div>
      <p style={heading}>Layout & Navigazione</p>

      <div style={card}>
        <div style={h2style}>Struttura Layout Globale</div>
        <Code>{`
┌─────────────────────────────────────────────────────────┐
│  TOPBAR (sticky, 48px)                                  │
│  [Logo] [Sessione ●●●] [DATA CORRENTE] [Live ●] [User] │
└──────────────┬──────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────┐
│  SIDEBAR (collassabile, 220px → 52px)                   │
│  [Dashboard]    ← rotta attiva                          │
│  [Calendario]                                           │
│  [Macro]                                                │
│  [Analisi Pro]                                          │
│  [Profilo]                                              │
│  [Impostazioni]                                         │
│  ────────────                                           │
│  [Suono]        ← sound engine                         │
│  [Sfondo]       ← background gallery                   │
└──────────────┬──────────────────────────────────────────┘
               │
          MAIN CONTENT AREA
          (scrollabile, padding adeguato)
`}</Code>
      </div>

      <div style={card}>
        <div style={h2style}>Header — Data + Profilo</div>
        <Code>{`// components/layout/Topbar.tsx
export function Topbar() {
  const user   = useUser();
  const { data } = useMarketData();

  return (
    <header className="topbar">
      <div className="left">
        <Logo />
        <SessionDots />
      </div>
      <div className="center">
        <LiveClock format="ddd D MMM YYYY · HH:mm UTC" />
      </div>
      <div className="right">
        <LiveDot connected={data.connected} />
        <UserAvatar
          src={user.avatarUrl}
          level={user.level}
          onClick={() => router.push("/profile")}
        />
      </div>
    </header>
  );
}

export function UserAvatar({ src, level, onClick }) {
  return (
    <div className="avatar-wrap" onClick={onClick}>
      <img src={src} className="avatar" />
      <span className="level-badge">{level}</span>
    </div>
  );
}`}</Code>
      </div>

      <div style={card}>
        <div style={h2style}>Navigation — Sidebar Collassabile</div>
        <Code>{`// components/layout/Sidebar.tsx
const NAV_ITEMS = [
  { href: "/dashboard", icon: "◻", label: "Dashboard"    },
  { href: "/calendar",  icon: "◫", label: "Calendario"   },
  { href: "/macro",     icon: "⟳", label: "Macro"        },
  { href: "/analysis",  icon: "◈", label: "Analisi Pro"  },
  { href: "/profile",   icon: "○", label: "Profilo"      },
  { href: "/settings",  icon: "⚙", label: "Impostazioni" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <nav className={\`sidebar \${collapsed ? "collapsed" : ""}\`}>
      <button onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "›" : "‹"}
      </button>
      {NAV_ITEMS.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={\`nav-item \${pathname === item.href ? "active" : ""}\`}
        >
          <span className="nav-icon">{item.icon}</span>
          {!collapsed && <span className="nav-label">{item.label}</span>}
        </Link>
      ))}
    </nav>
  );
}`}</Code>
      </div>
    </div>
  );
}

function SectionFolders() {
  return (
    <div>
      <p style={heading}>Struttura Cartelle — Production-Ready</p>

      <div style={card}>
        <div style={h2style}>Monorepo (opzionale) vs Single App</div>
        <Alert type="gold">
          Fase 1: Single Next.js app. Fase 2: estrarre /packages/ws-server se il WebSocket lo richiede.
          Non over-ingegnerizzare prima di aver utenti reali.
        </Alert>
      </div>

      <div style={card}>
        <Code>{`trader-platform/
│
├── src/
│   ├── app/                         ← Next.js 14 App Router
│   │   ├── (auth)/
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── calendar/page.tsx
│   │   │   ├── macro/page.tsx
│   │   │   ├── analysis/page.tsx    ← Analista Pro migrato qui
│   │   │   └── profile/page.tsx
│   │   ├── api/
│   │   │   ├── macro/route.ts       ← proxy + cache CPI, DXY, FED
│   │   │   ├── calendar/route.ts
│   │   │   ├── prices/route.ts
│   │   │   ├── cot/route.ts
│   │   │   ├── sentiment/route.ts
│   │   │   └── auth/
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Topbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── UserAvatar.tsx
│   │   │   └── LiveClock.tsx
│   │   ├── dashboard/
│   │   │   ├── SessionIndicator.tsx
│   │   │   ├── KPITile.tsx
│   │   │   ├── NextEvents.tsx
│   │   │   └── SentimentBadge.tsx
│   │   ├── calendar/
│   │   │   ├── EventList.tsx
│   │   │   ├── EventCard.tsx
│   │   │   ├── FilterBar.tsx
│   │   │   └── ImpactBadge.tsx
│   │   ├── macro/
│   │   │   ├── CPIChart.tsx
│   │   │   ├── RealRateGauge.tsx
│   │   │   └── MacroScoreCard.tsx
│   │   ├── analysis/
│   │   │   ├── COTBars.tsx
│   │   │   ├── PhaseSelector.tsx
│   │   │   ├── SynthesisRings.tsx
│   │   │   ├── MonteCarlo.tsx
│   │   │   └── JournalEntry.tsx
│   │   └── ui/
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── GlassPanel.tsx
│   │       └── Tooltip.tsx
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── worldbank.ts
│   │   │   ├── fred.ts
│   │   │   ├── twelvedata.ts
│   │   │   ├── cftc.ts
│   │   │   └── withFallback.ts
│   │   ├── ws/
│   │   │   ├── priceClient.ts
│   │   │   └── reconnect.ts
│   │   ├── redis.ts
│   │   ├── supabase.ts
│   │   └── utils/
│   │       ├── format.ts
│   │       ├── session.ts
│   │       └── cot.ts
│   │
│   ├── store/
│   │   ├── market.store.ts
│   │   ├── macro.store.ts
│   │   ├── ui.store.ts
│   │   └── user.store.ts
│   │
│   └── types/
│       ├── market.ts
│       ├── calendar.ts
│       ├── macro.ts
│       └── user.ts
│
├── public/
│   └── flags/                       ← SVG bandiere paesi
│
├── .env.local                       ← API keys (MAI in git)
│   FRED_API_KEY=
│   TWELVEDATA_API_KEY=
│   TRADINGECONOMICS_KEY=
│   UPSTASH_REDIS_URL=
│   NEXT_PUBLIC_SUPABASE_URL=
│   SUPABASE_SERVICE_KEY=
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json`}</Code>
      </div>
    </div>
  );
}

function SectionRoadmap() {
  const phases = [
    {
      n:"01", title:"MVP — Migrazione Analista Pro", time:"Settimane 1–3", color:"#86efac",
      items:["Next.js 14 + TypeScript setup","Analista Pro migrato come /analysis","Topbar + Sidebar + UserAvatar","Dashboard minimalista (sessioni + 4 KPI)","Supabase Auth (login/register)","Deploy su Vercel"],
    },
    {
      n:"02", title:"Dati Real-Time", time:"Settimane 4–6", color:"#93c5fd",
      items:["Route handlers: macro, prices, sentiment","Redis cache (Upstash)","WebSocket per XAU/USD live","Zustand market store","TanStack Query su tutti i fetch","Gestione errori + fallback"],
    },
    {
      n:"03", title:"Calendario Economico", time:"Settimane 7–9", color:"#fcd34d",
      items:["Integrazione TradingEconomics o scraper","EventList + EventCard UI","FilterBar (paese, impatto, categoria)","Cache 15min su Redis","Notifiche push eventi alto impatto"],
    },
    {
      n:"04", title:"Profilo & Storico", time:"Settimane 10–12", color:GOLD2,
      items:["Pagina profilo con avatar + livello","Storico analisi (da localStorage → Supabase)","Export PDF analisi","Sistema livelli (basato su # analisi)","Dark/light theme switch"],
    },
    {
      n:"05", title:"Ottimizzazioni & Scale", time:"Mese 4+", color:"#fca5a5",
      items:["PWA (installabile su mobile)","Notifiche background (Service Worker)","A/B test UI dashboard","Separare WS server su Railway se serve","Multi-asset (EUR/USD, BTC)"],
    },
  ];

  return (
    <div>
      <p style={heading}>Roadmap Sviluppo — Fasi Consigliate</p>
      <Alert type="gold">
        Principio: ship early, iterate fast. La migrazione di Analista Pro in Next.js
        dà subito una base solida su cui costruire senza riscrivere tutto da zero.
      </Alert>
      {phases.map(p => (
        // ✅ FIX: "...card" (spread JS) — originale usava "…card" (U+2026, Unicode ellipsis)
        <div key={p.n} style={{ ...card, borderLeft:`2px solid ${p.color}44` }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:8 }}>
            <span style={{
              fontFamily:"'DM Mono', monospace",
              fontSize:22, color:p.color, lineHeight:1,
            }}>{p.n}</span>
            <div>
              <div style={{ ...h2style, margin:0 }}>{p.title}</div>
              <div style={{
                fontFamily:"'DM Mono', monospace", fontSize:9,
                color:"rgba(255,255,255,.4)", marginTop:2,
              }}>{p.time}</div>
            </div>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
            {p.items.map(i => <Badge key={i} color={p.color}>{i}</Badge>)}
          </div>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════

export default function App() {
  const [active, setActive] = useState("stack");

  const sectionMap: Record<string, JSX.Element> = {
    stack:     <SectionStack />,
    arch:      <SectionArch />,
    data:      <SectionData />,
    calendar:  <SectionCalendar />,
    dashboard: <SectionDashboard />,
    layout:    <SectionLayout />,
    folders:   <SectionFolders />,
    roadmap:   <SectionRoadmap />,
  };

  return (
    <div style={{
      background:  "linear-gradient(135deg,#0a0a16 0%,#111128 50%,#0d0d1e 100%)",
      minHeight:   "100vh",
      fontFamily:  "'DM Mono', 'Syne', monospace",
      color:       "#fff",
    }}>
      {/* Header */}
      <div style={{
        background:     "rgba(0,0,0,.55)",
        borderBottom:   "1px solid rgba(255,255,255,.08)",
        padding:        ".75rem 1.5rem",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        position:       "sticky",
        top:            0,
        zIndex:         100,
        backdropFilter: "blur(16px)",
      }}>
        <div style={{
          fontFamily:    "'DM Mono', monospace",
          fontSize:      11,
          letterSpacing: ".16em",
          color:         GOLD2,
        }}>TRADER PLATFORM · ARCHITETTURA</div>
        <div style={{
          fontFamily:    "'DM Mono', monospace",
          fontSize:      9,
          color:         "rgba(255,255,255,.35)",
          letterSpacing: ".06em",
        }}>PRODUCTION BLUEPRINT · v2.0</div>
      </div>

      <div style={{ maxWidth:860, margin:"0 auto", padding:"1.2rem 1rem 3rem" }}>

        {/* Hero */}
        <div style={{
          background:   "rgba(201,168,76,.08)",
          border:       "1px solid rgba(201,168,76,.25)",
          borderRadius: 14,
          padding:      "1.2rem 1.5rem",
          marginBottom: 16,
        }}>
          <div style={{ fontSize:18, fontWeight:700, color:GOLD2, marginBottom:6 }}>
            Web App Trading — Piano Tecnico Completo
          </div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,.7)", lineHeight:1.7 }}>
            Stack:{" "}
            <Badge>Next.js 14</Badge>
            <Badge>TypeScript</Badge>
            <Badge>TanStack Query</Badge>
            <Badge>Zustand</Badge>
            <Badge color="#93c5fd">PostgreSQL</Badge>
            <Badge color="#93c5fd">Redis</Badge>
            <Badge color="#86efac">WebSocket</Badge>
          </div>
        </div>

        {/* Tab Nav */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap:                 4,
          background:          "rgba(255,255,255,.06)",
          borderRadius:        12,
          padding:             4,
          border:              "1px solid rgba(255,255,255,.1)",
          marginBottom:        16,
        }}>
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                background:   active === s.id ? "rgba(255,255,255,.16)" : "transparent",
                border:       active === s.id ? "1px solid rgba(255,255,255,.22)" : "1px solid transparent",
                borderRadius: 8,
                padding:      "7px 6px",
                fontFamily:   "'DM Mono', monospace",
                fontSize:     9,
                letterSpacing:".05em",
                color:        active === s.id ? "#fff" : "rgba(255,255,255,.45)",
                cursor:       "pointer",
                transition:   "all .18s",
                boxShadow:    active === s.id ? "0 2px 8px rgba(0,0,0,.25)" : "none",
              }}
            >
              <span style={{ display:"block", fontSize:14, marginBottom:2 }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div key={active} style={{ animation:"fadeIn .2s ease" }}>
          {sectionMap[active]}
        </div>

        {/* Footer */}
        <div style={{
          marginTop:  24,
          padding:    "1rem 1.2rem",
          background: "rgba(0,0,0,.2)",
          border:     "1px solid rgba(255,255,255,.07)",
          borderRadius:10,
          fontFamily: "'DM Mono', monospace",
          fontSize:   9,
          color:      "rgba(255,255,255,.35)",
          lineHeight: 1.8,
        }}>
          NEXT STEP → npx create-next-app@latest trader-platform --typescript --tailwind --app
          · poi: zustand · @tanstack/react-query · lightweight-charts · @supabase/supabase-js · @upstash/redis
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar       { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,.15); border-radius: 2px; }
        button { outline: none; }
      `}</style>
    </div>
  );
}
