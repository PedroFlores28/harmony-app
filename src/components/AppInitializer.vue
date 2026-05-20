<template>
  <div class="app-initializer">
    <div v-if="!initialized" class="app-loader">
      <div class="loader-content">
        <div class="logo-spinner"></div>
        <p>Cargando Harmony...</p>
      </div>
    </div>
    <slot v-else />
  </div>
</template>

<script>
import storage from "@/utils/storage";

export default {
  name: 'AppInitializer',
  data() {
    return {
      initialized: false
    };
  },
  async created() {
    // 1. Escuchar mensajes del padre (Admin) para Sudo Login (Vía PostMessage)
    if (typeof window !== 'undefined') {
      window.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SIFRAH_SUDO_LOGIN') {
          console.log("DEBUG [AppInitializer]: Mensaje postMessage recibido:", event.data);
          const { session, user, officeId, path } = event.data;
          
          if (session) {
            this.$store.commit("SET_SESSION", session);
            if (user) {
              if (user.name) this.$store.commit("SET_NAME", user.name);
              if (user.lastName) this.$store.commit("SET_LAST_NAME", user.lastName);
              if (user.dni) this.$store.commit("SET_DNI", user.dni);
              this.$store.commit("SET_AFFILIATED", user.affiliated !== false);
            }
            if (officeId) {
              this.$store.commit("SET_OFFICE_ID", { office_id: officeId, path: path || 'dashboard' });
            }
            
            const target = path || (user && user.affiliated !== false ? 'dashboard' : 'affiliation');
            console.log("DEBUG [AppInitializer]: Redirigiendo vía postMessage a:", target);
            this.$router.push(`/${target.replace(/^\//, '')}`);
          }
        }
      });
    }

    try {
      // 2. Capturar parámetros de la URL (Vía Query Params)
      let query = { ...this.$route.query };
      
      if (Object.keys(query).length === 0 && typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.forEach((value, key) => { query[key] = value; });
      }

      console.log("DEBUG [AppInitializer]: Parámetros en URL:", query);

      if (query.session) {
        console.log("DEBUG [AppInitializer]: Inyectando sesión desde URL...");
        this.$store.commit("SET_SESSION", query.session);
        if (query.name) this.$store.commit("SET_NAME", query.name);
        if (query.lastName) this.$store.commit("SET_LAST_NAME", query.lastName);
        if (query.dni) this.$store.commit("SET_DNI", query.dni);
        
        const isAffiliated = query.affiliated !== 'false';
        this.$store.commit("SET_AFFILIATED", isAffiliated);
        
        const officeId = this.$route.params.id || query.office_id;
        if (officeId) {
          this.$store.commit("SET_OFFICE_ID", { 
            office_id: officeId, 
            path: query.path || 'dashboard' 
          });
        }
      }

      await this.$nextTick();
      
      // Verificar sesión activa usando storage seguro
      let session = this.$store.state.session || storage.get('session');
      let affiliated = this.$store.state.affiliated;
      
      if (affiliated === null) {
        const localAffiliated = storage.get('affiliated');
        if (localAffiliated !== null) {
          affiliated = localAffiliated === 'true';
        }
      }

      console.log("DEBUG [AppInitializer]: Estado final:", { hasSession: !!session, affiliated });
      
      if (session) {
        if (this.$route.path.startsWith('/register/')) {
          // No redirigir
        }
        else if (this.$route.path.startsWith('/login')) {
          const targetPath = this.$route.query.path || (affiliated ? 'dashboard' : 'affiliation');
          console.log("DEBUG [AppInitializer]: Redirigiendo desde login a:", targetPath);
          this.$router.push(`/${targetPath.replace(/^\//, '')}`);
        }
        else if (affiliated && (this.$route.path === '/affiliation' || this.$route.path === '/')) {
          this.$router.push('/dashboard');
        }
        else if (!affiliated) {
          const allowedRoutes = ['/affiliation', '/profile', '/password', '/security', '/checkout', '/activation'];
          if (!allowedRoutes.includes(this.$route.path)) {
            this.$router.push('/affiliation');
          }
        }
      } else {
        if (
          !this.$route.path.startsWith('/login') && 
          this.$route.path !== '/sudo-login' &&
          this.$route.path !== '/welcome' && 
          this.$route.path !== '/register' && 
          this.$route.path !== '/remember' && 
          this.$route.path !== '/reset-password' &&
          !this.$route.path.startsWith('/register/')
        ) {
          console.log('AppInitializer: Sin sesión, redirigiendo a /login desde', this.$route.path);
          this.$router.push('/login');
        }
      }
      
      this.initialized = true;
    } catch (error) {
      console.error('AppInitializer Error:', error);
      this.initialized = true;
    }
  },
  mounted() {
    if (typeof window !== 'undefined' && window.parent !== window) {
      window.parent.postMessage({ type: 'SIFRAH_IFRAME_READY' }, '*');
    }
  }
};
</script>

<style scoped>
.app-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.loader-content {
  text-align: center;
}
.logo-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #5c0f39;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 15px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
