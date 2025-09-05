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
          🖨️ Descargar PDF
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
            <select v-model="formData.moneda" @change="manejarCambioMoneda">
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
              <tr v-if="!hayCotizaciones" class="no-data">
                <td colspan="9">Aún no se tienen cotizaciones registradas</td>
              </tr>
              <tr v-for="(fila, index) in filasCotizacion" :key="index" 
                  class="tabla-fila"
                  :class="{ 'fila-nueva': fila.esNueva }"
                  :style="{ 'animation-delay': `${index * 0.1}s` }">
                <td>{{ 3876892 + index }}</td>
                <td>
                  <select class="mini-select" v-model="fila.moneda">
                    <option>Nominal</option>
                    <option>Real</option>
                  </select>
                </td>
                <td>
                  <select class="mini-select" v-model="fila.plazo">
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                  </select>
                </td>
                <td>
                  <select class="mini-select" v-model="fila.anosDif">
                    <option>0</option>
                    <option>1</option>
                  </select>
                </td>
                <td>
                  <select class="mini-select" v-model="fila.anosEsc">
                    <option>0</option>
                    <option>1</option>
                  </select>
                </td>
                <td>
                  <select class="mini-select" v-model="fila.porcentajeTramo1">
                    <option>100%</option>
                    <option>200%</option>
                  </select>
                </td>
                <td>
                  <select class="mini-select" v-model="fila.porcentajeDevol">
                    <option>0%</option>
                  </select>
                </td>
                <td>
                  <select class="mini-select" v-model="fila.dcom">
                    <option>0%</option>
                  </select>
                </td>
                <td class="opciones-cell">
                  <button class="btn-icon" title="Copiar">📄</button>
                  <button class="btn-icon btn-delete" title="Eliminar">🗑️</button>
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
              <tr v-if="!hayCotizaciones" class="no-data">
                <td colspan="6">Aún no se tienen cotizaciones registradas</td>
              </tr>
              <tr v-for="(fila, index) in filasCotizacion" :key="index"
                  class="tabla-fila"
                  :class="{ 'fila-nueva': fila.esNueva }"
                  :style="{ 'animation-delay': `${index * 0.1}s` }">
                <td>{{ fila.rentaTramo1 || '-' }}</td>
                <td>{{ fila.rentaMens || '-' }}</td>
                <td>{{ fila.tasa || '-' }}</td>
                <td>{{ fila.devolucion || '-' }}</td>
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
          <button class="btn-add-rows" @click="agregarFilas">Agregar filas</button>
        </div>

        <div class="action-controls" v-if="hayCotizaciones">
          <button 
            class="btn-calcular" 
            :class="{ 'btn-guardado': datosCalculados }"
            @click="calcularYGuardar"
            :disabled="datosCalculados">
            <span v-if="datosCalculados">✓ Cambios guardados</span>
            <span v-else>📊 Calcular y guardar</span>
          </button>
        </div>
      </div>

      <!-- Botones adicionales de navegación -->
      <div class="navigation-actions" v-if="datosCalculados">
        <div class="step-navigation">
          <button class="btn-siguiente-paso" @click="irAlSiguientePaso">
            Siguiente paso: Elegir beneficiarios
          </button>
          <button class="btn-cerrar-cotizacion" :disabled="!datosCalculados">
            Cerrar cotización
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de confirmación cambio de moneda -->
  <div class="modal-overlay" v-if="mostrarModalMoneda" @click="cancelarCambioMoneda">
    <div class="modal-content" @click.stop>
      <div class="modal-icon">
        <div class="icon-circle warning">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div class="modal-body">
        <h2>¿Estás seguro de cambiar la moneda?</h2>
        <p>Todas las cotizaciones en moneda distinta ajustada cambiarán a nominal</p>
      </div>
      
      <div class="modal-actions">
        <button class="btn-secondary" @click="cancelarCambioMoneda">
          No
        </button>
        <button class="btn-primary" @click="confirmarCambioMoneda">
          Sí, continuar
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { usePersonaStore } from '@/store/personaStore';
import { useLoader } from '@/composables/useLoader';

interface FilaCotizacion {
  esNueva?: boolean;
  moneda?: string;
  plazo?: string;
  anosDif?: string;
  anosEsc?: string;
  porcentajeTramo1?: string;
  porcentajeDevol?: string;
  dcom?: string;
  rentaTramo1?: string;
  rentaMens?: string;
  tasa?: string;
  devolucion?: string;
}

