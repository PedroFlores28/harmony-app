<template>
  <App :session="session" :office_id="office_id" title="Materiales">
    <Spinner v-if="loading" :size="40" :color="'#086eb6'" />
    
    <div v-if="!loading" class="materials-view-container">
      <!-- Header -->
      <div class="materials-header">
        <h2 class="materials-title">Herramientas</h2>
        <p class="materials-subtitle">Recursos útiles para el negocio</p>
      </div>

      <!-- Two-Column Responsive Grid -->
      <div class="materials-grid">
        <!-- Card 1: Presentación -->
        <div class="material-card">
          <div class="card-thumbnail presentation-bg">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="thumbnail-svg">
              <rect x="8" y="12" width="48" height="32" rx="4" fill="white" fill-opacity="0.2"/>
              <path d="M6 10H58V42C58 44.2091 56.2091 46 54 46H10C7.79086 46 6 44.2091 6 42V10Z" stroke="white" stroke-width="3"/>
              <line x1="32" y1="46" x2="32" y2="54" stroke="white" stroke-width="4" stroke-linecap="round"/>
              <line x1="20" y1="54" x2="44" y2="54" stroke="white" stroke-width="4" stroke-linecap="round"/>
              <path d="M18 20L32 34L46 20" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="card-content">
            <h5 class="card-title">Presentación</h5>
            <p class="card-text">Descarga y comparte la presentación oficial de Harmony.</p>
          </div>
          <a :href="presentationLink" target="_blank" class="ver-button">Ver</a>
        </div>

        <!-- Card 2: Catálogo de productos -->
        <div class="material-card">
          <div class="card-thumbnail catalog-bg">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="thumbnail-svg">
              <path d="M12 10H32V54H12C9.79086 54 8 52.2091 8 50V14C8 11.7909 9.79086 10 12 10Z" fill="white" fill-opacity="0.2" stroke="white" stroke-width="3"/>
              <path d="M32 10H52C54.2091 10 56 11.7909 56 14V50C56 52.2091 54.2091 54 52 54H32V10Z" fill="white" fill-opacity="0.1" stroke="white" stroke-width="3"/>
              <path d="M16 20H24" stroke="white" stroke-width="3" stroke-linecap="round"/>
              <path d="M16 28H24" stroke="white" stroke-width="3" stroke-linecap="round"/>
              <path d="M16 36H24" stroke="white" stroke-width="3" stroke-linecap="round"/>
              <path d="M40 20H48" stroke="white" stroke-width="3" stroke-linecap="round"/>
              <path d="M40 28H48" stroke="white" stroke-width="3" stroke-linecap="round"/>
              <path d="M40 36H48" stroke="white" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="card-content">
            <h5 class="card-title">Catálogo de productos</h5>
            <p class="card-text">Explora nuestro catálogo completo de productos.</p>
          </div>
          <a :href="toolsLink" target="_blank" class="ver-button">Ver</a>
        </div>

        <!-- Card 3: Testimonios de Producto -->
        <div class="material-card">
          <div class="card-thumbnail product-testimonials-bg">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="thumbnail-svg">
              <path d="M32 12C20 12 10 20 10 32C10 38 12.5 43 17 46.5L14 54L22.5 50.5C25.5 51.5 28.5 52 32 52C44 52 54 44 54 32C54 20 44 12 32 12Z" fill="white" fill-opacity="0.2" stroke="white" stroke-width="3" stroke-linejoin="round"/>
              <path d="M22 30L29 36L42 22" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="card-content">
            <h5 class="card-title">Testimonios de Producto</h5>
            <p class="card-text">Mira y comparte los mejores testimonios de producto.</p>
          </div>
          <a :href="videosLink" target="_blank" class="ver-button">Ver</a>
        </div>

        <!-- Card 4: Testimonios de Negocio -->
        <div class="material-card">
          <div class="card-thumbnail business-testimonials-bg">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="thumbnail-svg">
              <rect x="8" y="16" width="48" height="32" rx="6" fill="white" fill-opacity="0.2" stroke="white" stroke-width="3"/>
              <circle cx="24" cy="28" r="5" stroke="white" stroke-width="3"/>
              <path d="M14 42C14 37 18 36 24 36C30 36 34 37 34 42" stroke="white" stroke-width="3" stroke-linecap="round"/>
              <line x1="38" y1="24" x2="48" y2="24" stroke="white" stroke-width="3" stroke-linecap="round"/>
              <line x1="38" y1="32" x2="48" y2="32" stroke="white" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="card-content">
            <h5 class="card-title">Testimonios de Negocio</h5>
            <p class="card-text">Descubre los testimonios de negocio.</p>
          </div>
          <a :href="videosLink" target="_blank" class="ver-button">Ver</a>
        </div>

        <!-- Card 5: Hoja de Precios -->
        <div class="material-card">
          <div class="card-thumbnail price-sheet-bg">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="thumbnail-svg">
              <rect x="8" y="8" width="48" height="48" rx="6" fill="white" fill-opacity="0.2" stroke="white" stroke-width="3"/>
              <line x1="8" y1="22" x2="56" y2="22" stroke="white" stroke-width="2"/>
              <line x1="8" y1="36" x2="56" y2="36" stroke="white" stroke-width="2"/>
              <line x1="26" y1="8" x2="26" y2="56" stroke="white" stroke-width="2"/>
              <circle cx="17" cy="15" r="2" fill="white"/>
              <circle cx="17" cy="29" r="2" fill="white"/>
              <circle cx="17" cy="46" r="2" fill="white"/>
              <line x1="34" y1="29" x2="46" y2="29" stroke="white" stroke-width="3" stroke-linecap="round"/>
              <line x1="34" y1="46" x2="46" y2="46" stroke="white" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="card-content">
            <h5 class="card-title">Hoja de Precios</h5>
            <p class="card-text">Consulta la hoja de precios actualizada.</p>
          </div>
          <a :href="presentationLink" target="_blank" class="ver-button">Ver</a>
        </div>

        <!-- Card 6: Productos -->
        <div class="material-card">
          <div class="card-thumbnail products-bg">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="thumbnail-svg">
              <rect x="18" y="24" width="28" height="28" rx="4" fill="white" fill-opacity="0.2" stroke="white" stroke-width="3"/>
              <path d="M24 24V16C24 11.5817 27.5817 8 32 8C36.4183 8 40 11.5817 40 16V24" stroke="white" stroke-width="3" stroke-linecap="round"/>
              <circle cx="32" cy="38" r="6" stroke="white" stroke-width="3"/>
            </svg>
          </div>
          <div class="card-content">
            <h5 class="card-title">Productos</h5>
            <p class="card-text">Accede a la lista de compras de productos disponibles.</p>
          </div>
          <a :href="toolsLink" target="_blank" class="ver-button">Ver</a>
        </div>

        <!-- Card 7: Herramientas Harmony Corp -->
        <div class="material-card">
          <div class="card-thumbnail tools-corp-bg">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="thumbnail-svg">
              <path d="M32 10C20 10 10 20 10 32C10 37.5 12 42.5 15.5 46.5L12 56L22 52.5C25 53.5 28.5 54 32 54C44 54 54 44 54 32C54 20 44 10 32 10Z" fill="white" fill-opacity="0.2" stroke="white" stroke-width="3" stroke-linejoin="round"/>
              <path d="M24 24C28 22 36 22 40 24C42 26 42 32 40 34C38 36 34 38 32 40V44" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="card-content">
            <h5 class="card-title">Herramientas Harmony Corp</h5>
            <p class="card-text">Encuentra útiles herramientas para tu negocio.</p>
          </div>
          <a :href="toolsLink" target="_blank" class="ver-button">Ver</a>
        </div>

        <!-- Card 8: Anuncios Harmony Corp -->
        <div class="material-card">
          <div class="card-thumbnail announcements-bg">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="thumbnail-svg">
              <path d="M12 20H20L36 8V56L20 44H12C9.79086 44 8 42.2091 8 40V24C8 21.7909 9.79086 20 12 20Z" fill="white" fill-opacity="0.2" stroke="white" stroke-width="3" stroke-linejoin="round"/>
              <path d="M44 22C47 25 49 28.5 49 32C49 35.5 47 39 44 42" stroke="white" stroke-width="3" stroke-linecap="round"/>
              <path d="M52 14C57 19 60 25 60 32C60 39 57 45 52 50" stroke="white" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="card-content">
            <h5 class="card-title">Anuncios Harmony Corp</h5>
            <p class="card-text">Accede a los anuncios y recursos de marketing.</p>
          </div>
          <a :href="toolsLink" target="_blank" class="ver-button">Ver</a>
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
      presentationLink: "https://drive.google.com/drive/folders/1qwooLRceDXMxMr3I_Sm2K6QpUQmyJoZ5?usp=share_link",
      toolsLink: "https://drive.google.com/drive/folders/12Vd2jVrn7QUNhe3G0NTideUfK4NiI5mK?usp=share_link",
      videosLink: "https://drive.google.com/drive/folders/1aUs465WhQnoOPl6cMeHgnLT9j8wZz6IG?usp=share_link"
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
      const { data } = await api.tools(this.session);
      this.loading = false;

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
    } catch (e) {
      console.error("Error loading user info in materials", e);
      this.loading = false;
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
}

.thumbnail-svg {
  width: 44px;
  height: 44px;
}

/* Premium Gradient Backgrounds for Icons */
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
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: #333333;
  margin-bottom: 6px;
}

.card-text {
  font-size: 13px;
  color: #777777;
  line-height: 1.4;
  margin: 0;
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
