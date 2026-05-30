import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import GAuth from "vue-google-oauth2";
import storage from "@/utils/storage";
import api from "./api";

function performLogout(store) {
  document
    .querySelectorAll(".affiliation-required-notification, .affiliation-notification")
    .forEach((notification) => {
      if (notification.parentElement) {
        notification.remove();
      }
    });

  const session = (store && store.state.session) || storage.get("session");
  const office = storage.get("office");
  const officeId = storage.get("office_id");
  const path = storage.get("path");

  if (session) {
    api.logout(session).catch(() => {});
  }

  if (store) {
    store.dispatch("clearState");
    store.commit("setCartItems", []);
    store.commit("clearAffiliationCheckout");
  }

  storage.clear();

  try {
    sessionStorage.clear();
  } catch (error) {
    // noop
  }

  let target = "/login";
  if (office === "true" && officeId) {
    target = `/login/${officeId}?path=${encodeURIComponent(path || "")}`;
  }

  window.location.replace(target);
}

Vue.config.productionTip = false;

const gauthOption = {
  clientId:
    "511469100162-s6f2f9qbkr533hbvaoevbr6m0mhfdrvk.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "select_account",
};
Vue.use(GAuth, gauthOption);

// Global Mixin para logout y scroll
Vue.mixin({
  mounted() {
    // Scroll hacia arriba cuando se monta cualquier componente
    this.scrollToTop();
    
    // Scroll adicional después de que el DOM esté completamente cargado
    this.$nextTick(() => {
      setTimeout(() => {
        this.scrollToTop();
      }, 200);
    });
  },
  
  methods: {
    // Método helper para scroll hacia arriba
    scrollToTop() {
      // Método más agresivo para móviles
      try {
        // Método 1: Scroll inmediato
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Método 2: Para contenedores con scroll
        const scrollableElements = document.querySelectorAll('[style*="overflow"], .scrollable, .content');
        scrollableElements.forEach(el => {
          if (el.scrollTop > 0) {
            el.scrollTop = 0;
          }
        });
        
        // Método 3: Scroll suave para móviles
        if (window.scrollTo) {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto'
          });
        }
        
        // Método 4: Forzar scroll en el viewport
        if (window.pageYOffset > 0) {
          window.scrollTo(0, 0);
        }
        
        console.log('Scroll to top ejecutado');
      } catch (error) {
        console.warn('Error en scrollToTop:', error);
      }
    },
    
    logout() {
      performLogout(this.$store);
    },
    logout2() {
      performLogout(this.$store);
    },
  },
  
  // Watcher para cambios de ruta
  watch: {
    '$route': {
      handler(to, from) {
        // Scroll hacia arriba cuando cambia la ruta
        this.$nextTick(() => {
          setTimeout(() => {
            this.scrollToTop();
          }, 100);
        });
      },
      immediate: false,
      deep: true
    }
  }
});

// Modo oscuro/claro toggle
function setTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    storage.set("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    storage.set("theme", "light");
  }
}

// Inicializar tema al cargar
const savedTheme =
  storage.get("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
setTheme(savedTheme);

// Método global para cambiar tema
document.setTheme = setTheme;

// Función para inicializar la aplicación después de restaurar el estado
async function initializeApp() {
  try {
    // Restaurar el estado del store antes de crear la instancia de Vue
    await store.dispatch('restoreState');
    
    // Crear la instancia de Vue después de restaurar el estado
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  } catch (error) {
    console.error('Error al inicializar la aplicación:', error);
    // Crear la instancia de Vue incluso si hay error
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
}

// Inicializar la aplicación
initializeApp();
