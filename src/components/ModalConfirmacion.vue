<template>
  <div class="modal-overlay" v-if="visible" @click="handleOverlayClick">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <div class="success-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="currentColor"/>
            <path d="M9 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3>{{ titulo }}</h3>
        <p>{{ mensaje }}</p>
      </div>

      <div class="modal-actions">
        <button @click="handleConfirm" class="btn-confirmar">
          {{ textoBoton || 'Entendido' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';

export default defineComponent({
  name: 'ModalConfirmacion',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    titulo: {
      type: String,
      default: 'Operación exitosa'
    },
    mensaje: {
      type: String,
      default: 'La operación se ha completado correctamente.'
    },
    textoBoton: {
      type: String,
      default: 'Entendido'
    },
    autoClose: {
      type: Boolean,
      default: false
    },
    autoCloseDelay: {
      type: Number,
      default: 2000
    }
  },
  emits: ['close', 'confirm'],
  setup(props, { emit }) {
    let autoCloseTimer: ReturnType<typeof setTimeout> | null = null;

    const handleConfirm = () => {
      emit('confirm');
      emit('close');
    };

    const handleOverlayClick = () => {
      emit('close');
    };

    // Auto-close functionality
    const startAutoClose = () => {
      if (props.autoClose && props.visible) {
        autoCloseTimer = setTimeout(() => {
          emit('close');
        }, props.autoCloseDelay);
      }
    };

    const clearAutoClose = () => {
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
        autoCloseTimer = null;
      }
    };

    // Watch for visibility changes
    watch(() => props.visible, (newVisible) => {
      if (newVisible) {
        startAutoClose();
      } else {
        clearAutoClose();
      }
    });

    return {
      handleConfirm,
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
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  backdrop-filter: blur(2px);
  animation: fadeIn 0.2s ease-out;
}

.modal-content {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  padding: 0;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease-out;
  overflow: hidden;
}

.modal-header {
  text-align: center;
  padding: var(--spacing-4xl) var(--spacing-3xl) var(--spacing-xl);
  border-bottom: 1px solid var(--color-gray);

  .success-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto var(--spacing-xl);
    color: var(--color-success);
    animation: pulse 2s infinite;
    
    svg {
      width: 100%;
      height: 100%;
      filter: drop-shadow(0 4px 8px rgba(40, 167, 69, 0.2));
    }
  }

  h3 {
    margin: 0 0 var(--spacing-md) 0;
    font-family: 'Omnes', sans-serif;
    font-weight: 600;
    font-size: 1.3rem;
    color: var(--color-text);
    line-height: 1.3;
  }

  p {
    margin: 0;
    font-family: 'Omnes', sans-serif;
    font-size: 0.95rem;
    color: var(--color-text-light);
    line-height: 1.4;
  }
}

.modal-actions {
  padding: var(--spacing-xl) var(--spacing-3xl) var(--spacing-4xl);
  display: flex;
  justify-content: center;

  .btn-confirmar {
    background-color: var(--color-primary);
    color: var(--color-white);
    border: none;
    padding: var(--spacing-md) var(--spacing-4xl);
    border-radius: var(--radius-md);
    font-size: 1rem;
    font-weight: 500;
    font-family: 'Omnes', sans-serif;
    cursor: pointer;
    transition: var(--transition-normal);
    min-width: 120px;
    box-shadow: 0 4px 12px rgba(8, 85, 196, 0.25);

    &:hover {
      background-color: var(--color-primary-dark);
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(8, 85, 196, 0.3);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 4px 12px rgba(8, 85, 196, 0.25);
    }

    &:focus {
      outline: none;
      box-shadow: 0 4px 12px rgba(8, 85, 196, 0.25), 0 0 0 3px rgba(8, 85, 196, 0.1);
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

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
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
@media (max-width: 768px) {
  .modal-overlay {
    padding: var(--spacing-lg);
  }

  .modal-content {
    max-width: none;
  }

  .modal-header {
    padding: var(--spacing-3xl) var(--spacing-xl) var(--spacing-lg);

    .success-icon {
      width: 56px;
      height: 56px;
      margin-bottom: var(--spacing-lg);
    }

    h3 {
      font-size: 1.2rem;
    }

    p {
      font-size: 0.9rem;
    }
  }

  .modal-actions {
    padding: var(--spacing-lg) var(--spacing-xl) var(--spacing-3xl);
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: var(--spacing-md);
  }

  .modal-header {
    padding: var(--spacing-xl) var(--spacing-lg);
  }

  .modal-actions {
    padding: var(--spacing-md) var(--spacing-lg) var(--spacing-xl);
  }
}
</style>
