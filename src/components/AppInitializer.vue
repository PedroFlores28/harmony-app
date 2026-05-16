<template>
  <div v-if="!initialized" class="app-initializer">
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p>Inicializando aplicación...</p>
    </div>
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AppInitializer',
  data() {
    return {
      initialized: false
    }
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

      if (query.session) {
        console.log("DEBUG [AppInitializer]: Sesión detectada en URL:", query.session);
        this.$store.commit("SET_SESSION", query.session);
        if (query.name) this.$store.commit("SET_NAME", query.name);
        if (query.lastName) this.$store.commit("SET_LAST_NAME", query.lastName);
        if (query.dni) this.$store.commit("SET_DNI", query.dni);
        this.$store.commit("SET_AFFILIATED", query.affiliated !== 'false');
        if (this.$route.params.id || query.office_id) {
          this.$store.commit("SET_OFFICE_ID", { 
            office_id: this.$route.params.id || query.office_id, 
            path: query.path || 'dashboard' 
          });
        }
      }

      await this.$nextTick();
      console.log("DEBUG [AppInitializer]: NextTick completado");
      
      // Verificar si hay una sesión activa con try-catch para iframes
      let session = this.$store.state.session;
      let localAffiliated = null;

      try {
        session = session || localStorage.getItem('session');
        localAffiliated = localStorage.getItem('affiliated');
      } catch (e) {
        console.warn('AppInitializer: LocalStorage blocked', e);
      }
      
      if (session) {
        // Verificar estado de afiliación con mejor sincronización
        let affiliated = null;
        if (this.$store.state.affiliated !== null && this.$store.state.affiliated !== undefined) {
          affiliated = this.$store.state.affiliated;
        } else if (localAffiliated !== null) {
          affiliated = localAffiliated === 'true';
          // Sincronizar el store si no está definido
          try {
            this.$store.commit('SET_AFFILIATED', affiliated);
          } catch (e) {}
        }
        
        // ... resto de la lógica ...
        if (this.$route.path.startsWith('/register/')) {
          // No redirigir
        }
        // PRIORIDAD: Si está en login y ya tiene sesión (por inyección), redirigir al dashboard o path indicado
        else if (this.$route.path.startsWith('/login')) {
          const targetPath = this.$route.query.path || (affiliated ? 'dashboard' : 'affiliation');
          console.log("DEBUG [AppInitializer]: Redirigiendo desde login a:", targetPath);
          this.$router.push(`/${targetPath.replace(/^\//, '')}`);
        }
        else if (affiliated && this.$route.path === '/affiliation') {
          console.log("DEBUG [AppInitializer]: Redirigiendo de affiliation a dashboard");
          this.$router.push('/dashboard');
        }
        else if (affiliated && this.$route.path === '/') {
          console.log("DEBUG [AppInitializer]: Redirigiendo de raíz a dashboard");
          this.$router.push('/dashboard');
        }
        else if (!affiliated) {
          const allowedRoutesForNonAffiliated = ['/affiliation', '/profile', '/password', '/security', '/checkout', '/activation'];
          if (!allowedRoutesForNonAffiliated.includes(this.$route.path)) {
            console.log("DEBUG [AppInitializer]: Usuario no afiliado en ruta no permitida, enviando a affiliation");
            this.$router.push('/affiliation');
          }
        }
      } else {
        // Permitir acceso directo a registro con código de referido sin redireccionar
        if (this.$route.path.startsWith('/register/')) {
          // No redirigir
        }
        // Si no hay sesión y no está en login, redirigir a login
        // Usamos startsWith('/login') para permitir /login/central, etc.
        else if (
          !this.$route.path.startsWith('/login') && 
          this.$route.path !== '/welcome' && 
          this.$route.path !== '/register' && 
          this.$route.path !== '/remember' && 
          this.$route.path !== '/reset-password'
        ) {
          console.log("DEBUG [AppInitializer]: Sin sesión y en ruta protegida, enviando a login");
          this.$router.push('/login');
        }
      }
      
      this.initialized = true;
      
    } catch (error) {
      console.error('AppInitializer: Error durante la inicialización:', error);
      this.initialized = true; // Continuar aunque haya error
    }
  },
  mounted() {
    // 3. Avisar al padre (Admin) que estamos listos para recibir el postMessage
    if (typeof window !== 'undefined' && window.parent !== window) {
      console.log("DEBUG [AppInitializer]: Enviando SIFRAH_IFRAME_READY al padre...");
      window.parent.postMessage({ type: 'SIFRAH_IFRAME_READY' }, '*');
    }
  },
  methods: {
    checkAndRedirect() {
      let session = this.$store.state.session;
      let localAffiliated = null;

      try {
        session = session || localStorage.getItem('session');
        localAffiliated = localStorage.getItem('affiliated');
      } catch (e) {
        console.warn('AppInitializer: LocalStorage blocked', e);
      }
      
      if (session) {
        const affiliated = this.$store.state.affiliated !== null 
          ? this.$store.state.affiliated 
          : (localAffiliated === 'true');
        
        if (this.$route.path.startsWith('/register/')) {
          return;
        }
        
        const allowedRoutesForNonAffiliated = ['/affiliation', '/profile', '/password', '/security', '/checkout', '/activation'];
        if (!affiliated && !allowedRoutesForNonAffiliated.includes(this.$route.path)) {
          this.$router.push('/affiliation');
        }
      }
    }
  }
}
</script>

<style scoped>
.app-initializer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #ff9800;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

.loading-container p {
  color: #666;
  font-size: 16px;
  margin: 0;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
