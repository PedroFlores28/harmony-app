<template>
  <div class="migration-blocked-overlay" @click.self="$emit('close')">
    <div class="migration-blocked-card" role="dialog" aria-modal="true">
      <div class="migration-blocked-icon" aria-hidden="true">
        <span>i</span>
      </div>

      <h2 class="migration-blocked-title">
        Gracias, eres un paquete <strong>{{ planName }}</strong>
      </h2>

      <p class="migration-blocked-text">
        Has alcanzado el rango
        <strong class="migration-blocked-rank">PLATINO o superior</strong>,
        por lo que a partir de este momento ya no puedes realizar migraciones de
        paquete.
      </p>

      <div class="migration-blocked-highlight">
        <i class="fas fa-gift"></i>
        <div>
          <strong>¡Felicidades!</strong>
          <p>
            Mantén tu rango y continúa creciendo para acceder a mayores
            beneficios.
          </p>
        </div>
      </div>

      <button type="button" class="migration-blocked-btn" @click="$emit('close')">
        Entendido
        <i class="fas fa-check"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MigrationBlockedModal',
  props: {
    planName: {
      type: String,
      default: 'EMPRESARIO',
    },
  },
};
</script>

<style scoped>
.migration-blocked-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.45);
}

.migration-blocked-card {
  width: 100%;
  max-width: 480px;
  background: #fff;
  border-radius: 20px;
  padding: 32px 28px 28px;
  text-align: center;
  box-shadow: 0 16px 48px rgba(92, 15, 57, 0.18);
}

.migration-blocked-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 20px;
  border-radius: 50%;
  border: 2px solid #d4a853;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d4a853;
  font-size: 1.5rem;
  font-weight: 700;
  font-style: italic;
  font-family: Georgia, serif;
}

.migration-blocked-title {
  margin: 0 0 16px;
  font-size: 1.15rem;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
}

.migration-blocked-title strong {
  color: #5c0f39;
  font-weight: 800;
}

.migration-blocked-text {
  margin: 0 0 20px;
  font-size: 0.95rem;
  color: #555;
  line-height: 1.55;
}

.migration-blocked-rank {
  color: #5c0f39;
  font-weight: 800;
}

.migration-blocked-highlight {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  text-align: left;
  background: #f3edf5;
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 24px;
}

.migration-blocked-highlight > i {
  color: #7b4d8f;
  font-size: 1.25rem;
  margin-top: 2px;
}

.migration-blocked-highlight strong {
  display: block;
  color: #5c0f39;
  margin-bottom: 4px;
}

.migration-blocked-highlight p {
  margin: 0;
  font-size: 0.88rem;
  color: #666;
  line-height: 1.45;
}

.migration-blocked-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 180px;
  padding: 12px 28px;
  border: none;
  border-radius: 999px;
  background: #5c0f39;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.migration-blocked-btn:hover {
  background: #4a0c2e;
}
</style>
