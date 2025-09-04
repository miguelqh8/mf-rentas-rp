# Microfrontend - Rentas RP

## Estructura del Proyecto

```
src/
├── @types/           # Definiciones de tipos globales de TypeScript
├── assets/           # Recursos estáticos (imágenes, fuentes, etc.)
├── components/       # Componentes reutilizables de Vue
├── composables/      # Composition API - Lógica reutilizable
├── layouts/          # Layouts de página (BaseLayout, etc.)
├── routes/           # Configuración de Vue Router
├── services/         # Servicios para llamadas a API
├── store/            # Stores de Pinia para manejo de estado
├── types/            # Tipos TypeScript específicos del dominio
├── utils/            # Utilidades y helpers
├── views/            # Vistas/Páginas principales
├── App.vue           # Componente raíz
├── main.ts           # Punto de entrada principal
└── shims-vue.d.ts    # Declaraciones de tipos para Vue
```

## Patrones y Buenas Prácticas

### 1. Separación de Responsabilidades
- **Views**: Páginas principales, solo orchestación
- **Components**: Componentes reutilizables, reciben props
- **Composables**: Lógica de negocio reutilizable
- **Services**: Comunicación con APIs
- **Store**: Estado global de la aplicación

### 2. Composables
Los composables encapsulan lógica reutilizable:
```typescript
// useBuscarPersona.ts
export function useBuscarPersona() {
  const estado = ref();
  const accion = () => {};
  return { estado, accion };
}
```

### 3. Servicios
Los servicios manejan llamadas a API:
```typescript
// personaService.ts
export class PersonaService {
  async buscarPorDocumento(tipo, numero) {
    // lógica de API
  }
}
```

### 4. Store (Pinia)
Para estado compartido entre componentes:
```typescript
export const usePersonaStore = defineStore('persona', () => {
  const persona = ref(null);
  const setPersona = (p) => persona.value = p;
  return { persona, setPersona };
});
```

## Agregar Nuevas Vistas

1. Crear la vista en `src/views/NuevaView.vue`
2. Agregar la ruta en `src/routes/index.ts`
3. Crear composables necesarios en `src/composables/`
4. Definir tipos en `src/types/`
5. Crear servicios si necesita API en `src/services/`

## Modo Standalone vs Integrado

El microfrontend funciona en dos modos:
- **Standalone**: Para desarrollo independiente
- **Integrado**: Como parte del sistema principal

La detección es automática y transparente.