export default defineComponent({
  name: 'CotizacionView',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const personaStore = usePersonaStore();
    const { withLoader } = useLoader();

    const afiliado = computed(() => personaStore.afiliadoActual);
    const cotizacionId = ref(route.params.id || 'IFP_415736');
    const destacada = ref(false);
    const hayCotizaciones = ref(false);
    const filasCotizacion = ref<FilaCotizacion[]>([]); // Empieza vacía
    const paginaActual = ref(1);
    const datosCalculados = ref(false); // Controla si se han calculado los datos
    const mostrarModalMoneda = ref(false);
    const monedaAnterior = ref('S/');
    const nuevaMoneda = ref('S/');

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

    const agregarFilas = () => {
      const numeroFilas = paginaActual.value;
      if (numeroFilas && numeroFilas > 0) {
        // Crear nuevas filas con valores predeterminados y marcador de animación
        for (let i = 0; i < numeroFilas; i++) {
          filasCotizacion.value.push({ 
            esNueva: true,
            moneda: 'Nominal',
            plazo: '5',
            anosDif: '0',
            anosEsc: '0',
            porcentajeTramo1: '100%',
            porcentajeDevol: '0%',
            dcom: '0%',
            rentaTramo1: undefined,
            rentaMens: undefined,
            tasa: undefined,
            devolucion: undefined
          });
        }
        hayCotizaciones.value = true;
        datosCalculados.value = false; // Resetear estado de cálculo
        
        // Remover la clase de animación después de que termine
        setTimeout(() => {
          filasCotizacion.value.forEach((fila: FilaCotizacion) => {
            if (fila.esNueva) {
              fila.esNueva = false;
            }
          });
        }, numeroFilas * 100 + 500); // Tiempo suficiente para todas las animaciones
        
        // Resetear el input después de agregar
        paginaActual.value = 1;
      }
    };

    const calcularYGuardar = async () => {
      await withLoader(
        async () => {
          // Simular tiempo de cálculo
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Simular cálculos y llenar los datos de la segunda tabla
          filasCotizacion.value.forEach((fila, index) => {
            if (index === 0) {
              // Primera fila con datos calculados
              fila.rentaTramo1 = '2,886.03';
              fila.rentaMens = '1,443.02';
              fila.tasa = '5.88';
              fila.devolucion = '300,000';
            } else {
              // Otras filas con guiones
              fila.rentaTramo1 = '-';
              fila.rentaMens = '-';
              fila.tasa = '-';
              fila.devolucion = '-';
            }
          });
          datosCalculados.value = true;
        },
        {
          overlay: true,
          minDuration: 800
        }
      );
    };

    const irAlSiguientePaso = () => {
      router.push(`/cotizacion/${cotizacionId.value}/paso-2`);
    };

    const manejarCambioMoneda = (event: Event) => {
      const target = event.target as HTMLSelectElement;
      const valorSeleccionado = target.value;
      
      if (valorSeleccionado !== monedaAnterior.value) {
        nuevaMoneda.value = valorSeleccionado;
        mostrarModalMoneda.value = true;
        // Revertir temporalmente el cambio
        formData.value.moneda = monedaAnterior.value;
      }
    };

    const confirmarCambioMoneda = () => {
      formData.value.moneda = nuevaMoneda.value;
      monedaAnterior.value = nuevaMoneda.value;
      mostrarModalMoneda.value = false;
      
      // Resetear datos calculados si hay cambio de moneda
      if (datosCalculados.value) {
        datosCalculados.value = false;
      }
    };

    const cancelarCambioMoneda = () => {
      mostrarModalMoneda.value = false;
      // El select ya está en el valor anterior
    };

    // Watcher para detectar cambios en las filas y resetear el estado
    watch(
      filasCotizacion,
      () => {
        if (datosCalculados.value) {
          datosCalculados.value = false;
        }
      },
      { deep: true }
    );

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
      datosCalculados,
      volverACotizaciones,
      toggleDestacada,
      agregarFilas,
      calcularYGuardar,
      irAlSiguientePaso,
      mostrarModalMoneda,
      manejarCambioMoneda,
      confirmarCambioMoneda,
      cancelarCambioMoneda
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
        color: var(--color-primary);
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
      font-style: medium;
      font-size: 16px;
      line-height: 120%;
      letter-spacing: 0%;
      color: #454A6C;
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
      grid-template-columns: 80px 250px;
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
    accent-color: var(--color-primary);
  }

  // Animaciones para las filas nuevas
  .tabla-fila {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.3s ease-out;
    
    &.fila-nueva {
      animation: fadeDownToUp 0.6s ease-out forwards;
    }
  }

  @keyframes fadeDownToUp {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    50% {
      opacity: 0.7;
      transform: translateY(-5px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
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
        transition: var(--transition-normal);

        &:hover:not(:disabled) {
          background-color: var(--color-primary-dark);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        &.btn-guardado {
          background-color: #9CA3AF;
          color: var(--color-white);
          cursor: default;

          &:hover {
            background-color: #9CA3AF;
            transform: none;
            box-shadow: none;
          }
        }

        &:disabled {
          cursor: not-allowed;
        }
      }
    }
  }

  // Botones de navegación adicionales
  .navigation-actions {
    margin-top: var(--spacing-4xl);
    padding-top: var(--spacing-3xl);
    border-top: 1px solid var(--color-border-light);

    .step-navigation {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: var(--spacing-md);

      .btn-siguiente-paso {
        padding: var(--spacing-md) var(--spacing-xl);
        background-color: var(--color-primary);
        color: var(--color-white);
        border: none;
        border-radius: var(--radius-md);
        font-family: 'Omnes', sans-serif;
        font-weight: 500;
        font-size: 0.9rem;
        cursor: pointer;
        transition: var(--transition-normal);

        &:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }
      }

      .btn-cerrar-cotizacion {
        padding: var(--spacing-md) var(--spacing-xl);
        background-color: #9CA3AF;
        color: var(--color-white);
        border: none;
        border-radius: var(--radius-md);
        font-family: 'Omnes', sans-serif;
        font-weight: 500;
        font-size: 0.9rem;
        cursor: pointer;
        transition: var(--transition-normal);

        &:hover:not(:disabled) {
          background-color: #6B7280;
          transform: translateY(-1px);
          box-shadow: var(--shadow-sm);
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }
  }

}

// Modal de confirmación cambio de moneda (fuera del contenedor principal)
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
  padding: var(--spacing-lg);

  .modal-content {
    background-color: var(--color-white);
    border-radius: var(--radius-lg);
    padding: var(--spacing-4xl);
    max-width: 400px;
    width: 100%;
    text-align: center;
    box-shadow: var(--shadow-lg);
    animation: slideIn 0.3s ease-out;

    .modal-icon {
      margin-bottom: var(--spacing-xl);

      .icon-circle {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        animation: pulse 2s infinite;
        
        &.warning {
          background-color: #FEF3CD;
          color: #F59E0B;
        }
      }
    }

    .modal-body {
      margin-bottom: var(--spacing-4xl);

      h2 {
        font-family: 'Omnes', sans-serif;
        font-weight: 600;
        font-size: 1.3rem;
        color: var(--color-text);
        margin-bottom: var(--spacing-lg);
        line-height: 1.2;
      }

      p {
        font-family: 'Omnes', sans-serif;
        font-size: 0.9rem;
        color: var(--color-text-light);
        line-height: 1.4;
        margin: 0;
      }
    }

    .modal-actions {
      display: flex;
      gap: var(--spacing-lg);
      justify-content: center;

      button {
        padding: var(--spacing-md) var(--spacing-xl);
        border: none;
        border-radius: var(--radius-md);
        font-family: 'Omnes', sans-serif;
        font-weight: 500;
        font-size: 0.9rem;
        cursor: pointer;
        transition: var(--transition-normal);
        min-width: 100px;

        &.btn-secondary {
          background-color: var(--color-gray-light);
          color: var(--color-text);

          &:hover {
            background-color: #E5E7EB;
          }
        }

        &.btn-primary {
          background-color: var(--color-primary);
          color: var(--color-white);

          &:hover {
            background-color: var(--color-primary-dark);
          }
        }
      }
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
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

    .navigation-actions {
      .step-navigation {
        flex-direction: column;
        text-align: center;
        gap: var(--spacing-lg);

        .btn-siguiente-paso {
          order: 1;
          width: 100%;
        }

        .btn-cerrar-cotizacion {
          order: 2;
          width: 100%;
        }
      }
    }
  }
}
</style>

