<template>
  <div class="cotizacion-paso2-view">
    <!-- Header con navegación -->
    <div class="header-section">
      <button @click="volverAPaso1" class="btn-volver">
        ← Paso anterior
      </button>
    </div>

    <!-- Información de la cotización -->
    <div class="cotizacion-info">
      <div class="titulo-section">
        <div class="titulo-left">
          <div class="titulo-top">
            <h1>Cotización {{ cotizacionId }}</h1>
            <div class="badges">
              <span class="badge-proceso">EN PROCESO</span>
              <button class="btn-star" :class="{ active: destacada }" @click="toggleDestacada">
                {{ destacada ? '★' : '☆' }}
              </button>
            </div>
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

        <div class="info-right">
          <div class="cotizacion-resumen-card">
            <div class="resumen-header">
              <div class="resumen-numero">{{ numeroSeleccionado }}</div>
              <div class="resumen-acciones">
                <button class="btn-ver-detalle">👁️ Ver detalle</button>
                <button class="btn-cambiar-eleccion">✓ Cambiar elección</button>
              </div>
            </div>
            <div class="resumen-content">
              <div class="resumen-left">
                <span class="resumen-label">Renta mensual</span>
                <div class="resumen-value">{{ rentaMensual }}</div>
              </div>
              <div class="resumen-right">
                <div class="resumen-detail">Tiempo: {{ tiempo }}</div>
                <div class="resumen-detail">Diferido: {{ diferido }}</div>
                <div class="resumen-detail">Moneda: {{ monedaResumen }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenedor principal -->
    <div class="cotizacion-container">
      <!-- Progreso de pasos -->
      <div class="header-content">
        <div class="steps-container">
          <div class="step completed">
            <div class="step-number">1</div>
          </div>
          <div class="step active">
            <div class="step-number">2</div>
          </div>
          <div class="step">
            <div class="step-number">3</div>
          </div>
          <div class="step">
            <div class="step-number">4</div>
          </div>
        </div>
      </div>

      <!-- Información del paso -->
      <div class="step-info">
        <div class="step-title">Paso 2 de 4</div>
        <div class="step-subtitle">Confirma tus datos</div>
      </div>

      <!-- Contenido del formulario -->
      <div class="form-content">
        <div class="form-left">
          <div class="section-header">
            <h3>Información personal</h3>
          </div>
          
          <div class="form-grid">
            <div class="form-group">
              <label>Nombres</label>
              <span class="form-value">{{ datosPersonales.nombres }}</span>
            </div>
            <div class="form-group">
              <label>Apellido paterno</label>
              <span class="form-value">{{ datosPersonales.apellidoPaterno }}</span>
            </div>
            <div class="form-group">
              <label>Apellido materno</label>
              <span class="form-value">{{ datosPersonales.apellidoMaterno }}</span>
            </div>
            <div class="form-group">
              <label>DNI</label>
              <span class="form-value">{{ datosPersonales.dni }}</span>
            </div>
            <div class="form-group">
              <label>Fecha de nacimiento</label>
              <span class="form-value">{{ datosPersonales.fechaNacimiento }}</span>
            </div>
            <div class="form-group">
              <label>Estado civil</label>
              <span class="form-value">{{ datosPersonales.estadoCivil }}</span>
            </div>
            <div class="form-group">
              <label>Sexo</label>
              <span class="form-value">{{ datosPersonales.sexo }}</span>
            </div>
            <div class="form-group">
              <label>Nacionalidad</label>
              <span class="form-value">{{ datosPersonales.nacionalidad }}</span>
            </div>
            <div class="form-group">
              <label>Residencia</label>
              <span class="form-value">{{ datosPersonales.residencia }}</span>
            </div>
            <div class="form-group">
              <label>Correo electrónico</label>
              <span class="form-value">{{ datosPersonales.correo }}</span>
            </div>
            <div class="form-group">
              <label>Celular</label>
              <span class="form-value">{{ datosPersonales.celular }}</span>
            </div>
          </div>

          <!-- Sección Declarativo -->
          <div class="section-header">
            <h3>Declarativo</h3>
          </div>

          <div class="form-declarativo">
            <div class="form-row">
              <div class="form-group-radio">
                <label class="radio-label">¿Es PEP?</label>
                <div class="radio-options">
                  <label class="radio-option">
                    <input type="radio" v-model="formData.esPep" value="si" />
                    <span>Sí</span>
                  </label>
                  <label class="radio-option">
                    <input type="radio" v-model="formData.esPep" value="no" />
                    <span>No</span>
                  </label>
                </div>
              </div>
              
              <div class="form-group">
                <label>Profesión</label>
                <select v-model="formData.profesion">
                  <option value="ADMINIST.">ADMINIST.</option>
                  <option value="INGENIERO">INGENIERO</option>
                  <option value="MEDICO">MEDICO</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group-radio">
                <label class="radio-label">¿Es sujeto obligado?</label>
                <div class="radio-options">
                  <label class="radio-option">
                    <input type="radio" v-model="formData.esSujetoObligado" value="si" />
                    <span>Sí</span>
                  </label>
                  <label class="radio-option">
                    <input type="radio" v-model="formData.esSujetoObligado" value="no" />
                    <span>No</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Sección Cuenta bancaria -->
          <div class="section-header">
            <h3>Cuenta bancaria</h3>
          </div>

          <div class="form-bancario">
            <div class="form-row">
              <div class="form-group">
                <label>Banco</label>
                <select v-model="formData.banco">
                  <option value="SCOTIABANK">SCOTIABANK</option>
                  <option value="BCP">BCP</option>
                  <option value="BBVA">BBVA</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>Tipo de cuenta</label>
                <select v-model="formData.tipoCuenta">
                  <option value="Cuenta de ahorro">Cuenta de ahorro</option>
                  <option value="Cuenta corriente">Cuenta corriente</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group full-width">
                <label>Número de cuenta</label>
                <input type="text" v-model="formData.numeroCuenta" placeholder="Ingresa número de cuenta" />
              </div>
            </div>
          </div>

          <!-- Sección Origen de fondos -->
          <div class="section-header">
            <h3>Origen de fondos</h3>
          </div>

          <div class="form-origen">
            <div class="form-row">
              <div class="form-group">
                <label>Centro laboral</label>
                <input type="text" v-model="formData.centroLaboral" />
              </div>
              
              <div class="form-group">
                <label>Cargo</label>
                <input type="text" v-model="formData.cargo" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Actividad económica</label>
                <input type="text" v-model="formData.actividadEconomica" />
              </div>
              
              <div class="form-group">
                <label>Cargo</label>
                <input type="text" v-model="formData.cargoDetalle" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Moneda</label>
                <select v-model="formData.monedaIngreso">
                  <option value="S/">S/</option>
                  <option value="US$">US$</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>Ingreso neto</label>
                <input type="text" v-model="formData.ingresoNeto" placeholder="0.00" />
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Botones de navegación -->
      <div class="form-actions">
        <div class="navigation-buttons">
          <button class="btn-anterior" @click="volverAPaso1">
            ← Paso anterior
          </button>
          <div class="right-buttons">
            <span class="step-text">Siguiente paso: Elegir beneficiarios</span>
            <button class="btn-siguiente" @click="irAlSiguientePaso">
              Siguiente →
            </button>
          </div>
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
  name: 'CotizacionPaso2View',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const personaStore = usePersonaStore();

    const afiliado = computed(() => personaStore.afiliadoActual);
    const cotizacionId = ref(route.params.id || 'IFP_415736');
    const destacada = ref(false);

    const formData = ref({
      esPep: 'no',
      profesion: 'ADMINIST.',
      esSujetoObligado: 'no',
      banco: 'SCOTIABANK',
      tipoCuenta: 'Cuenta de ahorro',
      numeroCuenta: '206-0554900',
      centroLaboral: 'COLEGIO SANTA MARIA MARIANISTAS',
      cargo: 'EMPLEADO',
      actividadEconomica: 'COLEGIO SANTA MARIA MARIANISTAS',
      cargoDetalle: 'EMPLEADO',
      monedaIngreso: 'S/',
      ingresoNeto: '6,070'
    });

    const datosPersonales = ref({
      nombres: 'MARIA LOURDES',
      apellidoPaterno: 'LÓPEZ',
      apellidoMaterno: 'BRAVO DE RUEDA',
      dni: '07854509',
      fechaNacimiento: '17/02/1936',
      estadoCivil: 'SOLTERO',
      sexo: 'FEMENINO',
      nacionalidad: 'Peruano',
      residencia: 'LIMA',
      correo: 'carlmarita@hotmail.com',
      celular: '977695564'
    });

    const numeroSeleccionado = ref('3876893');
    const rentaMensual = ref('S/2,539.92');
    const tiempo = ref('5 años');
    const diferido = ref('2 años');
    const monedaResumen = ref('Nominal');

    const afiliadoNombre = computed(() => {
      if (afiliado.value) {
        return `${afiliado.value.nombres}, ${afiliado.value.apellidoPaterno} ${afiliado.value.apellidoMaterno}`;
      }
      return 'MARIA LOURDES, LOPEZ BRAVO DE RUEDA';
    });

    const fechaCotizacion = ref('01/07/2025');
    const fechaVigencia = ref('15/07/2025');
    const devengue = ref('Julio 2025');

    const volverAPaso1 = () => {
      router.push(`/cotizacion/${cotizacionId.value}`);
    };

    const toggleDestacada = () => {
      destacada.value = !destacada.value;
    };

    const irAlSiguientePaso = () => {
      router.push(`/cotizacion/${cotizacionId.value}/paso-3`);
    };

    return {
      cotizacionId,
      afiliadoNombre,
      fechaCotizacion,
      fechaVigencia,
      devengue,
      destacada,
      formData,
      datosPersonales,
      numeroSeleccionado,
      rentaMensual,
      tiempo,
      diferido,
      monedaResumen,
      volverAPaso1,
      toggleDestacada,
      irAlSiguientePaso
    };
  }
});
</script>

