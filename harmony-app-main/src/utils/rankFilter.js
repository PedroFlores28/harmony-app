// ============================================================================
// FILTRO DE RANGOS - HARMONY LIFE CORPORATION (10 RANGOS)
// ============================================================================
// Lista oficial de rangos vigentes.

export const RANK_LABELS = {
  MILLONARIO: 'Millonario',
  ORO: 'Oro',
  ESMERALDA: 'Esmeralda',
  PLATINO: 'Platino',
  DIAMANTE: 'Diamante',
  DIAMANTE_AZUL: 'Diamante Azul',
  DIAMANTE_EJECUTIVO: 'Diamante Ejecutivo',
  DOBLE_DIAMANTE: 'Doble Diamante',
  DIAMANTE_CORONA: 'Diamante Corona',
  TOP_HARMONY: 'Top Harmony',
};

export const RANK_OPTIONS = Object.entries(RANK_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export const RANK_POSITIONS = Object.keys(RANK_LABELS).reduce((positions, rank, index) => {
  positions[rank] = index + 1;
  return positions;
}, {});

export function normalizeRankKey(rank) {
  const key = String(rank || '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '_')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (
    !key ||
    key === 'NONE' ||
    key === 'NO_RANK' ||
    key === 'SINRANGO' ||
    key === 'ACTIVE'
  ) {
    return 'SIN_RANGO';
  }

  return key;
}

export function isValidRank(rank) {
  return Object.prototype.hasOwnProperty.call(RANK_LABELS, normalizeRankKey(rank));
}

export function rankImageKey(rank) {
  const key = normalizeRankKey(rank);
  return key === 'SIN_RANGO' ? 'sin-rango' : key.toLowerCase();
}

export function rankFilter(val) {
  return RANK_LABELS[normalizeRankKey(val)] || 'Sin rango';
}

export function rankPosition(rank) {
  return RANK_POSITIONS[normalizeRankKey(rank)] || 0;
}

/** Rango efectivo: el mayor entre actual e histórico. */
export function highestRankPosition(rank, maxRank) {
  return Math.max(rankPosition(rank), rankPosition(maxRank));
}

/** Platino o superior (posición >= PLATINO en la escala oficial). */
export function isRankPlatinoOrHigher(rank, maxRank) {
  return highestRankPosition(rank, maxRank) >= RANK_POSITIONS.PLATINO;
}

export function planDisplayName(planId, plans) {
  if (!planId) return '';
  const found = Array.isArray(plans)
    ? plans.find((p) => p && (p.id === planId || p.name === planId))
    : null;
  if (found && found.name) return String(found.name).toUpperCase();

  const labels = {
    early: 'CLIENTE PREFERENTE',
    basic: 'EJECUTIVO',
    standard: 'DISTRIBUIDOR',
    business: 'DISTRIBUIDOR',
    master: 'EMPRESARIO',
    vip: 'VIP',
    default: 'INICIAL',
  };
  return labels[planId] || String(planId).toUpperCase();
}

export default {
  RANK_LABELS,
  RANK_OPTIONS,
  RANK_POSITIONS,
  normalizeRankKey,
  isValidRank,
  rankImageKey,
  rankFilter,
  rankPosition,
  highestRankPosition,
  isRankPlatinoOrHigher,
  planDisplayName,
};
