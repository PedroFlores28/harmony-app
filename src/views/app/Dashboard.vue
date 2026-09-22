<template>
  <App :session="session" :title="title">
    <div v-cloak>
      <!-- Banner slider (mantener el existente) -->
      <div v-if="!loading && bannerImages.length > 0" class="banner-slider">
        <div class="slider-wrapper">
          <transition name="carousel-3d" mode="out-in">
            <div class="banner-slide" :key="currentBanner">
              <img :src="bannerImages[currentBanner]" class="banner-img" />
            </div>
          </transition>
          <button
            v-if="bannerImages.length > 1"
            class="nav left"
            @click="prevBanner"
          >
            &#8592;
          </button>
          <button
            v-if="bannerImages.length > 1"
            class="nav right"
            @click="nextBanner"
          >
            &#8594;
          </button>
        </div>
        <div v-if="bannerImages.length > 1" class="dots">
          <span
            v-for="(img, idx) in bannerImages"
            :key="'dot-' + idx"
            :class="['dot', { active: currentBanner === idx }]"
            @click="goToBanner(idx)"
          ></span>
        </div>
      </div>
      <div v-else-if="!loading" class="no-banners-msg">
        <p>No hay banners para mostrar.</p>
      </div>

      <div v-if="loading" class="loading-container">
        <div class="loading-spinner-large"></div>
        <p>Cargando dashboard...</p>
      </div>
      
      <SkeletonLoader
        v-if="loading"
        :lines="6"
        width="100%"
        height="60px"
        style="margin: 24px 0"
      />

      <!-- Nuevo Dashboard Design -->
      <div v-else class="dashboard-container">
        <!-- Hero: Total ganado + Mayor rango -->
        <div class="dash-hero">
          <div class="dash-hero-card total-earned">
            <div class="dash-hero-icon">
              <i class="fas fa-wallet"></i>
            </div>
            <div class="dash-hero-text">
              <span class="dash-hero-label">TOTAL GANADO</span>
              <strong class="dash-hero-value">{{ totalEarnedDisplay }}</strong>
            </div>
          </div>

          <div class="dash-hero-card max-rank">
            <div class="dash-hero-icon rank">
              <img
                v-if="maxRankImage"
                :src="maxRankImage"
                alt="Mayor rango"
              />
              <i v-else class="fas fa-gem"></i>
            </div>
            <div class="dash-hero-text">
              <span class="dash-hero-label">MAYOR RANGO ALCANZADO</span>
              <strong class="dash-hero-value">{{ maxRankDisplayName }}</strong>
            </div>
          </div>
        </div>

        <!-- Saldos -->
        <section class="dash-section dash-balances-section">
          <div class="dash-balances">
            <div class="dash-balance-card available">
              <span class="dash-tile-icon"><i class="fas fa-wallet"></i></span>
              <div class="dash-balance-text">
                <span class="dash-card-label">SALDO DISPONIBLE</span>
                <strong>{{ availableBalanceDisplay }}</strong>
              </div>
            </div>
            <div class="dash-balance-card unavailable">
              <span class="dash-tile-icon"><i class="fas fa-lock"></i></span>
              <div class="dash-balance-text">
                <span class="dash-card-label">SALDO NO DISPONIBLE</span>
                <strong>{{ unavailableBalanceDisplay }}</strong>
              </div>
            </div>
          </div>
        </section>

        <!-- Este periodo -->
        <section class="dash-section">
          <h3 class="dash-section-title">ESTE PERIODO</h3>
          <div class="dash-period-grid">
            <div class="dash-period-card live-rank">
              <span class="dash-tile-icon"><i class="fas fa-bolt"></i></span>
              <div class="dash-period-text">
                <span class="dash-card-label">RANGO EN VIVO</span>
                <strong>{{ liveRankDisplayName }}</strong>
              </div>
            </div>
            <div class="dash-period-card residual">
              <span class="dash-tile-icon"><i class="fas fa-chart-line"></i></span>
              <div class="dash-period-text">
                <span class="dash-card-label">RESIDUAL ESTIMADO</span>
                <strong>{{ estimatedResidualDisplay }}</strong>
                <span class="dash-pill provisional">PROVISIONAL</span>
              </div>
            </div>
            <div class="dash-period-card monthly-pts">
              <span class="dash-tile-icon"><i class="fas fa-calendar-check"></i></span>
              <div class="dash-period-text">
                <span class="dash-card-label">PUNTOS MENSUALES</span>
                <strong>{{ points || 0 }} <small>pts</small></strong>
                <span
                  class="dash-pill"
                  :class="activated ? 'active' : 'inactive'"
                >{{ activityStatusText }}</span>
              </div>
            </div>
            <div class="dash-period-card affiliation-pts">
              <span class="dash-tile-icon"><i class="fas fa-handshake"></i></span>
              <div class="dash-period-text">
                <span class="dash-card-label">PUNTOS AFILIACIÓN</span>
                <strong>{{ affiliation_points || 0 }} <small>pts</small></strong>
              </div>
            </div>
          </div>
        </section>

        <!-- Puntaje por rango (indicador visual del periodo) -->
        <div class="dash-rank-points-card">
          <span class="dash-tile-icon"><i class="fas fa-layer-group"></i></span>
          <div class="dash-rank-points-text">
            <span class="dash-card-label">PUNTAJE POR RANGO</span>
            <strong>{{ rankPointsDisplay }} <small>pts</small></strong>
            <span class="dash-rank-points-legend">{{ rankPointsLegend }}</span>
          </div>
        </div>

        <!-- Rango cierre + Membresía -->
        <div class="dash-status-panel">
          <div class="dash-status-item closing-rank">
            <div class="dash-status-icon">
              <img
                v-if="currentRankImage"
                :src="currentRankImage"
                alt="Rango último cierre"
              />
              <i v-else class="fas fa-star"></i>
            </div>
            <div class="dash-status-text">
              <span class="dash-card-label">RANGO DEL ÚLTIMO CIERRE</span>
              <strong>{{ currentRankDisplayName }}</strong>
            </div>
          </div>
          <div class="dash-status-item membership">
            <div class="dash-status-icon crown">
              <i class="fas fa-crown"></i>
            </div>
            <div class="dash-status-text">
              <span class="dash-card-label">MEMBRESÍA</span>
              <strong>{{ membershipDisplayName }}</strong>
            </div>
          </div>
        </div>

        <!-- Mi Red -->
        <section class="dash-section">
          <h3 class="dash-section-title">MI RED</h3>
          <div class="dash-network-grid">
            <div class="dash-network-card directs">
              <span class="dash-network-icon"><i class="fas fa-users"></i></span>
              <div class="dash-network-text">
                <span class="dash-card-label">DIRECTOS</span>
                <strong>{{ directsCount }}</strong>
              </div>
            </div>
            <div class="dash-network-card activos">
              <span class="dash-network-icon"><i class="fas fa-users"></i></span>
              <div class="dash-network-text">
                <span class="dash-card-label">DIRECTOS ACTIVOS</span>
                <strong>{{ activeDirectsCount }}</strong>
              </div>
            </div>
            <div
              class="dash-network-card grupales"
              @click="$router.push('/tree')"
            >
              <span class="dash-network-icon"><i class="fas fa-sitemap"></i></span>
              <div class="dash-network-text">
                <span class="dash-card-label">PUNTOS GRUPALES</span>
                <strong>{{ groupPointsDisplay }} <small>pts</small></strong>
              </div>
            </div>
            <div class="dash-network-card organizacion">
              <span class="dash-network-icon"><i class="fas fa-sitemap"></i></span>
              <div class="dash-network-text">
                <span class="dash-card-label">MI ORGANIZACIÓN</span>
                <strong>{{ n_affiliates || 0 }}</strong>
              </div>
            </div>
          </div>
        </section>

        <!-- Acceso rápido a bonos -->
        <section class="dash-section bonus-section">
          <h3 class="dash-section-title">
            <i class="fas fa-gift"></i> ACCESO RÁPIDO A BONOS
          </h3>
          <div class="dash-bonus-grid">
            <button
              class="dash-bonus-item"
              type="button"
              @click="$router.push('/bonuses')"
            >
              <span class="dash-bonus-icon"><i class="fas fa-medal"></i></span>
              <strong>Rango</strong>
            </button>
            <button
              class="dash-bonus-item"
              type="button"
              @click="$router.push('/bonuses')"
            >
              <span class="dash-bonus-icon"><i class="fas fa-plane"></i></span>
              <strong>Viaje</strong>
            </button>
            <button
              class="dash-bonus-item"
              type="button"
              @click="$router.push('/bonuses')"
            >
              <span class="dash-bonus-icon"><i class="fas fa-car"></i></span>
              <strong>Auto</strong>
            </button>
            <button
              class="dash-bonus-item"
              type="button"
              @click="$router.push('/bonuses')"
            >
              <span class="dash-bonus-icon"><i class="fas fa-home"></i></span>
              <strong>Casa</strong>
            </button>
          </div>
          <button
            class="dash-bonus-all"
            type="button"
            @click="$router.push('/bonuses')"
          >
            Ver todos los bonos
            <i class="fas fa-arrow-right"></i>
          </button>
        </section>
      </div>
    </div>
  </App>
