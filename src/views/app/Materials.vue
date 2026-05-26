<template>
  <App :session="session" :office_id="office_id" title="Materiales">
    <Spinner v-if="loading" :size="40" :color="'#086eb6'" />
    
    <div v-if="!loading" class="materials-view-container">
      <!-- Header -->
      <div class="materials-header">
        <h2 class="materials-title">Herramientas</h2>
        <p class="materials-subtitle">Recursos útiles para el negocio</p>
      </div>

      <!-- No materials registered fallback -->
      <div v-if="materials.length === 0" class="no-materials-container">
        <span class="icon is-large has-text-grey-light" style="font-size: 3rem;">
          <i class="fas fa-folder-open"></i>
        </span>
        <p class="title is-5 mt-4">No hay materiales disponibles</p>
        <p class="subtitle is-6 has-text-grey">Tu administrador actualizará los recursos descargables muy pronto.</p>
      </div>

      <!-- Two-Column Dynamic Grid -->
      <div v-else class="materials-grid">
        <div v-for="(material, index) in materials" :key="material.id" class="material-card">
          <!-- Thumbnail Cover Image or Fallback SVG Gradient -->
          <div class="card-thumbnail" :class="getCardBgClass(index)">
            <img v-if="material.img" :src="material.img" alt="Portada de material" class="card-img" />
            
            <!-- Fallback SVG based on index to keep vector art styling -->
            <svg v-else viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="thumbnail-svg">
              <rect x="8" y="12" width="48" height="32" rx="4" fill="white" fill-opacity="0.2"/>
              <path d="M6 10H58V42C58 44.2091 56.2091 46 54 46H10C7.79086 46 6 44.2091 6 42V10Z" stroke="white" stroke-width="3"/>
              <line x1="32" y1="46" x2="32" y2="54" stroke="white" stroke-width="4" stroke-linecap="round"/>
              <line x1="20" y1="54" x2="44" y2="54" stroke="white" stroke-width="4" stroke-linecap="round"/>
            </svg>
          </div>
          
          <!-- Card content -->
          <div class="card-content">
            <h5 class="card-title">{{ material.title }}</h5>
            <p class="card-text">{{ material.description }}</p>
          </div>
          
          <!-- Download / View Button -->
          <a v-if="material.link" :href="material.link" target="_blank" class="ver-button">Ver</a>
        </div>
      </div>
    </div>
  </App>
</template>

<script>
import App from "@/views/layouts/App";
import Spinner from "@/components/Spinner.vue";
import api from "@/api";

export default {
  name: "Materials",
  components: {
    App,
    Spinner
  },
  data() {
    return {
      loading: true,
      materials: []
    };
  },
  computed: {
    session() {
      return this.$store.state.session;
    },
    office_id() {
      return this.$store.state.office_id;
    }
  },
  async created() {
    try {
      // Validate session and sync user details
      const { data } = await api.tools(this.session);
      
      if (data.error && data.msg === "invalid session") {
        this.$router.push("/login");
        return;
      }
      if (data.error && data.msg === "unverified user") {
        this.$router.push("/verify");
        return;
      }

      this.$store.commit("SET_NAME", data.name);
      this.$store.commit("SET_LAST_NAME", data.lastName);
      this.$store.commit("SET_AFFILIATED", data.affiliated);
      this.$store.commit("SET_ACTIVATED", data.activated);
      this.$store.commit("SET__ACTIVATED", data._activated);
      this.$store.commit("SET_PLAN", data.plan);
      this.$store.commit("SET_COUNTRY", data.country);
      this.$store.commit("SET_PHOTO", data.photo);
      this.$store.commit("SET_TREE", data.tree);

      // Fetch dynamic materials list
      const res = await api.materials(this.session);
      this.materials = res.data.materials || [];
      
      this.loading = false;
    } catch (e) {
      console.error("Error loading user info in materials", e);
      this.loading = false;
    }
  },
  methods: {
    getCardBgClass(index) {
      const bgs = [
        "presentation-bg",
        "catalog-bg",
        "product-testimonials-bg",
        "business-testimonials-bg",
        "price-sheet-bg",
        "products-bg",
        "tools-corp-bg",
        "announcements-bg"
      ];
      return bgs[index % bgs.length];
    }
  }
};
</script>

<style scoped>
.materials-view-container {
  padding: 24px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.materials-header {
  margin-bottom: 32px;
  text-align: left;
}

.materials-title {
  font-size: 28px;
  font-weight: 700;
  color: #333333;
  margin-bottom: 6px;
}

.materials-subtitle {
  font-size: 15px;
  color: #777777;
}

.no-materials-container {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px dashed #cccccc;
  margin-top: 24px;
}

.materials-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.material-card {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid #f2f2f2;
  padding: 18px;
  transition: all 0.3s ease;
  text-align: left;
}

.material-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.card-thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  margin-right: 18px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-svg {
  width: 44px;
  height: 44px;
}

/* Premium Gradient Backgrounds for Fallback Icons */
.presentation-bg {
  background: linear-gradient(135deg, #7A1A4E 0%, #450B2B 100%);
}

.catalog-bg {
  background: linear-gradient(135deg, #10b981 0%, #047857 100%);
}

.product-testimonials-bg {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
}

.business-testimonials-bg {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

.price-sheet-bg {
  background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%);
}

.products-bg {
  background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%);
}

.tools-corp-bg {
  background: linear-gradient(135deg, #14b8a6 0%, #0f766e 100%);
}

.announcements-bg {
  background: linear-gradient(135deg, #f43f5e 0%, #be123c 100%);
}

.card-content {
  flex-grow: 1;
  padding-right: 16px;
  overflow: hidden;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: #333333;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-text {
  font-size: 13px;
  color: #777777;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Premium Pill "Ver" button in deep Harmony brand wine color */
.ver-button {
  background-color: #450B2B;
  color: #ffffff !important;
  padding: 8px 24px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.2s ease;
  flex-shrink: 0;
  border: none;
  cursor: pointer;
  text-align: center;
}

.ver-button:hover {
  background-color: #5C0F39;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(8C, 15, 57, 0.2);
}

@media (max-width: 1024px) {
  .materials-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }
}
</style>
