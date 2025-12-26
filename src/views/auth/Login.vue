<template>
  <Auth>
    <section>
      <div style="display: flex; justify-content: center">
        <router-link
          to="/login"
          class="tab-login"
          :class="{ active: $route.path === '/login' }"
        >
          INICIO
        </router-link>
        <router-link
          to="/register"
          class="tab-login"
          :class="{ active: $route.path === '/register' }"
        >
          REGISTRO
        </router-link>
      </div>

      <div class="welcome-title-form">
        <h1>BIENVENIDO</h1>
      </div>

      <div class="login-inputs-container">
        <div class="input-group">
          <label class="label-login-2" for="dni">Usuario:</label>
          <div class="input-wrapper" style="position: relative; display: inline-block;">
            <input
              id="dni"
              class="input"
              style="border: solid 2px #0476D9; padding-right: 40px; border-radius: 0;"
              placeholder="Usuario"
              oninput="this.value=this.value.replace(/(?![0-9])./gmi,'')"
              v-model="dni"
              :class="{ error: error.dni }"
              @keydown="reset('dni')"
            />
            <svg
              class="dni-icon"
              width="24"
              height="24"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.25 7.58337C19.25 10.4779 16.8945 12.8334 14 12.8334C11.1055 12.8334 8.75 10.4779 8.75 7.58337C8.75 4.68887 11.1055 2.33337 14 2.33337C16.8945 2.33337 19.25 4.68887 19.25 7.58337ZM4.66667 24.5H3.5V23.3334C3.5 18.8312 7.1645 15.1667 11.6667 15.1667H16.3333C20.8367 15.1667 24.5 18.8312 24.5 23.3334V24.5H4.66667Z" fill="#05AFF2"/>
            </svg>
          </div>
        </div>

        <div v-if="!office_id" class="input-group">
          <label class="label-login" for="password">Contraseña:</label>
          <div class="input-wrapper" style="position: relative; display: inline-block;">
            <input
              id="password"
              :type="show ? 'text' : 'password'"
              class="input pass"
              style="border: solid 2px #0476D9; padding-right: 40px; border-radius: 0;"
              placeholder="*************"
              v-model="password"
              :class="{ error: error.password }"
              @keydown="reset('password')"
            />
            <svg 
              class="show" 
              width="24" 
              height="24" 
              viewBox="0 0 28 28" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              @click="show = !show"
            >
              <path d="M14 17.5C13.0717 17.5 12.1815 17.1313 11.5251 16.4749C10.8687 15.8185 10.5 14.9283 10.5 14C10.5 13.0717 10.8687 12.1815 11.5251 11.5251C12.1815 10.8687 13.0717 10.5 14 10.5C14.9282 10.5 15.8185 10.8687 16.4748 11.5251C17.1312 12.1815 17.5 13.0717 17.5 14C17.5 14.9283 17.1312 15.8185 16.4748 16.4749C15.8185 17.1313 14.9282 17.5 14 17.5ZM14 8.16667C12.4529 8.16667 10.9691 8.78125 9.87517 9.87521C8.78121 10.9692 8.16663 12.4529 8.16663 14C8.16663 15.5471 8.78121 17.0308 9.87517 18.1248C10.9691 19.2188 12.4529 19.8333 14 19.8333C15.5471 19.8333 17.0308 19.2188 18.1248 18.1248C19.2187 17.0308 19.8333 15.5471 19.8333 14C19.8333 12.4529 19.2187 10.9692 18.1248 9.87521C17.0308 8.78125 15.5471 8.16667 14 8.16667ZM14 22.75C8.16663 22.75 3.18496 19.1217 1.16663 14C3.18496 8.87833 8.16663 5.25 14 5.25C19.8333 5.25 24.815 8.87833 26.8333 14C24.815 19.1217 19.8333 22.75 14 22.75Z" fill="#05AFF2"/>
            </svg>
          </div>
        </div>
      </div>
      <br />

      <p class="alert">{{ alert | alert }}</p>

      <button class="login-button" v-show="!sending" @click="submit">
        Iniciar sesión
      </button>
      <button class="button" v-show="sending" disabled>
        Validando datos ...
      </button>
      <br /><br />

     <!-- <button class="google-login-btn" id="g_id_signin"></button> -->
     <!-- <br /><br /> -->

      <small style="color: #89888D; margin-top: 8px; display: block;"
        >¿Olvidaste tu contraseña?
        <router-link to="/remember" style="color: #0476D9"
          >Ingresa Aquí</router-link
        ></small
      >
      <br /><br />
    </section>
    <footer>
      <br />
      <header>
        <div class="social">
          <a
            class="social-icon facebook"
            :href="fb"
            target="_blank"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="13" fill="#05C7F2" fill-opacity="0.6"/>
              <path d="M32 20C32 13.3708 26.6248 8 20 8C13.3708 8 8 13.3708 8 20C8 25.988 12.3868 30.953 18.125 31.8522V23.4695H15.0778V20.0007H18.125V17.3555C18.125 14.3488 19.9138 12.6883 22.6558 12.6883C23.969 12.6883 25.3438 12.9223 25.3438 12.9223V15.875H23.828C22.34 15.875 21.875 16.8013 21.875 17.75V20H25.2028L24.668 23.4688H21.875V31.8515C27.6087 30.9522 32 25.9872 32 19.9992V20Z" fill="white"/>
            </svg>
          </a>
          <a
            class="social-icon youtube"
            :href="yt"
            target="_blank"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="13" fill="#05C7F2" fill-opacity="0.6"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M20 12.15C18.809 12.15 17.42 12.178 16.066 12.216L16.011 12.218C14.633 12.257 13.521 12.288 12.645 12.433C11.732 12.584 10.974 12.873 10.368 13.496C9.76 14.121 9.495 14.894 9.37 15.819C9.25 16.709 9.25 17.837 9.25 19.239V20.763C9.25 22.163 9.25 23.291 9.37 24.182C9.494 25.107 9.76 25.88 10.368 26.505C10.974 27.129 11.732 27.417 12.645 27.568C13.521 27.713 14.633 27.744 16.011 27.783L16.066 27.785C17.421 27.823 18.809 27.851 20 27.851C21.191 27.851 22.58 27.823 23.934 27.785L23.989 27.783C25.367 27.744 26.479 27.713 27.355 27.568C28.268 27.417 29.026 27.128 29.632 26.505C30.24 25.88 30.506 25.107 30.63 24.182C30.75 23.292 30.75 22.164 30.75 20.762V19.238C30.75 17.837 30.75 16.709 30.63 15.819C30.506 14.894 30.24 14.121 29.632 13.496C29.026 12.872 28.268 12.584 27.355 12.433C26.479 12.288 25.367 12.257 23.988 12.218L23.934 12.216C22.623 12.1762 21.3116 12.1542 20 12.15ZM18.872 22.651C18.758 22.7162 18.6288 22.7502 18.4975 22.7498C18.3661 22.7493 18.2372 22.7144 18.1236 22.6485C18.01 22.5826 17.9157 22.488 17.8501 22.3742C17.7846 22.2604 17.75 22.1314 17.75 22V18C17.75 17.8687 17.7846 17.7397 17.8501 17.6259C17.9157 17.5121 18.01 17.4175 18.1236 17.3516C18.2372 17.2856 18.3661 17.2507 18.4975 17.2503C18.6288 17.2498 18.758 17.2839 18.872 17.349L22.372 19.349C22.4867 19.4146 22.582 19.5094 22.6484 19.6237C22.7147 19.7381 22.7496 19.8679 22.7496 20C22.7496 20.1322 22.7147 20.262 22.6484 20.3763C22.582 20.4906 22.4867 20.5854 22.372 20.651L18.872 22.651Z" fill="white"/>
            </svg>
          </a>
          <a
            class="social-icon tiktok"
            :href="tk"
            target="_blank"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="13" fill="#05C7F2" fill-opacity="0.6"/>
              <path d="M24.9834 13.305C24.243 12.4595 23.8349 11.3738 23.835 10.25H20.4875V23.6833C20.4623 24.4105 20.1555 25.0993 19.632 25.6046C19.1086 26.1099 18.4093 26.3921 17.6817 26.3917C16.1434 26.3917 14.865 25.135 14.865 23.575C14.865 21.7117 16.6634 20.3142 18.5159 20.8883V17.465C14.7784 16.9667 11.5067 19.87 11.5067 23.575C11.5067 27.1825 14.4967 29.75 17.6709 29.75C21.0725 29.75 23.835 26.9875 23.835 23.575V16.7608C25.1925 17.7357 26.8222 18.2587 28.4934 18.2558V14.9083C28.4934 14.9083 26.4567 15.0058 24.9834 13.305Z" fill="white"/>
            </svg>
          </a>
          <a
            class="social-icon whatsapp"
            :href="wsp_pe"
            target="_blank"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="13" fill="#05C7F2" fill-opacity="0.6"/>
              <path d="M27.6375 12.3192C26.6441 11.3161 25.4611 10.5208 24.1573 9.97958C22.8535 9.43834 21.455 9.16201 20.0433 9.16668C14.1283 9.16668 9.30749 13.9875 9.30749 19.9025C9.30749 21.7984 9.80583 23.64 10.7375 25.265L9.22083 30.8334L14.9083 29.3384C16.4792 30.1942 18.245 30.6492 20.0433 30.6492C25.9583 30.6492 30.7792 25.8284 30.7792 19.9134C30.7792 17.0425 29.6633 14.345 27.6375 12.3192ZM20.0433 28.8292C18.44 28.8292 16.8692 28.3959 15.4933 27.5834L15.1683 27.3884L11.7883 28.2767L12.6875 24.9834L12.4708 24.6475C11.5798 23.2252 11.1068 21.5809 11.1058 19.9025C11.1058 14.9842 15.1142 10.9759 20.0325 10.9759C22.4158 10.9759 24.6583 11.9075 26.3375 13.5975C27.1691 14.425 27.8281 15.4094 28.2763 16.4936C28.7244 17.5778 28.9529 18.7402 28.9483 19.9134C28.97 24.8317 24.9617 28.8292 20.0433 28.8292ZM24.94 22.1559C24.6692 22.0259 23.3475 21.3759 23.1092 21.2784C22.86 21.1917 22.6867 21.1484 22.5025 21.4084C22.3183 21.6792 21.8092 22.2859 21.6575 22.4592C21.5058 22.6434 21.3433 22.665 21.0725 22.5242C20.8017 22.3942 19.935 22.1017 18.9167 21.1917C18.115 20.4767 17.5842 19.5992 17.4217 19.3284C17.27 19.0575 17.4 18.9167 17.5408 18.7759C17.66 18.6567 17.8117 18.4617 17.9417 18.31C18.0717 18.1584 18.1258 18.0392 18.2125 17.8659C18.2992 17.6817 18.2558 17.53 18.1908 17.4C18.1258 17.27 17.5842 15.9484 17.3675 15.4067C17.1508 14.8867 16.9233 14.9517 16.7608 14.9409H16.2408C16.0567 14.9409 15.775 15.0059 15.5258 15.2767C15.2875 15.5475 14.5942 16.1975 14.5942 17.5192C14.5942 18.8409 15.5583 20.1192 15.6883 20.2925C15.8183 20.4767 17.5842 23.185 20.2708 24.3442C20.91 24.6259 21.4083 24.7884 21.7983 24.9075C22.4375 25.1134 23.0225 25.0809 23.4883 25.0159C24.0083 24.94 25.0808 24.3659 25.2975 23.7375C25.525 23.1092 25.525 22.5784 25.4492 22.4592C25.3733 22.34 25.2108 22.2859 24.94 22.1559Z" fill="white"/>
            </svg>
          </a>
        </div>
        <br />
        <div class="login-link">
          <small style="color: #89888D; margin-top: -14px; display: block;">
            ¿No tienes cuenta?
            <router-link
              to="/register"
              style="color: #0476D9; text-decoration: none"
              >Regístrate</router-link
            >
          </small>
        </div>
      </header>
    </footer>
  </Auth>
