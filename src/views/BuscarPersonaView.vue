<template>
  <div class="buscar-persona-view">
    <!-- Título fuera del card blanco -->
    <h1 class="page-title">Buscar persona</h1>
    
    <!-- Card blanco que ocupa todo el ancho -->
    <Card class="search-card">
      <template #content>
        <div class="form-container">
          <!-- Formulario horizontal como en la imagen -->
          <div class="form-horizontal">
        <div class="form-group">
              <label for="tipoDocumento" class="field-label">Tipo de documento</label>
              <Dropdown 
                id="tipoDocumento"
                v-model="tipoDocumento" 
                :options="tiposDocumento"
                optionLabel="label"
                optionValue="value"
                class="dropdown-field"
                :class="{ 'p-invalid': formErrors.tipoDocumento }"
              />
        </div>
        
        <div class="form-group">
              <label for="numeroDocumento" class="field-label">N° de documento</label>
              <InputText 
                id="numeroDocumento"
            v-model="numeroDocumento"
            placeholder="Ingresar número"
                class="input-field"
                :class="{ 'p-invalid': formErrors.numeroDocumento }"
                @keyup.enter="handleBuscar"
                :maxlength="tipoDocumento === 'DNI' ? 8 : 12"
          />
        </div>
        
            <!-- Botón alineado con los campos -->
            <div class="form-group button-group">
              <Button 
            @click="handleBuscar" 
                :disabled="!numeroDocumento?.trim() || isLoading"
                :loading="isLoading"
                label="Buscar"
                class="search-button"
                :class="{ 'button-disabled': !numeroDocumento?.trim() }"
              />
        </div>
      </div>
      
          <!-- Búsqueda alternativa -->
      <div class="alternative-search">
            <span class="alternative-text">¿No tienes ningún dato?</span>
            <Button 
              @click="handleBuscarPorNombre"
              label="Buscar por nombre y apellido"
              link
              class="alternative-button"
            />
      </div>
    </div>
      </template>
    </Card>
    
    <!-- Modal personalizado de búsqueda por nombre y apellido -->
    <div v-if="showModalBuscarNombre" class="modal-overlay" @click.stop>
      <div class="custom-modal" @click.stop>
        <!-- Header -->
        <div class="modal-header">
          <h3 class="modal-title">Buscar por Nombre y Apellido</h3>
        </div>
        
        <!-- Content -->
        <div class="modal-content">
          <div class="form-field">
            <label class="form-label">Nombres</label>
            <input
              v-model="formBuscarNombre.nombres"
              type="text"
              placeholder="Ingrese nombres"
              class="form-input"
            />
    </div>
    
          <div class="form-field">
            <label class="form-label">Apellido Paterno</label>
            <input
              v-model="formBuscarNombre.apellidoPaterno"
              type="text"
              placeholder="Ingrese apellido"
              class="form-input"
            />
          </div>

          <div class="form-field">
            <label class="form-label">Apellido Materno</label>
            <input
              v-model="formBuscarNombre.apellidoMaterno"
              type="text"
              placeholder="Ingrese apellido"
              class="form-input"
            />
          </div>
        </div>
        
        <!-- Footer -->
        <div class="modal-footer">
          <button 
            class="btn-cancel"
            @click="handleCancelarBusquedaNombre"
          >
            Cancelar
          </button>
          <button 
            class="btn-search"
            @click="handleEjecutarBusquedaNombre"
            :disabled="!formBuscarNombre.nombres.trim() || !formBuscarNombre.apellidoPaterno.trim()"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useToast } from 'primevue/usetoast';
import { useBuscarPersona } from "@/composables/useBuscarPersona";
import { useLoader } from "@/composables/useLoader";
import { usePersonaStore } from "@/store/personaStore";

interface FormErrors {
  tipoDocumento?: string;
  numeroDocumento?: string;
}

