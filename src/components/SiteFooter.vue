<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <!-- Soporte -->
      <div class="site-footer__col">
        <h3 class="site-footer__title">Soporte</h3>
        <p class="site-footer__text">¿Tienes dudas o consultas? Escríbenos por WhatsApp.</p>
        <a v-if="wsp" :href="wsp" target="_blank" rel="noopener noreferrer" class="site-footer__wsp-btn">
          <i class="fab fa-whatsapp"></i>
          Contáctanos por WhatsApp
        </a>
      </div>

      <!-- Comunidad -->
      <div class="site-footer__col">
        <h3 class="site-footer__title">Comunidad</h3>
        <p class="site-footer__text">Síguenos en nuestras redes sociales</p>
        <div v-if="socials.length" class="site-footer__socials">
          <a
            v-for="s in socials"
            :key="s.key"
            :href="s.url"
            :aria-label="s.label"
            target="_blank"
            rel="noopener noreferrer"
            class="site-footer__social"
          >
            <i :class="s.icon"></i>
          </a>
        </div>
      </div>

      <!-- Materiales -->
      <div class="site-footer__col">
        <h3 class="site-footer__title">Materiales</h3>
        <ul class="site-footer__links">
          <li>
            <a :href="catalogLink || '#'" :target="catalogLink ? '_blank' : null" rel="noopener noreferrer"
               :class="{ disabled: !catalogLink }" @click="!catalogLink && $event.preventDefault()">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">
                <path d="M12 6.5C10 5 7 4.5 3 5v13c4-.5 7 0 9 1.5 2-1.5 5-2 9-1.5V5c-4-.5-7 0-9 1.5z" />
                <path d="M12 6.5v13" />
              </svg>
              Catálogo
            </a>
          </li>
          <li>
            <a :href="presentationLink || '#'" :target="presentationLink ? '_blank' : null" rel="noopener noreferrer"
               :class="{ disabled: !presentationLink }" @click="!presentationLink && $event.preventDefault()">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 4h18M4 4v11h16V4M12 15v3M8 21l4-3 4 3" />
              </svg>
              Hoja de presentación
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import api from "@/api";

let materialsCache = null;

const norm = (s) =>
  String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export default {
  name: "SiteFooter",
  data() {
    return { materials: materialsCache || [] };
  },
  computed: {
    wsp() {
      const st = this.$store.state;
      if (st.country == "Bolivia") return st.wsp_bo;
      if (st.country == "Ecuador") return st.wsp_ec;
      return st.wsp_pe;
    },
    socials() {
      const st = this.$store.state;
      return [
        { key: "fb", url: st.fb || "https://www.facebook.com", icon: "fab fa-facebook-f", label: "Facebook" },
        { key: "is", url: st.is || "https://www.instagram.com", icon: "fab fa-instagram", label: "Instagram" },
        { key: "yt", url: st.yt || "https://www.youtube.com", icon: "fab fa-youtube", label: "YouTube" },
        { key: "tk", url: st.tk || "https://www.tiktok.com", icon: "fab fa-tiktok", label: "TikTok" },
      ];
    },
    catalogLink() {
      return this.findLink("catalogo");
    },
    presentationLink() {
      return this.findLink("presentacion");
    },
  },
  async created() {
    if (materialsCache) return;
    const session = this.$store.state.session;
    if (!session) return;
    try {
      const res = await api.materials(session);
      materialsCache = (res.data && res.data.materials) || [];
      this.materials = materialsCache;
    } catch (e) {
      console.error("Footer: no se pudieron cargar los materiales", e);
    }
  },
  mounted() {
    this.fitToEdges();
    window.addEventListener("resize", this.fitToEdges);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.fitToEdges);
  },
  methods: {
    // Anula el padding del contenedor para que el footer llegue a los bordes y al fondo
    fitToEdges() {
      const parent = this.$el && this.$el.parentElement;
      if (!parent) return;
      const cs = getComputedStyle(parent);
      this.$el.style.marginLeft = `-${cs.paddingLeft}`;
      this.$el.style.marginRight = `-${cs.paddingRight}`;
      this.$el.style.marginBottom = `-${cs.paddingBottom}`;
      this.$el.style.width = `calc(100% + ${cs.paddingLeft} + ${cs.paddingRight})`;
    },
    findLink(word) {
      const m = this.materials.find((x) => x.link && norm(x.title).includes(word));
      return m ? m.link : null;
    },
  },
};
</script>

<style scoped>
.site-footer {
  width: 100%;
  margin-top: 40px;
  background: #5c0f39;
  color: #fff;
  box-sizing: border-box;
}
.site-footer__inner {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
  margin: 0;
  padding: 40px 48px 48px;
}
.site-footer__title {
  margin: 0 0 8px;
  font-size: 26px;
  font-weight: 700;
  color: #fff;
}
.site-footer__text {
  margin: 0 0 18px;
  font-size: 17px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.92);
}
.site-footer__wsp-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 26px;
  border: 2px solid #fff;
  border-radius: 999px;
  color: #fff;
  font-weight: 700;
  font-size: 17px;
  text-decoration: none;
  transition: background 0.2s;
}
.site-footer__wsp-btn i {
  font-size: 26px;
  color: #25d366;
}
.site-footer__wsp-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}
.site-footer__socials {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
}
.site-footer__social {
  width: 48px;
  height: 48px;
  border: 2px solid #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  text-decoration: none;
  transition: background 0.2s;
}
.site-footer__social:hover {
  background: rgba(255, 255, 255, 0.12);
}
.site-footer__links {
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.site-footer__links a {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  color: #fff;
  font-size: 18px;
  text-decoration: none;
}
.site-footer__links a:hover {
  text-decoration: underline;
}
.site-footer__links a.disabled {
  opacity: 0.6;
  cursor: default;
}
.site-footer__links svg {
  width: 34px;
  height: 34px;
  flex-shrink: 0;
}

@media (max-width: 767px) {
  .site-footer {
    margin-top: 24px;
  }
  .site-footer__inner {
    grid-template-columns: 1fr;
    gap: 28px;
    /* Espacio inferior para el menú fijo; espacio derecho para el WhatsApp flotante */
    padding: 28px 80px 96px 24px;
  }
  .site-footer__title {
    font-size: 24px;
  }
  .site-footer__text {
    font-size: 16px;
  }
}
</style>
