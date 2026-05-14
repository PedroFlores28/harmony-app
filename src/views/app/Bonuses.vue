<template>
  <App :session="session" :title="title">
    <Spinner v-if="loading" :size="40" :color="'#086eb6'" />
    <SkeletonLoader
      v-if="loading"
      :lines="6"
      width="100%"
      height="28px"
      style="margin: 24px 0"
    />
    <div class="scroll" v-if="!loading">
      <h4>BONIFICACIONES</h4>

      <i class="load" v-if="loading"></i>

      <h4>Bono Logro</h4>

      <div v-for="(pay, i) in pays">
        <spam v-if="pay.name == 'DOBLE_DIAMANTE'">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i class="icon fas fa-gem" :class="{ green: pay.payed }"></i>
          <i class="icon fas fa-gem" :class="{ green: pay.payed }"></i>
        </spam>

        <spam v-else-if="pay.name == 'DIAMANTE_CORONA'">
          <i class="icon fas fa-gem" :class="{ green: pay.payed }"></i>
          <i class="icon fas fa-gem" :class="{ green: pay.payed }"></i>
          <i class="icon fas fa-gem" :class="{ green: pay.payed }"></i>
        </spam>

        <spam v-else-if="pay.name == 'TOP_HARMONY'">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i class="icon fas fa-star" :class="{ green: pay.payed }"></i>
        </spam>

        <spam v-else>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i class="icon fas fa-gem" :class="{ green: pay.payed }"></i>
        </spam>

        <input
          class="input"
          readonly
          :value="pay._name"
          v-bind:style="{ width: 150 + 15 * i + 'px' }"
          :class="[pay.payed ? pay.name : '']"
        />
        <br />
      </div>

      <br />
      <br />

      <h4>Rango Platino: 6/9</h4>
      <table>
        <thead>
          <tr>
            <th v-for="(bonus, i) in platino">{{ i + 1 }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="bonus in platino">{{ bonus }}</td>
          </tr>
        </tbody>
      </table>
      <br />

      <h4>Rango Diamante: 6/12</h4>
      <table>
        <thead>
          <tr>
            <th v-for="(bonus, i) in diamante">{{ i + 1 }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="bonus in diamante">{{ bonus }}</td>
          </tr>
        </tbody>
      </table>
      <br />

      <h4>Rango Diamante Azul: 21/24</h4>
      <table>
        <thead>
          <tr>
            <th v-for="(bonus, i) in diamanteAzul">{{ i + 1 }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="bonus in diamanteAzul">{{ bonus }}</td>
          </tr>
        </tbody>
      </table>
      <br />

      <h4>Rango Diamante Ejecutivo: 6/9</h4>
      <table>
        <thead>
          <tr>
            <th v-for="(bonus, i) in diamanteEjecutivo">{{ i + 1 }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="bonus in diamanteEjecutivo">{{ bonus }}</td>
          </tr>
        </tbody>
      </table>
      <br />
    </div>
  </App>
</template>

<script>
import App from "@/views/layouts/App";
import api from "@/api";
import Spinner from "@/components/Spinner.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";

export default {
  components: {
    App,
    Spinner,
    SkeletonLoader,
  },
  data() {
    return {
      loading: false,
      pays: [],
      platino: [],
      diamante: [],
      diamanteAzul: [],
      diamanteEjecutivo: [],
    };
  },
  computed: {
    session() {
      return this.$store.state.session;
    },
  },
  async created() {
    const { data } = await api.bonuses(this.session);
    let n;

    const payLabels = {
      MILLONARIO: "MILLONARIO $15",
      ORO: "ORO $30",
      ESMERALDA: "ESMERALDA $45",
      PLATINO: "PLATINO $100",
      DIAMANTE: "DIAMANTE $200",
      DIAMANTE_AZUL: "DIAMANTE AZUL $300",
      DIAMANTE_EJECUTIVO: "DIAMANTE EJECUTIVO $5.000",
      DOBLE_DIAMANTE: "DOBLE DIAMANTE $10.000",
      DIAMANTE_CORONA: "DIAMANTE CORONA $15.000",
      TOP_HARMONY: "TOP HARMONY $25.000",
    };

    this.pays = (data.pays || [])
      .filter((pay) => payLabels[pay.name])
      .map((pay) => ({ ...pay, _name: payLabels[pay.name] }));

    this.platino = data.bonuses.platino || [];
    this.diamante = data.bonuses.diamante || [];
    this.diamanteAzul = data.bonuses.diamante_azul || [];
    this.diamanteEjecutivo = data.bonuses.diamante_ejecutivo || [];

    n = 9 - this.platino.length;
    for (let i = 0; i < n; i++) this.platino.push("-");

    n = 12 - this.diamante.length;
    for (let i = 0; i < n; i++) this.diamante.push("-");

    n = 24 - this.diamanteAzul.length;
    for (let i = 0; i < n; i++) this.diamanteAzul.push("-");

    n = 9 - this.diamanteEjecutivo.length;
    for (let i = 0; i < n; i++) this.diamanteEjecutivo.push("-");
  },
};
</script>

<style>
.fa-gem.green {
  color: #06d6a0;
}

.input.green {
  background-color: #06d6a0;
}

.input.MILLONARIO {
  background-color: #5c0f39;
  color: white;
}
.input.ORO {
  background-color: #d4af37;
}
.input.ESMERALDA {
  background-color: #2ecc71;
  color: white;
}
.input.PLATINO {
  background-color: #e5e4e2;
}
.input.DIAMANTE {
  background-color: #b9f2ff;
}
.input.DIAMANTE_AZUL {
  background-color: #0476d9;
  color: white;
}
.input.DIAMANTE_EJECUTIVO {
  background-color: #243b6b;
  color: white;
}
.input.DOBLE_DIAMANTE {
  background-color: #7dd3fc;
}
.input.DIAMANTE_CORONA {
  background-color: #8b5cf6;
  color: white;
}
.input.TOP_HARMONY {
  background-color: #111827;
  color: white;
}
</style>
