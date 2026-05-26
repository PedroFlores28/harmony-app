<template>
  <App :session="session" :office_id="office_id" title="Materiales de Apoyo">
    <Spinner v-if="loading" :size="40" :color="'#086eb6'" />
    
    <div v-if="!loading" class="materials-view-container">
      <div class="materials-header">
        <h4 class="materials-title">MATERIALES DE APOYO</h4>
        <p class="materials-subtitle">Descarga las herramientas oficiales y recursos gráficos para hacer crecer tu negocio.</p>
      </div>

      <div class="materials-grid">
        <!-- Card 1: Presentaciones -->
        <div class="material-card">
          <div class="card-icon-container presentation-bg">
            <i class="fas fa-file-powerpoint"></i>
          </div>
          <div class="card-body">
            <h5 class="card-title">Presentación Oficial</h5>
            <p class="card-text">Obtén la presentación corporativa oficial de Harmony en formato PDF y PowerPoint. Ideal para tus reuniones individuales o eventos masivos.</p>
            <a :href="presentationLink" target="_blank" class="download-button presentation-btn">
              <span class="icon"><i class="fas fa-download"></i></span>
              <span>Descargar Presentación</span>
            </a>
          </div>
        </div>

        <!-- Card 2: Carpeta de Herramientas -->
        <div class="material-card">
          <div class="card-icon-container tools-bg">
            <i class="fas fa-folder-open"></i>
          </div>
          <div class="card-body">
            <h5 class="card-title">Carpeta de Recursos</h5>
            <p class="card-text">Accede a imágenes promocionales, logotipos oficiales en alta calidad, y herramientas gráficas listas para tus publicaciones en redes sociales.</p>
            <a :href="toolsLink" target="_blank" class="download-button tools-btn">
              <span class="icon"><i class="fas fa-download"></i></span>
              <span>Abrir Carpeta</span>
            </a>
          </div>
        </div>

        <!-- Card 3: Videos Audiovisuales -->
        <div class="material-card">
          <div class="card-icon-container videos-bg">
            <i class="fas fa-video"></i>
          </div>
          <div class="card-body">
            <h5 class="card-title">Videos y Testimonios</h5>
            <p class="card-text">Descarga videos informativos de nuestros productos, testimonios reales de líderes de Harmony y tutoriales explicativos del negocio.</p>
            <a :href="videosLink" target="_blank" class="download-button videos-btn">
              <span class="icon"><i class="fas fa-play-circle"></i></span>
              <span>Ver Videos</span>
            </a>
          </div>
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
  padding: 24px 16px;
  max-width: 1200px;
  margin: 0 auto;
}

.materials-header {
  margin-bottom: 32px;
  text-align: left;
}

.materials-title {
  font-size: 24px;
  font-weight: 700;
  color: #450B2B;
  margin-bottom: 8px;
}

.materials-subtitle {
  font-size: 15px;
  color: #666;
  max-width: 600px;
}

.materials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

.material-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.material-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.card-icon-container {
  padding: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
}

.presentation-bg {
  background: linear-gradient(135deg, #f53f3f 0%, #b81414 100%);
  color: #ffffff;
}

.tools-bg {
  background: linear-gradient(135deg, #ff9800 0%, #e65100 100%);
  color: #ffffff;
}

.videos-bg {
  background: linear-gradient(135deg, #2196f3 0%, #0d47a1 100%);
  color: #ffffff;
}

.card-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-title {
  font-size: 18px;
  font-weight: 650;
  color: #333333;
  margin-bottom: 12px;
  text-align: left;
}

.card-text {
  font-size: 14px;
  color: #666666;
  line-height: 1.5;
  margin-bottom: 24px;
  flex-grow: 1;
  text-align: left;
}

.download-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.presentation-btn {
  background-color: #f53f3f;
  color: #ffffff;
}

.presentation-btn:hover {
  background-color: #d32f2f;
}

.tools-btn {
  background-color: #ff9800;
  color: #ffffff;
}

.tools-btn:hover {
  background-color: #f57c00;
}

.videos-btn {
  background-color: #2196f3;
  color: #ffffff;
}

.videos-btn:hover {
  background-color: #1976d2;
}

@media (max-width: 768px) {
  .materials-grid {
    grid-template-columns: 1fr;
  }
}
</style>
