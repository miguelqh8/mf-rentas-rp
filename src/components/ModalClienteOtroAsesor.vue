<template>
  <div v-if="isVisible" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-container" @click.stop>
      <!-- Icono de alerta -->
      <div class="modal-icon">
        <div class="icon-circle">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  stroke="currentColor" 
                  stroke-width="2.5" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      
      <!-- Contenido del modal -->
      <div class="modal-content">
        <h2 class="modal-title">Cliente atendido por otro asesor</h2>
      </div>
      
      <!-- Botón de acción -->
      <div class="modal-actions">
        <button @click="handleEntendido" class="btn-primary">
          Entendido
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ModalClienteOtroAsesor',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const handleEntendido = () => {
      emit('close');
    };
    
    const handleOverlayClick = () => {
      emit('close');
    };
    
    return {
      handleEntendido,
      handleOverlayClick
    };
  }
});
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.3s ease-out;
}

.modal-container {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-4xl);
  max-width: 450px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xl);
  animation: slideUp 0.3s ease-out;
  position: relative;
}

.modal-icon {
  .icon-circle {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #ef4444;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-white);
    animation: pulse 2s infinite;
  }
}

.modal-content {
  text-align: center;
  
  .modal-title {
    font-family: 'Omnes', sans-serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text);
    margin: 0;
    line-height: 1.4;
    max-width: 300px;
  }
}

.modal-actions {
  width: 100%;
  display: flex;
  justify-content: center;
  
  .btn-primary {
    background-color: var(--color-primary);
    color: var(--color-white);
    border: none;
    border-radius: var(--radius-md);
    padding: var(--spacing-md) var(--spacing-4xl);
    font-family: 'Omnes', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition-normal);
    min-width: 140px;
    
    &:hover {
      background-color: var(--color-primary-dark);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
}

// Animaciones
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
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

// Responsive
@media (max-width: 480px) {
  .modal-container {
    padding: var(--spacing-3xl);
    max-width: 95%;
  }
  
  .modal-icon .icon-circle {
    width: 48px;
    height: 48px;
  }
  
  .modal-content .modal-title {
    font-size: 1.1rem;
  }
}
</style>
