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
        <!-- Ganancias -->
        <div class="dashboard-row earnings-row">
          <div class="earnings-card">
            <div class="earnings-total">
              <div class="earnings-total-icon">
                <i class="fas fa-wallet"></i>
              </div>
              <div class="earnings-total-content">
                <span class="earnings-total-label">TOTAL GANADO</span>
                <strong>{{ totalEarnedDisplay }}</strong>
                <span class="earnings-total-subtitle">Ganancias acumuladas</span>
              </div>
            </div>

            <div class="earnings-breakdown">
              <div class="earnings-balance-card available">
                <div class="earnings-balance-icon">
                  <i class="fas fa-wallet"></i>
                </div>
                <div>
                  <span class="earnings-balance-label">SALDO DISPONIBLE</span>
                  <strong>{{ availableBalanceDisplay }}</strong>
                  <p>Disponible para retiro</p>
                </div>
              </div>

              <div class="earnings-balance-card unavailable">
                <div class="earnings-balance-icon">
                  <i class="fas fa-lock"></i>
                </div>
                <div>
                  <span class="earnings-balance-label">SALDO NO DISPONIBLE</span>
                  <strong>{{ unavailableBalanceDisplay }}</strong>
                  <p>Bonos retenidos por inactividad</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="dashboard-overview-grid">
          <!-- Rangos -->
          <div class="dashboard-row ranks-summary-row">
            <div class="ranks-summary-card">
              <h3>RANGOS</h3>

              <div class="ranks-summary-inner">
                <div class="rank-summary-item">
                  <span class="rank-summary-label">RANGO ACTUAL</span>
                  <div class="rank-summary-badge current">
                    <img
                      v-if="currentRankImage"
                      :src="currentRankImage"
                      alt="Rango actual"
                    />
                    <i v-else class="fas fa-star"></i>
                  </div>
                  <strong>{{ currentRankDisplayName }}</strong>
                  <p>Rango del periodo actual</p>
                </div>

                <div class="rank-summary-divider"></div>

                <div class="rank-summary-item">
                  <span class="rank-summary-label">RANGO MÁXIMO HISTÓRICO</span>
                  <div class="rank-summary-badge historic">
                    <img
                      v-if="maxRankImage"
                      :src="maxRankImage"
                      alt="Rango máximo histórico"
                    />
                    <i v-else class="fas fa-gem"></i>
                  </div>
                  <strong>{{ maxRankDisplayName }}</strong>
                  <p>Mayor rango alcanzado</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Mi Actividad -->
          <div class="dashboard-row activity-summary-row">
            <div class="activity-summary-card">
              <h3><i class="fas fa-list"></i> MI ACTIVIDAD</h3>

              <div class="activity-summary-grid">
                <div class="activity-box">
                  <span class="activity-box-label">PUNTOS PERSONALES</span>
                  <div class="activity-main-value">
                    <i class="fas fa-user"></i>
                    <strong>{{ points || 0 }}</strong>
                    <small>pts</small>
                  </div>
                  <span
                    class="activity-status-pill"
                    :class="{ inactive: !activated }"
                  >
                    {{ activityStatusText }}
                  </span>
                  <p>Estado actual</p>
                </div>

                <div class="activity-box">
                  <span class="activity-box-label">MEMBRESÍA ACTUAL</span>
                  <div class="activity-membership-icon">
                    <i class="fas fa-crown"></i>
                  </div>
                  <strong class="activity-membership-name">
                    {{ membershipDisplayName }}
                  </strong>
                  <p>Membresía activa</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Mi Red -->
          <div class="dashboard-row network-summary-row">
            <div class="network-summary-card">
              <h3><i class="fas fa-user-friends"></i> MI RED</h3>

              <div class="network-summary-grid">
                <div class="network-box directos">
                  <i class="fas fa-user-friends"></i>
                  <div>
                    <span class="network-box-label">DIRECTOS</span>
                    <strong>{{ directsCount }}</strong>
                    <p>Total de directos</p>
                  </div>
                </div>

                <div class="network-box activos">
                  <i class="fas fa-user-friends"></i>
                  <div>
                    <span class="network-box-label">DIRECTOS ACTIVOS</span>
                    <strong>{{ activeDirectsCount }}</strong>
                    <p>Directos activos</p>
                  </div>
                </div>

                <div class="network-box grupales">
                  <i class="fas fa-network-wired"></i>
                  <div>
                    <span class="network-box-label">PUNTOS GRUPALES</span>
                    <strong>{{ groupPointsDisplay }} <small>pts</small></strong>
                    <p>Total de puntos grupales</p>
                  </div>
                </div>

                <div class="network-box niveles">
                  <i class="fas fa-layer-group"></i>
                  <div>
                    <span class="network-box-label">NIVELES DE PROFUNDIDAD</span>
                    <strong>{{ depthLevels }}</strong>
                    <p>Niveles alcanzados<br />(según tu rango)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Acceso rápido a bonos -->
          <div class="dashboard-row bonus-access-row">
            <div class="bonus-access-card">
              <h3><i class="fas fa-user-friends"></i> ACCESO RÁPIDO A BONOS</h3>

              <div class="bonus-access-grid">
                <button class="bonus-access-item" type="button">
                  <span class="bonus-access-icon">
                    <i class="fas fa-medal"></i>
                  </span>
                  <strong>Rango</strong>
                </button>

                <button class="bonus-access-item" type="button">
                  <span class="bonus-access-icon">
                    <i class="fas fa-plane"></i>
                  </span>
                  <strong>Viaje</strong>
                </button>

                <button class="bonus-access-item" type="button">
                  <span class="bonus-access-icon">
                    <i class="fas fa-car"></i>
                  </span>
                  <strong>Auto</strong>
                </button>

                <button class="bonus-access-item" type="button">
                  <span class="bonus-access-icon">
                    <i class="fas fa-home"></i>
                  </span>
                  <strong>Casa</strong>
                </button>
              </div>

              <button class="bonus-access-all" type="button">
                Ver todos los bonos
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
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
      team: null,
      activated: false,
      rank: "",
      maxRank: "",
      points: null,
      directs: [],
      frontals: [],
      loading: true,
      plans: null,
      plan: null ,
      total_points: null,
      travelBonusText: null,

      op: 1,
      op2: 0,
      op3: 0,
      node: {},
      currentBanner: 0,
      bannerInterval: null,
      rankImages: {},
    };
  },
  computed: {
    session() {
      return this.$store.state.session;
    },
    plan() {
      if (this.$store.state.plan == "early") return "CLIENTE PREFERENTE";
      if (this.$store.state.plan == "basic") return "EJECUTIVO";
      if (this.$store.state.plan == "standard") return "DISTRIBUIDOR";
      if (this.$store.state.plan == "master") return "EMPRESARIO";
      return this.$store.state.plan;
    },
    userPlan() {
      if (!this.plans) return null;
      // Buscar por nombre o id según corresponda
      return this.plans.find(p => p.name === this.plan || p.id === this.plan);
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
    maxRankDisplayName() {
      return this.formatRankName(this.maxRank).toUpperCase();
    },
    currentRankDisplayName() {
      return this.formatRankName(this.rank).toUpperCase();
    },
    availableBalanceDisplay() {
      return this.formatCurrency(this.balance);
    },
    unavailableBalanceDisplay() {
      return this.formatCurrency(this._balance);
    },
    totalEarnedDisplay() {
      return this.formatCurrency(
        this.numberValue(this.balance) + this.numberValue(this._balance)
      );
    },
    activityStatusText() {
      return this.activated ? "ACTIVO" : "INACTIVO";
    },
    membershipDisplayName() {
      return this.plan || "Sin membresía";
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
    // GET data
    const { data } = await api.dashboard(this.session);
    this.loading = false;

    // error
    if (data.error && data.msg == "invalid session") {
      this.$router.push("/login");
      return;
    }

    // success - actualizar store
    this.$store.commit("SET_NAME", data.name);
    this.$store.commit("SET_LAST_NAME", data.lastName);
    this.$store.commit("SET_AFFILIATED", data.affiliated);
    this.$store.commit("SET__ACTIVATED", data._activated);
    this.$store.commit("SET_ACTIVATED", data.activated);
    this.$store.commit("SET_PLAN", data.plan);
    this.$store.commit("SET_COUNTRY", data.country);
    this.$store.commit("SET_PHOTO", data.photo);
    this.$store.commit("SET_TREE", data.tree);
    this.$store.commit("SET_EMAIL", data.email);
    this.$store.commit("SET_TOKEN", data.token);
    this.$store.commit("SET_TOTAL_POINTS", data.total_points);

    // Verificar afiliación
    if (!data.affiliated) {
      this.$router.push("/affiliation");
      return;
    }

    // Cargar datos del dashboard
    this.banner = data.banner;
    this.ins = data.ins;
    this.insVirtual = data.insVirtual;
    this.outs = data.outs ? data.outs.toFixed(2) : "0.00";
    this.balance = data.balance ? data.balance.toFixed(2) : "0.00";
    this._balance = data._balance ? data._balance.toFixed(2) : "0.00";
    this.team = data.team;
    this.activated = Boolean(data.activated);
    this.rank = data.rank || "";
    this.maxRank = data.maxRank || data.rank || "";
    this.points = data.points;
    this.node = data.node || {};
    this.n_affiliates = data.n_affiliates;
    this.directs = data.directs || [];
    this.frontals = data.frontals || [];
    this.total_points = data.total_points;
    this.travelBonusText = data.travelBonusText || 'Tu progreso hacia el Bono Viaje se actualizará próximamente. ¡Sigue trabajando para alcanzar tus objetivos!';

    // Iniciar autoplay del banner si corresponde
    this.setupBannerAutoplay();
    this.loadRankImages();
  },
  beforeDestroy() {
    if (this.bannerInterval) clearInterval(this.bannerInterval);
  },
};
</script>

<style scoped src="../../assets/style/views/app/Dashboard.css"></style>