export default defineComponent({
  name: "BuscarPersonaView",
  setup() {
    const toast = useToast();
    const personaStore = usePersonaStore();
    const {
      tipoDocumento,
      numeroDocumento,
      buscarPersona,
      buscarPorNombre,
      isLoading
    } = useBuscarPersona();
    
    const { withLoader } = useLoader();
    
    // Opciones para el dropdown
    const tiposDocumento = ref([
      { label: 'DNI', value: 'DNI' },
      { label: 'CE', value: 'CE' }
    ]);
    
    // Variables para controlar el modal de búsqueda por nombre
    const showModalBuscarNombre = ref(false);
    
    // Datos del formulario de búsqueda por nombre
    const formBuscarNombre = ref({
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: ''
    });
    
    // Errores del formulario
    const formErrors = ref<FormErrors>({});
    
    // Validación del formulario
    const validateForm = (): boolean => {
      const errors: FormErrors = {};
      
      if (!tipoDocumento.value) {
        errors.tipoDocumento = 'Seleccione un tipo de documento';
      }
      
      if (!numeroDocumento.value?.trim()) {
        errors.numeroDocumento = 'Ingrese el número de documento';
      } else {
        const numero = numeroDocumento.value.trim();
        if (tipoDocumento.value === 'DNI') {
          if (!/^\d{8}$/.test(numero)) {
            errors.numeroDocumento = 'El DNI debe tener 8 dígitos';
          }
        } else if (tipoDocumento.value === 'CE') {
          if (!/^\d{9,12}$/.test(numero)) {
            errors.numeroDocumento = 'El CE debe tener entre 9 y 12 dígitos';
          }
        }
      }
      
      formErrors.value = errors;
      return Object.keys(errors).length === 0;
    };
    
    // Computed para validar si el formulario es válido
    const isFormValid = computed(() => {
      return tipoDocumento.value && 
             numeroDocumento.value?.trim() && 
             Object.keys(formErrors.value).length === 0;
    });
    
    // Computed simple para habilitar/deshabilitar el botón
    const isButtonEnabled = computed(() => {
      return numeroDocumento.value?.trim();
    });
    
    // Limpiar errores al cambiar valores
    watch([tipoDocumento, numeroDocumento], () => {
      if (Object.keys(formErrors.value).length > 0) {
        validateForm();
      }
    });
    
    // Limpiar número al cambiar tipo de documento
    watch(tipoDocumento, (newType, oldType) => {
      if (newType !== oldType && numeroDocumento.value) {
        numeroDocumento.value = '';
        formErrors.value = {};
      }
    });
    
    const handleBuscar = async () => {
      if (!validateForm()) {
        toast.add({
          severity: 'warn',
          summary: 'Formulario incompleto',
          detail: 'Por favor complete todos los campos correctamente',
          life: 3000
        });
        return;
      }
      
      // Verificar casos específicos antes de hacer la búsqueda
      if (numeroDocumento.value === '87654321') {
        toast.add({
          severity: 'error',
          summary: 'Cliente no disponible',
          detail: 'El cliente no se encuentra en cartera',
          life: 5000
        });
        return;
      }
      
      if (numeroDocumento.value === '88888888') {
        toast.add({
          severity: 'error',
          summary: 'Cliente no disponible',
          detail: 'Este cliente está asignado a otro asesor',
          life: 5000
        });
        return;
      }
      
      try {
      // Búsqueda normal para otros casos
      await withLoader(
        () => buscarPersona(),
        { 
          overlay: true,
          minDuration: 800 // Duración mínima para mejor UX
        }
      );
        
        // Verificar si hubo error en el store
        
        if (personaStore.error) {
          // Si hay error, mostrar toast de error
          toast.add({
            severity: 'error',
            summary: 'Cliente no encontrado',
            life: 5000
          });
        } else {
          // Búsqueda exitosa - redirigir directamente sin toast
          // El composable ya maneja la redirección automáticamente
        }
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Error en la búsqueda',
          detail: 'No se pudo completar la búsqueda. Intente nuevamente.',
          life: 5000
        });
      }
    };
    
    const handleBuscarPorNombre = () => {
      showModalBuscarNombre.value = true;
    };
    
    const handleCancelarBusquedaNombre = () => {
      showModalBuscarNombre.value = false;
      // Limpiar formulario
      formBuscarNombre.value = {
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: ''
      };
    };
    
    const handleEjecutarBusquedaNombre = async () => {
      // Validar que al menos nombres y apellido paterno estén completos
      if (!formBuscarNombre.value.nombres.trim() || !formBuscarNombre.value.apellidoPaterno.trim()) {
        toast.add({
          severity: 'warn',
          summary: 'Datos incompletos',
          detail: 'Ingrese al menos nombres y apellido paterno',
          life: 3000
        });
        return;
      }
      
      try {
        // Cerrar modal
        showModalBuscarNombre.value = false;
        
        // Simular búsqueda
        await withLoader(
          async () => {
            await new Promise(resolve => setTimeout(resolve, 1500));
          },
          { 
            overlay: true,
            minDuration: 1000
          }
        );
        
        // Mostrar resultado (por ahora, siempre no encontrado)
        toast.add({
          severity: 'error',
          summary: 'Cliente no encontrado',
          life: 5000
        });
        
        // Limpiar formulario
        handleCancelarBusquedaNombre();
        
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Error en la búsqueda',
          detail: 'No se pudo completar la búsqueda. Intente nuevamente.',
          life: 5000
        });
      }
    };
    
    return {
      tipoDocumento,
      numeroDocumento,
      tiposDocumento,
      formErrors,
      isFormValid,
      isButtonEnabled,
      handleBuscar,
      handleBuscarPorNombre,
      isLoading,
      showModalBuscarNombre,
      formBuscarNombre,
      handleCancelarBusquedaNombre,
      handleEjecutarBusquedaNombre
    };
  },
});
</script>

