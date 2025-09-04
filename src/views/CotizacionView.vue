<template>
  <div class="cotizacion-view">
    <!-- Header con navegación -->
    <div class="header-section">
      <button @click="volverACotizaciones" class="btn-volver">
        ← Volver a cotizaciones
      </button>
    </div>

    <!-- Información de la cotización -->
    <div class="cotizacion-info">
      <div class="titulo-section">
        <h1>Cotización {{ cotizacionId }}</h1>
        <button class="btn-star" :class="{ active: destacada }" @click="toggleDestacada">
          {{ destacada ? '★' : '☆' }}
        </button>
      </div>
      
      <div class="afiliado-info">
        <h2>{{ afiliadoNombre }}</h2>
      </div>

      <div class="fechas-info">
        <span class="fecha-item">Fecha de cotización: {{ fechaCotizacion }}</span>
        <span class="fecha-item">Vigente hasta: {{ fechaVigencia }}</span>
        <span class="fecha-item">Devengue: {{ devengue }}</span>
      </div>
    </div>

    <!-- Contenedor principal unificado -->
    <div class="cotizacion-container">
      <!-- Progreso de pasos y botón descargar -->
      <div class="header-content">
        <div class="steps-container">
          <div class="step active">
            <div class="step-number">1</div>
          </div>
          <div class="step">
            <div class="step-number">2</div>
          </div>
          <div class="step">
            <div class="step-number">3</div>
          </div>
          <div class="step">
            <div class="step-number">4</div>
          </div>
        </div>
        
        <button class="btn-descargar">
          📄 Descargar PDF
        </button>
      </div>

      <!-- Información del paso -->
      <div class="step-info">
        <div class="step-title">Paso 1 de 4</div>
        <div class="step-subtitle">Cotiza tu Ingreso Seguro con Devolución</div>
        <div class="step-description">La cotización elegida incluye el rescate obligatorio</div>
      </div>

      <!-- Formulario -->
      <div class="form-section">
        <div class="form-row">
          <div class="form-group">
            <label>Moneda</label>
            <select v-model="formData.moneda">
              <option value="S/">S/</option>
              <option value="US$">US$</option>
            </select>
          </div>
          <div class="form-group">
            <label>Prima única</label>
            <input 
              type="text" 
              v-model="formData.primaUnica" 
              placeholder="Ingresa monto"
            />
          </div>
        </div>
      </div>

      <!-- Tablas de cotizaciones (divididas en dos) -->
      <div class="cotizaciones-tables">
        <!-- Primera tabla -->
        <div class="cotizaciones-table table-left">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Mon.</th>
                <th>Plazo y PG</th>
                <th>Años Dif.</th>
                <th>Años esc.</th>
                <th>% Tramo 1</th>
                <th>% Devol.</th>
                <th>DCOM</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(fila, index) in filasCotizacion" :key="index">
                <td>{{ 3876892 + index }}</td>
                <td>
                  <select class="mini-select">
                    <option>Nominal</option>
                    <option>Real</option>
                  </select>
                </td>
                <td>
                  <select class="mini-select">
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                  </select>
                </td>
                <td>
                  <select class="mini-select">
                    <option>{{ index === 0 ? '1' : '0' }}</option>
                  </select>
                </td>
                <td>
                  <select class="mini-select">
                    <option>{{ index === 0 ? '1' : '0' }}</option>
                  </select>
                </td>
                <td>
                  <select class="mini-select">
                    <option>{{ index === 0 ? '200%' : '100%' }}</option>
                  </select>
                </td>
                <td>
                  <select class="mini-select">
                    <option>0%</option>
                  </select>
                </td>
                <td>
                  <select class="mini-select">
                    <option>0%</option>
                  </select>
                </td>
                <td class="opciones-cell">
                  <button class="btn-icon">📋</button>
                  <button class="btn-icon btn-delete">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Segunda tabla -->
        <div class="cotizaciones-table table-right">
          <table>
            <thead>
              <tr>
                <th>Renta Tramo 1</th>
                <th>Renta mens.</th>
                <th>Tasa</th>
                <th>Devolución</th>
                <th>Selec.</th>
                <th>ℹ️</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(fila, index) in filasCotizacion" :key="index">
                <td>{{ index === 0 ? '2,886.03' : '-' }}</td>
                <td>{{ index === 0 ? '1,443.02' : '-' }}</td>
                <td>{{ index === 0 ? '5.88' : '-' }}</td>
                <td>{{ index === 0 ? '300,000' : '-' }}</td>
                <td>
                  <input type="radio" :name="`selec-${index}`" class="radio-select">
                </td>
                <td>ℹ️</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

            <!-- Paginación y botones -->
      <div class="form-actions">
        <div class="pagination-controls">
          <input type="number" v-model="paginaActual" class="input-pagination" min="1" />
          <button class="btn-add-rows">Agregar filas</button>
        </div>

        <div class="action-controls">
          <button class="btn-calcular">
            📊 Calcular y guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { usePersonaStore } from '@/store/personaStore';

