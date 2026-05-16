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
    try {
      // Esperar un poco para que el router se inicialice completamente
      await this.$nextTick();
      
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
        else if (affiliated && this.$route.path === '/affiliation') {
          this.$router.push('/dashboard');
        }
        else if (affiliated && this.$route.path === '/') {
          this.$router.push('/dashboard');
        }
        else if (!affiliated) {
          const allowedRoutesForNonAffiliated = ['/affiliation', '/profile', '/password', '/security', '/checkout', '/activation'];
          if (!allowedRoutesForNonAffiliated.includes(this.$route.path)) {
            this.$router.push('/affiliation');
          }
        }
      } else {
        if (this.$route.path.startsWith('/register/')) {
          // No redirigir
        }
        else if (this.$route.path !== '/login' && this.$route.path !== '/welcome' && this.$route.path !== '/register' && this.$route.path !== '/remember' && this.$route.path !== '/reset-password') {
          this.$router.push('/login');
        }
      }
      
      this.initialized = true;
      
    } catch (error) {
      console.error('AppInitializer: Error durante la inicialización:', error);
      this.initialized = true; // Continuar aunque haya error
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
