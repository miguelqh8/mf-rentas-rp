<template>
  <div class="modal-overlay" v-if="visible" @click="closeModal">
    <div class="modal-content" @click.stop>
      <h2>{{ beneficiarioAEditar ? 'Editar beneficiario' : 'Agregar un nuevo beneficiario' }}</h2>
      
      <form @submit.prevent="handleSubmit" class="beneficiario-form">
        <!-- Nombres -->
        <div class="form-group">
          <label>Nombres</label>
          <input 
            type="text" 
            v-model="form.nombres" 
            placeholder="Nombres"
            required
          />
        </div>

        <!-- Apellido Paterno -->
        <div class="form-group">
          <label>Apellido Paterno</label>
          <input 
            type="text" 
            v-model="form.apellidoPaterno" 
            placeholder="Apellido Paterno"
            required
          />
        </div>

        <!-- Apellido Materno -->
        <div class="form-group">
          <label>Apellido Materno</label>
          <input 
            type="text" 
            v-model="form.apellidoMaterno" 
            placeholder="Apellido Materno"
            required
          />
        </div>

        <!-- Tipo y Número de documento -->
        <div class="form-row">
          <div class="form-group">
            <label>Tipo de documento</label>
            <select v-model="form.tipoDocumento" required>
              <option value="DNI">DNI</option>
              <option value="CE">CE</option>
            </select>
          </div>
          <div class="form-group">
            <label>Número de documento</label>
            <input 
              type="text" 
              v-model="form.numeroDocumento" 
              placeholder="Número de documento"
              required
            />
          </div>
        </div>

        <!-- Parentesco -->
        <div class="form-group">
          <label>Parentesco</label>
          <select v-model="form.parentesco" required>
            <option value="ESPOSO(A)">ESPOSO(A)</option>
            <option value="HIJO(A)">HIJO(A)</option>
            <option value="PADRE/MADRE">PADRE/MADRE</option>
            <option value="HERMANO(A)">HERMANO(A)</option>
            <option value="OTROS">OTROS</option>
          </select>
        </div>

        <!-- Sexo -->
        <div class="form-group">
          <label>Sexo</label>
          <select v-model="form.sexo" required>
            <option value="MASCULINO">MASCULINO</option>
            <option value="FEMENINO">FEMENINO</option>
          </select>
        </div>

        <!-- Fecha de Nacimiento -->
        <div class="form-group">
          <label>Fecha de Nacimiento</label>
          <input 
            type="date" 
            v-model="form.fechaNacimiento" 
            required
          />
        </div>

        <!-- Nacionalidad -->
        <div class="form-group">
          <label>Nacionalidad</label>
          <select v-model="form.nacionalidad" required>
            <option value="Peruano">Peruano</option>
            <option value="Extranjero">Extranjero</option>
          </select>
        </div>

        <!-- Residencia -->
        <div class="form-group">
          <label>Residencia</label>
          <input 
            type="text" 
            v-model="form.residencia" 
            placeholder="Residencia"
            required
          />
        </div>

        <!-- ¿Es PEP? y ¿Es sujeto obligado? -->
        <div class="form-row radio-row">
          <div class="form-group radio-group">
            <label>¿Es PEP?</label>
            <div class="radio-options">
              <label class="radio-label">
                <input type="radio" v-model="form.esPep" value="si" />
                <span>Sí</span>
              </label>
              <label class="radio-label">
                <input type="radio" v-model="form.esPep" value="no" />
                <span>No</span>
              </label>
            </div>
          </div>

          <div class="form-group radio-group">
            <label>¿Es sujeto obligado?</label>
            <div class="radio-options">
              <label class="radio-label">
                <input type="radio" v-model="form.esSujetoObligado" value="si" />
                <span>Sí</span>
              </label>
              <label class="radio-label">
                <input type="radio" v-model="form.esSujetoObligado" value="no" />
                <span>No</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Profesión -->
        <div class="form-group">
          <label>Profesión</label>
          <input 
            type="text" 
            v-model="form.profesion" 
            placeholder="Profesión"
            required
          />
        </div>

        <!-- Botones -->
        <div class="form-actions">
          <button type="button" @click="closeModal" class="btn-cancelar">
            Cancelar
          </button>
          <button type="submit" class="btn-guardar" :disabled="!isFormValid">
            Guardar y continuar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import type { NuevoBeneficiario } from '@/types/persona';

