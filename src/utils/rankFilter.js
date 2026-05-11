// ============================================================================
// FILTRO DE RANGOS - HARMONY LIFE CORPORATION (10 RANGOS)
// ============================================================================
// Este archivo contiene el filtro para mostrar los nombres de rangos en español

export function rankFilter(val) {
  // Rangos antiguos (mantener por compatibilidad temporal)
  if (val === 'none') return 'Ninguno';
  if (val === 'active') return 'Activo';
  if (val === 'star') return 'Estrella';
  if (val === 'vip') return 'VIP';
  if (val === 'master') return 'Maestro';
  if (val === 'silver') return 'Plata';
  if (val === 'gold') return 'Oro';
  if (val === 'sapphire') return 'Zafiro';
  if (val === 'RUBI') return 'Rubí';
  if (val === 'DIAMANTE') return 'Diamante';
  if (val === 'DOBLE DIAMANTE') return 'Doble Diamante';
  if (val === 'TRIPLE DIAMANTE') return 'Triple Diamante';
  if (val === 'DIAMANTE ESTRELLA') return 'Diamante Estrella';
  
  // NUEVOS RANGOS HARMONY LIFE CORPORATION (10 RANGOS)
  if (val === 'MILLONARIO') return 'Millonario';
  if (val === 'ORO') return 'Oro';
  if (val === 'ESMERALDA') return 'Esmeralda';
  if (val === 'PLATINO') return 'Platino';
  if (val === 'DIAMANTE') return 'Diamante';
  if (val === 'DIAMANTE_AZUL') return 'Diamante Azul';
  if (val === 'DIAMANTE_EJECUTIVO') return 'Diamante Ejecutivo';
  if (val === 'DOBLE_DIAMANTE') return 'Doble Diamante';
  if (val === 'DIAMANTE_CORONA') return 'Diamante Corona';
  if (val === 'TOP_HARMONY') return 'Top Harmony';
  
  // Si no coincide con ninguno, devolver el valor original capitalizado
  return val ? val.charAt(0).toUpperCase() + val.slice(1).toLowerCase().replace(/_/g, ' ') : 'Ninguno';
}

export default {
  rankFilter
};
