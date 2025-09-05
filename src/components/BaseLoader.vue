<template>
  <div 
    :class="[
      'loader-container',
      { 'loader-overlay': overlay },
      { 'loader-inline': !overlay }
    ]"
  >
    <div class="loader">
      <div class="loader-dots">
        <div class="dot dot-1"></div>
        <div class="dot dot-2"></div>
        <div class="dot dot-3"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseLoader',
  props: {
    // Si true, muestra el loader como overlay de pantalla completa
    overlay: {
      type: Boolean,
      default: false
    },
    // Texto opcional debajo del loader
    text: {
      type: String,
      default: ''
    },
    // Tamaño del loader
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => ['small', 'medium', 'large'].includes(value)
    }
  }
});
</script>

<style lang="scss" scoped>
.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(2px);
    z-index: 9999;
  }
  
  &.loader-inline {
    padding: var(--spacing-xl);
  }
}

.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
}

.loader-dots {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
}

.dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--color-primary);
  animation: bounce 1.4s ease-in-out infinite both;
}

.dot-1 {
  animation-delay: -0.32s;
}

.dot-2 {
  animation-delay: -0.16s;
}

.dot-3 {
  animation-delay: 0s;
}

.loader-text {
  font-family: 'Omnes', sans-serif;
  font-size: 0.9rem;
  color: var(--color-text-light);
  text-align: center;
  margin-top: var(--spacing-sm);
}

// Diferentes tamaños
.loader-container[data-size="small"] {
  .dot {
    width: 14px;
    height: 14px;
  }
}

.loader-container[data-size="large"] {
  .dot {
    width: 28px;
    height: 28px;
  }
}

// Animación de rebote
@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

// Animación alternativa de pulso
@keyframes pulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

// Variante de animación de onda
.loader-dots.wave {
  .dot {
    animation: wave 1.2s ease-in-out infinite;
  }
  
  .dot-1 { animation-delay: 0s; }
  .dot-2 { animation-delay: 0.2s; }
  .dot-3 { animation-delay: 0.4s; }
}

@keyframes wave {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-20px);
  }
}

// Estados de transición suave
.loader-container {
  transition: opacity var(--transition-normal);
}

// Para accesibilidad
@media (prefers-reduced-motion: reduce) {
  .dot {
    animation: pulse 2s ease-in-out infinite;
  }
}
</style>
