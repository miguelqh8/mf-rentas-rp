# BaseLoader - Componente de Carga

El componente `BaseLoader` es un loader reutilizable con animación de puntos que usa el color azul base del proyecto (`--color-primary`).

## Uso Básico

### 1. Loader Inline (dentro de un componente)

```vue
<template>
  <div>
    <h2>Mi Contenido</h2>
    <!-- Loader inline simple -->
    <BaseLoader />
    
    <!-- Loader inline con texto -->
    <BaseLoader text="Cargando datos..." />
    
    <!-- Loader inline pequeño -->
    <BaseLoader size="small" text="Procesando..." />
  </div>
</template>
```

### 2. Loader Overlay (pantalla completa)

```vue
<template>
  <div>
    <!-- Loader que cubre toda la pantalla -->
    <BaseLoader overlay text="Cargando aplicación..." />
  </div>
</template>
```

## Uso con Composable (Recomendado)

### 1. Importar el composable

```vue
<script setup lang="ts">
import { useLoader } from '@/composables/useLoader';

const { showLoader, hideLoader, withLoader, showOverlayLoader } = useLoader();
</script>
```

### 2. Mostrar/Ocultar loader manualmente

```vue
<script setup lang="ts">
import { useLoader } from '@/composables/useLoader';

const { showLoader, hideLoader } = useLoader();

const handleClick = () => {
  // Mostrar loader overlay con texto
  showLoader({ text: 'Procesando...', overlay: true });
  
  // Simular operación
  setTimeout(() => {
    hideLoader();
  }, 3000);
};
</script>

<template>
  <button @click="handleClick">Procesar</button>
</template>
```

### 3. Loader por tiempo determinado

```vue
<script setup lang="ts">
import { useLoader } from '@/composables/useLoader';

const { showLoaderFor } = useLoader();

const quickProcess = () => {
  // Mostrar loader por 2 segundos
  showLoaderFor(2000, { 
    text: 'Guardando...', 
    size: 'large' 
  });
};
</script>
```

### 4. Loader con función asíncrona (Método recomendado)

```vue
<script setup lang="ts">
import { useLoader } from '@/composables/useLoader';

const { withLoader } = useLoader();

const fetchData = async () => {
  const data = await withLoader(
    async () => {
      // Tu operación asíncrona aquí
      const response = await fetch('/api/data');
      return response.json();
    },
    {
      text: 'Cargando datos...',
      overlay: true,
      minDuration: 500 // Duración mínima para evitar flash
    }
  );
  
  console.log('Datos cargados:', data);
};
</script>
```

### 5. Helpers para casos comunes

```vue
<script setup lang="ts">
import { useLoader } from '@/composables/useLoader';

const { showOverlayLoader, showInlineLoader, hideLoader } = useLoader();

// Mostrar loader overlay rápidamente
const showFullScreen = () => {
  showOverlayLoader('Cargando...', 'large');
};

// Mostrar loader inline rápidamente
const showSmall = () => {
  showInlineLoader('Procesando...', 'small');
};
</script>
```

## Props del Componente BaseLoader

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `overlay` | Boolean | `false` | Si es `true`, muestra el loader como overlay de pantalla completa |
| `text` | String | `''` | Texto opcional que se muestra debajo del loader |
| `size` | String | `'medium'` | Tamaño del loader: `'small'`, `'medium'`, `'large'` |

## Métodos del Composable useLoader

| Método | Descripción |
|--------|-------------|
| `showLoader(options?)` | Muestra el loader con opciones |
| `hideLoader()` | Oculta el loader |
| `showLoaderFor(duration, options?)` | Muestra el loader por un tiempo determinado |
| `withLoader(asyncFn, options?)` | Ejecuta una función asíncrona con loader |
| `updateLoaderText(text)` | Actualiza el texto del loader mientras está visible |
| `showOverlayLoader(text?, size?)` | Helper para mostrar loader overlay |
| `showInlineLoader(text?, size?)` | Helper para mostrar loader inline |
| `isLoading()` | Retorna si el loader está visible |

## Ejemplos de Casos de Uso Reales

### Cargar datos de una API

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useLoader } from '@/composables/useLoader';

const { withLoader } = useLoader();
const datos = ref([]);

const cargarDatos = async () => {
  datos.value = await withLoader(
    async () => {
      const response = await fetch('/api/cotizaciones');
      return response.json();
    },
    { text: 'Cargando cotizaciones...', overlay: true }
  );
};
</script>
```

### Proceso de login

```vue
<script setup lang="ts">
import { useLoader } from '@/composables/useLoader';
import { useRouter } from 'vue-router';

const { withLoader } = useLoader();
const router = useRouter();

const login = async (credentials) => {
  try {
    await withLoader(
      async () => {
        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify(credentials)
        });
        if (!response.ok) throw new Error('Login failed');
        return response.json();
      },
      { text: 'Iniciando sesión...', overlay: true }
    );
    
    router.push('/dashboard');
  } catch (error) {
    console.error('Error en login:', error);
  }
};
</script>
```

### Loader en tabla de datos

```vue
<template>
  <div>
    <table v-if="!isLoading()">
      <!-- contenido de la tabla -->
    </table>
    
    <BaseLoader v-else text="Cargando tabla..." />
  </div>
</template>

<script setup lang="ts">
import { useLoader } from '@/composables/useLoader';

const { isLoading } = useLoader();
</script>
```

## Consideraciones de Accesibilidad

- El loader respeta la configuración `prefers-reduced-motion` del usuario
- Cuando `prefers-reduced-motion: reduce` está activo, usa una animación más suave
- El overlay incluye `backdrop-filter: blur(2px)` para mejor visibilidad

## Estilo y Diseño

- Usa el color primario del proyecto: `var(--color-primary)` (#0855C4)
- Incluye `backdrop-filter` para efecto de desenfoque en overlay
- Animación suave de rebote con stagger en los puntos
- Responsive y adaptable a diferentes tamaños de pantalla
