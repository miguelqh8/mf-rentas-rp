import { defineStore } from "pinia";
import { ref } from "vue";
import type { Persona, Afiliado } from "@/types/persona";

export const usePersonaStore = defineStore("persona", () => {
  // Estado
  const personaActual = ref<Persona | null>(null);
  const afiliadoActual = ref<Afiliado | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  
  // Acciones
  const setPersona = (persona: Persona | null) => {
    personaActual.value = persona;
  };
  
  const setAfiliado = (afiliado: Afiliado | null) => {
    afiliadoActual.value = afiliado;
  };
  
  const setLoading = (loading: boolean) => {
    isLoading.value = loading;
  };
  
  const setError = (errorMessage: string | null) => {
    error.value = errorMessage;
  };
  
  const clearStore = () => {
    personaActual.value = null;
    afiliadoActual.value = null;
    isLoading.value = false;
    error.value = null;
  };
  
  return {
    // Estado
    personaActual,
    afiliadoActual,
    isLoading,
    error,
    // Acciones
    setPersona,
    setAfiliado,
    setLoading,
    setError,
    clearStore,
  };
});
