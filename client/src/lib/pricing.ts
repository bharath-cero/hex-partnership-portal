/**
 * Pricing math for the Hex commercial simulator.
 * Inputs are list prices (or negotiated prices) and seat counts; outputs are
 * fully-loaded annualized totals with implied discount vs list.
 */

export interface PricingInputs {
  // Seat counts
  viewerSeats: number;
  explorerSeats: number;
  authorSeats: number;
  // List prices ($/seat/month, except platform which is annual)
  listViewer: number;
  listExplorer: number;
  listAuthor: number;
  listPlatformAnnual: number;
  // Negotiated prices (what we are willing to pay)
  negViewer: number;
  negExplorer: number;
  negAuthor: number;
  negPlatformAnnual: number;
  // AI economics
  byot: boolean;                  // bring your own tokens
  aiCreditsAnnual: number;       // $/year if buying Hex credits (ignored if byot)
  byotEstimateAnnual: number;    // $/year if BYOT (model + infra estimate)
}

export interface PricingResult {
  // Per-line annualized
  viewerListAnnual: number;
  explorerListAnnual: number;
  authorListAnnual: number;
  viewerNegAnnual: number;
  explorerNegAnnual: number;
  authorNegAnnual: number;
  // Platform
  platformListAnnual: number;
  platformNegAnnual: number;
  // AI
  aiAnnual: number;
  // Totals
  totalList: number;
  totalNegotiated: number;
  totalSavings: number;
  impliedDiscountPct: number;  // 0..100
  // Per-seat blended
  blendedPerSeat: number;
  // Counts
  totalSeats: number;
}

export function calculatePricing(i: PricingInputs): PricingResult {
  const viewerListAnnual   = i.viewerSeats   * i.listViewer   * 12;
  const explorerListAnnual = i.explorerSeats * i.listExplorer * 12;
  const authorListAnnual   = i.authorSeats   * i.listAuthor   * 12;
  const viewerNegAnnual    = i.viewerSeats   * i.negViewer    * 12;
  const explorerNegAnnual  = i.explorerSeats * i.negExplorer  * 12;
  const authorNegAnnual    = i.authorSeats   * i.negAuthor    * 12;

  const platformListAnnual = i.listPlatformAnnual;
  const platformNegAnnual  = i.negPlatformAnnual;

  const aiAnnual = i.byot ? i.byotEstimateAnnual : i.aiCreditsAnnual;

  const totalList = viewerListAnnual + explorerListAnnual + authorListAnnual + platformListAnnual + (i.byot ? 0 : i.aiCreditsAnnual);
  const totalNegotiated = viewerNegAnnual + explorerNegAnnual + authorNegAnnual + platformNegAnnual + aiAnnual;
  const totalSavings = totalList - totalNegotiated;
  const impliedDiscountPct = totalList > 0 ? (totalSavings / totalList) * 100 : 0;

  const totalSeats = i.viewerSeats + i.explorerSeats + i.authorSeats;
  const blendedPerSeat = totalSeats > 0 ? totalNegotiated / totalSeats : 0;

  return {
    viewerListAnnual, explorerListAnnual, authorListAnnual,
    viewerNegAnnual, explorerNegAnnual, authorNegAnnual,
    platformListAnnual, platformNegAnnual,
    aiAnnual,
    totalList, totalNegotiated, totalSavings, impliedDiscountPct,
    blendedPerSeat, totalSeats,
  };
}

export function fmtUSD(n: number, opts: { compact?: boolean } = {}): string {
  if (!Number.isFinite(n)) return "—";
  if (opts.compact && Math.abs(n) >= 1000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1,
    }).format(n);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 0,
  }).format(n);
}

export function fmtInt(n: number): string {
  return new Intl.NumberFormat("en-US").format(Math.round(n));
}

export function fmtPct(n: number, digits = 1): string {
  return `${n.toFixed(digits)}%`;
}