export default defineComponent({
  name: 'ModalAgregarBeneficiario',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    beneficiarioAEditar: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'save'],
  setup(props, { emit }) {
    const form = ref<NuevoBeneficiario>({
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      tipoDocumento: 'DNI',
      numeroDocumento: '',
      parentesco: 'OTROS',
      sexo: 'MASCULINO',
      fechaNacimiento: '',
      nacionalidad: 'Peruano',
      residencia: '',
      esPep: 'no',
      esSujetoObligado: 'no',
      profesion: ''
    });

    const isFormValid = computed(() => {
      return form.value.nombres.trim() && 
             form.value.apellidoPaterno.trim() && 
             form.value.apellidoMaterno.trim() && 
             form.value.numeroDocumento.trim() && 
             form.value.fechaNacimiento && 
             form.value.residencia.trim() && 
             form.value.profesion.trim();
    });

    const closeModal = () => {
      emit('close');
      resetForm();
    };

    const resetForm = () => {
      form.value = {
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        tipoDocumento: 'DNI',
        numeroDocumento: '',
        parentesco: 'OTROS',
        sexo: 'MASCULINO',
        fechaNacimiento: '',
        nacionalidad: 'Peruano',
        residencia: '',
        esPep: 'no',
        esSujetoObligado: 'no',
        profesion: ''
      };
    };

    const handleSubmit = () => {
      if (isFormValid.value) {
        emit('save', { ...form.value });
        closeModal();
      }
    };

    // Función para convertir fecha de DD/MM/YYYY a YYYY-MM-DD
    const convertirFechaParaInput = (fechaTabla: string) => {
      const [day, month, year] = fechaTabla.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    // Watcher para cargar datos cuando se pasa un beneficiario a editar
    watch(() => props.beneficiarioAEditar, (beneficiario) => {
      if (beneficiario) {
        // Separar el nombre completo
        const nombresCompletos = beneficiario.apellidosNombres.split(' ');
        const apellidoPaterno = nombresCompletos[0] || '';
        const apellidoMaterno = nombresCompletos[1] || '';
        const nombres = nombresCompletos.slice(2).join(' ') || '';
        
        form.value = {
          nombres: nombres,
          apellidoPaterno: apellidoPaterno,
          apellidoMaterno: apellidoMaterno,
          tipoDocumento: beneficiario.dni ? 'DNI' : 'CE',
          numeroDocumento: beneficiario.dni,
          parentesco: beneficiario.parentesco,
          sexo: beneficiario.sexo,
          fechaNacimiento: convertirFechaParaInput(beneficiario.fechaNacimiento),
          nacionalidad: 'Peruano',
          residencia: '',
          esPep: 'no',
          esSujetoObligado: 'no',
          profesion: ''
        };
      } else {
        resetForm();
      }
    }, { immediate: true });

    return {
      form,
      isFormValid,
      closeModal,
      handleSubmit
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
  padding: var(--spacing-3xl);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);

  h2 {
    margin: 0 0 var(--spacing-3xl) 0;
    font-family: 'Omnes', sans-serif;
    font-weight: 600;
    font-size: 1.5rem;
    color: var(--color-text);
    text-align: center;
  }
}

.beneficiario-form {
  .form-group {
    margin-bottom: var(--spacing-xl);

    label {
      display: block;
      margin-bottom: var(--spacing-sm);
      font-family: 'Omnes', sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 2%;
      color: #9C9C9C;
    }

    input, select {
      width: 100%;
      padding: var(--spacing-md) var(--spacing-lg);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-sm);
      font-size: 1rem;
      font-family: 'Omnes', sans-serif;
      transition: var(--transition-normal);

      &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px rgba(8, 85, 196, 0.1);
      }

      &::placeholder {
        color: var(--color-text-muted);
      }
    }

    select {
      background-color: var(--color-white);
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
      background-position: right var(--spacing-md) center;
      background-repeat: no-repeat;
      background-size: 16px;
      padding-right: var(--spacing-4xl);
    }
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    &.radio-row {
      .form-group.radio-group {
        margin-bottom: 0;
      }
    }
  }

  .radio-group {
    .radio-options {
      display: flex;
      gap: var(--spacing-xl);
      margin-top: var(--spacing-sm);

      .radio-label {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        cursor: pointer;
        font-size: 0.9rem;

        input[type="radio"] {
          width: auto;
          margin: 0;
          accent-color: var(--color-primary);
        }

        span {
          color: var(--color-text);
        }
      }
    }
  }

  .form-actions {
    display: flex;
    gap: var(--spacing-lg);
    justify-content: center;
    margin-top: var(--spacing-4xl);

    @media (max-width: 768px) {
      flex-direction: column-reverse;
    }

    .btn-cancelar {
      background-color: var(--color-white);
      color: var(--color-text-light);
      border: 1px solid var(--color-border-light);
      padding: var(--spacing-md) var(--spacing-2xl);
      border-radius: var(--radius-md);
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition-normal);

      &:hover {
        background-color: var(--color-gray-light);
        border-color: var(--color-border);
      }
    }

    .btn-guardar {
      background-color: var(--color-primary);
      color: var(--color-white);
      border: none;
      padding: var(--spacing-md) var(--spacing-2xl);
      border-radius: var(--radius-md);
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition-normal);

      &:hover:not(:disabled) {
        background-color: var(--color-primary-dark);
        box-shadow: var(--shadow-primary);
      }

      &:disabled {
        background-color: var(--color-disabled);
        color: var(--color-disabled-text);
        cursor: not-allowed;
      }
    }
  }
}

// Responsive - Mobile first
@media (max-width: 768px) {
  .modal-overlay {
    padding: var(--spacing-md);
    align-items: flex-start;
    padding-top: var(--spacing-xl);
  }

  .modal-content {
    padding: var(--spacing-xl);
    max-height: 85vh;

    h2 {
      font-size: 1.3rem;
      margin-bottom: var(--spacing-xl);
    }
  }

  .beneficiario-form {
    .form-group {
      margin-bottom: var(--spacing-lg);
    }
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: var(--spacing-sm);
  }

  .modal-content {
    padding: var(--spacing-lg);
  }
}
</style>