<style lang="scss" scoped>
/* Mobile-first responsive design optimizado */
.buscar-persona-view {
  min-height: 100vh;
  background-color: var(--color-background);
  display: flex;
  flex-direction: column;
  align-items: center;
  
  /* Título para móviles - optimizado */
  .page-title {
    margin: 0;
    padding: var(--spacing-lg, 16px) var(--spacing-lg, 16px) var(--spacing-md, 12px);
      font-family: 'Omnes', sans-serif;
      font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.3;
    color: #454A6C;
    background-color: var(--color-background);
    width: 100%;
    text-align: left;
  }
  
  /* Card centrado con márgenes simétricos */
  .search-card {
    width: calc(100% - var(--spacing-lg, 16px) * 2);
    max-width: 100%;
    margin: 0 var(--spacing-lg, 16px);
    border-radius: var(--radius-md, 6px);
    box-shadow: var(--shadow-sm);
    border: none;
    background-color: white;
    
    :deep(.p-card-body) {
      padding: var(--spacing-xl, 20px) var(--spacing-lg, 16px);
      border-radius: var(--radius-md, 6px);
    }
  }
  
  /* Estilos específicos para móviles pequeños */
  @media (max-width: 480px) {
    .page-title {
      font-size: 1.1rem;
      padding: var(--spacing-md, 12px) var(--spacing-md, 12px) var(--spacing-sm, 8px);
    }
    
    .search-card {
      margin: 0 var(--spacing-md, 12px);
      width: calc(100% - var(--spacing-md, 12px) * 2);
      
      :deep(.p-card-body) {
        padding: var(--spacing-lg, 16px) var(--spacing-md, 12px);
      }
    }
    
    .form-container {
      gap: var(--spacing-md, 12px);
    }
    
    .form-horizontal {
      gap: var(--spacing-md, 12px);
    }
    
    .dropdown-field,
    .input-field,
    .search-button {
      height: 44px; /* Altura mínima recomendada para dispositivos táctiles */
      font-size: 16px; /* Evita zoom en iOS */
    }
  }
  
  
  .form-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg, 16px);
  }
  
  /* Layout optimizado mobile-first */
  .form-horizontal {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg, 16px);
    align-items: stretch;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm, 8px);
    width: 100%;
    
    &.button-group {
      margin-top: var(--spacing-sm, 8px);
    }
  }
  
  .field-label {
    font-family: 'Omnes', sans-serif;
    font-weight: 500;
    font-size: 0.9rem;
    color: #878C8F;
    margin: 0;
  }
  
  .dropdown-field,
  .input-field {
    width: 100%;
    height: 48px; /* Altura táctil optimizada para móviles */
    font-size: 1rem; /* Tamaño de fuente optimizado para móviles */
  }
  
  .search-button {
    width: 100%;
    padding: var(--spacing-lg, 16px) var(--spacing-xl, 20px);
    font-family: 'Omnes', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    height: 48px; /* Altura táctil optimizada */
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 8px rgba(8, 85, 196, 0.3);
    background-color: #0855C4 !important;
    border-color: #0855C4 !important;
    
    /* Efecto de brillo */
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s ease;
    }
    
    /* Estados activos */
    &:not(:disabled):not(.button-disabled) {
      &:hover {
        background-color: #073f9a !important;
        border-color: #073f9a !important;
      transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(8, 85, 196, 0.4);
      
      &::before {
        left: 100%;
      }
    }
    
      &:active {
      transform: translateY(0);
        box-shadow: 0 4px 8px rgba(8, 85, 196, 0.3);
      transition: all 0.1s ease;
    }
    
      &:focus {
      outline: none;
        box-shadow: 0 4px 8px rgba(8, 85, 196, 0.3), 0 0 0 3px rgba(8, 85, 196, 0.2);
      }
    }
    
    /* Estados deshabilitado */
    &:disabled,
    &.button-disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: #9CA3AF !important;
      border-color: #9CA3AF !important;
      transform: none;
      box-shadow: none;
      
      &::before {
        display: none;
      }
      
      &:hover {
        background-color: #9CA3AF !important;
        border-color: #9CA3AF !important;
        transform: none;
        box-shadow: none;
      }
    }
  }

  .alternative-search {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xs, 4px);
    padding-top: var(--spacing-xl, 20px);
    text-align: center;
    
    .alternative-text {
      font-family: 'Omnes', sans-serif !important;
      font-size: 0.9rem;
      color: #0F191E;
      margin: 0;
    }
    
    .alternative-button {
      font-family: 'Omnes', sans-serif !important;
    font-size: 0.9rem;
      padding: var(--spacing-xs, 4px) 0;
      color: #0855C4 !important;
      text-align: center;
      
      :deep(.p-button-label) {
        text-decoration: underline;
        color: #0855C4 !important;
      }
      
      &:hover {
        color: #073f9a !important;
        
        :deep(.p-button-label) {
          color: #073f9a !important;
        }
      }
    }
  }
  
  /* Error states */
  .p-error {
    font-size: 0.8rem;
    color: var(--red-500);
    margin-top: var(--spacing-xs, 4px);
  }
  
      /* Modal personalizado - Sin PrimeVue */
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        padding: 16px;
        animation: fadeIn 0.3s ease-out;
      }
      
      .custom-modal {
        background: white;
        border-radius: 8px;
        width: 100%;
        max-width: 400px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.16);
        border: 1px solid #e5e7eb;
        overflow: hidden;
        animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: center;
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @keyframes modalSlideIn {
        0% {
          opacity: 0;
          transform: translateY(-30px) scale(0.95);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      
      .modal-header {
        padding: 20px 24px 16px;
        background: white;
        
        .modal-title {
          font-family: 'Omnes', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #333333;
          margin: 0;
          text-align: center;
        }
      }
      
      .modal-content {
        padding: 20px 24px;
        background: white;
      }
      
      .form-field {
        margin-bottom: 16px;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
      
      .form-label {
        display: block;
        font-family: 'Omnes', sans-serif;
        font-size: 13px;
        font-weight: 400;
        color: #666666;
        margin-bottom: 6px;
        line-height: 1.2;
      }
      
      .form-input {
        width: 100%;
        font-family: 'Omnes', sans-serif;
        font-size: 14px;
        color: #333333;
        background: white;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        padding: 10px 12px;
        height: 40px;
        box-sizing: border-box;
        transition: border-color 0.15s ease;
        
        &::placeholder {
          color: #9ca3af;
          font-style: italic;
        }
        
        &:hover {
          border-color: #9ca3af;
        }
        
        &:focus {
          outline: none;
          border-color: #0855C4;
          box-shadow: 0 0 0 1px #0855C4;
        }
      }
      
      .modal-footer {
        padding: 16px 24px 20px;
        background: white;
        display: flex;
        justify-content: center;
        gap: 8px;
      }
      
      .btn-cancel {
        background: #e3f2fd;
        border: 1px solid #90caf9;
        color: #1976d2;
        font-family: 'Omnes', sans-serif;
        font-size: 14px;
        font-weight: 500;
        padding: 8px 24px;
        border-radius: 4px;
        height: 36px;
        min-width: 100px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        transform: translateY(0);
        
        /* Efecto de onda/ripple */
        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(25, 118, 210, 0.3);
          transition: width 0.6s, height 0.6s;
          transform: translate(-50%, -50%);
          z-index: 0;
        }
        
        &:hover {
          background: #bbdefb;
          border-color: #64b5f6;
          color: #1565c0;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(25, 118, 210, 0.4);
          
          &::before {
            width: 120px;
            height: 120px;
          }
        }
        
        &:active {
          transform: translateY(-1px);
          transition: all 0.1s ease;
        }
        
        &:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2), 0 4px 12px rgba(25, 118, 210, 0.3);
        }
      }
      
      .btn-search {
        font-family: 'Omnes', sans-serif;
        font-size: 14px;
        font-weight: 500;
        padding: 8px 24px;
        border-radius: 4px;
        height: 36px;
        min-width: 100px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid;
        position: relative;
        overflow: hidden;
        transform: translateY(0);
        
        /* Efecto de brillo que recorre el botón */
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.6s ease;
        }
        
        &:enabled {
          background: #0855C4;
          border-color: #0855C4;
          color: white;
          
          &:hover {
            background: #073f9a;
            border-color: #073f9a;
            transform: translateY(-3px);
            box-shadow: 0 6px 16px rgba(8, 85, 196, 0.4);
            
            &::after {
              left: 100%;
            }
          }
          
          &:active {
            transform: translateY(-1px);
            transition: all 0.1s ease;
            box-shadow: 0 4px 12px rgba(8, 85, 196, 0.3);
          }
          
          &:focus {
            outline: none;
            box-shadow: 0 0 0 2px rgba(8, 85, 196, 0.2), 0 6px 16px rgba(8, 85, 196, 0.3);
          }
        }
        
        &:disabled {
          background: #9e9e9e;
          border-color: #9e9e9e;
          color: white;
          cursor: not-allowed;
          transform: none;
          opacity: 0.7;
          transition: opacity 0.3s ease;
          
          &::after {
            display: none;
          }
          
          &:hover {
            background: #9e9e9e;
            border-color: #9e9e9e;
            transform: none;
            box-shadow: none;
          }
        }
        
        /* Animación de pulsación suave */
        &:enabled:active {
          animation: pulse 0.3s ease;
        }
      }
      
      @keyframes pulse {
        0% {
          transform: translateY(-3px) scale(1);
        }
        50% {
          transform: translateY(-1px) scale(0.98);
        }
        100% {
          transform: translateY(-1px) scale(1);
        }
      }

      /* Responsive para móviles */
  @media (max-width: 768px) {
        .custom-modal {
          max-width: calc(100vw - 32px);
          margin: 16px;
        }
        
        .modal-header {
          padding: 16px 20px 12px;
          
          .modal-title {
            font-size: 15px;
          }
        }
        
        .modal-content {
          padding: 16px 20px;
        }
        
        .modal-footer {
          padding: 12px 20px 16px;
          gap: 6px;
        }
        
        .btn-cancel,
        .btn-search {
          min-width: 80px;
          padding: 8px 16px;
          font-size: 13px;
        }
      }
}