</template>

<script>
import Auth from "@/views/layouts/Auth";
import api from "@/api";

export default {
  components: { Auth },
  data() {
    return {
      // username:    null,
      dni: null,
      password: null,
      error: {
        // username:     false,
        dni: false,
        password: false,
      },
      sending: false,
      alert: null,
      show: false,

      office_id: null,
      path: null,
    };
  },
  computed: {
    // social
    fb() {
      return this.$store.state.fb;
    },
    is() {
      return this.$store.state.is;
    },
    tk() {
      return this.$store.state.tk;
    },
    yt() {
      return this.$store.state.yt;
    },
    wsp_pe() {
      return this.$store.state.wsp_pe;
    },
    wsp_bo() {
      return this.$store.state.wsp_bo;
    },
  },
  filters: {
    alert(msg) {
      // if (msg == 'user not found')   return 'El usuario no existe'
      if (msg == "dni not found") return "El documento no existe";
      if (msg == "invalid password") return "Contraseña incorrecta";
    },
  },
  created() {
    this.office_id = this.$route.params.id;
    this.path = this.$route.query.path;
    console.log({ office_id: this.office_id, path: this.path });

    if (this.office_id) {
      this.password = "8QfghvCxuzxrbvii4w";
    } else {
      localStorage.removeItem("office");
      localStorage.removeItem("path");
    }

    setTimeout(() => {
      const logoAuth = document.getElementById("logo-auth");
      console.log(logoAuth);
      logoAuth.style.order = 0;

      const contentAuth = document.getElementById("content-auth");
      console.log(contentAuth);
      contentAuth.style.order = 1;
    }, 100);
  },
  mounted() {
    // Cargar el script de Google Identity Services si no está presente
    if (!window.google || !window.google.accounts) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = this.renderGoogleButton;
      document.head.appendChild(script);
    } else {
      this.renderGoogleButton();
    }
  },
  methods: {
    renderGoogleButton() {
      if (
        window.google &&
        window.google.accounts &&
        window.google.accounts.id
      ) {
        window.google.accounts.id.initialize({
          client_id:
            "511469100162-s6f2f9qbkr533hbvaoevbr6m0mhfdrvk.apps.googleusercontent.com",
          callback: this.handleGoogleCredentialResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("g_id_signin"),
          { theme: "outline", size: "large", text: "signin_with", width: 200 }
        );
      }
    },
    async handleGoogleCredentialResponse(response) {
      try {
        const id_token = response.credential;
        const { data } = await api.loginWithGoogle(id_token);
        if (data.error) {
          this.alert = data.msg;
          return;
        }
        
        // Establecer sesión
        this.$store.commit("SET_SESSION", data.session);
        
        // Establecer información del usuario
        if (data.name) this.$store.commit("SET_NAME", data.name);
        if (data.lastName) this.$store.commit("SET_LAST_NAME", data.lastName);
        if (data.email) this.$store.commit("SET_EMAIL", data.email);
        if (data.photo) this.$store.commit("SET_PHOTO", data.photo);
        if (data.plan) this.$store.commit("SET_PLAN", data.plan);
        if (data.total_points !== undefined) this.$store.commit("SET_TOTAL_POINTS", data.total_points);
        
        // Establecer estado de afiliación
        this.$store.commit("SET_AFFILIATED", data.affiliated);
        
        // Redirigir según el estado de afiliación
        if (data.affiliated) {
          this.$router.push("/dashboard");
        } else {
          this.$router.push("/affiliation");
        }
      } catch (e) {
        alert("Error al iniciar sesión con Google");
      }
    },
    async submit() {
      const { dni, password, office_id, path } = this;

      // Validar campos
      if (!dni) {
        return (this.error.dni = true);
      }
      if (!password) {
        return (this.error.password = true);
      }

      this.sending = true;

      try {
        const { data } = await api.login({ dni, password, office_id });
        this.sending = false;

        if (data.error) {
          this.alert = data.msg;
          return;
        }

        // Establecer sesión primero
        this.$store.commit("SET_SESSION", data.session);
        
        // Si es usuario de oficina, establecer office_id
        if (office_id) {
          this.$store.commit("SET_OFFICE_ID", { office_id, path });
        }

        // SOLUCIÓN: Si no tenemos información completa del usuario, hacer llamada adicional
        if (data.affiliated === undefined || data.affiliated === null) {
          try {
            // Hacer llamada al API de afiliación para obtener información completa
            const userData = await api.Afiliation.GET(data.session);
            
            if (userData.data.error) {
              this.alert = "Error al obtener información del usuario";
              return;
            }
            
            // Usar la información completa del usuario
            const userInfo = userData.data;
            
            // Establecer información del usuario
            if (userInfo.name) this.$store.commit("SET_NAME", userInfo.name);
            if (userInfo.lastName) this.$store.commit("SET_LAST_NAME", userInfo.lastName);
            if (userInfo.email) this.$store.commit("SET_EMAIL", userInfo.email);
            if (userInfo.photo) this.$store.commit("SET_PHOTO", userInfo.photo);
            if (userInfo.plan) this.$store.commit("SET_PLAN", userInfo.plan);
            if (userInfo.total_points !== undefined) this.$store.commit("SET_TOTAL_POINTS", userInfo.total_points);
            
            // Establecer estado de afiliación y otros campos
            this.$store.commit("SET_AFFILIATED", userInfo.affiliated);
            
            if (userInfo.tree !== undefined) this.$store.commit("SET_TREE", userInfo.tree);
            if (userInfo.activated !== undefined) this.$store.commit("SET_ACTIVATED", userInfo.activated);
            if (userInfo._activated !== undefined) this.$store.commit("SET__ACTIVATED", userInfo._activated);
            if (userInfo.country) this.$store.commit("SET_COUNTRY", userInfo.country);
            if (userInfo.balance !== undefined) this.$store.commit("SET_BALANCE", userInfo.balance);
            if (userInfo._balance !== undefined) this.$store.commit("SET__BALANCE", userInfo._balance);
            
          } catch (userError) {
            this.alert = "Error al obtener información del usuario";
            return;
          }
        } else {
          // Si ya tenemos la información completa, usarla directamente
          // Establecer información del usuario
          if (data.name) this.$store.commit("SET_NAME", data.name);
          if (data.lastName) this.$store.commit("SET_LAST_NAME", data.lastName);
          if (data.email) this.$store.commit("SET_EMAIL", data.email);
          if (data.photo) this.$store.commit("SET_PHOTO", data.photo);
          if (data.plan) this.$store.commit("SET_PLAN", data.plan);
          if (data.total_points !== undefined) this.$store.commit("SET_TOTAL_POINTS", data.total_points);
          
          // Establecer estado de afiliación y otros campos
          this.$store.commit("SET_AFFILIATED", data.affiliated);
          
          if (data.tree !== undefined) this.$store.commit("SET_TREE", data.tree);
          if (data.activated !== undefined) this.$store.commit("SET_ACTIVATED", data.activated);
          if (data._activated !== undefined) this.$store.commit("SET__ACTIVATED", data._activated);
          if (data.country) this.$store.commit("SET_COUNTRY", data.country);
          if (data.balance !== undefined) this.$store.commit("SET_BALANCE", data.balance);
          if (data._balance !== undefined) this.$store.commit("SET__BALANCE", data._balance);
        }

        // IMPORTANTE: Esperar a que TODOS los valores del store se establezcan
        console.log('Login: Estableciendo estado del store...');
        
        // Esperar múltiples ticks para asegurar que el store esté completamente actualizado
        await this.$nextTick();
        await this.$nextTick();
        await this.$nextTick();
        
        // Verificar que el estado se haya establecido correctamente
        console.log('Login: Estado después de commit:', {
          session: this.$store.state.session,
          affiliated: this.$store.state.affiliated,
          localStorage: {
            session: localStorage.getItem('session'),
            affiliated: localStorage.getItem('affiliated')
          }
        });

        // Verificar que affiliated esté correctamente establecido
        if (this.$store.state.affiliated === null || this.$store.state.affiliated === undefined) {
          console.error('Login: ERROR - affiliated no se estableció correctamente');
          console.log('Login: Reintentando establecer affiliated...');
          // Intentar obtener el valor desde localStorage como fallback
          const localAffiliated = localStorage.getItem('affiliated');
          if (localAffiliated !== null) {
            this.$store.commit("SET_AFFILIATED", localAffiliated === 'true');
          }
          await this.$nextTick();
        }

        // Verificación final del estado
        const estadoFinal = {
          session: this.$store.state.session,
          affiliated: this.$store.state.affiliated,
          localStorage: {
            session: localStorage.getItem('session'),
            affiliated: localStorage.getItem('affiliated')
          }
        };
        
        console.log('Login: Estado final antes de redirección:', estadoFinal);

        // Redirigir según el tipo de usuario
        if (office_id) {
          // Usuario de oficina
          console.log('Login: Redirigiendo usuario de oficina a', `/${this.path}`);
          this.$router.push(`/${this.path}`);
        } else {
          // Usuario normal - redirigir según afiliación
          if (this.$store.state.affiliated) {
            console.log('Login: Usuario afiliado, redirigiendo a /dashboard');
            this.$router.push("/dashboard");
          } else {
            console.log('Login: Usuario no afiliado, redirigiendo a /affiliation');
            this.$router.push("/affiliation");
          }
        }
      } catch (error) {
        this.sending = false;
        this.alert = "Error en el servidor. Intente nuevamente.";
        console.error("Error en login:", error);
      }
    },
    reset(name) {
      this.alert = null;

      // if(name == 'username') this.error.username = false
      if (name == "dni") this.error.dni = false;
      if (name == "password") this.error.password = false;
    },
  },
};
</script>
<style scoped lang="stylus">
@import '~@/assets/style/login.styl';
</style>
