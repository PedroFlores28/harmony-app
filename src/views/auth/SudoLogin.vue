<template>
  <div class="sudo-login">
    <div class="sudo-login__content">
      <div class="sudo-login__spinner"></div>
      <p class="sudo-login__text">Iniciando sesión...</p>
    </div>
  </div>
</template>

<script>
import storage from "@/utils/storage";

export default {
  name: 'SudoLogin',
  created() {
    this.processLogin();
  },
  methods: {
    processLogin() {
      const q = this.$route.query;

      console.log("SudoLogin: Parámetros recibidos:", q);

      if (!q.session) {
        console.warn("SudoLogin: No hay sesión en la URL, redirigiendo a login");
        this.$router.replace('/login');
        return;
      }

      // Inyectar toda la sesión en el store y storage
      this.$store.commit('SET_SESSION', q.session);
      storage.set('session', q.session);

      if (q.name)      { this.$store.commit('SET_NAME', q.name);           storage.set('name', q.name); }
      if (q.lastName)  { this.$store.commit('SET_LAST_NAME', q.lastName);  storage.set('lastName', q.lastName); }
      if (q.dni)       { this.$store.commit('SET_DNI', q.dni);             storage.set('dni', q.dni); }

      const affiliated = q.affiliated !== 'false';
      this.$store.commit('SET_AFFILIATED', affiliated);
      storage.set('affiliated', String(affiliated));

      console.log("SudoLogin: Sesión inyectada OK. Afiliado:", affiliated);

      // Determinar destino
      const path = q.path || (affiliated ? 'dashboard' : 'affiliation');
      const target = `/${path.replace(/^\//, '')}`;

      console.log("SudoLogin: Redirigiendo a", target);

      // Pequeño delay para asegurar que el store se actualice antes de navegar
      this.$nextTick(() => {
        this.$router.replace(target);
      });
    }
  }
};
</script>

<style scoped>
.sudo-login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #fff;
}

.sudo-login__content {
  text-align: center;
}

.sudo-login__spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #5c0f39;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

.sudo-login__text {
  color: #5c0f39;
  font-family: sans-serif;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
