// Verificar si estamos en modo standalone
const isStandalone = !window.singleSpaNavigate || 
                    window.location.search.includes('standalone=true');

// Solo importar shared si no estamos en modo standalone
let modulos: any = null;

if (!isStandalone) {
  try {
    // Importación dinámica para evitar errores en modo standalone
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const shared = require("@portal-sistemas/shared");
    modulos = shared.modulos;
  } catch (error) {
    console.warn("No se pudo cargar @portal-sistemas/shared en modo standalone");
  }
}

/**
 * Mock del módulo Rentas RP para desarrollo
 * Este mock debería ser reemplazado por la configuración real del backend
 */
export const mockRentasRpModule = {
  Identificador: "RENTAS_RP",
  RolAzman: "RENTAS_RP_USER",
  Nombre: "Rentas RP",
  Wording: "Sistema de gestión de rentas de riesgo profesional",
  Logo: "https://portal-sistemas.interseguro.com.pe/images/icono_IS.png",
  Uri: "/rentas-rp",
  Icon: "fas fa-calculator",
  Data: "",
  Accesos: [
    {
      CodigoOpcion: 10001,
      CodigoOpcionPadre: null,
      NombreOpcion: "Rentas RP",
      DescripcionOpcion: "Gestión de rentas de riesgo profesional",
      TipoOpcion: "M",
      Visible: true,
      Orden: 1,
      DescripcionOperacionAzman: "RENTAS_RP_READ"
    }
  ]
};

/**
 * Agrega temporalmente el módulo Rentas RP al localStorage
 * Solo para efectos de desarrollo y demostración
 */
export const addMockRentasRpModule = () => {
  if (isStandalone) {
    console.log("ℹ️ Función no disponible en modo standalone");
    return false;
  }

  if (!modulos) {
    console.error("❌ Módulos no disponibles");
    return false;
  }

  try {
    const existingModules = modulos.findAll() || [];
    
    // Verificar si ya existe el módulo
    const existingModule = existingModules.find(
      (module: any) => module.Identificador === "RENTAS_RP"
    );
    
    if (!existingModule) {
      // Agregar el módulo si no existe
      const updatedModules = [...existingModules, mockRentasRpModule];
      modulos.replaceAll(updatedModules);
      console.log("✅ Módulo Rentas RP agregado temporalmente");
      return true;
    } else {
      console.log("ℹ️ Módulo Rentas RP ya existe");
      return false;
    }
  } catch (error) {
    console.error("❌ Error agregando módulo Rentas RP:", error);
    return false;
  }
};

/**
 * Remueve el módulo mock de Rentas RP
 */
export const removeMockRentasRpModule = () => {
  if (isStandalone) {
    console.log("ℹ️ Función no disponible en modo standalone");
    return false;
  }

  if (!modulos) {
    console.error("❌ Módulos no disponibles");
    return false;
  }

  try {
    const existingModules = modulos.findAll() || [];
    const filteredModules = existingModules.filter(
      (module: any) => module.Identificador !== "RENTAS_RP"
    );
    
    modulos.replaceAll(filteredModules);
    console.log("🗑️ Módulo Rentas RP removido");
    return true;
  } catch (error) {
    console.error("❌ Error removiendo módulo Rentas RP:", error);
    return false;
  }
};