/* Tablet styles - 768px and up */
@media (min-width: 768px) {
  .buscar-persona-view {
    .page-title {
      padding: var(--spacing-4xl, 40px) 0 var(--spacing-xl, 20px);
      font-size: 1.75rem;
      align-self: stretch; /* Ocupar todo el ancho disponible */
      text-align: left;
      padding-left: var(--spacing-4xl, 40px);
      padding-right: var(--spacing-4xl, 40px);
    }
    
    .search-card {
      margin: 0 var(--spacing-4xl, 40px);
      width: calc(100% - var(--spacing-4xl, 40px) * 2);
      max-width: 1200px; /* Ocupar más espacio en tablets */
      
      :deep(.p-card-body) {
        padding: var(--spacing-4xl, 40px);
      }
    }
    
    /* Cambiar a layout horizontal en tablets pero limitar ancho */
    .form-horizontal {
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: flex-end;
      gap: var(--spacing-xl, 20px);
      max-width: 600px; /* Limitar ancho del formulario */
    }
    
    .form-group {
      &.button-group {
        margin-top: 0;
        align-self: flex-end;
      }
    }
    
    .dropdown-field {
      width: 140px;
      height: 42px;
    }
    
    .input-field {
      width: 250px;
      height: 42px;
    }
    
    .search-button {
      width: auto;
      min-width: 120px;
      height: 42px;
    }
    
    .alternative-search {
      flex-direction: row;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      text-align: left;
      max-width: 600px; /* Limitar ancho igual que el formulario */
    }
  }
}

