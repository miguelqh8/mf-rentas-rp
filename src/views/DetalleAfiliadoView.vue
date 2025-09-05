<template>
  <div class="detalle-afiliado-view">
    <div class="header-section">
      <h1>Resultado de búsqueda</h1>
      <button @click="nuevaBusqueda" class="btn-nueva-busqueda">
        🔍 Nueva búsqueda
      </button>
    </div>

    <!-- Datos principales siempre visibles -->
    <div class="afiliado-card" v-if="afiliado">
      <div class="info-layout">
        <!-- Datos principales (izquierda) -->
        <div class="info-main">
          <div class="info-row">
            <div class="info-item">
              <label>Nombres</label>
              <span>{{ afiliado.nombres }}</span>
            </div>
            <div class="info-item">
              <label>Apellido paterno</label>
              <span>{{ afiliado.apellidoPaterno }}</span>
            </div>
            <div class="info-item">
              <label>Apellido materno</label>
              <span>{{ afiliado.apellidoMaterno }}</span>
            </div>
          </div>

          <div class="info-row">
            <div class="info-item">
              <label>Sexo</label>
              <span>{{ afiliado.sexo }}</span>
            </div>
            <div class="info-item">
              <label>Estado civil</label>
              <span>{{ afiliado.estadoCivil }}</span>
            </div>
            <div class="info-item">
              <label>Edad</label>
              <span>{{ afiliado.edad }}</span>
            </div>
          </div>

          <div class="info-row">
            <div class="info-item">
              <label>DNI</label>
              <span>{{ afiliado.dni }}</span>
            </div>
            <div class="info-item">
              <label>Categoría</label>
              <span>{{ afiliado.categoria }}</span>
            </div>
            <div class="info-item">
              <label>Fecha de nacimiento</label>
              <span>{{ formatearFecha(afiliado.fechaNacimiento) }}</span>
            </div>
          </div>
        </div>

        <!-- Consentimientos (derecha) -->
        <div class="info-sidebar">
          <div class="info-item">
            <label>Consentimientos aceptados:</label>
            <span>{{ afiliado.consentimientosAceptados }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="error-message" v-if="!afiliado">
      <p>No se encontraron datos del afiliado</p>
      <button @click="nuevaBusqueda" class="btn-nueva-busqueda">
        Realizar nueva búsqueda
      </button>
    </div>

    <!-- Sección de pestañas -->
    <div class="tabs-section" v-if="afiliado">
      <div class="tabs-header">
        <button 
          class="tab-button"
          :class="{ active: activeTab === 'datos' }"
          @click="activeTab = 'datos'"
        >
          DATOS COMPLETOS
        </button>
        <button 
          class="tab-button"
          :class="{ active: activeTab === 'cotizaciones' }"
          @click="activeTab = 'cotizaciones'"
        >
          COTIZACIONES
        </button>
        <button 
          class="tab-button"
          :class="{ active: activeTab === 'grupo' }"
          @click="activeTab = 'grupo'"
        >
          GRUPO FAMILIAR
        </button>
      </div>

      <!-- Contenido de DATOS COMPLETOS -->
      <transition name="tab-fade" mode="out-in">
        <div class="tab-content" v-if="activeTab === 'datos'" key="datos">
        <!-- Mensaje de consentimiento -->
        <div class="consent-message">
          <div class="consent-icon">ℹ️</div>
          <div class="consent-text">
            <h4>Se necesita que el cliente brinde su consentimiento de llamada</h4>
            <p>Elija un canal para enviar el enlace de solicitud:</p>
            
            <div class="contact-options">
              <div class="contact-item">
                <span class="contact-icon">📱</span>
                <span>SMS al 936228466</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">✉️</span>
                <span>Al correo jaritza.yanayaco@gmail.com</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📲</span>
                <span>Whatsapp 936228466</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Formulario de datos -->
        <div class="form-section">
          <div class="form-grid">
            <div class="form-group">
              <label>Correo electrónico</label>
              <input type="email" v-model="datosCompletos.email" placeholder="carlmarita@hotmail.com" />
            </div>
            <div class="form-group">
              <label>Rango de inversión (referencial)</label>
              <input type="text" v-model="datosCompletos.rangoInversion" placeholder="650,000" />
            </div>
            <div class="form-group">
              <label>Celular</label>
              <input type="tel" v-model="datosCompletos.celular" placeholder="977695564" />
            </div>
            <div class="form-group">
              <label>Celular adicional</label>
              <input type="tel" v-model="datosCompletos.celularAdicional" placeholder="Ingrese número" />
            </div>
            <div class="form-group form-group-full">
              <label>Centro laboral</label>
              <input type="text" v-model="datosCompletos.centroLaboral" placeholder="Ingrese centro laboral" />
            </div>
            <div class="form-group form-group-full">
              <label>Dirección</label>
              <div class="address-input">
                <input 
                  type="text" 
                  v-model="datosCompletos.direccion" 
                  placeholder="Calle Conde de la Vega del Ren 130, Dpto 101 130, SANTIAGO DE SURCO, LIMA, LIMA"
                  :disabled="!isEditingAddress"
                />
                <button class="btn-editar" @click="toggleEditAddress">
                  {{ isEditingAddress ? '💾 Guardar' : '✏️ Editar' }}
                </button>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button 
              class="btn-guardar" 
              :class="{ 'active': hasChanges }"
              :disabled="!hasChanges"
              @click="guardarCambios"
            >
              Guardar cambios
            </button>
            <button class="btn-danger">🗑️ Descartar cambios</button>
          </div>
        </div>
        </div>
      </transition>

      <!-- Contenido de COTIZACIONES -->
      <transition name="tab-fade" mode="out-in">
        <div class="tab-content" v-if="activeTab === 'cotizaciones'" key="cotizaciones">
        <div class="cotizaciones-header">
          <h3>Ingreso flexible plus</h3>
          <button class="btn-nueva-cotizacion" @click="abrirModalCotizacion">
            Nueva cotización ➕
          </button>
        </div>

        <div class="cotizaciones-subtitle">
          <h4>Cotizaciones (3)</h4>
        </div>

        <div class="cotizaciones-table">
          <table>
            <thead>
              <tr>
                <th>Solicitud</th>
                <th>Modalidad</th>
                <th>Devengue</th>
                <th>Fec. Cotización</th>
                <th>Fec. Vigencia</th>
                <th>Mon.</th>
                <th>Prima única</th>
                <th>Estado</th>
                <th>Destacada</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cotizacion in cotizaciones" :key="cotizacion.id">
                <td>
                  <span class="solicitud-link" @click="irACotizacion(cotizacion.solicitud)">
                    {{ cotizacion.solicitud }}
                  </span>
                </td>
                <td>{{ cotizacion.modalidad }}</td>
                <td>{{ cotizacion.devengue }}</td>
                <td>{{ cotizacion.fechaCotizacion }}</td>
                <td>{{ cotizacion.fechaVigencia }}</td>
                <td>{{ cotizacion.moneda }}</td>
                <td>{{ cotizacion.primaUnica }}</td>
                <td class="estado-cell">
                  <span v-if="cotizacion.estado === 'En proceso'" class="estado-badge en-proceso">
                    <span class="estado-icon">🕐</span>
                    {{ cotizacion.estado }}
                  </span>
                  <span v-else>{{ cotizacion.estado }}</span>
                </td>
                <td class="destacada-cell">
                  <button 
                    class="btn-star" 
                    :class="{ active: cotizacion.destacada }"
                    @click="toggleDestacada(cotizacion.id)"
                  >
                    {{ cotizacion.destacada ? '★' : '☆' }}
                  </button>
                </td>
                <td class="action-cell">
                  <div class="action-menu-container" :class="{ 'active': menuAbierto === cotizacion.id }">
                    <button 
                      class="btn-action" 
                      @click="toggleMenu(cotizacion.id)"
                      @blur="cerrarMenu"
                    >
                      <div class="dots-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </button>
                    <div class="context-menu" v-if="menuAbierto === cotizacion.id">
                      <div class="menu-item" @click="continuarCierre(cotizacion.id)">
                        Continuar cierre
                      </div>
                      <div class="menu-item menu-item-danger" @click="eliminarCotizacion(cotizacion.id)">
                        Eliminar
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </transition>

      <!-- Contenido de GRUPO FAMILIAR -->
      <transition name="tab-fade" mode="out-in">
        <div class="tab-content" v-if="activeTab === 'grupo'" key="grupo">
        <div class="grupo-familiar-header">
          <h3>Beneficiarios del grupo familiar</h3>
          <button class="btn-agregar-beneficiario" @click="abrirModalBeneficiario">
            ➕ Agregar beneficiario
          </button>
        </div>

        <div class="beneficiarios-table">
          <table>
            <thead>
              <tr>
                <th>N°</th>
                <th>Apellidos y Nombres</th>
                <th>Parentesco</th>
                <th>Sexo</th>
                <th>Fec. Nacimiento</th>
                <th>DNI</th>
                <th>% Renta</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="beneficiario in beneficiarios" :key="beneficiario.id">
                <td>{{ beneficiario.numero }}</td>
                <td>{{ beneficiario.apellidosNombres }}</td>
                <td>{{ beneficiario.parentesco }}</td>
                <td>{{ beneficiario.sexo }}</td>
                <td>{{ beneficiario.fechaNacimiento }}</td>
                <td>{{ beneficiario.dni }}</td>
                <td>
                  <input 
                    type="number" 
                    v-model="beneficiario.porcentajeRenta" 
                    class="percentage-input"
                    min="0" 
                    max="100"
                  />
                </td>
                <td class="actions-cell">
                  <button class="btn-delete" @click="eliminarBeneficiario(beneficiario.id)">
                    🗑️
                  </button>
                  <button class="btn-edit-beneficiario" @click="editarBeneficiario(beneficiario)">
                    ✏️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </transition>
    </div>

    <!-- Modal Agregar Beneficiario -->
    <ModalAgregarBeneficiario 
      :visible="showModalBeneficiario" 
      :beneficiario-a-editar="beneficiarioAEditar"
      @close="cerrarModalBeneficiario"
      @save="guardarBeneficiario"
    />

    <!-- Modal Confirmación -->
    <ModalConfirmacion 
      :visible="showModalConfirmacion"
      titulo="Cambios guardados con éxito"
      mensaje="La información del afiliado se ha actualizado correctamente."
      textoBoton="Entendido"
      @close="cerrarModalConfirmacion"
    />

    <!-- Modal Selección Cotización -->
    <ModalSeleccionCotizacion 
      :visible="showModalCotizacion"
      @close="cerrarModalCotizacion"
      @select="crearNuevaCotizacion"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { usePersonaStore } from "@/store/personaStore";
import { useLoader } from "@/composables/useLoader";
import ModalAgregarBeneficiario from "@/components/ModalAgregarBeneficiario.vue";
import ModalConfirmacion from "@/components/ModalConfirmacion.vue";
import ModalSeleccionCotizacion from "@/components/ModalSeleccionCotizacion.vue";
import type { Beneficiario, NuevoBeneficiario } from "@/types/persona";

export default defineComponent({
  name: "DetalleAfiliadoView",
  components: {
    ModalAgregarBeneficiario,
    ModalConfirmacion,
    ModalSeleccionCotizacion
  },
  setup() {
    const router = useRouter();
    const personaStore = usePersonaStore();
    const { withLoader } = useLoader();
    
    const afiliado = computed(() => personaStore.afiliadoActual);
    const activeTab = ref('datos');
    
    // Datos del formulario
    const datosCompletos = ref({
      email: 'carlmarita@hotmail.com',
      rangoInversion: '650,000',
      celular: '977695564',
      celularAdicional: '',
      centroLaboral: '',
      direccion: 'Calle Conde de la Vega del Ren 130, Dpto 101 130, SANTIAGO DE SURCO, LIMA, LIMA'
    });

    // Datos originales para detectar cambios
    const datosOriginales = ref({
      email: 'carlmarita@hotmail.com',
      rangoInversion: '650,000',
      celular: '977695564',
      celularAdicional: '',
      centroLaboral: '',
      direccion: 'Calle Conde de la Vega del Ren 130, Dpto 101 130, SANTIAGO DE SURCO, LIMA, LIMA'
    });

    // Computed para detectar si hay cambios
    const hasChanges = computed(() => {
      return JSON.stringify(datosCompletos.value) !== JSON.stringify(datosOriginales.value);
    });

    // Estado de edición de dirección
    const isEditingAddress = ref(false);
    const tempDireccion = ref('');

    const toggleEditAddress = () => {
      if (isEditingAddress.value) {
        // Guardar cambios
        isEditingAddress.value = false;
      } else {
        // Comenzar edición
        tempDireccion.value = datosCompletos.value.direccion;
        isEditingAddress.value = true;
      }
    };

    // Datos de beneficiarios
    const beneficiarios = ref<Beneficiario[]>([
      {
        id: 1,
        numero: 1,
        apellidosNombres: 'ARAMBULO HERRAN CARLOS R...',
        parentesco: 'OTROS',
        sexo: 'MASCULINO',
        fechaNacimiento: '31/07/1943',
        dni: '08594892',
        porcentajeRenta: 0
      }
    ]);

    // Estado de los modales
    const showModalBeneficiario = ref(false);
    const showModalConfirmacion = ref(false);
    const showModalCotizacion = ref(false);
    const beneficiarioAEditar = ref<Beneficiario | null>(null);
    const menuAbierto = ref<number | null>(null);

    // Datos de cotizaciones
    const cotizaciones = ref([
      {
        id: 1,
        solicitud: 'IFP_415736',
        modalidad: 'Ingreso Seguro con de...',
        devengue: 'Julio 2025',
        fechaCotizacion: '12/07/2025',
        fechaVigencia: '12/07/2025',
        moneda: 'S/',
        primaUnica: '300,000.00',
        estado: '-',
        destacada: true
      },
      {
        id: 2,
        solicitud: 'IFP_415737',
        modalidad: 'Ingreso Seguro con de...',
        devengue: 'Julio 2025',
        fechaCotizacion: '12/07/2025',
        fechaVigencia: '12/07/2025',
        moneda: 'S/',
        primaUnica: '300,000.00',
        estado: 'En proceso',
        destacada: false
      },
      {
        id: 3,
        solicitud: 'IFP_415738',
        modalidad: 'Ingreso Vitalicio Seguro',
        devengue: 'Julio 2025',
        fechaCotizacion: '12/07/2025',
        fechaVigencia: '12/07/2025',
        moneda: 'S/',
        primaUnica: '350,000.00',
        estado: '-',
        destacada: false
      }
    ]);
    
    const nuevaBusqueda = () => {
      personaStore.clearStore();
      router.push('/');
    };
    
    const formatearFecha = (fecha: string) => {
      // Convierte 12/03/1946 a formato más legible si es necesario
      return fecha;
    };

    const eliminarBeneficiario = (id: number) => {
      beneficiarios.value = beneficiarios.value.filter(b => b.id !== id);
    };

    const toggleDestacada = (id: number) => {
      const cotizacion = cotizaciones.value.find(c => c.id === id);
      if (cotizacion) {
        cotizacion.destacada = !cotizacion.destacada;
      }
    };

    // Funciones del modal de beneficiario
    const abrirModalBeneficiario = () => {
      showModalBeneficiario.value = true;
    };

    const cerrarModalBeneficiario = () => {
      showModalBeneficiario.value = false;
      beneficiarioAEditar.value = null;
    };

    const agregarBeneficiario = (datosNuevoBeneficiario: NuevoBeneficiario) => {
      const nuevoBeneficiario = {
        id: Date.now(), // ID temporal único
        numero: beneficiarios.value.length + 1,
        apellidosNombres: `${datosNuevoBeneficiario.apellidoPaterno} ${datosNuevoBeneficiario.apellidoMaterno} ${datosNuevoBeneficiario.nombres}`,
        parentesco: datosNuevoBeneficiario.parentesco,
        sexo: datosNuevoBeneficiario.sexo,
        fechaNacimiento: formatearFechaParaTabla(datosNuevoBeneficiario.fechaNacimiento),
        dni: datosNuevoBeneficiario.numeroDocumento,
        porcentajeRenta: 0
      };
      
      beneficiarios.value.push(nuevoBeneficiario);
    };

    const formatearFechaParaTabla = (fechaISO: string) => {
      // Convierte de YYYY-MM-DD a DD/MM/YYYY
      const [year, month, day] = fechaISO.split('-');
      return `${day}/${month}/${year}`;
    };

    const editarBeneficiario = (beneficiario: Beneficiario) => {
      beneficiarioAEditar.value = beneficiario;
      showModalBeneficiario.value = true;
    };

    const guardarBeneficiario = async (datosNuevoBeneficiario: NuevoBeneficiario) => {
      await withLoader(
        async () => {
          // Simular una operación asíncrona (como guardar en el backend)
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          if (beneficiarioAEditar.value) {
            // Modo edición: actualizar beneficiario existente
            const index = beneficiarios.value.findIndex(b => b.id === beneficiarioAEditar.value!.id);
            if (index !== -1) {
              beneficiarios.value[index] = {
                ...beneficiarios.value[index],
                apellidosNombres: `${datosNuevoBeneficiario.apellidoPaterno} ${datosNuevoBeneficiario.apellidoMaterno} ${datosNuevoBeneficiario.nombres}`,
                parentesco: datosNuevoBeneficiario.parentesco,
                sexo: datosNuevoBeneficiario.sexo,
                fechaNacimiento: formatearFechaParaTabla(datosNuevoBeneficiario.fechaNacimiento),
                dni: datosNuevoBeneficiario.numeroDocumento
              };
            }
          } else {
            // Modo agregar: crear nuevo beneficiario
            agregarBeneficiario(datosNuevoBeneficiario);
          }
        },
        { 
          overlay: true,
          minDuration: 800
        }
      );
    };

    // Funciones del modal de confirmación
    const guardarCambios = () => {
      // Aquí iría la lógica para guardar los cambios al backend
      console.log('Guardando cambios...', datosCompletos.value);
      
      // Actualizar los datos originales para que no haya cambios pendientes
      datosOriginales.value = { ...datosCompletos.value };
      
      // Mostrar modal de confirmación
      showModalConfirmacion.value = true;
    };

    const cerrarModalConfirmacion = () => {
      showModalConfirmacion.value = false;
    };

    // Funciones del modal de cotización
    const abrirModalCotizacion = () => {
      showModalCotizacion.value = true;
    };

    const cerrarModalCotizacion = () => {
      showModalCotizacion.value = false;
    };

    const crearNuevaCotizacion = (seleccion: { tipo: string; nombre: string }) => {
      const cotizacionId = `IFP_${Date.now().toString().slice(-6)}`;
      
      const nuevaCotizacion = {
        id: Date.now(),
        solicitud: cotizacionId,
        modalidad: seleccion.nombre,
        devengue: 'Agosto 2025',
        fechaCotizacion: new Date().toLocaleDateString('es-PE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        fechaVigencia: new Date().toLocaleDateString('es-PE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        moneda: 'S/',
        primaUnica: '0.00',
        estado: 'BORRADOR',
        destacada: false
      };

      cotizaciones.value.unshift(nuevaCotizacion);
      console.log('Nueva cotización creada:', nuevaCotizacion);

      // Si es "Ingreso Seguro con Devolución", navegar a la vista de cotización
      if (seleccion.tipo === 'ingreso-seguro') {
        router.push(`/cotizacion/${cotizacionId}`);
      }
    };

    const irACotizacion = (solicitudId: string) => {
      router.push(`/cotizacion/${solicitudId}`);
    };

    // Funciones del menú contextual
    const toggleMenu = (cotizacionId: number) => {
      menuAbierto.value = menuAbierto.value === cotizacionId ? null : cotizacionId;
    };

    const cerrarMenu = () => {
      // Usamos un pequeño delay para permitir que el click en el menu item se ejecute
      setTimeout(() => {
        menuAbierto.value = null;
      }, 150);
    };

    const continuarCierre = (cotizacionId: number) => {
      console.log('Continuar cierre de cotización:', cotizacionId);
      // Aquí iría la lógica para continuar el cierre
      menuAbierto.value = null;
    };

    const eliminarCotizacion = (cotizacionId: number) => {
      console.log('Eliminar cotización:', cotizacionId);
      // Aquí iría la lógica para eliminar la cotización
      const index = cotizaciones.value.findIndex(c => c.id === cotizacionId);
      if (index !== -1) {
        cotizaciones.value.splice(index, 1);
      }
      menuAbierto.value = null;
    };
    
    return {
      afiliado,
      activeTab,
      datosCompletos,
      hasChanges,
      isEditingAddress,
      toggleEditAddress,
      beneficiarios,
      cotizaciones,
      showModalBeneficiario,
      showModalConfirmacion,
      showModalCotizacion,
      nuevaBusqueda,
      formatearFecha,
      eliminarBeneficiario,
      toggleDestacada,
      abrirModalBeneficiario,
      cerrarModalBeneficiario,
      agregarBeneficiario,
      editarBeneficiario,
      guardarBeneficiario,
      beneficiarioAEditar,
      guardarCambios,
      cerrarModalConfirmacion,
      abrirModalCotizacion,
      cerrarModalCotizacion,
      crearNuevaCotizacion,
      irACotizacion,
      menuAbierto,
      toggleMenu,
      cerrarMenu,
      continuarCierre,
      eliminarCotizacion
    };
  },
});
</script>

<style lang="scss" scoped>
.detalle-afiliado-view {
  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 30px 30px 30px;
    
    h1 {
      margin: 0;
      font-family: 'Omnes', sans-serif;
      font-weight: 600;
      font-size: 22px;
      line-height: 120%;
      letter-spacing: 0%;
      color: #454A6C;
    }
  }

  .btn-nueva-busqueda {
    background-color: white;
    color: var(--color-secondary);
            border: 1px solid var(--color-secondary);
    padding: 10px 20px;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &:hover {
                background-color: var(--color-secondary-light);
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(85, 172, 237, 0.2);
    }
    
    &:active {
      transform: translateY(0);
                background-color: var(--color-secondary-lighter);
    }
  }

  .afiliado-card {
    background-color: white;
    margin: 0 30px;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .info-layout {
    display: flex;
    gap: var(--spacing-4xl);
    align-items: flex-start;
  }

  .info-main {
    flex: 1;
    max-width: 60%;
  }

  .info-row {
    display: grid;
    grid-template-columns: repeat(3, minmax(150px, 200px));
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-lg);
  }

  .info-sidebar {
    flex: 0 0 280px;
    min-width: 280px;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    
    label {
      font-family: 'Omnes', sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 2%;
      vertical-align: middle;
      color: #9C9C9C;
      margin-bottom: 2px;
    }
    
    span {
      font-family: 'Omnes', sans-serif;
      font-weight: 500;
      font-style: medium;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 2%;
      vertical-align: middle;
      color: #46474B;
      padding: 4px 0;
    }
  }

  .error-message {
    background-color: white;
    margin: 0 30px;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
    
    p {
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 20px;
    }
  }

  // Estilos para las pestañas
  .tabs-section {
    margin: 30px 30px 0 30px;
  }

  .tabs-header {
    display: flex;
    background-color: white;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    overflow: hidden;
  }

  .tab-button {
    flex: 1;
    padding: 15px 20px;
    background-color: #f8f9fa;
    border: none;
    border-bottom: 3px solid transparent;
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: 700;
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 5%;
    text-align: center;
    vertical-align: middle;
    text-transform: uppercase;
    color: #0855C4;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &.active {
      background-color: white;
      color: #1361B9;
      border-bottom-color: #1361B9;
    }
    
    &:hover:not(.active) {
      background-color: #e9ecef;
      color: #333;
    }
  }

  .tab-content {
    background-color: white;
    padding: 30px;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  // Mensaje de consentimiento
  .consent-message {
    background-color: var(--color-primary);
    color: white;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    gap: 15px;
    margin-bottom: 30px;
    
    .consent-icon {
      font-size: 1.5rem;
      margin-top: 2px;
    }
    
    .consent-text {
      flex: 1;
      
      h4 {
        margin: 0 0 10px 0;
        font-size: 1.1rem;
        font-weight: 600;
      }
      
      p {
        margin: 0 0 15px 0;
        opacity: 0.9;
      }
    }
  }

  .contact-options {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.95rem;
    
    .contact-icon {
      width: 20px;
    }
  }

  // Formulario
  .form-section {
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 30px;
      
      .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
        
        &.form-group-full {
          grid-column: 1 / -1;
        }
        
        label {
          font-family: 'Omnes', sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 22px;
          letter-spacing: 2%;
          vertical-align: middle;
          color: #9C9C9C;
        }
        
        input {
          padding: 12px 16px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          
          &:focus {
            outline: none;
            border-color: #1361B9;
            box-shadow: 0 0 0 2px rgba(19, 97, 185, 0.1);
          }
        }
      }
    }
    
    .address-input {
      display: flex;
      gap: 10px;
      align-items: center;
      
      input {
        flex: 1;
        
        &:disabled {
          background-color: #f8f9fa;
          color: #6c757d;
          cursor: not-allowed;
          border-color: #e9ecef;
        }
      }
    }
    
    .btn-editar {
      background-color: white;
      color: var(--color-secondary);
              border: 1px solid var(--color-secondary);
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;

      &:hover {
                  background-color: var(--color-secondary-light);
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(85, 172, 237, 0.2);
      }

      &:active {
        transform: translateY(0);
                  background-color: var(--color-secondary-lighter);
      }
    }
  }

  .form-actions {
    display: flex;
    gap: 15px;
    justify-content: flex-start;
    margin-top: 30px;
    
    .btn-guardar {
      background-color: var(--color-disabled);
      color: var(--color-disabled-text);
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 500;
      cursor: not-allowed;
      transition: all 0.3s ease;
      
      &.active,
      &:not(:disabled) {
        background-color: var(--color-primary);
        color: white;
        cursor: pointer;
        
        &:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(19, 97, 185, 0.3);
        }
        
        &:active {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(19, 97, 185, 0.3);
        }
      }
    }
    
    .btn-danger {
      background-color: white;
      color: #dc3545;
      border: 1px solid #dc3545;
      padding: 12px 24px;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      
      &:hover {
        background-color: #f8f9fa;
      }
    }
  }

  .empty-content {
    padding: 40px;
    text-align: center;
    color: #666;
    font-size: 1.1rem;
  }

  // Estilos para Grupo Familiar
  .grupo-familiar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    h3 {
      margin: 0;
      font-family: 'Omnes', sans-serif;
      font-weight: 600;
      font-size: 1.2rem;
      color: #333;
    }
  }

  .btn-agregar-beneficiario {
    background-color: white;
    color: var(--color-secondary);
            border: 1px solid var(--color-secondary);
    padding: 10px 20px;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    
    &:hover {
                background-color: var(--color-secondary-light);
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(85, 172, 237, 0.2);
    }
    
    &:active {
      transform: translateY(0);
                background-color: var(--color-secondary-lighter);
    }
  }

  .beneficiarios-table {
    overflow-x: auto;
    
    table {
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      
      thead {
        background-color: var(--color-primary);
        
        th {
          padding: 15px 12px;
          text-align: left;
          font-family: 'Omnes', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          
          &:first-child {
            width: 60px;
            text-align: center;
          }
          
          &:last-child {
            width: 100px;
            text-align: center;
          }
        }
      }
      
      tbody {
        tr {
          border-bottom: 1px solid #eee;
          transition: background-color 0.2s ease;
          
          &:hover {
            background-color: #f8f9fa;
          }
          
          &:last-child {
            border-bottom: none;
          }
        }
        
        td {
          padding: 12px;
          font-family: 'Omnes', sans-serif;
          font-size: 0.9rem;
          color: #333;
          
          &:first-child {
            text-align: center;
            font-weight: 600;
          }
        }
      }
    }
  }

  .percentage-input {
    width: 70px;
    padding: 6px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    text-align: center;
    font-size: 0.9rem;
    
    &:focus {
      outline: none;
      border-color: #1361B9;
      box-shadow: 0 0 0 2px rgba(19, 97, 185, 0.1);
    }
  }

  .actions-cell {
    text-align: center;
    
    .btn-delete,
    .btn-edit-beneficiario {
      background: none;
      border: none;
      padding: 6px 8px;
      margin: 0 2px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.2s ease;
      
      &.btn-delete:hover {
        background-color: #fee;
        color: #dc3545;
      }
      
      &.btn-edit-beneficiario:hover {
        background-color: #e3f2fd;
        color: #1976d2;
      }
    }
  }

  // Efectos de transición fade para sección superior
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.4s ease-in-out;
  }

  .fade-enter-from {
    opacity: 0;
    transform: translateY(-10px);
  }

  .fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  // Efectos de transición fade para contenido de pestañas
  .tab-fade-enter-active,
  .tab-fade-leave-active {
    transition: all 0.3s ease-in-out;
  }

  .tab-fade-enter-from {
    opacity: 0;
    transform: translateX(20px);
  }

  .tab-fade-leave-to {
    opacity: 0;
    transform: translateX(-20px);
  }

  // Estilos para Cotizaciones
  .cotizaciones-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    h3 {
      margin: 0;
      font-family: 'Omnes', sans-serif;
      font-weight: 600;
      font-size: 1.4rem;
      color: #333;
    }
  }

  .btn-nueva-cotizacion {
    background-color: white;
    color: var(--color-secondary);
            border: 1px solid var(--color-secondary);
    padding: 10px 20px;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    
    &:hover {
                background-color: var(--color-secondary-light);
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(85, 172, 237, 0.2);
    }
    
    &:active {
      transform: translateY(0);
                background-color: var(--color-secondary-lighter);
    }
  }

  .cotizaciones-subtitle {
    margin-bottom: 20px;
    
    h4 {
      margin: 0;
      font-family: 'Omnes', sans-serif;
      font-weight: 500;
      font-size: 1.1rem;
      color: #555;
    }
  }

  .cotizaciones-table {
    overflow-x: auto;
    
    table {
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      
      thead {
        background-color: var(--color-primary);
        
        th {
          padding: 15px 10px;
          text-align: left;
          font-family: 'Omnes', sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          
          &:first-child {
            padding-left: 15px;
          }
          
          &:last-child {
            text-align: center;
            width: 80px;
          }
          
          &:nth-last-child(2) {
            text-align: center;
            width: 100px;
          }
        }
      }
      
      tbody {
        tr {
          border-bottom: 1px solid #eee;
          transition: background-color 0.2s ease;
          
          &:hover {
            background-color: #f8f9fa;
          }
          
          &:last-child {
            border-bottom: none;
          }
        }
        
        td {
          padding: 12px 10px;
          font-family: 'Omnes', sans-serif;
          font-size: 0.9rem;
          color: #333;
          
          &:first-child {
            padding-left: 15px;
          }
        }
      }
    }
  }

  .solicitud-link {
    color: #1361B9;
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }

  .estado-cell {
    .estado-badge {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-xs);
      padding: var(--spacing-xs) var(--spacing-md);
      border-radius: var(--radius-md);
      font-size: 0.8rem;
      font-weight: 500;
      font-family: 'Omnes', sans-serif;
      
      &.en-proceso {
        background-color: var(--color-primary);
        color: white;
        
        .estado-icon {
          font-size: 0.9rem;
        }
      }
    }
  }

  .destacada-cell {
    text-align: center;
    
    .btn-star {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      transition: all 0.2s ease;
      color: #ccc;
      
      &.active {
                  color: var(--color-primary);
      }
      
      &:hover {
        background-color: #f8f9fa;
        transform: scale(1.1);
      }
    }
  }

  .action-cell {
    text-align: center;
    position: relative;
    
    .action-menu-container {
      position: relative;
      display: inline-block;
    }
    
    .btn-action {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      transition: var(--transition-normal);
      
      .dots-icon {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 2px solid var(--color-primary);
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
        transition: var(--transition-normal);
        
        span {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: var(--color-primary);
          display: block;
        }
      }
      
      &:hover .dots-icon {
        background-color: var(--color-primary);
        
        span {
          background-color: white;
        }
      }
    }
    
    .context-menu {
      position: absolute;
      bottom: 100%;
      right: 0;
      background-color: var(--color-white);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      min-width: 120px;
      animation: fadeInUp 0.2s ease-out;
      
      .menu-item {
          padding: var(--spacing-md) var(--spacing-lg);
          cursor: pointer;
          font-family: 'Omnes', sans-serif;
          font-size: 0.9rem;
          color: var(--color-text);
          transition: var(--transition-normal);
          border-bottom: 1px solid var(--color-border);
          
          &:hover {
            background-color: var(--color-gray-light);
          }
          
          &:last-child {
            border-bottom: none;
          }
          
          &:first-child {
            border-radius: var(--radius-md) var(--radius-md) 0 0;
          }
          
          &:last-child {
            border-radius: 0 0 var(--radius-md) var(--radius-md);
          }
          
          &:only-child {
            border-radius: var(--radius-md);
          }
          
          &.menu-item-danger {
            color: var(--color-danger);
            
            &:hover {
              background-color: #fee;
              color: #dc2626;
            }
          }
        }
    }
  }

  // Animaciones para el menú contextual
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  // Responsive para pantallas medianas
  @media (max-width: 1024px) {
    .info-layout {
      flex-direction: column;
      gap: var(--spacing-xl);
    }
    
    .info-main {
      max-width: 100%;
    }
    
    .info-row {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-lg);
    }
    
    .info-sidebar {
      flex: none;
      min-width: auto;
    }
  }

  @media (max-width: 768px) {
    .header-section {
      flex-direction: column;
      gap: 15px;
      align-items: stretch;
      margin: 0 20px 20px 20px;
      
      h1 {
        font-size: 20px;
        text-align: center;
      }
    }
    
    .afiliado-card,
    .error-message {
      margin: 0 20px;
      padding: 20px;
    }
    
    .info-group {
      grid-template-columns: 1fr;
    }
    
    .tabs-section {
      margin: 30px 20px 0 20px;
    }
    
    .tab-content {
      padding: 20px;
    }
    
    .form-grid {
      grid-template-columns: 1fr !important;
    }
    
    .contact-options {
      flex-direction: column;
    }
    
    .form-actions {
      flex-direction: column;
    }
    
    .address-input {
      flex-direction: column;
    }
    
    .info-layout {
      flex-direction: column;
      gap: var(--spacing-xl);
    }
    
    .info-main {
      max-width: 100%;
    }
    
    .info-row {
      grid-template-columns: 1fr;
      gap: var(--spacing-lg);
    }
    
    .info-sidebar {
      flex: none;
      min-width: auto;
    }
    
    .grupo-familiar-header {
      flex-direction: column;
      gap: 15px;
      align-items: stretch;
    }
    
    .beneficiarios-table {
      font-size: 0.8rem;
      
      table {
        min-width: 600px;
      }
      
      th, td {
        padding: 8px 6px;
      }
    }
    
    .cotizaciones-header {
      flex-direction: column;
      gap: 15px;
      align-items: stretch;
    }
    
    .cotizaciones-table {
      font-size: 0.8rem;
      
      table {
        min-width: 800px;
      }
      
      th, td {
        padding: 8px 6px;
      }
    }
  }
}
</style>
