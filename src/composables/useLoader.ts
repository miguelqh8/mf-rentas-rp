import { ref, reactive } from 'vue';

interface LoaderState {
  isVisible: boolean;
  text: string;
  overlay: boolean;
  size: 'small' | 'medium' | 'large';
}

// Estado global del loader
const loaderState = reactive<LoaderState>({
  isVisible: false,
  text: '',
  overlay: true,
  size: 'medium'
});

export function useLoader() {
  
  /**
   * Muestra el loader con configuración opcional
   */
  const showLoader = (options?: {
    text?: string;
    overlay?: boolean;
    size?: 'small' | 'medium' | 'large';
  }) => {
    loaderState.isVisible = true;
    loaderState.text = options?.text || '';
    loaderState.overlay = options?.overlay !== undefined ? options.overlay : true;
    loaderState.size = options?.size || 'medium';
  };

  /**
   * Oculta el loader
   */
  const hideLoader = () => {
    loaderState.isVisible = false;
    loaderState.text = '';
  };

  /**
   * Muestra el loader por un tiempo determinado
   */
  const showLoaderFor = (
    duration: number,
    options?: {
      text?: string;
      overlay?: boolean;
      size?: 'small' | 'medium' | 'large';
    }
  ) => {
    showLoader(options);
    setTimeout(() => {
      hideLoader();
    }, duration);
  };

  /**
   * Ejecuta una función asíncrona mostrando el loader
   */
  const withLoader = async <T>(
    asyncFn: () => Promise<T>,
    options?: {
      text?: string;
      overlay?: boolean;
      size?: 'small' | 'medium' | 'large';
      minDuration?: number; // Duración mínima para evitar flash
    }
  ): Promise<T> => {
    const startTime = Date.now();
    const minDuration = options?.minDuration || 500; // 500ms por defecto
    
    showLoader(options);
    
    try {
      const result = await asyncFn();
      
      // Asegurar duración mínima para evitar flash
      const elapsed = Date.now() - startTime;
      if (elapsed < minDuration) {
        await new Promise(resolve => setTimeout(resolve, minDuration - elapsed));
      }
      
      return result;
    } finally {
      hideLoader();
    }
  };

  /**
   * Actualiza el texto del loader mientras está visible
   */
  const updateLoaderText = (text: string) => {
    loaderState.text = text;
  };

  return {
    // Estado reactivo
    loaderState,
    
    // Métodos principales
    showLoader,
    hideLoader,
    showLoaderFor,
    withLoader,
    updateLoaderText,
    
    // Helpers para casos comunes
    showOverlayLoader: (text?: string, size?: 'small' | 'medium' | 'large') => 
      showLoader({ text, overlay: true, size }),
    
    showInlineLoader: (text?: string, size?: 'small' | 'medium' | 'large') => 
      showLoader({ text, overlay: false, size }),
    
    // Estado computado para facilitar uso
    isLoading: () => loaderState.isVisible
  };
}

// Export para usar en templates sin composition API
export const globalLoader = useLoader();
