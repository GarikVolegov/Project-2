# Analista Pro — Architecture Blueprint

> Viewer interattivo del piano tecnico per la migrazione di Analista Pro in Next.js 14.

## 🐛 Bug fixati

| # | Posizione | Bug | Fix |
|---|-----------|-----|-----|
| 1 | `SectionRoadmap` — `style={{ …card }}` | Usava `…` (U+2026, carattere Unicode "ellipsis") invece di `...` (tre punti JS = spread operator). Causava **SyntaxError** a runtime. | Sostituito con `...card` |
| 2 | Import | Mancavano i tipi `CSSProperties` e `ReactNode` da React | Aggiunto `import type { CSSProperties, ReactNode }` |
| 3 | `sectionMap` | TypeScript non accettava l'indexing con stringa generica | Aggiunto `Record<string, JSX.Element>` |
| 4 | Array typed | I `.map()` sugli array letterali perdevano i tipi tuple | Aggiunto cast `as [string,string,string,string][]` |

---

## 🚀 Come eseguire in locale

### Prerequisiti
- [Node.js 18+](https://nodejs.org/) installato
- Un terminale (Terminal su Mac, PowerShell/CMD su Windows)

### Passi

```bash
# 1. Clona il repository
git clone https://github.com/TUO-USERNAME/analista-arch.git
cd analista-arch

# 2. Installa le dipendenze
npm install

# 3. Avvia il server di sviluppo
npm run dev
```

Apri il browser su **http://localhost:5173**

---

## 🌐 Deploy su Vercel (gratis, visibile dal telefono)

### Opzione A — Da GitHub (consigliata)

1. Fai push del repo su GitHub
2. Vai su [vercel.com](https://vercel.com) → **New Project**
3. Seleziona il repo `analista-arch`
4. Clicca **Deploy** — Vercel rileva Vite automaticamente
5. Ricevi un URL tipo `analista-arch.vercel.app` → aprilo dal telefono ✅

### Opzione B — Da terminale

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 📱 Aprire dal telefono senza deploy

Se sei sulla stessa rete Wi-Fi:

```bash
npm run dev -- --host
```

Vedi un output tipo:
```
Local:   http://localhost:5173/
Network: http://192.168.1.42:5173/   ← questo URL dal telefono
```

Apri `http://192.168.1.42:5173` dal browser del telefono.

---

## Stack

- **React 18** + **TypeScript**
- **Vite 5** (build tool)
- Google Fonts: DM Mono + Syne