export default defineComponent({
  name: 'CotizacionView',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const personaStore = usePersonaStore();

    const afiliado = computed(() => personaStore.afiliadoActual);
    const cotizacionId = ref(route.params.id || 'IFP_415736');
    const destacada = ref(false);
    const hayCotizaciones = ref(true);
    const filasCotizacion = ref(Array(7).fill({})); // 7 filas como en la imagen
    const paginaActual = ref(1);

    const formData = ref({
      moneda: 'S/',
      primaUnica: ''
    });

    const afiliadoNombre = computed(() => {
      if (afiliado.value) {
        return `${afiliado.value.nombres}, ${afiliado.value.apellidoPaterno} ${afiliado.value.apellidoMaterno}`;
      }
      return 'MARIA LOURDES, LOPEZ BRAVO DE RUEDA';
    });

    const fechaCotizacion = ref('01/07/2025');
    const fechaVigencia = ref('24/07/2025');
    const devengue = ref('Julio 2025');

    const volverACotizaciones = () => {
      router.push('/detalle-afiliado');
      // Cambiar a la pestaña de cotizaciones automáticamente
      setTimeout(() => {
        // Esto se podría manejar con un parámetro en la URL o store
        const event = new CustomEvent('cambiarTabCotizaciones');
        window.dispatchEvent(event);
      }, 100);
    };

    const toggleDestacada = () => {
      destacada.value = !destacada.value;
    };

    return {
      cotizacionId,
      afiliadoNombre,
      fechaCotizacion,
      fechaVigencia,
      devengue,
      destacada,
      hayCotizaciones,
      filasCotizacion,
      paginaActual,
      formData,
      volverACotizaciones,
      toggleDestacada
    };
  }
});
</script>

<style lang="scss" scoped>
.cotizacion-view {
  min-height: 100vh;
  background-color: var(--color-background);
  padding: var(--spacing-xl) var(--spacing-3xl);
}

.header-section {
  margin-bottom: var(--spacing-xl);

  .btn-volver {
    background: none;
    border: none;
    color: var(--color-primary);
    font-size: 0.9rem;
    font-family: 'Omnes', sans-serif;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) 0;
    transition: var(--transition-normal);

    &:hover {
      color: var(--color-primary-dark);
      text-decoration: underline;
    }
  }
}

.cotizacion-info {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-3xl);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-md);

  .titulo-section {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);

    h1 {
      margin: 0;
      font-family: 'Omnes', sans-serif;
      font-weight: 600;
      font-size: 1.8rem;
      color: var(--color-text);
    }

    .btn-star {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--color-primary);
      transition: var(--transition-normal);

      &.active {
        color: var(--color-warning);
      }

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .afiliado-info {
    margin-bottom: var(--spacing-lg);

    h2 {
      margin: 0;
      font-family: 'Omnes', sans-serif;
      font-weight: 500;
      font-size: 1.2rem;
      color: var(--color-text-light);
    }
  }

  .fechas-info {
    display: flex;
    gap: var(--spacing-4xl);
    flex-wrap: wrap;

    .fecha-item {
      font-family: 'Omnes', sans-serif;
      font-size: 0.9rem;
      color: var(--color-text-light);
    }
  }
}

