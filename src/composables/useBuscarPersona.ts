import { ref } from "vue";
import { useRouter } from "vue-router";
import { usePersonaStore } from "@/store/personaStore";
import { personaService } from "@/services/personaService";
import type { TipoDocumento } from "@/types/persona";

export function useBuscarPersona() {
  const router = useRouter();
  const personaStore = usePersonaStore();
  
  const tipoDocumento = ref<TipoDocumento>("DNI");
  const numeroDocumento = ref("");
  
  const buscarPersona = async () => {
    if (!numeroDocumento.value.trim()) {
      return;
    }
    
    try {
      personaStore.setLoading(true);
      personaStore.setError(null);
      
      const response = await personaService.buscarPorDocumento(
        tipoDocumento.value, 
        numeroDocumento.value
      );
      
      if (response.encontrada && response.afiliado) {
        personaStore.setAfiliado(response.afiliado);
        router.push('/detalle-afiliado');
      } else {
        personaStore.setError(response.mensaje || "Afiliado no encontrado");
      }
    } catch (error) {
      personaStore.setError("Error al buscar afiliado");
    } finally {
      personaStore.setLoading(false);
    }
  };
  
  const buscarPorNombre = () => {
    // Aquí iría la lógica para buscar por nombre
    // Ejemplo: router.push('/buscar-nombre')
    console.log("Función de búsqueda por nombre y apellido");
  };
  
  return {
    tipoDocumento,
    numeroDocumento,
    buscarPersona,
    buscarPorNombre,
    isLoading: personaStore.isLoading,
    error: personaStore.error
  };
}