</template>

<script>
import App from "@/views/layouts/App";
import api from "@/api";
import Spinner from "@/components/Spinner.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import {
  RANK_POSITIONS,
  normalizeRankKey,
  rankFilter,
  rankImageKey as getRankImageKey,
} from "@/utils/rankFilter";
import {
  resolveMembershipLabel,
  isPlanLabelEmpty,
} from "@/utils/planLabel";

export default {
  components: {
    App,
    Spinner,
    SkeletonLoader,
  },
  data() {
    return {
      banner: { img: null },
      ins: null,
      outs: null,
      balance: null,
      _balance: null,
      estimatedResidual: null,
      rankPoints: 0,
      rankPointsDepth: 0,
      team: null,
      activated: false,
      rank: "",
      maxRank: "",
      liveRank: "",
      points: null,
      affiliation_points: null,
      directs: [],
      frontals: [],
      n_affiliates: 0,
      loading: true,
      plans: null,
      total_points: null,
      travelBonusText: null,

      op: 1,
      op2: 0,
      op3: 0,
      node: {},
      currentBanner: 0,
      bannerInterval: null,
      rankImages: {},
      /** Evita parpadeo plan vs store: mismo valor que devuelve /app/dashboard */
      dashboardPlanSnapshot: null,
      /** Etiqueta calculada en API (misma lógica que admin) */
      dashboardPlanLabel: null,
      /** Nombre listo para la card (prioridad sobre planLabel) */
      membershipName: null,
      /** Plan crudo en BD (user.plan), como en tabla admin */
      dashboardUserPlanRaw: null,
      dashboardAffiliationPlan: null,
    };
  },
  computed: {
    session() {
      return this.$store.state.session;
    },
    /** Plan tal como viene del último GET dashboard (preferido sobre store hasta hidratar). */
    effectivePlanRaw() {
      const snap = this.dashboardPlanSnapshot;
      if (snap !== null && snap !== undefined && snap !== "") {
        return snap;
      }
      return this.$store.state.plan;
    },
    resolvedPlanId() {
      const raw = this.effectivePlanRaw;
      if (raw == null || raw === "") return null;
      if (typeof raw === "object" && raw !== null) {
        const id = raw.id || raw.plan_id;
        const idNorm = id != null ? String(id).trim().toLowerCase() : "";
        if (!idNorm || idNorm === "default") return null;
        return String(id);
      }
      const s = String(raw).trim().toLowerCase();
      if (s === "default" || s === "none") return null;
      return String(raw);
    },
    membershipDisplayName() {
      return resolveMembershipLabel({
        membershipName: this.membershipName,
        planLabel: this.dashboardPlanLabel,
        planRaw: this.dashboardUserPlanRaw != null ? this.dashboardUserPlanRaw : this.effectivePlanRaw,
        planResolved: this.dashboardPlanSnapshot != null ? this.dashboardPlanSnapshot : this.effectivePlanRaw,
        plansCatalog: this.plans,
        affiliationPlan: this.dashboardAffiliationPlan,
      });
    },
    membershipSubtitle() {
      const label = String(this.membershipDisplayName || "").toUpperCase();
      if (label === "SIN MEMBRESÍA" || label === "SIN MEMBRESIA") {
        return this.$store.state.affiliated
          ? "Afiliación sin plan sincronizado en tu cuenta"
          : "Sin plan de afiliación";
      }
      return "Plan de afiliación activo";
    },
    title() {
      return "Dashboard";
    },
    bannerImages() {
      return [this.banner.img, this.banner.img2, this.banner.img3].filter(
        (img) => typeof img === "string" && img.trim() !== ""
      );
    },
    maxRankImage() {
      if (!this.rankImages || !this.maxRank) return null;
      const rankKey = this.rankImageKey(this.maxRank);
      return this.rankImages[rankKey] || null;
    },
    currentRankImage() {
      if (!this.rankImages || !this.rank) return null;
      const rankKey = this.rankImageKey(this.rank);
      return this.rankImages[rankKey] || null;
    },
    liveRankImage() {
      if (!this.rankImages || !this.liveRank) return null;
      const rankKey = this.rankImageKey(this.liveRank);
      return this.rankImages[rankKey] || null;
    },
    maxRankDisplayName() {
      return this.formatRankName(this.maxRank).toUpperCase();
    },
    currentRankDisplayName() {
      return this.formatRankName(this.rank).toUpperCase();
    },
    liveRankDisplayName() {
      return this.formatRankName(this.liveRank).toUpperCase();
    },
    availableBalanceDisplay() {
      return this.formatCurrency(this.balance);
    },
    unavailableBalanceDisplay() {
      return this.formatCurrency(this._balance);
    },
    estimatedResidualDisplay() {
      return this.formatCurrency(this.estimatedResidual || 0);
    },
    totalEarnedDisplay() {
      // Total histórico de ingresos; si no hay dato, fallback a saldos actuales
      if (this.ins !== null && this.ins !== undefined && this.ins !== "") {
        return this.formatCurrency(this.ins);
      }
      return this.formatCurrency(
        this.numberValue(this.balance) + this.numberValue(this._balance)
      );
    },
    activityStatusText() {
      return this.activated ? "ACTIVO" : "INACTIVO";
    },
    directsCount() {
      return Array.isArray(this.directs) ? this.directs.length : 0;
    },
    activeDirectsCount() {
      if (!Array.isArray(this.directs)) return 0;
      return this.directs.filter((direct) => {
        return Boolean(direct.activated) || this.numberValue(direct.points) >= 180;
      }).length;
    },
    groupPointsDisplay() {
      return this.numberValue(this.total_points).toLocaleString("en-US", {
        maximumFractionDigits: 0,
      });
    },
    rankPointsDisplay() {
      return this.numberValue(this.rankPoints).toLocaleString("en-US", {
        maximumFractionDigits: 0,
      });
    },
    rankPointsLegend() {
      const depth = this.numberValue(this.rankPointsDepth);
      const key = normalizeRankKey(this.liveRank);
      const hasNamedRank =
        key &&
        key !== "SIN_RANGO" &&
        key !== "NONE" &&
        String(this.liveRank).trim().toLowerCase() !== "none";

      if (hasNamedRank) {
        const rankName = this.formatRankName(this.liveRank);
        return `Según tu rango ${rankName} en vivo · hasta el nivel ${depth}`;
      }

      return `Según tu rango en vivo · hasta el nivel ${depth}`;
    },
    depthLevels() {
      const levels = {
        SIN_RANGO: 3,
        MILLONARIO: 5,
        ORO: 5,
        ESMERALDA: 6,
        PLATINO: 7,
        DIAMANTE: 8,
        DIAMANTE_AZUL: 9,
        DIAMANTE_EJECUTIVO: 10,
        DOBLE_DIAMANTE: 11,
        DIAMANTE_CORONA: 12,
        TOP_HARMONY: 30,
      };
      const rank = normalizeRankKey(this.maxRank || this.rank);
      return levels[rank] || 0;
    },
  },
  filters: {
    _rank(val) {
      return rankFilter(val);
    },
  },
  methods: {
    nextBanner() {
      this.currentBanner = (this.currentBanner + 1) % this.bannerImages.length;
    },
    prevBanner() {
      this.currentBanner =
        (this.currentBanner - 1 + this.bannerImages.length) %
        this.bannerImages.length;
    },
    goToBanner(idx) {
      this.currentBanner = idx;
    },
    setupBannerAutoplay() {
      // Reiniciar cualquier intervalo previo
      if (this.bannerInterval) {
        clearInterval(this.bannerInterval);
        this.bannerInterval = null;
      }
      // Iniciar autoplay solo si hay más de una imagen
      if (this.bannerImages.length > 1) {
        this.bannerInterval = setInterval(() => {
          // Proteger contra longitud 0
          if (this.bannerImages.length > 0) {
            this.nextBanner();
          }
        }, 5000);
      }
    },
    async loadRankImages() {
      try {
        const { data } = await api.RankImages.GET(this.session);
        if (data && data.rankImages) {
          this.rankImages = data.rankImages;
        }
      } catch (error) {
        console.error("Error fetching rank images:", error);
      }
    },
    rankImageKey(rank) {
      return getRankImageKey(rank);
    },
    rankPosition(rank) {
      const key = normalizeRankKey(rank);
      return RANK_POSITIONS[key] !== undefined ? RANK_POSITIONS[key] : -1;
    },
    formatRankName(rank) {
      const formatRank = this.$options.filters._rank;
      return formatRank ? formatRank(rank) : "Sin rango";
    },
    hasMaxRank() {
      return this.rankPosition(this.maxRank) > -1;
    },
    numberValue(value) {
      const n = Number(value);
      return Number.isFinite(n) ? n : 0;
    },
    formatCurrency(value) {
      return `S/ ${this.numberValue(value).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    },
  },
  async created() {
    const planUnset = (p) => {
      if (p == null || p === "") return true;
      const raw =
        typeof p === "object" && p !== null
          ? p.id !== undefined && p.id !== null
            ? p.id
            : p.plan_id
          : p;
      if (raw == null || raw === "") return true;
      return String(raw).trim().toLowerCase() === "default";
    };

    const { data } = await api.dashboard(this.session);

    let payload = data || {};

    if (payload.error && payload.msg == "invalid session") {
      this.loading = false;
      this.$router.push("/login");
      return;
    }

    let affiliationPlan = null;
    if (payload.affiliated) {
      try {
        const { data: aff } = await api.Afiliation.GET(this.session);
        if (aff && !aff.error) {
          if (aff.affiliation && aff.affiliation.plan) {
            affiliationPlan = aff.affiliation.plan;
          }
          if (planUnset(payload.plan) && aff.plan != null && !planUnset(aff.plan)) {
            const p = aff.plan;
            const normalized =
              typeof p === "object" &&
              p !== null &&
              (p.id != null || p.plan_id != null)
                ? p.id != null
                  ? p.id
                  : p.plan_id
                : p;
            payload = { ...payload, plan: normalized };
          }
          if (isPlanLabelEmpty(payload.planLabel) && aff.planLabel) {
            payload = { ...payload, planLabel: aff.planLabel };
          }
          if (isPlanLabelEmpty(payload.membershipName) && aff.planLabel) {
            payload = { ...payload, membershipName: aff.planLabel };
          }
        }
      } catch (_) {
        /* segunda fuente opcional */
      }
    }

    this.dashboardPlanSnapshot = payload.plan;
    this.dashboardUserPlanRaw =
      payload.userPlanRaw != null ? payload.userPlanRaw : null;
    this.dashboardAffiliationPlan = affiliationPlan;
    this.dashboardPlanLabel = !isPlanLabelEmpty(payload.planLabel)
      ? String(payload.planLabel).toUpperCase()
      : null;
    this.membershipName = !isPlanLabelEmpty(payload.membershipName)
      ? String(payload.membershipName).toUpperCase()
      : null;

    if (payload.affiliated && isPlanLabelEmpty(this.membershipName)) {
      try {
        const { data: prof } = await api.Profile.GET(this.session);
        if (prof && !prof.error) {
          if (prof.userPlanRaw != null) {
            this.dashboardUserPlanRaw = prof.userPlanRaw;
          }
          if (!isPlanLabelEmpty(prof.membershipName)) {
            this.membershipName = String(prof.membershipName).toUpperCase();
          } else if (!isPlanLabelEmpty(prof.planLabel)) {
            this.membershipName = String(prof.planLabel).toUpperCase();
          }
        }
      } catch (_) {
        /* perfil opcional */
      }
    }

    // success - actualizar store
    this.$store.commit("SET_NAME", payload.name);
    this.$store.commit("SET_LAST_NAME", payload.lastName);
    this.$store.commit("SET_AFFILIATED", payload.affiliated);
    this.$store.commit("SET__ACTIVATED", payload._activated);
    this.$store.commit("SET_ACTIVATED", payload.activated);
    this.$store.commit("SET_PLAN", payload.plan);
    this.$store.commit("SET_COUNTRY", payload.country);
    this.$store.commit("SET_PHOTO", payload.photo);
    this.$store.commit("SET_TREE", payload.tree);
    this.$store.commit("SET_EMAIL", payload.email);
    this.$store.commit("SET_TOKEN", payload.token);
    this.$store.commit("SET_TOTAL_POINTS", payload.total_points);

    this.plans = payload.plans || [];

    const resolved = resolveMembershipLabel({
      membershipName: this.membershipName,
      planLabel: this.dashboardPlanLabel,
      planRaw: this.dashboardUserPlanRaw != null ? this.dashboardUserPlanRaw : payload.plan,
      planResolved: payload.plan,
      plansCatalog: this.plans,
      affiliationPlan: this.dashboardAffiliationPlan,
    });
    if (!isPlanLabelEmpty(resolved) && resolved !== "Sin membresía") {
      this.membershipName = resolved;
    }

    // Verificar afiliación
    if (!payload.affiliated) {
      this.loading = false;
      this.$router.push("/affiliation");
      return;
    }

    // Cargar datos del dashboard
    this.banner = payload.banner;
    this.ins = payload.ins;
    this.insVirtual = payload.insVirtual;
    this.outs = payload.outs ? payload.outs.toFixed(2) : "0.00";
    this.balance = payload.balance ? payload.balance.toFixed(2) : "0.00";
    this._balance = payload._balance ? payload._balance.toFixed(2) : "0.00";
    this.estimatedResidual =
      payload.estimatedResidual !== undefined && payload.estimatedResidual !== null
        ? payload.estimatedResidual
        : 0;
    this.rankPoints =
      payload.rankPoints !== undefined && payload.rankPoints !== null
        ? payload.rankPoints
        : 0;
    this.rankPointsDepth =
      payload.rankPointsDepth !== undefined && payload.rankPointsDepth !== null
        ? payload.rankPointsDepth
        : 0;
    this.team = payload.team;
    this.activated = Boolean(payload.activated);
    this.rank = payload.rank || "";
    this.maxRank = payload.maxRank || payload.rank || "";
    this.liveRank = payload.liveRank || payload.rank || "";
    this.points = payload.points;
    this.affiliation_points = payload.affiliation_points;
    this.node = payload.node || {};
    this.n_affiliates = payload.n_affiliates;
    this.directs = payload.directs || [];
    this.frontals = payload.frontals || [];
    this.total_points = payload.total_points;
    this.travelBonusText =
      payload.travelBonusText ||
      "Tu progreso hacia el Bono Viaje se actualizará próximamente. ¡Sigue trabajando para alcanzar tus objetivos!";

    // Iniciar autoplay del banner si corresponde
    this.setupBannerAutoplay();
    this.loadRankImages();
    this.loading = false;
  },
  beforeDestroy() {
    if (this.bannerInterval) clearInterval(this.bannerInterval);
  },
};
</script>

<style src="../../assets/style/views/app/Dashboard.css"></style>
