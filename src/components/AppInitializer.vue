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
      
      // Verificar si hay una sesión activa
      const session = this.$store.state.session || localStorage.getItem('session');
      
      if (session) {
        
        // Verificar estado de afiliación con mejor sincronización
        let affiliated = null;
        if (this.$store.state.affiliated !== null && this.$store.state.affiliated !== undefined) {
          affiliated = this.$store.state.affiliated;
        } else {
          const localAffiliated = localStorage.getItem('affiliated');
          affiliated = localAffiliated === 'true';
          // Sincronizar el store si no está definido
          if (affiliated !== null) {
            this.$store.commit('SET_AFFILIATED', affiliated);
          }
        }
        
        // Permitir acceso a registro con código de referido incluso con sesión activa
        if (this.$route.path.startsWith('/register/')) {
          // No redirigir
        }
        // Si está afiliado y está en la página de afiliación, redirigir al dashboard
        else if (affiliated && this.$route.path === '/affiliation') {
          this.$router.push('/dashboard');
        }
        // Si está afiliado y está en la raíz, redirigir al dashboard
        else if (affiliated && this.$route.path === '/') {
          this.$router.push('/dashboard');
        }
        // Solo redirigir si es necesario y no estamos ya en la ruta correcta
        // Permitir acceso a checkout y activation para que usuarios nuevos puedan pagar su paquete de afiliación
        else if (!affiliated) {
          const allowedRoutesForNonAffiliated = ['/affiliation', '/profile', '/password', '/security', '/checkout', '/activation'];
          if (!allowedRoutesForNonAffiliated.includes(this.$route.path)) {
            this.$router.push('/affiliation');
          }
        }
      } else {
        
        // Permitir acceso directo a registro con código de referido sin redireccionar
        if (this.$route.path.startsWith('/register/')) {
          // No redirigir
        }
        // Si no hay sesión y no está en login, redirigir a login
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
  
  // También verificar cuando cambie la ruta
  watch: {
    '$route'(to, from) {
      
      // Solo verificar si ya está inicializado
      if (this.initialized) {
        this.checkAndRedirect();
      }
    }
  },
  
  methods: {
    checkAndRedirect() {
      const session = this.$store.state.session || localStorage.getItem('session');
      
      if (session) {
        const affiliated = this.$store.state.affiliated !== null 
          ? this.$store.state.affiliated 
          : (localStorage.getItem('affiliated') === 'true');
        
        // Permitir acceso a registro con código de referido incluso con sesión activa
        if (this.$route.path.startsWith('/register/')) {
          // No redirigir
          return;
        }
        
        // Si no está afiliado y no está en una ruta permitida
        // Permitir acceso a checkout y activation para que usuarios nuevos puedan pagar su paquete de afiliación
        const allowedRoutesForNonAffiliated = ['/affiliation', '/profile', '/password', '/security', '/checkout', '/activation'];
        if (!affiliated && !allowedRoutesForNonAffiliated.includes(this.$route.path)) {
          this.$router.push('/affiliation');
        }
        // IMPORTANTE: NO redirigir usuarios afiliados desde afiliación
        // Ellos pueden querer acceder para hacer upgrade o ver historial
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
