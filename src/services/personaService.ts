import type { TipoDocumento, BuscarPersonaResponse, Categoria } from "@/types/persona";

// Simulación de servicio - en el futuro se conectará a la API real
export class PersonaService {
  private static instance: PersonaService;
  
  public static getInstance(): PersonaService {
    if (!PersonaService.instance) {
      PersonaService.instance = new PersonaService();
    }
    return PersonaService.instance;
  }
  
  async buscarPorDocumento(
    tipoDocumento: TipoDocumento, 
    numeroDocumento: string
  ): Promise<BuscarPersonaResponse> {
    // Simulación de llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock de respuesta - DNI de prueba para demo
    if (numeroDocumento === "12345678") {
      return {
        encontrada: true,
        afiliado: {
          nombres: "MARIA LOURDES",
          apellidoPaterno: "LÓPEZ",
          apellidoMaterno: "BRAVO DE RUEDA",
          sexo: "FEMENINO",
          estadoCivil: "SOLTERO",
          edad: 79,
          categoria: "JUB. LEGAL" as Categoria,
          consentimientosAceptados: "Ninguno"
        }
      };
    }
    
    return {
      encontrada: false,
      afiliado: null,
      mensaje: "Afiliado no encontrado"
    };
  }
  
  async buscarPorNombres(nombres: string, apellidos: string): Promise<BuscarPersonaResponse[]> {
    // Simulación de búsqueda por nombres
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return [];
  }
}

export const personaService = PersonaService.getInstance();