<style lang="scss" scoped>
.cotizacion-paso2-view {
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
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--spacing-lg);

    .titulo-left {
      flex: 1;

      .titulo-top {
        display: flex;
        align-items: center;
        gap: var(--spacing-lg);
        margin-bottom: var(--spacing-md);

        h1 {
          margin: 0;
          font-family: 'Omnes', sans-serif;
          font-weight: 600;
          font-size: 1.8rem;
          color: var(--color-text);
        }

        .badges {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);

          .badge-proceso {
            background-color: #F59E0B;
            color: white;
            padding: var(--spacing-xs) var(--spacing-md);
            border-radius: var(--radius-md);
            font-family: 'Omnes', sans-serif;
            font-weight: 600;
            font-size: 0.8rem;
            text-transform: uppercase;
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
      }

      .afiliado-info {
        margin-bottom: var(--spacing-md);

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

    .info-right {
      margin-top: 0;
      
      .cotizacion-resumen-card {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: var(--spacing-2xl);
        background-color: var(--color-white);
        min-width: 450px;
        margin-top: 0;

        .resumen-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-2xl);
          padding-bottom: var(--spacing-lg);
          border-bottom: 1px solid var(--color-border-light);

          .resumen-numero {
            font-family: 'Omnes', sans-serif;
            font-weight: 600;
            font-size: 1.5rem;
            color: var(--color-text);
          }

          .resumen-acciones {
            display: flex;
            gap: var(--spacing-md);

            button {
              padding: var(--spacing-sm) var(--spacing-lg);
              border: 1px solid var(--color-primary);
              border-radius: var(--radius-sm);
              font-family: 'Omnes', sans-serif;
              font-size: 0.8rem;
              cursor: pointer;
              transition: var(--transition-normal);

              &.btn-ver-detalle {
                background-color: transparent;
                color: var(--color-primary);

                &:hover {
                  background-color: var(--color-primary);
                  color: white;
                }
              }

              &.btn-cambiar-eleccion {
                background-color: var(--color-primary);
                color: white;

                &:hover {
                  background-color: var(--color-primary-dark);
                }
              }
            }
          }
        }

        .resumen-content {
          display: grid;
          grid-template-columns: 2fr 3fr;
          gap: var(--spacing-4xl);
          align-items: start;

          .resumen-left {
            .resumen-label {
              display: block;
              font-family: 'Omnes', sans-serif;
              font-size: 0.9rem;
              color: var(--color-text-light);
              margin-bottom: var(--spacing-sm);
            }

            .resumen-value {
              font-family: 'Omnes', sans-serif;
              font-weight: 600;
              font-size: 1.3rem;
              color: var(--color-text);
            }
          }

          .resumen-right {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-sm);
            text-align: right;

            .resumen-detail {
              font-family: 'Omnes', sans-serif;
              font-size: 0.85rem;
              color: var(--color-text-light);
            }
          }
        }
      }
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
    justify-content: flex-start;
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

        &.completed .step-number {
          background-color: #10B981;
          border-color: #10B981;
          color: var(--color-white);
        }
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
    }
  }

  .form-content {
    margin-bottom: var(--spacing-4xl);

    .form-left {
      .section-header {
        margin-bottom: var(--spacing-lg);
        padding-bottom: var(--spacing-md);
        border-bottom: 1px solid var(--color-border-light);

        h3 {
          margin: 0;
          font-family: 'Omnes', sans-serif;
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--color-text);
        }
      }

      .form-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-lg);
        margin-bottom: var(--spacing-4xl);

        .form-group {
          label {
            display: block;
            margin-bottom: var(--spacing-xs);
            font-family: 'Omnes', sans-serif;
            font-weight: 500;
            font-size: 0.9rem;
            color: var(--color-text-light);
          }

          .form-value {
            font-family: 'Omnes', sans-serif;
            font-weight: 500;
            font-size: 0.9rem;
            color: var(--color-text);
          }
        }
      }

      .form-declarativo, .form-bancario, .form-origen {
        margin-bottom: var(--spacing-4xl);

        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-lg);

          &:last-child {
            margin-bottom: 0;
          }
        }

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

          &.full-width {
            grid-column: 1 / -1;
          }
        }

        .form-group-radio {
          .radio-label {
            display: block;
            margin-bottom: var(--spacing-sm);
            font-family: 'Omnes', sans-serif;
            font-weight: 500;
            font-size: 0.9rem;
            color: var(--color-text);
          }

          .radio-options {
            display: flex;
            gap: var(--spacing-lg);

            .radio-option {
              display: flex;
              align-items: center;
              gap: var(--spacing-sm);
              cursor: pointer;

              input[type="radio"] {
                width: auto;
                margin: 0;
                accent-color: var(--color-primary);
              }

              span {
                font-family: 'Omnes', sans-serif;
                font-size: 0.9rem;
                color: var(--color-text);
              }
            }
          }
        }
      }
    }
  }

  .form-actions {
    .navigation-buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .btn-anterior {
        padding: var(--spacing-md) var(--spacing-xl);
        background-color: var(--color-gray-light);
        color: var(--color-text);
        border: none;
        border-radius: var(--radius-md);
        font-family: 'Omnes', sans-serif;
        font-weight: 500;
        cursor: pointer;
        transition: var(--transition-normal);

        &:hover {
          background-color: #E5E7EB;
        }
      }

      .right-buttons {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: var(--spacing-md);

        .step-text {
          font-family: 'Omnes', sans-serif;
          font-size: 1rem;
          color: var(--color-text-light);
          font-weight: 400;
        }

        .btn-siguiente {
          padding: var(--spacing-md) var(--spacing-xl);
          background-color: var(--color-primary);
          color: var(--color-white);
          border: none;
          border-radius: var(--radius-md);
          font-family: 'Omnes', sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-normal);

          &:hover {
            background-color: var(--color-primary-dark);
            transform: translateY(-1px);
            box-shadow: var(--shadow-md);
          }
        }
      }
    }
  }
}

// Responsive
@media (max-width: 1024px) {
  .cotizacion-paso2-view {
    padding: var(--spacing-lg) var(--spacing-lg);
  }

  .cotizacion-info {
    .content-section {
      flex-direction: column;
      gap: var(--spacing-lg);

      .info-right {
        .cotizacion-resumen-card {
          min-width: auto;
          width: 100%;

          .resumen-header {
            flex-direction: column;
            gap: var(--spacing-md);
            text-align: center;
          }

          .resumen-content {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
            text-align: center;

            .resumen-right {
              text-align: center;
            }
          }
        }
      }
    }

    .fechas-info {
      flex-direction: column;
      gap: var(--spacing-sm);
    }
  }

  .cotizacion-container {
    .header-content {
      justify-content: center;
    }

    .form-content {
      .form-left {
        .form-grid, .form-declarativo .form-row, .form-bancario .form-row, .form-origen .form-row {
          grid-template-columns: 1fr;
        }
      }
    }

    .form-actions {
      .navigation-buttons {
        flex-direction: column;
        gap: var(--spacing-lg);
        align-items: stretch;

        .right-buttons {
          align-items: center;
        }
      }
    }
  }
}
</style>