/* Desktop styles - 1024px and up */
@media (min-width: 1024px) {
  .buscar-persona-view {
    .page-title {
      padding: var(--spacing-4xl, 40px) 0 var(--spacing-xl, 20px);
      font-size: 2rem;
      padding-left: var(--spacing-4xl, 40px);
      padding-right: var(--spacing-4xl, 40px);
    }
    
    .search-card {
      max-width: 1400px; /* Ocupar mucho más espacio en desktop */
      
      :deep(.p-card-body) {
        padding: var(--spacing-4xl, 40px);
      }
    }
    
    .form-horizontal {
      gap: var(--spacing-xl, 20px);
      max-width: 650px; /* Ancho máximo para desktop */
    }
    
    .dropdown-field {
      width: 160px;
    }
    
    .input-field {
      width: 280px; /* Ancho optimizado para desktop */
    }
    
    .search-button {
      min-width: 130px;
    }
    
    .alternative-search {
      max-width: 650px; /* Igual que el formulario */
    }
  }
}

/* Large desktop styles - 1440px and up */
@media (min-width: 1440px) {
  .buscar-persona-view {
    .search-card {
      max-width: 1600px; /* Ocupar más espacio en pantallas muy grandes */
    }
    
    .form-horizontal {
      max-width: 700px; /* Ancho máximo del formulario */
    }
    
    .dropdown-field {
      width: 160px; /* Mantener tamaños controlados */
    }
    
    .input-field {
      width: 300px; /* No estirar demasiado */
    }
    
    .search-button {
      min-width: 140px;
    }
    
    .alternative-search {
      max-width: 700px; /* Igual que el formulario */
    }
  }
}

/* Utilities */
.w-full {
  width: 100%;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .buscar-persona-view {
    .search-card {
      border: 2px solid var(--color-text);
    }
    
    .field-label {
      font-weight: 600;
    }
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .buscar-persona-view {
    .search-button {
      transition: none;
      
      &::before {
        transition: none;
      }
      
      &:not(:disabled):not(.button-disabled) {
        &:hover {
          transform: none;
        }
        
        &:active {
          transform: none;
          transition: none;
        }
      }
    }
  }
}
</style>


