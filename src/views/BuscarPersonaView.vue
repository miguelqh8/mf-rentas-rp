<template>
  <div class="buscar-persona-view">
    <div class="search-form">
      <h1>Buscar persona</h1>
      
      <div class="form-row">
        <div class="form-group">
          <label>Tipo de documento</label>
          <select v-model="tipoDocumento" class="form-control">
            <option value="DNI">DNI</option>
            <option value="CE">CE</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>N° de documento</label>
          <input 
            type="text" 
            v-model="numeroDocumento"
            placeholder="Ingresar número"
            class="form-control"
          />
        </div>
        
        <div class="form-group">
          <button 
            @click="handleBuscar" 
            class="btn-buscar"
            :disabled="!numeroDocumento.trim() || isLoading"
            :class="{ 'disabled': !numeroDocumento.trim() || isLoading }"
          >
            <span v-if="isLoading">🔄 Buscando...</span>
            <span v-else>Buscar</span>
          </button>
        </div>
      </div>
      
      <div class="alternative-search">
        <span>¿No tienes ningún dato?</span>
        <a href="#" @click="handleBuscarPorNombre">Buscar por nombre y apellido</a>
      </div>
    </div>
    
    <!-- Modales de error específicos -->
    <ModalClienteNoEnCartera 
      :isVisible="showModalNoEnCartera" 
      @close="showModalNoEnCartera = false" 
    />
    <ModalClienteOtroAsesor 
      :isVisible="showModalOtroAsesor" 
      @close="showModalOtroAsesor = false" 
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useBuscarPersona } from "@/composables/useBuscarPersona";
import { useLoader } from "@/composables/useLoader";
import ModalClienteNoEnCartera from "@/components/ModalClienteNoEnCartera.vue";
import ModalClienteOtroAsesor from "@/components/ModalClienteOtroAsesor.vue";

export default defineComponent({
  name: "BuscarPersonaView",
  components: {
    ModalClienteNoEnCartera,
    ModalClienteOtroAsesor
  },
  setup() {
    const {
      tipoDocumento,
      numeroDocumento,
      buscarPersona,
      buscarPorNombre,
      isLoading
    } = useBuscarPersona();
    
    const { withLoader } = useLoader();
    
    // Variables para controlar los modales
    const showModalNoEnCartera = ref(false);
    const showModalOtroAsesor = ref(false);
    
    const handleBuscar = async () => {
      // Verificar casos específicos antes de hacer la búsqueda
      if (numeroDocumento.value === '87654321') {
        showModalNoEnCartera.value = true;
        return;
      }
      
      if (numeroDocumento.value === '88888888') {
        showModalOtroAsesor.value = true;
        return;
      }
      
      // Búsqueda normal para otros casos
      await withLoader(
        () => buscarPersona(),
        { 
          overlay: true,
          minDuration: 800 // Duración mínima para mejor UX
        }
      );
    };
    
    const handleBuscarPorNombre = () => {
      buscarPorNombre();
    };
    
    return {
      tipoDocumento,
      numeroDocumento,
      handleBuscar,
      handleBuscarPorNombre,
      isLoading,
      showModalNoEnCartera,
      showModalOtroAsesor
    };
  },
});
</script>

<style lang="scss" scoped>
.buscar-persona-view {
  .search-form {
    background-color: white;
    margin: 0 30px;
    padding: 40px 30px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    
    h1 {
      margin: 0 0 30px 0;
      font-family: 'Omnes', sans-serif;
      font-weight: 600;
      font-style: normal;
      font-size: 22px;
      line-height: 120%;
      letter-spacing: 0%;
      color: var(--color-text);
    }
  }

  .form-row {
    display: flex;
    gap: 20px;
    align-items: end;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    
    label {
      margin-bottom: 8px;
      font-family: 'Omnes', sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 2%;
      vertical-align: middle;
      color: var(--color-text);
    }
  }

  .form-control {
    padding: 12px 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    min-width: 200px;
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px rgba(19, 97, 185, 0.1);
    }
  }

  select.form-control {
    background-color: white;
    cursor: pointer;
    padding-right: 40px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 12px center;
    background-repeat: no-repeat;
    background-size: 16px;
  }

  .btn-buscar {
    background-color: var(--color-primary);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 8px rgba(19, 97, 185, 0.3);
    
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
    
    &:not(.disabled):hover {
      background-color: var(--color-primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(19, 97, 185, 0.4);
      
      &::before {
        left: 100%;
      }
    }
    
    &:not(.disabled):active {
      transform: translateY(0);
      box-shadow: 0 4px 8px rgba(19, 97, 185, 0.3);
      transition: all 0.1s ease;
    }
    
    &:not(.disabled):focus {
      outline: none;
      box-shadow: 0 4px 8px rgba(19, 97, 185, 0.3), 0 0 0 3px rgba(19, 97, 185, 0.2);
    }
    
    // Estado deshabilitado
    &.disabled,
    &:disabled {
      background-color: var(--color-disabled);
      color: var(--color-disabled-text);
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
      
      &::before {
        display: none;
      }
      
      &:hover {
        background-color: var(--color-disabled);
        transform: none;
        box-shadow: none;
      }
    }
  }

  .alternative-search {
    color: var(--color-text-light);
    font-size: 0.9rem;
    
    a {
      color: var(--color-primary);
      text-decoration: none;
      margin-left: 8px;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 768px) {
    .form-row {
      flex-direction: column;
      align-items: stretch;
    }
    
    .form-control {
      min-width: 100%;
    }
    
    .search-form {
      margin: 0 20px;
      padding: 30px 20px;
      
      h1 {
        font-size: 20px;
      }
    }
  }
}
</style>
