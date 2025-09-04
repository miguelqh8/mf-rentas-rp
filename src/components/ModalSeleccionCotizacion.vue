<template>
  <div class="modal-overlay" v-if="visible" @click="closeModal">
    <div class="modal-content" @click.stop>
              <div class="modal-header">
        <h2>Elije</h2>
      </div>
      
      <div class="modal-body">
        <div class="opciones-container">
          <div 
            class="opcion-card" 
            @click="seleccionarOpcion('ingreso-seguro')"
            :class="{ 'selected': opcionSeleccionada === 'ingreso-seguro' }"
          >
            <div class="opcion-content">
              <h3>Ingreso Seguro con Devolución</h3>
              <p>Modalidad que garantiza el retorno de la inversión</p>
            </div>
          </div>

          <div 
            class="opcion-card"
            @click="seleccionarOpcion('ingreso-vitalicio')"
            :class="{ 'selected': opcionSeleccionada === 'ingreso-vitalicio' }"
          >
            <div class="opcion-content">
              <h3>Ingreso Vitalicio Seguro</h3>
              <p>Modalidad de renta vitalicia garantizada</p>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-actions">
        <button @click="closeModal" class="btn-cancelar">
          Cancelar
        </button>
        <button 
          @click="confirmarSeleccion" 
          class="btn-continuar"
          :disabled="!opcionSeleccionada"
        >
          Continuar
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ModalSeleccionCotizacion',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'select'],
  setup(props, { emit }) {
    const opcionSeleccionada = ref<string>('');

    const seleccionarOpcion = (opcion: string) => {
      opcionSeleccionada.value = opcion;
    };

    const closeModal = () => {
      emit('close');
      resetModal();
    };

    const confirmarSeleccion = () => {
      if (opcionSeleccionada.value) {
        const modalidadNombre = opcionSeleccionada.value === 'ingreso-seguro' 
          ? 'Ingreso Seguro con Devolución'
          : 'Ingreso Vitalicio Seguro';
        
        emit('select', {
          tipo: opcionSeleccionada.value,
          nombre: modalidadNombre
        });
        closeModal();
      }
    };

    const resetModal = () => {
      opcionSeleccionada.value = '';
    };

    return {
      opcionSeleccionada,
      seleccionarOpcion,
      closeModal,
      confirmarSeleccion
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: var(--spacing-lg);
  box-sizing: border-box;
}

.modal-content {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 240px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease-out;
  overflow: hidden;
}

.modal-header {
  background-color: var(--color-gray-light);
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
  
  h2 {
    margin: 0;
    font-family: 'Omnes', sans-serif;
    font-weight: 500;
    font-size: 0.95rem;
    color: var(--color-text);
    text-align: center;
    width: 100%;
  }
}

.modal-body {
  padding: var(--spacing-lg);
}

.opciones-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.opcion-card {
  border: none;
  border-radius: var(--radius-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  transition: var(--transition-normal);
  background-color: var(--color-gray-light);
  text-align: center;

  &:hover {
    background-color: var(--color-secondary-light);
    transform: translateY(-1px);
  }

  &.selected {
    background-color: var(--color-primary);
    color: var(--color-white);
    box-shadow: 0 2px 6px rgba(8, 85, 196, 0.25);
  }

  .opcion-content {
    h3 {
      margin: 0;
      font-family: 'Omnes', sans-serif;
      font-weight: 500;
      font-size: 0.85rem;
      color: inherit;
      line-height: 1.2;
    }

    p {
      display: none;
    }
  }
}

.modal-actions {
  display: flex;
  gap: var(--spacing-xs);
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--color-gray-light);
  border-top: 1px solid var(--color-border);

  .btn-cancelar {
    background-color: var(--color-white);
    color: var(--color-text-light);
    border: 1px solid var(--color-border-light);
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--radius-sm);
    font-size: 0.8rem;
    font-weight: 500;
    font-family: 'Omnes', sans-serif;
    cursor: pointer;
    transition: var(--transition-normal);
    flex: 1;

    &:hover {
      background-color: var(--color-gray-light);
      border-color: var(--color-border);
    }
  }

  .btn-continuar {
    background-color: var(--color-primary);
    color: var(--color-white);
    border: none;
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--radius-sm);
    font-size: 0.8rem;
    font-weight: 500;
    font-family: 'Omnes', sans-serif;
    cursor: pointer;
    transition: var(--transition-normal);
    flex: 1;

    &:hover:not(:disabled) {
      background-color: var(--color-primary-dark);
      transform: translateY(-1px);
      box-shadow: 0 2px 6px rgba(8, 85, 196, 0.25);
    }

    &:disabled {
      background-color: var(--color-disabled);
      color: var(--color-disabled-text);
      cursor: not-allowed;
    }
  }
}

// Animaciones
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

// Responsive
@media (max-width: 768px) {
  .modal-overlay {
    padding: var(--spacing-md);
    align-items: flex-start;
    padding-top: var(--spacing-xl);
  }

  .modal-content {
    max-height: 85vh;
  }

  .modal-header {
    padding: var(--spacing-xl) var(--spacing-xl) 0;

    h2 {
      font-size: 1.3rem;
    }
  }

  .modal-body {
    padding: var(--spacing-lg) var(--spacing-xl);
  }

  .opcion-card {
    padding: var(--spacing-lg);

    .opcion-content {
      h3 {
        font-size: 1rem;
      }

      p {
        font-size: 0.85rem;
      }
    }
  }

  .modal-actions {
    padding: var(--spacing-lg) var(--spacing-xl) var(--spacing-xl);
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: var(--spacing-sm);
  }

  .modal-header {
    padding: var(--spacing-lg) var(--spacing-lg) 0;
  }

  .modal-body {
    padding: var(--spacing-md) var(--spacing-lg);
  }

  .modal-actions {
    padding: var(--spacing-md) var(--spacing-lg) var(--spacing-lg);
  }
}
</style>
