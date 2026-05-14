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

export function isValidRank(rank) {
  return Object.prototype.hasOwnProperty.call(RANK_LABELS, rank);
}

export function rankImageKey(rank) {
  return String(rank || '').toLowerCase();
}

export function rankFilter(val) {
  return RANK_LABELS[val] || 'Sin rango';
}

export default {
  RANK_LABELS,
  RANK_OPTIONS,
  RANK_POSITIONS,
  isValidRank,
  rankImageKey,
  rankFilter,
};
