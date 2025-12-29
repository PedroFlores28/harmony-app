<template>
  <div class="app">
    <div id="app">
      <transition name="fade">
        <div v-if="notification" class="notification">
          {{ notification }}
        </div>
      </transition>

      <router-view />
    </div>

    <header>
      <!--<h3 class="slogan">
        <span v-if="country == 'Perú'"       style="font-size: 28px;">🇵🇪</span>
        <span v-if="country == 'Bolivia'"    style="font-size: 28px;">🇧🇴</span>
        <span v-if="country == 'Ecuador'"    style="font-size: 28px;">🇪🇨</span>
        <span v-if="country == 'Colombia'"   style="font-size: 28px;">🇨🇴</span>
        <span v-if="country == 'Argentina'"  style="font-size: 28px;">🇦🇷</span>
        <span v-if="country == 'Chile'"      style="font-size: 28px;">🇨🇱</span>
        <span v-if="country == 'Costa Rica'" style="font-size: 28px;">🇨🇷</span>
          &nbsp;&nbsp;&nbsp;SUEÑA SIN LIMITES
      </h3>-->
      <div class="header-left">
        <!-- Logo para desktop -->
        <img
          src="../../assets/img/logo/logo-sifrah-BLANCO.png"
          alt=""
          class="logo logo-desktop"
        />
      </div>
      
      <div class="header-center" v-if="office_id == null">
        <div 
          class="header-user-info"
          @mousedown="startDrag"
          @touchstart="startDrag"
        >
          <div class="header-dni header-dni-mobile" v-if="dni">{{ dni }}</div>
        </div>
      </div>
      
      <div class="header-right">
        <label v-if="office_id == null" class="header-photo-label">
          <img
            v-if="photoState == 'default'"
            class="header-photo"
            :src="photo"
          />
          <img
            v-if="photoState == 'changed'"
            class="header-photo"
            :src="newPhoto"
          />
          <input type="file" @change="changePhoto" style="display: none;" />
        </label>
        <!-- Contenedor compartir con mensaje único -->
        <div style="position: relative; display: inline-block;">
          <!-- Ícono compartir para desktop -->
          <i class="fas fa-share-alt header-icon header-icon-share-desktop" @click="copy_affiliation_link"></i>
          <!-- SVG compartir para móvil -->
          <svg
            class="header-icon header-icon-share-mobile"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click="copy_affiliation_link"
            style="cursor: pointer;"
          >
            <path d="M17 22C16.1667 22 15.4583 21.7083 14.875 21.125C14.2917 20.5417 14 19.8333 14 19C14 18.9 14.025 18.6667 14.075 18.3L7.05 14.2C6.78333 14.45 6.475 14.646 6.125 14.788C5.775 14.93 5.4 15.0007 5 15C4.16667 15 3.45833 14.7083 2.875 14.125C2.29167 13.5417 2 12.8333 2 12C2 11.1667 2.29167 10.4583 2.875 9.875C3.45833 9.29167 4.16667 9 5 9C5.4 9 5.775 9.071 6.125 9.213C6.475 9.355 6.78333 9.55067 7.05 9.8L14.075 5.7C14.0417 5.58333 14.021 5.471 14.013 5.363C14.005 5.255 14.0007 5.134 14 5C14 4.16667 14.2917 3.45833 14.875 2.875C15.4583 2.29167 16.1667 2 17 2C17.8333 2 18.5417 2.29167 19.125 2.875C19.7083 3.45833 20 4.16667 20 5C20 5.83333 19.7083 6.54167 19.125 7.125C18.5417 7.70833 17.8333 8 17 8C16.6 8 16.225 7.929 15.875 7.787C15.525 7.645 15.2167 7.44933 14.95 7.2L7.925 11.3C7.95833 11.4167 7.97933 11.5293 7.988 11.638C7.99667 11.7467 8.00067 11.8673 8 12C7.99933 12.1327 7.99533 12.2537 7.988 12.363C7.98067 12.4723 7.95967 12.5847 7.925 12.7L14.95 16.8C15.2167 16.55 15.525 16.3543 15.875 16.213C16.225 16.0717 16.6 16.0007 17 16C17.8333 16 18.5417 16.2917 19.125 16.875C19.7083 17.4583 20 18.1667 20 19C20 19.8333 19.7083 20.5417 19.125 21.125C18.5417 21.7083 17.8333 22 17 22Z" fill="white"/>
          </svg>
          <span v-if="c_affiliation_link" style="position: absolute; top: 100%; right: -40px; margin-top: 5px; white-space: nowrap; color: #4CAF50; font-size: 12px; font-weight: 600; z-index: 1000; display: flex; align-items: center; gap: 4px;">
            Link copiado <i class="fas fa-check" style="color: #4CAF50;"></i>
          </span>
        </div>
        <router-link to="/profile" v-if="office_id == null" class="header-icon-link">
          <!-- Ícono configuración para desktop -->
          <i class="fas fa-cog header-icon header-icon-cog-desktop"></i>
          <!-- SVG configuración para móvil -->
          <svg
            class="header-icon header-icon-cog-mobile"
            width="28"
            height="28"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style="cursor: pointer;"
          >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.208 2.83C12.6613 2.97 13.0947 3.15 13.508 3.37L15.341 2.27C15.5321 2.15536 15.7561 2.10786 15.9773 2.13504C16.1985 2.16221 16.4043 2.26251 16.562 2.42L17.58 3.438C17.7375 3.5957 17.8378 3.80149 17.865 4.02271C17.8921 4.24392 17.8446 4.46787 17.73 4.659L16.63 6.492C16.85 6.90533 17.03 7.33867 17.17 7.792L19.243 8.311C19.4592 8.36517 19.6512 8.49005 19.7883 8.66579C19.9255 8.84154 20 9.05807 20 9.281V10.719C20 10.9419 19.9255 11.1585 19.7883 11.3342C19.6512 11.51 19.4592 11.6348 19.243 11.689L17.17 12.208C17.03 12.6613 16.85 13.0947 16.63 13.508L17.73 15.341C17.8446 15.5321 17.8921 15.7561 17.865 15.9773C17.8378 16.1985 17.7375 16.4043 17.58 16.562L16.562 17.58C16.4043 17.7375 16.1985 17.8378 15.9773 17.865C15.7561 17.8921 15.5321 17.8446 15.341 17.73L13.508 16.63C13.0947 16.85 12.6613 17.03 12.208 17.17L11.689 19.243C11.6348 19.4592 11.51 19.6512 11.3342 19.7883C11.1585 19.9255 10.9419 20 10.719 20H9.281C9.05807 20 8.84154 19.9255 8.66579 19.7883C8.49005 19.6512 8.36517 19.4592 8.311 19.243L7.792 17.17C7.3427 17.0312 6.90744 16.8504 6.492 16.63L4.659 17.73C4.46787 17.8446 4.24392 17.8921 4.02271 17.865C3.80149 17.8378 3.5957 17.7375 3.438 17.58L2.42 16.562C2.26251 16.4043 2.16221 16.1985 2.13504 15.9773C2.10786 15.7561 2.15536 15.5321 2.27 15.341L3.37 13.508C3.14964 13.0926 2.96885 12.6573 2.83 12.208L0.757 11.689C0.540919 11.6349 0.349098 11.5101 0.211963 11.3346C0.074827 11.1591 0.000228643 10.9428 0 10.72V9.282C5.86043e-06 9.05907 0.0745022 8.84254 0.211655 8.66679C0.348809 8.49105 0.540753 8.36617 0.757 8.312L2.83 7.793C2.97 7.33967 3.15 6.90633 3.37 6.493L2.27 4.66C2.15536 4.46887 2.10786 4.24492 2.13504 4.02371C2.16221 3.80249 2.26251 3.5967 2.42 3.439L3.438 2.42C3.5957 2.26251 3.80149 2.16221 4.02271 2.13504C4.24392 2.10786 4.46787 2.15536 4.659 2.27L6.492 3.37C6.90533 3.15 7.33867 2.97 7.792 2.83L8.311 0.757C8.36513 0.540919 8.48986 0.349098 8.6654 0.211963C8.84094 0.074827 9.05724 0.000228643 9.28 0H10.718C10.9409 5.86043e-06 11.1575 0.0745022 11.3332 0.211655C11.509 0.348809 11.6338 0.540753 11.688 0.757L12.208 2.83ZM10 14C11.0609 14 12.0783 13.5786 12.8284 12.8284C13.5786 12.0783 14 11.0609 14 10C14 8.93913 13.5786 7.92172 12.8284 7.17157C12.0783 6.42143 11.0609 6 10 6C8.93913 6 7.92172 6.42143 7.17157 7.17157C6.42143 7.92172 6 8.93913 6 10C6 11.0609 6.42143 12.0783 7.17157 12.8284C7.92172 13.5786 8.93913 14 10 14Z" fill="white"/>
          </svg>
        </router-link>
        <!-- Ícono hamburguesa para desktop -->
        <i
          class="burger fas fa-bars header-icon burger-desktop"
          @click.stop="toggleMobileTabsMenu"
        ></i>
        <!-- SVG hamburguesa para móvil -->
        <svg
          class="burger burger-mobile header-icon"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click.stop="toggleMobileTabsMenu"
          style="cursor: pointer;"
        >
          <rect x="10" y="12.5" width="20" height="3" rx="1.5" fill="white"/>
          <rect x="10" y="18.5" width="20" height="3" rx="1.5" fill="white"/>
          <rect x="10" y="24.5" width="20" height="3" rx="1.5" fill="white"/>
        </svg>
      </div>

      <!-- <h4>{{ name }} {{ lastName }} <i class=""
                      :class="{'yellow': affiliated, 'blue': _activated, 'green': activated}"></i>
      </h4>-->
    </header>
    <section :class="{ open: open }">
      <div class="menu">
        <div class="text-header">
          <label v-if="office_id == null">
            <img v-if="photoState == 'default'" class="photo" :src="photo" />
            <img v-if="photoState == 'changed'" class="photo" :src="newPhoto" />

            <input type="file" @change="changePhoto" />
          </label>

          <div v-if="photoState == 'changed'" class="controls">
            <i @click="cancelNewPhoto" class="fas fa-times"></i>
            <i @click="changeNewPhoto" class="fas fa-check"></i>
          </div>
          <div>
            <p style="color: white; font-size: 18px">
              {{ name }} {{ lastName }}
            </p>
            <p style="color: white; font-size: 12px">{{ email }}</p>
          </div>

          <!-- Ícono de tuerca para redirigir a perfil -->
        </div>
        <!-- <div class="social" style="display: flex;" v-if="office_id == null">
          <a class="fab fa-facebook-square" :href="fb" target="_blank" style="font-size: 18px;color: #4267B2;"></a>
          <a class="fab fa-instagram"       :href="is" target="_blank" style="font-size: 18px;color: #e95950;"></a>
          <a class="fab fa-youtube"         :href="yt" target="_blank" style="font-size: 18px;color: #ff0050;"></a>
        </div>-->

        <a @click="handleInicioClick" v-if="office_id == null">
          <img src="@/assets/img/home-desktop-icon.svg" alt="Inicio" style="width: 16px; height: 16px; margin-right: 8px;"> INICIO
        </a>
        <!-- <router-link to="/status" @click.native="close">
          <i class="fas fa-tachometer-alt"></i> ESTADO
        </router-link> -->

        <a
          @click.stop="actived(0)"
          :style="{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: activeProduct === 0 ? '#0476D9' : '',
          }"
        >
          <span> <img src="@/assets/img/products-desktop-icon.svg" alt="Productos" style="width: 16px; height: 16px; margin-right: 8px;"> PRODUCTOS </span>
          <i class="fa fa-angle-down" style="margin-left: 16px"></i>
        </a>
        <div class="sub-menu" :class="{ active: buys }">
          <router-link to="/activation" @click.stop v-if="affiliated">
            <i class="fas fa-shopping-bag"></i> COMPRAS
          </router-link>
          <router-link to="/affiliation" @click.native="close">
            <img src="@/assets/img/affiliation-desktop-icon.svg" alt="Afiliación" style="width: 16px; height: 16px; margin-right: 8px;"> AFILIACIÓN
          </router-link>
          <router-link to="/activations" @click.native="close" v-if="affiliated">
            <img src="@/assets/img/history-desktop-icon.svg" alt="Historial" style="width: 16px; height: 16px; margin-right: 8px;"> HISTORIAL
          </router-link>
        </div>

        <a
          @click="actived(1)"
          v-if="tree"
          :style="{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: activeProduct === 1 ? '#0476D9' : '',
          }"
        >
          <span> <i class="fa fa-users"></i> ORGANIZACIÓN </span>
          <i class="fa fa-angle-down" style="margin-left: 16px"></i>
        </a>
        <div class="sub-menu" :class="{ active: network }">
          <router-link to="/tree" @click.native="close">
            <img src="@/assets/img/red-desktop-icon.svg" alt="Red" style="width: 16px; height: 16px; margin-right: 8px;"> RED
          </router-link>
          <router-link to="/directs" @click.native="close">
            <img src="@/assets/img/records-desktop-icon.svg" alt="Registros" style="width: 16px; height: 16px; margin-right: 8px;"> REGISTROS
          </router-link>
          <!-- <router-link to="/closeds" @click.native="close">
            <i class="fas fa-users"></i> CIERRES
          </router-link> -->
        </div>

        <a
          @click="actived(2)"
          v-if="tree"
          :style="{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: activeProduct === 2 ? '#0476D9' : '',
          }"
        >
          <span> <img src="@/assets/img/commissions-desktop-icon.svg" alt="Comisiones" style="width: 16px; height: 16px; margin-right: 8px;"> COMISIONES </span>
          <i class="fa fa-angle-down" style="margin-left: 16px"></i>
        </a>
        <div class="sub-menu" :class="{ active: commissions }">
          <!-- <router-link to="/bonuses" @click.native="close">
            <i class="fas fa-gem"></i> BONOS
          </router-link> -->
          <router-link to="/transfer" @click.native="close">
            <i class="fas fa-wallet"></i> MONEDERO
          </router-link>
          <router-link to="/transactions" @click.native="close">
            <img src="@/assets/img/movements-desktop-icon.svg" alt="Movimientos" style="width: 16px; height: 16px; margin-right: 8px;"> MOVIMIENTOS
          </router-link>
          <router-link to="/collect" @click.native="close">
            <img src="@/assets/img/withdrawals-desktop-icon.svg" alt="Retiros" style="width: 16px; height: 16px; margin-right: 8px;"> RETIROS
          </router-link>
        </div>

        <a
          @click="actived(3)"
          v-if="tree && office_id == null"
          :style="{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: activeProduct === 3 ? '#0476D9' : '',
          }"
        >
          <span> <img src="@/assets/img/summary-desktop-icon.svg" alt="Resumen" style="width: 16px; height: 16px; margin-right: 8px;"> RESUMEN </span>
          <i class="fa fa-angle-down" style="margin-left: 16px"></i>
        </a>
        <div class="sub-menu" :class="{ active: resume }">
          <router-link to="/bonuses" @click.native="close" v-if="affiliated">
            <img src="@/assets/img/bonuses-desktop-icon.svg" alt="Bonificaciones" style="width: 16px; height: 16px; margin-right: 8px;"> BONIFICACIONES
          </router-link>
          <router-link to="/resume" @click.native="close">
            <img src="@/assets/img/personal-desktop-icon.svg" alt="Personal" style="width: 16px; height: 16px; margin-right: 8px;"> PERSONAL
          </router-link>
          <router-link to="/closeds" @click.native="close">
            <img src="@/assets/img/closures-desktop-icon.svg" alt="Cierres" style="width: 16px; height: 16px; margin-right: 8px;"> CIERRES
          </router-link>
        </div>

        <router-link
          to="/profile"
          @click.native="close"
          v-if="office_id == null"
        >
          <i class="fas fa-user"></i> PERFIL
        </router-link>

        <br />
        <a @click="logout" style="background-color: #0476D9">
          <i class="fas fa-sign-out-alt"></i> CERRAR SESIÓN
        </a>
      </div>

      <div class="content">
        <header>
          <p style="font-weight: bold; font-size: 20px">{{ title }}</p>
          <div
          style="
              display: flex;
              align-items: center;
              gap: 20px;
              margin-top: 25px;
              "
          >
          <div class="red-header-text" v-if="$route.path === '/tree' || $route.path.startsWith('/tree/')">Red</div>
          <img class="logo" style="height: 50px" />
          <button class="share-button" @click="copy_affiliation_link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px">
              <path d="M17 22C16.1667 22 15.4583 21.7083 14.875 21.125C14.2917 20.5417 14 19.8333 14 19C14 18.9 14.025 18.6667 14.075 18.3L7.05 14.2C6.78333 14.45 6.475 14.646 6.125 14.788C5.775 14.93 5.4 15.0007 5 15C4.16667 15 3.45833 14.7083 2.875 14.125C2.29167 13.5417 2 12.8333 2 12C2 11.1667 2.29167 10.4583 2.875 9.875C3.45833 9.29167 4.16667 9 5 9C5.4 9 5.775 9.071 6.125 9.213C6.475 9.355 6.78333 9.55067 7.05 9.8L14.075 5.7C14.0417 5.58333 14.021 5.471 14.013 5.363C14.005 5.255 14.0007 5.134 14 5C14 4.16667 14.2917 3.45833 14.875 2.875C15.4583 2.29167 16.1667 2 17 2C17.8333 2 18.5417 2.29167 19.125 2.875C19.7083 3.45833 20 4.16667 20 5C20 5.83333 19.7083 6.54167 19.125 7.125C18.5417 7.70833 17.8333 8 17 8C16.6 8 16.225 7.929 15.875 7.787C15.525 7.645 15.2167 7.44933 14.95 7.2L7.925 11.3C7.95833 11.4167 7.97933 11.5293 7.988 11.638C7.99667 11.7467 8.00067 11.8673 8 12C7.99933 12.1327 7.99533 12.2537 7.988 12.363C7.98067 12.4723 7.95967 12.5847 7.925 12.7L14.95 16.8C15.2167 16.55 15.525 16.3543 15.875 16.213C16.225 16.0717 16.6 16.0007 17 16C17.8333 16 18.5417 16.2917 19.125 16.875C19.7083 17.4583 20 18.1667 20 19C20 19.8333 19.7083 20.5417 19.125 21.125C18.5417 21.7083 17.8333 22 17 22Z" fill="white"/>
            </svg>Compartir Afiliación
              <input
              readonly
              id="link-global"
              @click="copy_affiliation_link"
              v-model="affiliationLink"
              style="opacity: 0; position: absolute"
              />
            </button>
            <i class="copy" v-if="c_affiliation_link"
            >link copiado <i class="fas fa-check"></i
              ></i>

            <!-- <img class="logo-text" src="@/assets/img/logo/text.svg" style="margin-left: 12px;"> -->
            
            <label v-if="office_id == null">
              <img
              v-if="photoState == 'default'"
              class="photo-header"
              :src="photo"
              />
              <img
              v-if="photoState == 'changed'"
              class="photo-header"
              :src="newPhoto"
              />
              
              <input type="file" @change="changePhoto" />
            </label>
            
            <div v-if="photoState == 'changed'" class="controls">
              <i @click="cancelNewPhoto" class="fas fa-times"></i>
              <i @click="changeNewPhoto" class="fas fa-check"></i>
            </div>
            <div>
              <p style="color: rgba(8, 56, 92, 1); font-size: 18px">
                {{ name }} {{ lastName }}
              </p>
              <p style="color: rgba(8, 56, 92, 1); font-size: 12px">
                {{ email }}
              </p>
            </div>
            <router-link to="/profile" style="color: black; margin-left: 10px">
              <i class="fas fa-cog" style="font-size: 20px"></i>
            </router-link>
          </div>

          <!-- <div class="social">
            <a class="fab fa-facebook-square" :href="fb" target="_blank" style="color: #4267B2;"></a>
            <a class="fab fa-instagram"       :href="is" target="_blank" style="color: #e95950;"></a>
            <a class="fab fa-tiktok"          :href="tk" target="_blank" style="color: #ff0050;"></a>
            <a class="fab fa-youtube"         :href="yt" target="_blank" style="color: #ff0050;"></a>
            
          </div> -->
        </header>
        <section
          :style="getSectionStyle()"
          :class="{ slide: open }"
          @touchstart="startTouch"
          @touchmove="moveTouch"
          @touchend="endTouch"
        >
          <slot />
        </section>
      </div>
    </section>

    <!-- Overlay para menú de tabs en móvil -->
    <div 
      v-if="showMobileTabsMenu" 
      class="mobile-tabs-overlay"
      @click="closeMobileTabsMenu"
    >
      <div class="mobile-tabs-menu" @click.stop>
        <div class="mobile-tabs-content">
          <div class="mobile-tabs-header-inner">
            <div class="mobile-menu-user-info" v-if="office_id == null">
              <label v-if="office_id == null">
                <img v-if="photoState == 'default'" class="mobile-menu-photo" :src="photo" />
                <img v-if="photoState == 'changed'" class="mobile-menu-photo" :src="newPhoto" />
              </label>
              <div>
                <p class="mobile-menu-name">{{ name }} {{ lastName }}</p>
                <p class="mobile-menu-email">{{ email }}</p>
              </div>
            </div>
            <i class="fas fa-times" @click="closeMobileTabsMenu"></i>
          </div>

          <a @click="handleInicioClickAndClose" v-if="office_id == null" class="mobile-menu-item">
            <img src="@/assets/img/home-desktop-icon.svg" alt="Inicio" style="width: 20px; height: 20px; margin-right: 12px;">
            <span>INICIO</span>
          </a>

          <a @click.stop="toggleMobileSubmenu(0)" class="mobile-menu-item mobile-menu-item-with-submenu" :class="{ 'active-submenu': mobileSubmenus[0] }">
            <span style="display: flex; align-items: center;">
              <img src="@/assets/img/products-desktop-icon.svg" alt="Productos" style="width: 20px; height: 20px; margin-right: 12px;">
              PRODUCTOS
            </span>
            <i class="fa fa-angle-down" :class="{ 'rotated': mobileSubmenus[0] }"></i>
          </a>
          <div class="mobile-submenu" :class="{ 'active': mobileSubmenus[0] }">
            <router-link to="/activation" v-if="affiliated" @click.native="handleNavigationClickAndClose" class="mobile-submenu-item">
              <i class="fas fa-shopping-bag"></i>
              <span>COMPRAS</span>
            </router-link>
            <router-link to="/affiliation" @click.native="handleNavigationClickAndClose" class="mobile-submenu-item">
              <img src="@/assets/img/affiliation-desktop-icon.svg" alt="Afiliación" style="width: 16px; height: 16px; margin-right: 12px;">
              <span>AFILIACIÓN</span>
            </router-link>
            <router-link to="/activations" v-if="affiliated" @click.native="handleNavigationClickAndClose" class="mobile-submenu-item">
              <img src="@/assets/img/history-desktop-icon.svg" alt="Historial" style="width: 16px; height: 16px; margin-right: 12px;">
              <span>HISTORIAL</span>
            </router-link>
          </div>

          <a @click.stop="toggleMobileSubmenu(1)" v-if="tree" class="mobile-menu-item mobile-menu-item-with-submenu" :class="{ 'active-submenu': mobileSubmenus[1] }">
            <span style="display: flex; align-items: center;">
              <i class="fa fa-users" style="width: 20px; margin-right: 12px;"></i>
              ORGANIZACIÓN
            </span>
            <i class="fa fa-angle-down" :class="{ 'rotated': mobileSubmenus[1] }"></i>
          </a>
          <div class="mobile-submenu" :class="{ 'active': mobileSubmenus[1] }" v-if="tree">
            <router-link to="/tree" @click.native="handleNavigationClickAndClose" class="mobile-submenu-item">
              <img src="@/assets/img/red-desktop-icon.svg" alt="Red" style="width: 16px; height: 16px; margin-right: 12px;">
              <span>RED</span>
            </router-link>
            <router-link to="/directs" @click.native="handleNavigationClickAndClose" class="mobile-submenu-item">
              <img src="@/assets/img/records-desktop-icon.svg" alt="Registros" style="width: 16px; height: 16px; margin-right: 12px;">
              <span>REGISTROS</span>
            </router-link>
          </div>

          <a @click.stop="toggleMobileSubmenu(2)" v-if="tree" class="mobile-menu-item mobile-menu-item-with-submenu" :class="{ 'active-submenu': mobileSubmenus[2] }">
            <span style="display: flex; align-items: center;">
              <img src="@/assets/img/commissions-desktop-icon.svg" alt="Comisiones" style="width: 20px; height: 20px; margin-right: 12px;">
              COMISIONES
            </span>
            <i class="fa fa-angle-down" :class="{ 'rotated': mobileSubmenus[2] }"></i>
          </a>
          <div class="mobile-submenu" :class="{ 'active': mobileSubmenus[2] }" v-if="tree">
            <router-link to="/transfer" @click.native="handleNavigationClickAndClose" class="mobile-submenu-item">
              <i class="fas fa-wallet"></i>
              <span>MONEDERO</span>
            </router-link>
            <router-link to="/transactions" @click.native="handleNavigationClickAndClose" class="mobile-submenu-item">
              <img src="@/assets/img/movements-desktop-icon.svg" alt="Movimientos" style="width: 16px; height: 16px; margin-right: 12px;">
              <span>MOVIMIENTOS</span>
            </router-link>
            <router-link to="/collect" @click.native="handleNavigationClickAndClose" class="mobile-submenu-item">
              <img src="@/assets/img/withdrawals-desktop-icon.svg" alt="Retiros" style="width: 16px; height: 16px; margin-right: 12px;">
              <span>RETIROS</span>
            </router-link>
          </div>

          <a @click.stop="toggleMobileSubmenu(3)" v-if="tree && office_id == null" class="mobile-menu-item mobile-menu-item-with-submenu" :class="{ 'active-submenu': mobileSubmenus[3] }">
            <span style="display: flex; align-items: center;">
              <img src="@/assets/img/summary-desktop-icon.svg" alt="Resumen" style="width: 20px; height: 20px; margin-right: 12px;">
              RESUMEN
            </span>
            <i class="fa fa-angle-down" :class="{ 'rotated': mobileSubmenus[3] }"></i>
          </a>
          <div class="mobile-submenu" :class="{ 'active': mobileSubmenus[3] }" v-if="tree && office_id == null">
            <router-link to="/bonuses" v-if="affiliated" @click.native="handleNavigationClickAndClose" class="mobile-submenu-item">
              <img src="@/assets/img/bonuses-desktop-icon.svg" alt="Bonificaciones" style="width: 16px; height: 16px; margin-right: 12px;">
              <span>BONIFICACIONES</span>
            </router-link>
            <router-link to="/resume" @click.native="handleNavigationClickAndClose" class="mobile-submenu-item">
              <img src="@/assets/img/personal-desktop-icon.svg" alt="Personal" style="width: 16px; height: 16px; margin-right: 12px;">
              <span>PERSONAL</span>
            </router-link>
            <router-link to="/closeds" @click.native="handleNavigationClickAndClose" class="mobile-submenu-item">
              <img src="@/assets/img/closures-desktop-icon.svg" alt="Cierres" style="width: 16px; height: 16px; margin-right: 12px;">
              <span>CIERRES</span>
            </router-link>
          </div>

          <router-link
            to="/profile"
            @click.native="handleNavigationClickAndClose"
            v-if="office_id == null"
            class="mobile-menu-item"
          >
            <i class="fas fa-user" style="width: 20px; margin-right: 12px;"></i>
            <span>PERFIL</span>
          </router-link>

          <a @click="handleLogoutAndClose" class="mobile-menu-item mobile-menu-item-logout">
            <i class="fas fa-sign-out-alt" style="width: 20px; margin-right: 12px;"></i>
            <span>CERRAR SESIÓN</span>
          </a>
        </div>
      </div>
    </div>

    <footer class="footer-Dashboard">
      <a @click="handleInicioClick">
        <img src="@/assets/img/home-icon.svg" alt="Inicio" style="width: 20px; height: 20px;">
        Inicio
      </a>
      <router-link to="/activation" v-if="affiliated" @click.native="handleNavigationClick">
        <i class="fas fa-shopping-bag"></i>
        Compras
      </router-link>
      <router-link to="/affiliation" v-if="!affiliated" @click.native="handleNavigationClick">
        <i class="fas fa-shopping-bag"></i>
        Plan
      </router-link>
      <router-link to="/tree/red" v-if="tree" @click.native="handleNavigationClick">
        <i class="fas fa-project-diagram"></i>
        Red
      </router-link>
      <router-link to="/collect" v-if="tree" @click.native="handleNavigationClick">
        <i class="fas fa-hand-holding-usd"></i>
        Retiros
      </router-link>
    </footer>

    <a :href="wsp" target="_blank" class="wsp fab fa-whatsapp"></a>
    
    <!-- Panel de Debug (solo visible en desarrollo o cuando se habilite) -->
    <DebugPanel />
  </div>
