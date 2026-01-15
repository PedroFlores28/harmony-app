<template>
  <Auth>
    <section>
      <div class="register-form-container">
        <div class="register-title-form">
          <h1>REGÍSTRATE</h1>
        </div>
        
        <!-- Documento de Identidad -->
        <div class="form-field">
        <div class="input-container">
          <input
            id="dni"
            class="input-register-new"
            placeholder="Documento de identidad"
            oninput="this.value=this.value.replace(/(?![0-9])./gmi,'')"
            v-model="dni"
            :class="{ error: error.dni }"
            @keydown="reset('dni')"
          />
          <svg 
            class="overflow-icon" 
            width="20" 
            height="20" 
            viewBox="0 0 19 19" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_3401_11851)">
              <path d="M11.6776 4.16922C11.6776 3.93352 11.7694 3.70747 11.9327 3.5408C12.096 3.37413 12.3176 3.2805 12.5486 3.2805H22.129C22.36 3.2805 22.5816 3.37413 22.7449 3.5408C22.9082 3.70747 23 3.93352 23 4.16922C23 4.40492 22.9082 4.63097 22.7449 4.79764C22.5816 4.9643 22.36 5.05794 22.129 5.05794H12.5486C12.3176 5.05794 12.096 4.9643 11.9327 4.79764C11.7694 4.63097 11.6776 4.40492 11.6776 4.16922ZM22.129 8.61281H12.5486C12.3176 8.61281 12.096 8.70644 11.9327 8.87311C11.7694 9.03978 11.6776 9.26583 11.6776 9.50153C11.6776 9.73723 11.7694 9.96328 11.9327 10.13C12.096 10.2966 12.3176 10.3903 12.5486 10.3903H22.129C22.36 10.3903 22.5816 10.2966 22.7449 10.13C22.9082 9.96328 23 9.73723 23 9.50153C23 9.26583 22.9082 9.03978 22.7449 8.87311C22.5816 8.70644 22.36 8.61281 22.129 8.61281ZM22.129 13.9451H15.1614C14.9304 13.9451 14.7089 14.0388 14.5456 14.2054C14.3822 14.3721 14.2905 14.5981 14.2905 14.8338C14.2905 15.0695 14.3822 15.2956 14.5456 15.4623C14.7089 15.6289 14.9304 15.7226 15.1614 15.7226H22.129C22.36 15.7226 22.5816 15.6289 22.7449 15.4623C22.9082 15.2956 23 15.0695 23 14.8338C23 14.5981 22.9082 14.3721 22.7449 14.2054C22.5816 14.0388 22.36 13.9451 22.129 13.9451ZM7.0278 11.0568C7.89219 10.3774 8.52651 9.43904 8.8418 8.37321C9.15709 7.30739 9.13753 6.1676 8.78588 5.11369C8.43423 4.05978 7.76811 3.14461 6.88095 2.49654C5.99379 1.84847 4.93009 1.5 3.83902 1.5C2.74796 1.5 1.68425 1.84847 0.797094 2.49654C-0.0900655 3.14461 -0.756182 4.05978 -1.10784 5.11369C-1.45949 6.1676 -1.47904 7.30739 -1.16375 8.37321C-0.848463 9.43904 -0.214145 10.3774 0.650242 11.0568C-1.59464 12.0266 -3.36376 13.9785 -3.97234 16.3891C-4.00558 16.5205 -4.00891 16.6579 -3.98206 16.7907C-3.95521 16.9236 -3.89891 17.0484 -3.81746 17.1557C-3.73601 17.2629 -3.63159 17.3497 -3.51218 17.4094C-3.39278 17.4691 -3.26157 17.5001 -3.12861 17.5H10.8067C10.9396 17.5001 11.0708 17.4691 11.1902 17.4094C11.3096 17.3497 11.4141 17.2629 11.4955 17.1557C11.577 17.0484 11.6333 16.9236 11.6601 16.7907C11.6869 16.6579 11.6836 16.5205 11.6504 16.3891C11.0418 13.9773 9.27268 12.0255 7.0278 11.0568Z" fill="currentColor"/>
            </g>
            <defs>
              <clipPath id="clip0_3401_11851">
                <rect width="19" height="19" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        </div>

        <!-- Checkbox menor de edad -->
        <div class="checkbox-field">
        <label class="checkbox-label">
          <input type="checkbox" v-model="younger" class="checkbox-input" />
          <span class="checkbox-text">Menor de edad / extranjero</span>
        </label>
        </div>

        <!-- Nombre y Apellido en fila -->
        <div class="form-row">
        <div class="form-field">
          <div class="input-container">
            <input
              id="name"
              class="input-register-new"
              placeholder="Nombre"
              v-model="name"
              :class="{ error: error.name }"
              @keydown="reset('name')"
            />
            <svg 
              class="input-icon" 
              width="20" 
              height="20" 
              viewBox="0 0 13 15" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.49984 0.375C8.24942 0.375 9.6665 1.79208 9.6665 3.54167C9.6665 5.29125 8.24942 6.70833 6.49984 6.70833C4.75025 6.70833 3.33317 5.29125 3.33317 3.54167C3.33317 1.79208 4.75025 0.375 6.49984 0.375ZM9.6665 8.71917C9.6665 9.55833 9.44484 11.5138 7.93275 13.6988L7.2915 9.875L8.03567 8.38667C7.54484 8.33125 7.03025 8.29167 6.49984 8.29167C5.96942 8.29167 5.45484 8.33125 4.964 8.38667L5.70817 9.875L5.06692 13.6988C3.55484 11.5138 3.33317 9.55833 3.33317 8.71917C1.44109 9.27333 0.166504 10.2708 0.166504 11.4583V14.625H12.8332V11.4583C12.8332 10.2708 11.5665 9.27333 9.6665 8.71917Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
        <div class="form-field">
          <div class="input-container">
            <input
              id="lastName"
              class="input-register-new"
              placeholder="Apellido"
              v-model="lastName"
              :class="{ error: error.lastName }"
              @keydown="reset('lastName')"
            />
            <svg 
              class="input-icon" 
              width="20" 
              height="20" 
              viewBox="0 0 13 15" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.49984 0.375C8.24942 0.375 9.6665 1.79208 9.6665 3.54167C9.6665 5.29125 8.24942 6.70833 6.49984 6.70833C4.75025 6.70833 3.33317 5.29125 3.33317 3.54167C3.33317 1.79208 4.75025 0.375 6.49984 0.375ZM9.6665 8.71917C9.6665 9.55833 9.44484 11.5138 7.93275 13.6988L7.2915 9.875L8.03567 8.38667C7.54484 8.33125 7.03025 8.29167 6.49984 8.29167C5.96942 8.29167 5.45484 8.33125 4.964 8.38667L5.70817 9.875L5.06692 13.6988C3.55484 11.5138 3.33317 9.55833 3.33317 8.71917C1.44109 9.27333 0.166504 10.2708 0.166504 11.4583V14.625H12.8332V11.4583C12.8332 10.2708 11.5665 9.27333 9.6665 8.71917Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
        </div>

        <!-- Celular -->
        <div class="form-field">
        <div class="input-container">
          <input
            id="phone"
            class="input-register-new"
            placeholder="Celular"
            oninput="this.value=this.value.replace(/(?![0-9])./gmi,'')"
            v-model="phone"
            :class="{ error: error.phone }"
            @keydown="reset('phone')"
          />
          <svg 
            class="overflow-icon" 
            width="20" 
            height="20" 
            viewBox="0 0 19 19" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.6667 1.58337H6.33333C5.91341 1.58337 5.51068 1.75019 5.21375 2.04712C4.91681 2.34405 4.75 2.74678 4.75 3.16671V15.8334C4.75 16.2533 4.91681 16.656 5.21375 16.953C5.51068 17.2499 5.91341 17.4167 6.33333 17.4167H12.6667C13.0866 17.4167 13.4893 17.2499 13.7863 16.953C14.0832 16.656 14.25 16.2533 14.25 15.8334V3.16671C14.25 2.74678 14.0832 2.34405 13.7863 2.04712C13.4893 1.75019 13.0866 1.58337 12.6667 1.58337ZM10.2917 16.625H8.70833V15.8334H10.2917V16.625ZM12.6667 15.0417H6.33333V3.95837H12.6667V15.0417Z" fill="currentColor"/>
          </svg>
        </div>
        </div>

        <!-- Correo -->
        <div class="form-field">
        <div class="input-container">
          <input
            id="email"
            class="input-register-new"
            type="email"
            placeholder="Correo"
            v-model="email"
            :class="{ error: error.email }"
            @keydown="reset('email')"
          />
          <i class="fas fa-envelope overflow-icon"></i>
        </div>
        </div>

        <!-- Fecha de Nacimiento -->
        <div class="form-field">
        <div class="input-container">
          <input
            id="birthDate"
            class="input-register-new date-input"
            type="date"
            placeholder="dd/mm/aaaa"
            v-model="birthDate"
            :class="{ error: error.birthDate }"
            @keydown="reset('birthDate')"
          />
          <i class="fas fa-calendar-alt overflow-icon calendar-icon" @click="openDatePicker"></i>
        </div>
        </div>

        <!-- Depto y Provincia en fila -->
        <div class="form-row">
        <div class="form-field">
          <div class="input-container">
            <select
              id="department"
              class="input-register-new select-field"
              v-model="department"
              :class="{ error: error.department }"
              @change="onDepartmentChange"
            >
              <option value="" disabled>Depto.</option>
              <option v-for="dept in departments" :key="dept.value" :value="dept.value">
                {{ dept.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-field">
          <div class="input-container">
            <select
              id="province"
              class="input-register-new select-field"
              v-model="province"
              :class="{ error: error.province }"
              @change="onProvinceChange"
              :disabled="!department"
            >
              <option value="" disabled>Provincia</option>
              <option v-for="prov in availableProvinces" :key="prov.value" :value="prov.value">
                {{ prov.name }}
              </option>
            </select>
          </div>
        </div>
        </div>

        <!-- Contraseña -->
        <div class="form-field">
        <div class="input-container">
          <input
            id="password"
            class="input-register-new"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Contraseña"
            v-model="password"
            :class="{ error: error.password }"
            @keydown="reset('password')"
          />
          <i 
            :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
            class="overflow-icon password-icon"
            @click="togglePassword"
          ></i>
        </div>
        </div>

        <!-- Código de patrocinador -->
        <div class="form-field">
        <div class="input-container">
          <input
            id="sponsorCode"
            class="input-register-new"
            placeholder="Código de patrocinador"
            v-model="sponsorCode"
            :class="{ error: error.sponsorCode }"
            @keydown="reset('sponsorCode')"
          />
          <svg 
            class="overflow-icon" 
            width="20" 
            height="20" 
            viewBox="0 0 19 19" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.3658 4.09291L14.967 15.3227C14.7881 16.1136 14.329 16.2917 13.6655 15.9347L10.0674 13.281L8.30596 14.9649C8.12784 15.1438 7.94892 15.3227 7.54042 15.3227L7.82147 11.6217L14.5332 5.52266C14.8135 5.24162 14.4564 5.1395 14.0994 5.36987L5.75442 10.6265L2.15551 9.52929C1.36463 9.27437 1.36463 8.73762 2.33442 8.38137L16.3192 2.945C17.008 2.74075 17.5954 3.09858 17.3658 4.09291Z" fill="currentColor"/>
          </svg>
        </div>
        </div>

        <!-- Mensaje de alerta -->
        <div v-if="alert" class="alert-message">
        {{ alert | alert }}
        </div>

        <!-- Botón de registro -->
        <button class="register-button" @click="submit" :disabled="sending">
        {{ sending ? 'Registrando...' : 'Registrarme' }}
        </button>

        <!-- Términos y condiciones -->
        <div class="terms-field">
        <label class="checkbox-label">
          <input type="checkbox" v-model="acceptTerms" class="checkbox-input" />
          <span class="checkbox-text"><span style="color: #5C0F39;">Acepto los</span> términos de uso</span>
        </label>
        </div>

        <!-- Iconos de redes sociales -->
        <div class="social" style="margin-top: -10px; margin-left: -10px;">
        <div class="social-icon facebook">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="13" fill="#BE9FB0" fill-opacity="0.6"/>
            <path d="M32 20C32 13.3708 26.6248 8 20 8C13.3708 8 8 13.3708 8 20C8 25.988 12.3868 30.953 18.125 31.8522V23.4695H15.0778V20.0007H18.125V17.3555C18.125 14.3488 19.9138 12.6883 22.6558 12.6883C23.969 12.6883 25.3438 12.9223 25.3438 12.9223V15.875H23.828C22.34 15.875 21.875 16.8013 21.875 17.75V20H25.2028L24.668 23.4688H21.875V31.8515C27.6087 30.9522 32 25.9872 32 19.9992V20Z" fill="white"/>
          </svg>
        </div>
        <div class="social-icon youtube">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="13" fill="#BE9FB0" fill-opacity="0.6"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20 12.15C18.809 12.15 17.42 12.178 16.066 12.216L16.011 12.218C14.633 12.257 13.521 12.288 12.645 12.433C11.732 12.584 10.974 12.873 10.368 13.496C9.76 14.121 9.495 14.894 9.37 15.819C9.25 16.709 9.25 17.837 9.25 19.239V20.763C9.25 22.163 9.25 23.291 9.37 24.182C9.494 25.107 9.76 25.88 10.368 26.505C10.974 27.129 11.732 27.417 12.645 27.568C13.521 27.713 14.633 27.744 16.011 27.783L16.066 27.785C17.421 27.823 18.809 27.851 20 27.851C21.191 27.851 22.58 27.823 23.934 27.785L23.989 27.783C25.367 27.744 26.479 27.713 27.355 27.568C28.268 27.417 29.026 27.128 29.632 26.505C30.24 25.88 30.506 25.107 30.63 24.182C30.75 23.292 30.75 22.164 30.75 20.762V19.238C30.75 17.837 30.75 16.709 30.63 15.819C30.506 14.894 30.24 14.121 29.632 13.496C29.026 12.872 28.268 12.584 27.355 12.433C26.479 12.288 25.367 12.257 23.988 12.218L23.934 12.216C22.623 12.1762 21.3116 12.1542 20 12.15ZM18.872 22.651C18.758 22.7162 18.6288 22.7502 18.4975 22.7498C18.3661 22.7493 18.2372 22.7144 18.1236 22.6485C18.01 22.5826 17.9157 22.488 17.8501 22.3742C17.7846 22.2604 17.75 22.1314 17.75 22V18C17.75 17.8687 17.7846 17.7397 17.8501 17.6259C17.9157 17.5121 18.01 17.4175 18.1236 17.3516C18.2372 17.2856 18.3661 17.2507 18.4975 17.2503C18.6288 17.2498 18.758 17.2839 18.872 17.349L22.372 19.349C22.4867 19.4146 22.582 19.5094 22.6484 19.6237C22.7147 19.7381 22.7496 19.8679 22.7496 20C22.7496 20.1322 22.7147 20.262 22.6484 20.3763C22.582 20.4906 22.4867 20.5854 22.372 20.651L18.872 22.651Z" fill="white"/>
          </svg>
        </div>
        <div class="social-icon tiktok">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="13" fill="#BE9FB0" fill-opacity="0.6"/>
            <path d="M24.9834 13.305C24.243 12.4595 23.8349 11.3738 23.835 10.25H20.4875V23.6833C20.4623 24.4105 20.1555 25.0993 19.632 25.6046C19.1086 26.1099 18.4093 26.3921 17.6817 26.3917C16.1434 26.3917 14.865 25.135 14.865 23.575C14.865 21.7117 16.6634 20.3142 18.5159 20.8883V17.465C14.7784 16.9667 11.5067 19.87 11.5067 23.575C11.5067 27.1825 14.4967 29.75 17.6709 29.75C21.0725 29.75 23.835 26.9875 23.835 23.575V16.7608C25.1925 17.7357 26.8222 18.2587 28.4934 18.2558V14.9083C28.4934 14.9083 26.4567 15.0058 24.9834 13.305Z" fill="white"/>
          </svg>
        </div>
        <a
          class="social-icon whatsapp"
          :href="wsp_pe"
          target="_blank"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="13" fill="#BE9FB0" fill-opacity="0.6"/>
            <path d="M27.6375 12.3192C26.6441 11.3161 25.4611 10.5208 24.1573 9.97958C22.8535 9.43834 21.455 9.16201 20.0433 9.16668C14.1283 9.16668 9.30749 13.9875 9.30749 19.9025C9.30749 21.7984 9.80583 23.64 10.7375 25.265L9.22083 30.8334L14.9083 29.3384C16.4792 30.1942 18.245 30.6492 20.0433 30.6492C25.9583 30.6492 30.7792 25.8284 30.7792 19.9134C30.7792 17.0425 29.6633 14.345 27.6375 12.3192ZM20.0433 28.8292C18.44 28.8292 16.8692 28.3959 15.4933 27.5834L15.1683 27.3884L11.7883 28.2767L12.6875 24.9834L12.4708 24.6475C11.5798 23.2252 11.1068 21.5809 11.1058 19.9025C11.1058 14.9842 15.1142 10.9759 20.0325 10.9759C22.4158 10.9759 24.6583 11.9075 26.3375 13.5975C27.1691 14.425 27.8281 15.4094 28.2763 16.4936C28.7244 17.5778 28.9529 18.7402 28.9483 19.9134C28.97 24.8317 24.9617 28.8292 20.0433 28.8292ZM24.94 22.1559C24.6692 22.0259 23.3475 21.3759 23.1092 21.2784C22.86 21.1917 22.6867 21.1484 22.5025 21.4084C22.3183 21.6792 21.8092 22.2859 21.6575 22.4592C21.5058 22.6434 21.3433 22.665 21.0725 22.5242C20.8017 22.3942 19.935 22.1017 18.9167 21.1917C18.115 20.4767 17.5842 19.5992 17.4217 19.3284C17.27 19.0575 17.4 18.9167 17.5408 18.7759C17.66 18.6567 17.8117 18.4617 17.9417 18.31C18.0717 18.1584 18.1258 18.0392 18.2125 17.8659C18.2992 17.6817 18.2558 17.53 18.1908 17.4C18.1258 17.27 17.5842 15.9484 17.3675 15.4067C17.1508 14.8867 16.9233 14.9517 16.7608 14.9409H16.2408C16.0567 14.9409 15.775 15.0059 15.5258 15.2767C15.2875 15.5475 14.5942 16.1975 14.5942 17.5192C14.5942 18.8409 15.5583 20.1192 15.6883 20.2925C15.8183 20.4767 17.5842 23.185 20.2708 24.3442C20.91 24.6259 21.4083 24.7884 21.7983 24.9075C22.4375 25.1134 23.0225 25.0809 23.4883 25.0159C24.0083 24.94 25.0808 24.3659 25.2975 23.7375C25.525 23.1092 25.525 22.5784 25.4492 22.4592C25.3733 22.34 25.2108 22.2859 24.94 22.1559Z" fill="white"/>
          </svg>
        </a>
        <div class="social-icon instagram">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="13" fill="#BE9FB0" fill-opacity="0.6"/>
            <path d="M20 12.188c-4.313 0-7.813 3.5-7.813 7.812s3.5 7.813 7.813 7.813 7.813-3.5 7.813-7.813-3.5-7.812-7.813-7.812zm0 13.312c-3.037 0-5.5-2.463-5.5-5.5s2.463-5.5 5.5-5.5 5.5 2.463 5.5 5.5-2.463 5.5-5.5 5.5zm8.125-14.313c0 .825-.675 1.5-1.5 1.5s-1.5-.675-1.5-1.5.675-1.5 1.5-1.5 1.5.675 1.5 1.5z" fill="white"/>
            <path d="M20 8c-3.25 0-3.656.012-4.938.075-1.281.063-2.156.263-2.938.563-.8.312-1.475.725-2.15 1.4s-1.088 1.35-1.4 2.15c-.3.781-.5 1.656-.563 2.938C8.012 16.344 8 16.75 8 20s.012 3.656.075 4.938c.063 1.281.263 2.156.563 2.938.312.8.725 1.475 1.4 2.15s1.35 1.088 2.15 1.4c.781.3 1.656.5 2.938.563h.125c1.1.06 1.5.07 4.75.07s3.65-.01 4.93-.07c1.29-.06 2.16-.26 2.94-.56.81-.31 1.49-.73 2.16-1.41.68-.68 1.09-1.35 1.4-2.16.3-.78.5-1.65.56-2.94.06-1.28.07-1.68.07-4.93 0-3.25-.01-3.66-.07-4.94-.06-1.28-.26-2.16-.56-2.94-.31-.81-.73-1.48-1.41-2.16s-1.35-1.09-2.16-1.4c-.78-.3-1.65-.5-2.94-.56-1.29-.06-1.68-.07-4.94-.07zm0 2c3.15 0 3.5.01 4.75.07 1.15.05 1.77.25 2.19.41.55.22.95.48 1.36.89.41.41.67.81.89 1.36.16.42.36 1.04.41 2.19.06 1.25.07 1.6.07 4.75s-.01 3.5-.07 4.75c-.05 1.15-.25 1.77-.41 2.19-.22.55-.48.95-.89 1.36s-.81.67-1.36.89c-.42.16-1.04.36-2.19.41-1.25.06-1.6.07-4.75.07s-3.5-.01-4.75-.07c-1.15-.05-1.77-.25-2.19-.41-.55-.22-.95-.48-1.36-.89-.41-.41-.67-.81-.89-1.36-.16-.42-.36-1.04-.41-2.19C10.01 23.5 10 23.15 10 20s.01-3.5.07-4.75c.05-1.15.25-1.77.41-2.19.22-.55.48-.95.89-1.36s.81-.67 1.36-.89c.42-.16 1.04-.36 2.19-.41 1.25-.06 1.6-.07 4.75-.07z" fill="white"/>
          </svg>
        </div>
      </div>

        <!-- Enlace de login -->
        <div class="login-link">
          <small>¿Ya tienes una cuenta? <router-link to="/login">Haz click aquí</router-link></small>
        </div>
      </div>
    </section>
  </Auth>
</template>

<script>
import Auth from "@/views/layouts/Auth";
import api from "@/api";

export default {
  components: { Auth },
  data() {
    return {
      // country: 'Perú',
      // country: 'Bolivia',
      // country: 'Ecuador',
      country: null,

      younger: false,
      dni: null,
      name: null,
      lastName: null,
      // username: null,
      birthDate: null,
      email: null,
      phone: null,
      password: "",
      sponsorCode: null,
      acceptTerms: false,
      showPassword: false,
      department: "",
      province: "",
      code: null,
      check: false,
      
      // Datos de ubicación
      departments: [
        { value: 'amazonas', name: 'Amazonas' },
        { value: 'ancash', name: 'Áncash' },
        { value: 'apurimac', name: 'Apurímac' },
        { value: 'arequipa', name: 'Arequipa' },
        { value: 'ayacucho', name: 'Ayacucho' },
        { value: 'cajamarca', name: 'Cajamarca' },
        { value: 'callao', name: 'Callao' },
        { value: 'cusco', name: 'Cusco' },
        { value: 'huancavelica', name: 'Huancavelica' },
        { value: 'huanuco', name: 'Huánuco' },
        { value: 'ica', name: 'Ica' },
        { value: 'junin', name: 'Junín' },
        { value: 'la-libertad', name: 'La Libertad' },
        { value: 'lambayeque', name: 'Lambayeque' },
        { value: 'lima', name: 'Lima' },
        { value: 'loreto', name: 'Loreto' },
        { value: 'madre-de-dios', name: 'Madre de Dios' },
        { value: 'moquegua', name: 'Moquegua' },
        { value: 'pasco', name: 'Pasco' },
        { value: 'piura', name: 'Piura' },
        { value: 'puno', name: 'Puno' },
        { value: 'san-martin', name: 'San Martín' },
        { value: 'tacna', name: 'Tacna' },
        { value: 'tumbes', name: 'Tumbes' },
        { value: 'ucayali', name: 'Ucayali' }
      ],
      
      // Datos estáticos de provincias por departamento
      provincesData: {
        'amazonas': [
          { value: 'bagua', name: 'Bagua' },
          { value: 'bongara', name: 'Bongará' },
          { value: 'chachapoyas', name: 'Chachapoyas' },
          { value: 'condorcanqui', name: 'Condorcanqui' },
          { value: 'luya', name: 'Luya' },
          { value: 'rodriguez-de-mendoza', name: 'Rodríguez de Mendoza' },
          { value: 'utcubamba', name: 'Utcubamba' }
        ],
        'lima': [
          { value: 'lima', name: 'Lima' },
          { value: 'barranca', name: 'Barranca' },
          { value: 'cajatambo', name: 'Cajatambo' },
          { value: 'canta', name: 'Canta' },
          { value: 'cañete', name: 'Cañete' },
          { value: 'huaral', name: 'Huaral' },
          { value: 'huarochiri', name: 'Huarochirí' },
          { value: 'huaura', name: 'Huaura' },
          { value: 'oyon', name: 'Oyón' },
          { value: 'yauyos', name: 'Yauyos' }
        ],
        'arequipa': [
          { value: 'arequipa', name: 'Arequipa' },
          { value: 'camana', name: 'Camaná' },
          { value: 'caraveli', name: 'Caravelí' },
          { value: 'castilla', name: 'Castilla' },
          { value: 'caylloma', name: 'Caylloma' },
          { value: 'condesuyos', name: 'Condesuyos' },
          { value: 'islay', name: 'Islay' },
          { value: 'la-union', name: 'La Unión' }
        ],
        'cusco': [
          { value: 'cusco', name: 'Cusco' },
          { value: 'aconcagua', name: 'Acomayo' },
          { value: 'anta', name: 'Anta' },
          { value: 'calca', name: 'Calca' },
          { value: 'canas', name: 'Canas' },
          { value: 'canchis', name: 'Canchis' },
          { value: 'chumbivilcas', name: 'Chumbivilcas' },
          { value: 'espinar', name: 'Espinar' },
          { value: 'la-convencion', name: 'La Convención' },
          { value: 'paruro', name: 'Paruro' },
          { value: 'paucartambo', name: 'Paucartambo' },
          { value: 'quispicanchi', name: 'Quispicanchi' },
          { value: 'urubamba', name: 'Urubamba' }
        ],
        'callao': [
          { value: 'callao', name: 'Callao' }
        ],
        'piura': [
          { value: 'piura', name: 'Piura' },
          { value: 'ayabaca', name: 'Ayabaca' },
          { value: 'huancabamba', name: 'Huancabamba' },
          { value: 'morropon', name: 'Morropón' },
          { value: 'paita', name: 'Paita' },
          { value: 'sullana', name: 'Sullana' },
          { value: 'talara', name: 'Talara' },
          { value: 'sechura', name: 'Sechura' }
        ],
        'la-libertad': [
          { value: 'trujillo', name: 'Trujillo' },
          { value: 'asuncion', name: 'Ascope' },
          { value: 'bolivar', name: 'Bolívar' },
          { value: 'chepen', name: 'Chepén' },
          { value: 'gran-chimu', name: 'Gran Chimú' },
          { value: 'julcan', name: 'Julcán' },
          { value: 'otuzco', name: 'Otuzco' },
          { value: 'pacasmayo', name: 'Pacasmayo' },
          { value: 'pataz', name: 'Pataz' },
          { value: 'sanchez-carrion', name: 'Sánchez Carrión' },
          { value: 'santiago-de-chuco', name: 'Santiago de Chuco' },
          { value: 'viru', name: 'Virú' }
        ],
        'lambayeque': [
          { value: 'chiclayo', name: 'Chiclayo' },
          { value: 'ferreñafe', name: 'Ferreñafe' },
          { value: 'lambayeque', name: 'Lambayeque' }
        ],
        'ancash': [
          { value: 'huaraz', name: 'Huaraz' },
          { value: 'aija', name: 'Aija' },
          { value: 'antonio-raimondi', name: 'Antonio Raimondi' },
          { value: 'asuncion', name: 'Asunción' },
          { value: 'bolognesi', name: 'Bolognesi' },
          { value: 'carhuaz', name: 'Carhuaz' },
          { value: 'carlos-fermin-fitzcarrald', name: 'Carlos Fermín Fitzcarrald' },
          { value: 'casma', name: 'Casma' },
          { value: 'corongo', name: 'Corongo' },
          { value: 'huari', name: 'Huari' },
          { value: 'huarmey', name: 'Huarmey' },
          { value: 'huaylas', name: 'Huaylas' },
          { value: 'mariscal-luzuriaga', name: 'Mariscal Luzuriaga' },
          { value: 'ocros', name: 'Ocros' },
          { value: 'pallasca', name: 'Pallasca' },
          { value: 'pomabamba', name: 'Pomabamba' },
          { value: 'recuay', name: 'Recuay' },
          { value: 'santa', name: 'Santa' },
          { value: 'sihuas', name: 'Sihuas' },
          { value: 'yungay', name: 'Yungay' }
        ],
        'junin': [
          { value: 'huancayo', name: 'Huancayo' },
          { value: 'concepcion', name: 'Concepción' },
          { value: 'chanchamayo', name: 'Chanchamayo' },
          { value: 'jauja', name: 'Jauja' },
          { value: 'junin', name: 'Junín' },
          { value: 'satipo', name: 'Satipo' },
          { value: 'tarma', name: 'Tarma' },
          { value: 'yauli', name: 'Yauli' },
          { value: 'chupaca', name: 'Chupaca' }
        ],
        'ica': [
          { value: 'ica', name: 'Ica' },
          { value: 'chincha', name: 'Chincha' },
          { value: 'nazca', name: 'Nazca' },
          { value: 'palpa', name: 'Palpa' },
          { value: 'pisco', name: 'Pisco' }
        ],
        'ayacucho': [
          { value: 'huamanga', name: 'Huamanga' },
          { value: 'cangallo', name: 'Cangallo' },
          { value: 'huanca-sancos', name: 'Huanca Sancos' },
          { value: 'huanta', name: 'Huanta' },
          { value: 'la-mar', name: 'La Mar' },
          { value: 'lucanas', name: 'Lucanas' },
          { value: 'parinacochas', name: 'Parinacochas' },
          { value: 'paucar-del-sara-sara', name: 'Paucar del Sara Sara' },
          { value: 'sucre', name: 'Sucre' },
          { value: 'victor-fajardo', name: 'Víctor Fajardo' },
          { value: 'vileas-huaman', name: 'Vilcas Huamán' }
        ],
        'cajamarca': [
          { value: 'cajamarca', name: 'Cajamarca' },
          { value: 'cajabamba', name: 'Cajabamba' },
          { value: 'celendin', name: 'Celendín' },
          { value: 'chota', name: 'Chota' },
          { value: 'contumaza', name: 'Contumazá' },
          { value: 'cutervo', name: 'Cutervo' },
          { value: 'hualgayoc', name: 'Hualgayoc' },
          { value: 'jaen', name: 'Jaén' },
          { value: 'san-ignacio', name: 'San Ignacio' },
          { value: 'san-marcos', name: 'San Marcos' },
          { value: 'san-miguel', name: 'San Miguel' },
          { value: 'san-pablo', name: 'San Pablo' },
          { value: 'santa-cruz', name: 'Santa Cruz' }
        ],
        'huancavelica': [
          { value: 'huancavelica', name: 'Huancavelica' },
          { value: 'acobamba', name: 'Acobamba' },
          { value: 'angaraes', name: 'Angaraes' },
          { value: 'castrovirreyna', name: 'Castrovirreyna' },
          { value: 'churcampa', name: 'Churcampa' },
          { value: 'huaytara', name: 'Huaytará' },
          { value: 'tayacaja', name: 'Tayacaja' }
        ],
        'huanuco': [
          { value: 'huanuco', name: 'Huánuco' },
          { value: 'ambo', name: 'Ambo' },
          { value: 'dos-de-mayo', name: 'Dos de Mayo' },
          { value: 'huacaybamba', name: 'Huacaybamba' },
          { value: 'huamalies', name: 'Huamalíes' },
          { value: 'leoncio-prado', name: 'Leoncio Prado' },
          { value: 'marañon', name: 'Marañón' },
          { value: 'pachitea', name: 'Pachitea' },
          { value: 'puerto-inca', name: 'Puerto Inca' },
          { value: 'lauricocha', name: 'Lauricocha' },
          { value: 'yarowilca', name: 'Yarowilca' }
        ],
        'loreto': [
          { value: 'maynas', name: 'Maynas' },
          { value: 'alto-amazonas', name: 'Alto Amazonas' },
          { value: 'loreto', name: 'Loreto' },
          { value: 'mariscal-ramon-castilla', name: 'Mariscal Ramón Castilla' },
          { value: 'putumayo', name: 'Putumayo' },
          { value: 'requena', name: 'Requena' },
          { value: 'ucayali', name: 'Ucayali' },
          { value: 'datem-del-marañon', name: 'Datem del Marañón' }
        ],
        'madre-de-dios': [
          { value: 'tambopata', name: 'Tambopata' },
          { value: 'manu', name: 'Manu' },
          { value: 'tahuamanu', name: 'Tahuamanu' }
        ],
        'moquegua': [
          { value: 'moquegua', name: 'Moquegua' },
          { value: 'general-sanchez-cerro', name: 'General Sánchez Cerro' },
          { value: 'ilo', name: 'Ilo' }
        ],
        'pasco': [
          { value: 'pasco', name: 'Pasco' },
          { value: 'daniel-alcides-carrion', name: 'Daniel Alcides Carrión' },
          { value: 'oxapampa', name: 'Oxapampa' }
        ],
        'puno': [
          { value: 'puno', name: 'Puno' },
          { value: 'azangaro', name: 'Azángaro' },
          { value: 'carabaya', name: 'Carabaya' },
          { value: 'chucuito', name: 'Chucuito' },
          { value: 'el-collao', name: 'El Collao' },
          { value: 'huancane', name: 'Huancané' },
          { value: 'lampa', name: 'Lampa' },
          { value: 'melgar', name: 'Melgar' },
          { value: 'moho', name: 'Moho' },
          { value: 'san-antonio-de-putina', name: 'San Antonio de Putina' },
          { value: 'san-roman', name: 'San Román' },
          { value: 'sandia', name: 'Sandia' },
          { value: 'yunguyo', name: 'Yunguyo' }
        ],
        'san-martin': [
          { value: 'moyobamba', name: 'Moyobamba' },
          { value: 'bellavista', name: 'Bellavista' },
          { value: 'el-dorado', name: 'El Dorado' },
          { value: 'huallaga', name: 'Huallaga' },
          { value: 'lamas', name: 'Lamas' },
          { value: 'mariscal-caceres', name: 'Mariscal Cáceres' },
          { value: 'picota', name: 'Picota' },
          { value: 'rioja', name: 'Rioja' },
          { value: 'san-martin', name: 'San Martín' },
          { value: 'tocache', name: 'Tocache' }
        ],
        'tacna': [
          { value: 'tacna', name: 'Tacna' },
          { value: 'candarave', name: 'Candarave' },
          { value: 'jorge-basadre', name: 'Jorge Basadre' },
          { value: 'tarata', name: 'Tarata' }
        ],
        'tumbes': [
          { value: 'tumbes', name: 'Tumbes' },
          { value: 'contralmirante-villar', name: 'Contralmirante Villar' },
          { value: 'zarumilla', name: 'Zarumilla' }
        ],
        'ucayali': [
          { value: 'coronel-portillo', name: 'Coronel Portillo' },
          { value: 'atalaya', name: 'Atalaya' },
          { value: 'padre-abad', name: 'Padre Abad' },
          { value: 'purus', name: 'Purus' }
        ],
        'apurimac': [
          { value: 'abancay', name: 'Abancay' }
        ]
      },
      availableProvinces: [],
      
      error: {
        country: false,
        dni: false,
        name: false,
        lastName: false,
        birthDate: false,
        email: false,
        phone: false,
        department: false,
        province: false,
        password: false,
        sponsorCode: false,
      },
      sending: false,
      alert: null,
      disabled: false,
      show: false,
    };
  },
  filters: {
      alert(msg) {
        if (msg === "dni already use") return "El documento ya existe";
        if (msg === "email already use") return "El correo electrónico ya está en uso";
        if (msg === "code not found") return "El código de invitación no existe";
        if (msg === "code required") return "El código de patrocinador es requerido";
        return msg;
      },
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

    prefix() {
      if (this.country == "Ecuador") return "+593";
      if (this.country == "Perú") return "+51";
      if (this.country == "Argentina") return "+54";
      if (this.country == "Bolivia") return "+591";
      if (this.country == "Colombia") return "+57";
      if (this.country == "Costa Rica") return "+506";
      if (this.country == "Chile") return "+56";
    },
  },
  created() {
    console.log("Register");

    this.code = this.$route.params.code;
    
    // Si viene código en la URL, pre-llenarlo en el campo de patrocinador
    if (this.code) {
      this.sponsorCode = this.code;
      this.disabled = true;
    }

    setTimeout(() => {
      const logoAuth = document.getElementById("logo-auth");
      console.log(logoAuth);
      logoAuth.style.order = 1;

      const contentAuth = document.getElementById("content-auth");
      console.log(contentAuth);
      contentAuth.style.order = 0;
    }, 100);

    // const logoAuth = document.getElementById("logo-auth");
    // console.log(logoAuth);
    // logoAuth.style.order = 1;

    // const contentAuth = document.getElementById("content-auth");
    // console.log(contentAuth);
    // contentAuth.style.order = 0;
  },
  watch: {
    /* async dni(dni) {
      if(this.country != 'Perú' || this.younger) return

      if(dni.length < 8) return

      const response = await fetch(`https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhhbnNldmFuZ2VsaXN0YUBnbWFpbC5jb20ifQ.Fa2w9sYLXtcgMbtM58YRiwYvomChYwwMAoIDmYmo1H8`)

      var data = await response.json()

      if(data.success == false) {
        console.log('person not found ...')
        this.error.name = true
        return
      }

      this.error.name = false

      this.name     = data.nombres
      this.lastName = data.apellidoPaterno + ' ' + data.apellidoMaterno
    } */
  },
  methods: {
    async submit() {
      const { dni, name, lastName, password, phone, sponsorCode, email, birthDate, acceptTerms, department, province } = this;

      if (!dni) {
        this.error.dni = true;
        this.alert = "El documento se requiere";
        return;
      }
      if (!name) {
        this.error.name = true;
        this.alert = "El nombre se requiere";
        return;
      }
      if (!lastName) {
        this.error.lastName = true;
        this.alert = "El apellido se requiere";
        return;
      }
      if (!email) {
        this.error.email = true;
        this.alert = "El correo se requiere";
        return;
      }
      
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        this.error.email = true;
        this.alert = "El correo no tiene un formato válido";
        return;
      }
      if (!birthDate) {
        this.error.birthDate = true;
        this.alert = "La fecha de nacimiento se requiere";
        return;
      }
      if (!password) {
        this.error.password = true;
        this.alert = "La contraseña es requerida";
        return;
      }
      if (!sponsorCode) {
        this.error.sponsorCode = true;
        this.alert = "El código de patrocinador es requerido";
        return;
      }
      if(!phone) {
        this.error.phone = true;
        this.alert = "El telefono se requiere";
        return;
      }
      if (!department) {
        this.error.department = true;
        this.alert = "Debe seleccionar un departamento";
        return;
      }
      if (!province) {
        this.error.province = true;
        this.alert = "Debe seleccionar una provincia";
        return;
      }
      if (!acceptTerms) {
        this.alert = "Debes aceptar los términos.";
        return;
      }

      this.sending = true;

      try {
        const { data } = await api.register({
          dni,
          name,
          lastName,
          email,
          date: birthDate,
          password,
          phone,
          code: sponsorCode,
          department,
          province,
        });

        this.sending = false;

        if (data.error) {
          this.alert = data.msg;
          return;
        }

        const session = localStorage.getItem("session");
        if (session) {
          localStorage.removeItem("session");
          api.logout(this.session);
        }

        this.$store.commit("SET_SESSION", data.session);
        
        // Redirigir según el estado de afiliación
        if (data.affiliated) {
          this.$router.push("/dashboard");
        } else {
          this.$router.push("/affiliation");
        }
      } catch (err) {
        this.sending = false;
        this.alert = "Error al registrar. Por favor intenta nuevamente.";
      }
    },

    reset(name) {
      this.alert = null;

      if (name == "dni") this.error.dni = false;
      if (name == "name") this.error.name = false;
      if (name == "lastName") this.error.lastName = false;
      if (name == "phone") this.error.phone = false;
      if (name == "email") this.error.email = false;
      if (name == "birthDate") this.error.birthDate = false;
      if (name == "password") this.error.password = false;
      if (name == "sponsorCode") this.error.sponsorCode = false;
      if (name == "department") this.error.department = false;
      if (name == "province") this.error.province = false;
    },

    async onDepartmentChange() {
      this.reset('department');
      
      // Limpiar provincias cuando cambia el departamento
      this.province = "";
      this.availableProvinces = [];
      
      if (!this.department) return;
      
      // Primero intentar con datos estáticos
      if (this.provincesData[this.department]) {
        this.availableProvinces = this.provincesData[this.department];
        return;
      }
      
      // Si no hay datos estáticos, intentar con la API
      try {
        const response = await fetch(`/api/app/delivery?type=provinces&department=${this.department}`);
        const data = await response.json();
        
        if (data.provinces && data.provinces.length > 0) {
          this.availableProvinces = data.provinces;
        } else {
          // Si la API no tiene datos, mostrar mensaje
          console.warn(`No hay datos de provincias para ${this.department}`);
          this.availableProvinces = [];
        }
      } catch (error) {
        console.error('Error cargando provincias desde API:', error);
        this.availableProvinces = [];
      }
    },

    async onProvinceChange() {
      this.reset('province');
      
      if (!this.province || !this.department) return;
    },

    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    openDatePicker() {
      const dateInput = document.getElementById('birthDate');
      if (dateInput) {
        dateInput.showPicker();
      }
    },
  },
};
</script>
<style scoped lang="stylus">
@import '~@/assets/style/register.styl';
</style>

