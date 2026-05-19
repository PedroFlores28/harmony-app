/**
 * Etiqueta de plan — misma lógica que Harmony-admin Users.getPlanLabel y serve/lib.adminPlanLabel.
 */

/** Copia fiel de Users.vue getPlanLabel */
export function adminPlanLabel(val) {
  if (!val) return "";
  const id = typeof val === "object" ? val.id || val.plan_id : val;
  const name = typeof val === "object" ? val.name : undefined;

  if (
    id === "basic" ||
    name === "DISTRIBUIDOR" ||
    name === "EJECUTIVO" ||
    name === "Ejecutivo"
  ) {
    return "DISTRIBUIDOR";
  }
  if (
    id === "standard" ||
    id === "business" ||
    name === "EMPRESARIO" ||
    name === "Empresario" ||
    name === "Distribuidor" ||
    name === "DISTRIBUIDOR (ANTIGUO)"
  ) {
    return "EMPRESARIO";
  }
  if (id === "master" || name === "MASTER" || name === "Master") return "MASTER";
  if (id === "vip" || name === "VIP" || name === "Vip") return "VIP";

  if (typeof val === "object") {
    return (val.name || "").toUpperCase();
  }
  return String(val).toUpperCase();
}

export function isPlanLabelEmpty(label) {
  if (!label) return true;
  const u = String(label).trim().toUpperCase();
  return u === "SIN MEMBRESÍA" || u === "SIN MEMBRESIA" || u === "";
}

export function getPlanDisplayLabel(planVal, plansCatalog) {
  const admin = adminPlanLabel(planVal);
  if (admin) return admin;

  if (planVal == null || planVal === "" || isPlanUnset(planVal)) {
    return "Sin membresía";
  }

  let id =
    typeof planVal === "object" ? planVal.id || planVal.plan_id : planVal;
  let name = typeof planVal === "object" ? planVal.name : null;

  const hintName =
    name ||
    (typeof planVal === "string" && !isPlanUnset(planVal) ? planVal : null);

  if (Array.isArray(plansCatalog) && plansCatalog.length) {
    const row = findPlanInCatalog(plansCatalog, { id, name: hintName });
    if (row) {
      id = row.id;
      name = row.name;
    }
  }

  const idNorm = norm(id);
  const nameNorm = norm(name);

  if (
    idNorm === "basic" ||
    idNorm === "distribuidor" ||
    nameNorm === "distribuidor" ||
    nameNorm === "ejecutivo"
  ) {
    return "DISTRIBUIDOR";
  }
  if (
    idNorm === "standard" ||
    idNorm === "business" ||
    nameNorm === "empresario" ||
    nameNorm === "distribuidorantiguo"
  ) {
    return "EMPRESARIO";
  }
  if (idNorm === "master" || nameNorm === "master") return "MASTER";
  if (idNorm === "vip" || nameNorm === "vip") return "VIP";
  if (idNorm === "early") return "CLIENTE PREFERENTE";

  if (name) return String(name).toUpperCase();
  if (id && !isPlanUnset(id)) return String(id).toUpperCase();
  return "Sin membresía";
}

/**
 * Varias fuentes como en el API (plan crudo, resuelto, afiliación).
 */
export function resolveMembershipLabel({ planLabel, planRaw, planResolved, plansCatalog, affiliationPlan }) {
  if (!isPlanLabelEmpty(planLabel)) {
    return String(planLabel).toUpperCase();
  }

  const candidates = [planRaw, planResolved, affiliationPlan];
  for (const c of candidates) {
    const admin = adminPlanLabel(c);
    if (admin) return admin;
    const lbl = getPlanDisplayLabel(c, plansCatalog);
    if (!isPlanLabelEmpty(lbl) && lbl !== "Sin membresía") {
      return lbl;
    }
  }

  return "Sin membresía";
}

function norm(val) {
  return String(val || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isPlanUnset(planVal) {
  if (planVal == null || planVal === "") return true;
  if (typeof planVal === "object" && planVal !== null) {
    const rid = planVal.id != null ? planVal.id : planVal.plan_id;
    if (rid == null || rid === "") {
      const nm = planVal.name || planVal.label;
      if (nm != null && String(nm).trim() !== "") return false;
      return true;
    }
    const s = String(rid).trim().toLowerCase();
    return (
      s === "default" || s === "none" || s === "null" || s === "undefined"
    );
  }
  const s = String(planVal).trim().toLowerCase();
  return s === "default" || s === "none" || s === "null" || s === "undefined";
}

function findPlanInCatalog(plansCatalog, { id, name }) {
  if (!Array.isArray(plansCatalog)) return null;
  if (id != null && !isPlanUnset(id)) {
    const row = plansCatalog.find((p) => p && norm(p.id) === norm(id));
    if (row) return row;
  }
  if (name) {
    const row = plansCatalog.find((p) => p && norm(p.name) === norm(name));
    if (row) return row;
  }
  return null;
}