</template>

<script>
import api from "@/api";
import lib from "@/lib";

const ROOT = process.env.VUE_APP_ROOT;
console.log({ ROOT });

export default {
  components: { },
  props: {
    session: String,
    office_id: String,
    title: String,
  },
  data() {
    return {
      // photo: 'https://ik.imagekit.io/asu/Lehaim/avatar_bEyc3MFLf.png',
      newPhoto: null,
      photoState: "default",
      photoFile: null,
      c_affiliation_link: false,
      activeProduct: false,
      startX: 0,
      endX: 0,
      notification: null,
      notificationTimer: null,
      showMobileTabsMenu: false,
      isMobile: false,
      mobileSubmenus: {
        0: false, // Productos
        1: false, // Organización
        2: false, // Comisiones
        3: false, // Resumen
        4: false, // Herramientas
      },
      textPosition: {
        x: 0,
        y: 0,
      },
      isDragging: false,
      dragStart: { x: 0, y: 0 },
    };
  },
  watch: {
    // Limpiar estados de menús cuando cambie el estado de afiliación
    affiliated(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$store.commit("CLEAR_MENU_STATES");
        
        // Limpiar mensajes de notificación cuando cambie el estado de afiliación
        const notifications = document.querySelectorAll('.affiliation-required-notification, .affiliation-notification');
        notifications.forEach(notification => {
          if (notification.parentElement) {
            notification.remove();
          }
        });
      }
    }
  },
  created() {
    this.startNotificationLoop();
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
    this.loadTextPosition();
    window.addEventListener('mousemove', this.onDrag);
    window.addEventListener('touchmove', this.onDrag);
    window.addEventListener('mouseup', this.stopDrag);
    window.addEventListener('touchend', this.stopDrag);
  },
  beforeDestroy() {
    if (this.notificationTimer) clearInterval(this.notificationTimer);
    window.removeEventListener('resize', this.checkMobile);
    window.removeEventListener('mousemove', this.onDrag);
    window.removeEventListener('touchmove', this.onDrag);
    window.removeEventListener('mouseup', this.stopDrag);
    window.removeEventListener('touchend', this.stopDrag);
  },
  computed: {
    // user
    name() {
      return this.$store.state.name;
    },
    lastName() {
      return this.$store.state.lastName;
    },
    affiliated() {
      return this.$store.state.affiliated;
    },
    activated() {
      return this.$store.state.activated;
    },
    _activated() {
      return this.$store.state._activated;
    },
    plan() {
      return this.$store.state.plan;
    },
    country() {
      return this.$store.state.country;
    },
    photo() {
      return this.$store.state.photo;
    },
    tree() {
      return this.$store.state.tree;
    },
    email() {
      return this.$store.state.email;
    },
    address() {
      return this.$store.state.address;
    },
    phone() {
      return this.$store.state.phone;
    },
    birthdate() {
      return this.$store.state.birthdate;
    },
    city() {
      return this.$store.state.city;
    },

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

    // help
    wsp() {
      if (this.country == "Perú") return this.$store.state.wsp_pe;
      if (this.country == "Bolivia") return this.$store.state.wsp_bo;
      if (this.country == "Ecuador") return this.$store.state.wsp_ec;
    },

    // menú
    open() {
      return this.$store.state.open;
    },
    resume() {
      return this.$store.state.resume;
    },
    buys() {
      return this.$store.state.buys;
    },
    network() {
      return this.$store.state.network;
    },
    commissions() {
      return this.$store.state.commissions;
    },
    education() {
      return this.$store.state.education;
    },
    affiliationLink() {
      return `${ROOT}/register/${this.token}`;
    },
    token() {
      return this.$store.state.token;
    },
    dni() {
      return this.$store.state.dni;
    },
  },
  methods: {
    getSectionStyle() {
      // En desktop y cuando estamos en la vista de activación, quitar overflow para que el sticky funcione
      if (window.innerWidth >= 1024 && document.body.classList.contains('activation-view')) {
        return { overflow: 'visible' };
      }
      // En móvil o otras vistas, mantener overflow auto
      return { overflow: 'auto' };
    },
    startNotificationLoop() {
    
      setTimeout(() => {
        this.checkAndShowNotification();

        // Luego lo repite cada 20 segundos
        this.notificationTimer = setInterval(
          this.checkAndShowNotification,
          20000
        );
      }, 5000); // Espera inicial de 5 segundos (5000 ms)
      this.notificationTimer = setInterval(
        this.checkAndShowNotification,
        20000
      );
      // cada 20s
    },
    checkAndShowNotification() {
      const missing = [];
      if (!this.country) {
        this.notification = "Por favor, completa tu perfil.";

        setTimeout(() => {
          this.notification = null;
        }, 10000);
      } else {
        this.notification = null;
      }
    },

    toggleMenu() {
      this.$store.commit("SET_OPEN");
    },
    closeMenu() {
      if (this.open) {
        this.$store.commit("SET_OPEN");
      }
    },
    checkMobile() {
      this.isMobile = window.innerWidth < 768;
    },
    toggleMobileTabsMenu() {
      if (this.isMobile) {
        this.showMobileTabsMenu = !this.showMobileTabsMenu;
      } else {
        // En desktop, mantener el comportamiento original del sidebar
        this.toggleMenu();
      }
    },
    closeMobileTabsMenu() {
      this.showMobileTabsMenu = false;
    },
    handleInicioClickAndClose() {
      this.closeMobileTabsMenu();
      this.handleInicioClick();
    },
    handleNavigationClickAndClose() {
      this.closeMobileTabsMenu();
      this.handleNavigationClick();
    },
    toggleMobileSubmenu(index) {
      this.mobileSubmenus[index] = !this.mobileSubmenus[index];
    },
    handleLogoutAndClose() {
      this.closeMobileTabsMenu();
      this.logout();
    },
    loadTextPosition() {
      const saved = localStorage.getItem('headerTextPosition');
      if (saved) {
        try {
          this.textPosition = JSON.parse(saved);
        } catch (e) {
          this.textPosition = { x: 0, y: 0 };
        }
      }
    },
    saveTextPosition() {
      localStorage.setItem('headerTextPosition', JSON.stringify(this.textPosition));
    },
    startDrag(event) {
      this.isDragging = true;
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      
      const headerCenter = event.currentTarget.parentElement;
      const rect = headerCenter.getBoundingClientRect();
      
      this.dragStart = {
        x: clientX - rect.left - this.textPosition.x,
        y: clientY - rect.top - this.textPosition.y,
      };
      
      event.preventDefault();
    },
    onDrag(event) {
      if (!this.isDragging) return;
      
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      
      const headerCenter = document.querySelector('.header-center');
      if (!headerCenter) return;
      
      const rect = headerCenter.getBoundingClientRect();
      
      this.textPosition = {
        x: clientX - rect.left - this.dragStart.x,
        y: clientY - rect.top - this.dragStart.y,
      };
      
      // Limitar el movimiento dentro del contenedor
      const textBox = document.querySelector('.header-user-info');
      if (textBox) {
        const textRect = textBox.getBoundingClientRect();
        const maxX = rect.width - textRect.width;
        const maxY = rect.height - textRect.height;
        
        this.textPosition.x = Math.max(0, Math.min(this.textPosition.x, maxX));
        this.textPosition.y = Math.max(0, Math.min(this.textPosition.y, maxY));
      }
      
      event.preventDefault();
    },
    stopDrag() {
      if (this.isDragging) {
        this.isDragging = false;
        this.saveTextPosition();
      }
    },
    handleInicioClick() {
      // Verificar afiliación antes de permitir acceso a INICIO
      if (!this.affiliated) {
        // Mostrar mensaje de afiliación requerida
        this.showAffiliationRequiredMessage();
        return;
      }
      
      // Si está afiliado, ir al dashboard
      this.$router.push('/dashboard');
      
      // Scroll hacia arriba después de navegar
      this.$nextTick(() => {
        setTimeout(() => {
          this.scrollToTop();
        }, 100);
      });
    },
    
    handleNavigationClick() {
      // Scroll hacia arriba cuando se hace clic en cualquier enlace del bottom navigation
      this.$nextTick(() => {
        setTimeout(() => {
          this.scrollToTop();
        }, 100);
      });
    },
    actived(i) {
      // Verificar afiliación antes de permitir acceso a opciones restringidas
      if (!this.affiliated && (i === 1 || i === 2 || i === 3 || i === 4)) {
        // Mostrar mensaje de afiliación requerida
        this.showAffiliationRequiredMessage();
        // Limpiar estados de menús si no está afiliado
        this.$store.commit("CLEAR_MENU_STATES");
        return;
      }
      
      if (this.activeProduct === i) {
        this.activeProduct = false;
      } else {
        this.activeProduct = i;
      }
      if (i == 0) this.$store.commit("SET_BUYS");
      if (i == 1) this.$store.commit("SET_NETWORK");
      if (i == 2) this.$store.commit("SET_COMMISSIONS");
      if (i == 3) this.$store.commit("SET_RESUME");
      if (i == 4) this.$store.commit("SET_EDUCATION"); // Usa SET_EDUCATION para tools
    },

    close() {
      this.$store.commit("SET_OPEN");
    },
    changePhoto(e) {
      this.photoFile = e.target.files[0];

      if (!this.photoFile) return;

      const reader = new FileReader();

      reader.onload = (e) => {
        this.newPhoto = e.target.result;
        this.photoState = "changed";
      };

      reader.readAsDataURL(this.photoFile);
    },
    async changeNewPhoto() {
      const ret = await lib.upload(
        this.photoFile,
        this.photoFile.name,
        "photos"
      );

      this.$store.commit("SET_PHOTO", ret);

      this.photoState = "default";

      await api.photo(this.session, { photo: this.photo });
    },
    cancelNewPhoto() {
      this.photoState = "default";
    },
    cancelNewPhoto() {
      this.photoState = "default";
    },
    copy_affiliation_link() {
      const linkInput = document.querySelector('#link');
      if (linkInput && linkInput.value) {
        lib.copy("link");
        this.c_affiliation_link = true;
        setTimeout(() => (this.c_affiliation_link = false), 4000);
      } else {
        console.log("Copying Affiliation Link:", this.affiliationLink);
        lib.copy("link-global");
        this.c_affiliation_link = true;
        setTimeout(() => (this.c_affiliation_link = false), 4000);
      }
    },
    startTouch(event) {
      this.startX = event.touches[0].clientX; // Guardar la posición inicial del toque
    },
    moveTouch(event) {
      this.endX = event.touches[0].clientX; // Actualizar la posición del toque
    },
    endTouch() {
      // Si el deslizamiento es hacia la izquierda y el menú está abierto, cerrarlo
      if (this.startX - this.endX > 100 && this.open) {
        this.closeMenu();
      }
    },
    showAffiliationMessageInAffiliationPage() {
      // Primero, eliminar cualquier mensaje existente
      const existingNotifications = document.querySelectorAll('.affiliation-notification');
      existingNotifications.forEach(notification => {
        if (notification.parentElement) {
          notification.remove();
        }
      });
      
      // Crear y mostrar el mensaje de notificación en la esquina derecha superior
      const notification = document.createElement('div');
      notification.className = 'affiliation-notification';
      notification.innerHTML = `
        <div class="affiliation-notification-content">
          <div class="affiliation-notification-header">
            <i class="fas fa-star" style="color: #ffd700; margin-right: 10px;"></i>
            <span style="font-weight: bold; font-size: 16px;">¡Bienvenido a Sifrah!</span>
          </div>
          <div class="affiliation-notification-body">
            Para comenzar tu experiencia, elige tu plan de afiliación y accede a todas las funcionalidades
          </div>
        </div>
      `;
      
      // Agregar estilos inline para el mensaje en la esquina derecha superior
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        max-width: 350px;
        text-align: left;
        font-family: Arial, sans-serif;
        animation: slideInFromRight 0.5s ease-out;
      `;
      
      // Agregar estilos para el contenido interno
      const content = notification.querySelector('.affiliation-notification-content');
      content.style.cssText = `
        position: relative;
      `;
      
      const header = notification.querySelector('.affiliation-notification-header');
      header.style.cssText = `
        margin-bottom: 10px;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      `;
      
      const body = notification.querySelector('.affiliation-notification-body');
      body.style.cssText = `
        font-size: 14px;
        line-height: 1.4;
        margin-bottom: 15px;
        opacity: 0.9;
      `;
      
      // Agregar el mensaje al DOM
      document.body.appendChild(notification);
      
             // El mensaje desaparece automáticamente después de 4 segundos
       setTimeout(() => {
         if (notification.parentElement) {
           notification.remove();
         }
       }, 4000);
     },

     showAffiliationRequiredMessage() {
       // Primero, eliminar cualquier mensaje existente
       const existingNotifications = document.querySelectorAll('.affiliation-required-notification');
       existingNotifications.forEach(notification => {
         if (notification.parentElement) {
           notification.remove();
         }
       });
       
       // Crear y mostrar el mensaje de notificación en la esquina derecha superior
       const notification = document.createElement('div');
       notification.className = 'affiliation-required-notification';
       notification.innerHTML = `
         <div class="affiliation-required-notification-content">
           <div class="affiliation-required-notification-header">
             <i class="fas fa-lock" style="color: #ffd700; margin-right: 10px;"></i>
             <span style="font-weight: bold; font-size: 16px;">¡Función Bloqueada!</span>
           </div>
           <div class="affiliation-required-notification-body">
             Para acceder a esta función, necesitas afiliarte primero. ¡Únete a Sifrah y desbloquea todas las funcionalidades!
           </div>
           <div class="affiliation-required-notification-footer">
             <button onclick="window.location.href='/affiliation'" style="
               background: #4CAF50;
               color: white;
               border: none;
               padding: 8px 16px;
               border-radius: 6px;
               cursor: pointer;
               font-size: 14px;
               font-weight: bold;
               margin-top: 10px;
             ">Afiliarme Ahora</button>
           </div>
         </div>
       `;
       
       // Agregar estilos inline para el mensaje en la esquina derecha superior
       notification.style.cssText = `
         position: fixed;
         top: 20px;
         right: 20px;
         background: linear-gradient(135deg, #4CAF50, #45a049);
         color: white;
         padding: 20px;
         border-radius: 12px;
         box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
         z-index: 9999;
         max-width: 350px;
         text-align: left;
         font-family: Arial, sans-serif;
         animation: slideInFromRight 0.5s ease-out;
       `;
       
       // Agregar estilos para el contenido interno
       const content = notification.querySelector('.affiliation-required-notification-content');
       content.style.cssText = `
         position: relative;
       `;
       
       const header = notification.querySelector('.affiliation-required-notification-header');
       header.style.cssText = `
         margin-bottom: 10px;
         font-size: 16px;
         display: flex;
         align-items: center;
         justify-content: flex-start;
       `;
       
       const body = notification.querySelector('.affiliation-required-notification-body');
       body.style.cssText = `
         font-size: 14px;
         line-height: 1.4;
         margin-bottom: 15px;
         opacity: 0.9;
       `;
       
       const footer = notification.querySelector('.affiliation-required-notification-footer');
       footer.style.cssText = `
         text-align: center;
       `;
       
       // Agregar el mensaje al DOM
       document.body.appendChild(notification);
       
       // El mensaje desaparece automáticamente después de 6 segundos
       setTimeout(() => {
         if (notification.parentElement) {
           notification.remove();
         }
       }, 6000);
     },

   },
 };
</script>
<style scoped>
.menu {
  transition: transform 0.3s ease;
  transform: translateX(-100%); /* Oculta el menú fuera de la vista */
}

.menu.slide {
  transform: translateX(0); /* Muestra el menú */
}
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #f44336; /* rojo para alerta */
  color: white;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: slideIn 0.5s ease-out, fadeOut 0.5s ease-in 4.5s forwards;
}

/* Animación de entrada */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Animación de salida */
@keyframes fadeOut {
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

/* Animación para el mensaje de afiliación */
@keyframes slideInFromRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Overlay para menú de tabs en móvil */
.mobile-tabs-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

.mobile-tabs-menu {
  width: 100%;
  height: 100%;
  background: #D209B6;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease;
  overflow-y: auto;
  padding-top: 0;
}

.mobile-tabs-header-inner {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 28px 0 20px 0;
  border-bottom: none;
  position: relative;
  margin-bottom: 8px;
}

.mobile-menu-user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  width: 100%;
  padding-right: 40px;
}

.mobile-menu-photo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.mobile-menu-name {
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
}

.mobile-menu-email {
  color: white;
  font-size: 12px;
  margin: 0;
  opacity: 0.9;
  line-height: 1.2;
  margin-top: 2px;
}

.mobile-tabs-header-inner i {
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  position: absolute;
  top: 28px;
  right: 0;
  z-index: 10;
  transition: opacity 0.3s ease;
}

.mobile-tabs-content {
  flex: 1;
  padding: 0 20px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: linear-gradient(135deg, #021F59 0%, #0339A6 50%, #021F59 100%);
}

.mobile-menu-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: #021F59;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  margin-bottom: 0;
  cursor: pointer;
}

.mobile-menu-item:hover,
.mobile-menu-item.router-link-active {
  background: #0476D9;
  border-radius: 12px;
}

.mobile-menu-item-with-submenu i.fa-angle-down {
  transition: transform 0.3s ease;
  font-size: 18px;
}

.mobile-menu-item-with-submenu i.fa-angle-down.rotated {
  transform: rotate(180deg);
}

.mobile-menu-item-with-submenu.active-submenu {
  background: #0476D9;
  border-radius: 12px;
}

.mobile-menu-item-logout {
  background: rgba(159, 0, 173, 0.8) !important;
  margin-top: 8px;
}

.mobile-submenu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  margin-left: 20px;
  margin-bottom: 0;
}

.mobile-submenu.active {
  max-height: 500px;
}

.mobile-submenu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: #021F59;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-bottom: 0;
}

.mobile-submenu-item:hover,
.mobile-submenu-item.router-link-active {
  background: #0476D9;
}

.mobile-submenu-item i {
  font-size: 16px;
  width: 20px;
  text-align: center;
}

.mobile-submenu-item img {
  width: 16px;
  height: 16px;
}

.mobile-menu-logo {
  margin-bottom: 20px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

/* Ocultar el overlay en desktop */
@media (min-width: 768px) {
  .mobile-tabs-overlay {
    display: none !important;
  }
}

/* Logo responsive */
.logo-desktop {
  display: block;
}

/* Íconos responsive */
.burger-mobile {
  display: none;
}

.burger-desktop {
  display: block;
}

.header-icon-cog-mobile {
  display: none;
}

.header-icon-cog-desktop {
  display: block;
  font-size: 18px;
}

.header-icon-share-mobile {
  display: none;
}

.header-icon-share-desktop {
  display: block;
}

/* Estilos para móvil */
@media (max-width: 767px) {
  .logo-desktop {
    display: none;
  }

  .burger-mobile {
    display: block;
  }

  .burger-desktop {
    display: none;
  }

  .header-icon-cog-mobile {
    display: block;
  }

  .header-icon-cog-desktop {
    display: none;
  }

  .header-icon-share-mobile {
    display: block;
  }

  .header-icon-share-desktop {
    display: none;
  }

  .header-dni-mobile {
    display: none;
  }

  .header-right {
    gap: 2px;
  }

  header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
  }

  .header-left {
    margin-right: auto;
  }

  .header-center {
    order: 2;
    flex: 0 0 auto;
    margin-right: 0;
    padding-right: 0;
    min-width: 0;
    width: auto;
  }

  .header-user-info {
    position: static;
    margin-right: 0;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
  }

  .header-right {
    order: 3;
    margin-left: 0;
    padding-left: 0;
    gap: 2px;
    flex-shrink: 0;
  }

  .header-photo-label {
    margin-left: 0;
    padding: 0;
  }

}

</style>
