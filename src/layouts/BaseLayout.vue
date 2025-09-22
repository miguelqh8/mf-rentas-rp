<template>
  <div class="base-layout">
    <main class="main-content">
      <router-view />
    </main>
    <!-- Toast global para notificaciones -->
    <Toast position="bottom-center" />
    <!-- ConfirmDialog global -->
    <ConfirmDialog />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseLayout",
});
</script>

<style lang="scss">
.base-layout {
  min-height: 100vh;
  background-color: var(--color-background);
}

.main-content {
  padding: 0;
  min-height: 100vh;
}

/* Personalización global del Toast */
:deep(.p-toast) {
  position: fixed !important;
  z-index: 9999 !important;
  
  .p-toast-message {
    margin: var(--spacing-sm, 8px) !important;
    border-radius: var(--radius-md, 6px);
    font-family: 'Omnes', sans-serif;
    max-width: calc(100vw - var(--spacing-lg, 16px)) !important;
    width: auto !important;
    box-sizing: border-box !important;
    
    .p-toast-message-content {
      padding: var(--spacing-lg, 16px);
    }
    
    .p-toast-summary {
      font-weight: 600;
      font-size: 0.95rem;
    }
    
    .p-toast-detail {
      font-size: 0.9rem;
      margin-top: var(--spacing-xs, 4px);
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
  }
}

/* Estilos específicos para móviles */
@media (max-width: 768px) {
  :deep(.p-toast) {
    left: 8px !important;
    right: 8px !important;
    width: calc(100vw - 16px) !important;
    max-width: calc(100vw - 16px) !important;
    transform: none !important;
    
    .p-toast-message {
      margin: 0 0 8px 0 !important;
      max-width: 100% !important;
      width: 100% !important;
      
      .p-toast-message-content {
        padding: 12px !important;
        max-width: 100% !important;
      }
      
      .p-toast-summary {
        font-size: 0.9rem !important;
      }
      
      .p-toast-detail {
        font-size: 0.85rem !important;
        line-height: 1.3 !important;
      }
    }
  }
}

/* Estilos para móviles muy pequeños */
@media (max-width: 480px) {
  :deep(.p-toast) {
    left: 4px !important;
    right: 4px !important;
    width: calc(100vw - 8px) !important;
    max-width: calc(100vw - 8px) !important;
    
    .p-toast-message {
      .p-toast-message-content {
        padding: 8px 12px !important;
        max-width: 100% !important;
      }
      
      .p-toast-summary {
        font-size: 0.85rem !important;
      }
      
      .p-toast-detail {
        font-size: 0.8rem !important;
        line-height: 1.2 !important;
      }
    }
  }
}

/* Regla adicional para forzar el comportamiento en toast */
.p-toast.p-toast-bottom-center {
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: auto !important;
  max-width: calc(100vw - 16px) !important;
}

@media (max-width: 768px) {
  .p-toast.p-toast-bottom-center {
    left: 8px !important;
    right: 8px !important;
    transform: none !important;
    width: calc(100vw - 16px) !important;
    max-width: calc(100vw - 16px) !important;
  }
}

@media (max-width: 480px) {
  .p-toast.p-toast-bottom-center {
    left: 4px !important;
    right: 4px !important;
    width: calc(100vw - 8px) !important;
    max-width: calc(100vw - 8px) !important;
  }
}

/* Personalización del ConfirmDialog */
:deep(.p-confirmdialog) {
  .p-confirmdialog-content {
    font-family: 'Omnes', sans-serif;
  }
  
  .p-confirmdialog-message {
    margin-left: var(--spacing-lg, 16px);
  }
}
</style>