.cotizacion-container {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-3xl);
  box-shadow: var(--shadow-md);

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-xl);

    .steps-container {
      display: flex;
      gap: var(--spacing-lg);

      .step {
        .step-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--color-gray-light);
          border: 2px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Omnes', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--color-text-light);
        }

        &.active .step-number {
          background-color: var(--color-primary);
          border-color: var(--color-primary);
          color: var(--color-white);
        }
      }
    }

    .btn-descargar {
      background-color: var(--color-secondary-light);
      color: var(--color-secondary);
      border: 1px solid var(--color-secondary);
      padding: var(--spacing-sm) var(--spacing-lg);
      border-radius: var(--radius-md);
      font-size: 0.9rem;
      font-weight: 500;
      font-family: 'Omnes', sans-serif;
      cursor: pointer;
      transition: var(--transition-normal);

      &:hover {
        background-color: var(--color-secondary);
        color: var(--color-white);
      }
    }
  }

  .step-info {
    margin-bottom: var(--spacing-xl);

    .step-title {
      font-family: 'Omnes', sans-serif;
      font-weight: 600;
      font-size: 1rem;
      color: var(--color-text);
      margin-bottom: var(--spacing-xs);
    }

    .step-subtitle {
      font-family: 'Omnes', sans-serif;
      font-weight: 600;
      font-size: 1.1rem;
      color: var(--color-text);
      margin-bottom: var(--spacing-xs);
    }

    .step-description {
      font-family: 'Omnes', sans-serif;
      font-size: 0.9rem;
      color: var(--color-text-light);
    }
  }

  .form-section {
    margin-bottom: var(--spacing-xl);

    .form-row {
      display: grid;
      grid-template-columns: 150px 250px;
      gap: var(--spacing-xl);

      .form-group {
        label {
          display: block;
          margin-bottom: var(--spacing-sm);
          font-family: 'Omnes', sans-serif;
          font-weight: 500;
          font-size: 0.9rem;
          color: var(--color-text);
        }

        input, select {
          width: 100%;
          padding: var(--spacing-md);
          border: 1px solid var(--color-border-light);
          border-radius: var(--radius-sm);
          font-family: 'Omnes', sans-serif;
          font-size: 0.9rem;

          &:focus {
            outline: none;
            border-color: var(--color-primary);
            box-shadow: 0 0 0 2px rgba(8, 85, 196, 0.1);
          }
        }

        select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right var(--spacing-md) center;
          background-repeat: no-repeat;
          background-size: 16px;
          padding-right: var(--spacing-4xl);
        }
      }
    }
  }

  .cotizaciones-tables {
    margin-bottom: var(--spacing-3xl);
    display: flex;
    gap: var(--spacing-sm); // Pequeño espacio entre tablas
    align-items: flex-start; // Alinear en la parte superior
  }

  .cotizaciones-table {
    &.table-left {
      width: 60%;
    }

    &.table-right {
      width: 40%;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      vertical-align: top; // Asegurar alineación vertical

      thead {
        tr {
          background-color: var(--color-primary);
          height: 44px; // Altura fija para consistencia

          th {
            padding: var(--spacing-md) var(--spacing-sm);
            text-align: center;
            font-family: 'Omnes', sans-serif;
            font-weight: 600;
            font-size: 0.8rem;
            color: var(--color-white);
            border-right: 1px solid rgba(255, 255, 255, 0.2);
            vertical-align: middle;

            &:last-child {
              border-right: none;
            }
          }
        }
      }

      tbody {
        tr {
          height: 40px; // Altura fija para todas las filas
          
          &:nth-child(even) {
            background-color: #f8f9fa;
          }

          td {
            padding: var(--spacing-sm);
            text-align: center;
            font-size: 0.85rem;
            border-bottom: 1px solid var(--color-border-light);
            background-color: var(--color-white);
            vertical-align: middle;

            &:nth-child(even) {
              background-color: inherit;
            }
          }
        }

        .no-data {
          padding: var(--spacing-4xl);
          text-align: center;
          font-family: 'Omnes', sans-serif;
          font-size: 0.9rem;
          color: var(--color-text-light);
          font-style: italic;
        }
      }
    }
  }

  // Estilos para controles de tabla
  .mini-select {
    width: 100%;
    padding: 2px 4px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    font-size: 0.8rem;
    background-color: var(--color-white);
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
    }
  }

  .opciones-cell {
    display: flex;
    gap: var(--spacing-xs);
    justify-content: center;
  }

  .btn-icon {
    padding: 2px 4px;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: var(--radius-sm);
    
    &:hover {
      background-color: var(--color-gray-light);
    }

    &.btn-delete:hover {
      background-color: #fee;
      color: var(--color-danger);
    }
  }

  .radio-select {
    transform: scale(1.2);
    cursor: pointer;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: var(--spacing-xl);
    gap: var(--spacing-lg);

    .pagination-controls {
      display: flex;
      gap: var(--spacing-md);
      align-items: center;

      .input-pagination {
        width: 60px;
        padding: var(--spacing-sm);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        text-align: center;
        font-family: 'Omnes', sans-serif;
        font-size: 0.9rem;

        &:focus {
          outline: none;
          border-color: var(--color-primary);
        }
      }

      .btn-add-rows {
        background-color: var(--color-secondary-light);
        color: var(--color-secondary);
        border: 1px solid var(--color-secondary);
        padding: var(--spacing-sm) var(--spacing-lg);
        border-radius: var(--radius-sm);
        font-family: 'Omnes', sans-serif;
        font-size: 0.85rem;
        cursor: pointer;
        transition: var(--transition-normal);

        &:hover {
          background-color: var(--color-secondary);
          color: var(--color-white);
        }
      }
    }

    .action-controls {
      .btn-calcular {
        padding: var(--spacing-md) var(--spacing-xl);
        background-color: var(--color-primary);
        color: var(--color-white);
        border: none;
        border-radius: var(--radius-md);
        font-family: 'Omnes', sans-serif;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);

        &:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }
      }
    }
  }
}

// Responsive
@media (max-width: 768px) {
  .cotizacion-view {
    padding: var(--spacing-lg) var(--spacing-lg);
  }

  .cotizacion-info {
    .fechas-info {
      flex-direction: column;
      gap: var(--spacing-sm);
    }
  }

  .cotizacion-container {
    .header-content {
      flex-direction: column;
      gap: var(--spacing-lg);
      align-items: stretch;
    }

    .form-section .form-row {
      grid-template-columns: 1fr;
    }

    .form-actions .action-buttons {
      flex-direction: column;
      align-items: stretch;
      gap: var(--spacing-lg);

      .buttons-group {
        align-items: center;
      }
    }
  }
}
</style>

