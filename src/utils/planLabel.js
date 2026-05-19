/**
 * Etiqueta de plan alineada con Harmony-admin (Users.getPlanLabel) y serve/lib.planDisplayLabel.
 */
export function getPlanDisplayLabel(planVal, plansCatalog) {
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
    if (rid == null || rid === "") return true;
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
    const row = plansCatalog.find(
      (p) => p && norm(p.id) === norm(id)
    );
    if (row) return row;
  }
  if (name) {
    const row = plansCatalog.find(
      (p) => p && norm(p.name) === norm(name)
    );
    if (row) return row;
  }
  return null;
}
