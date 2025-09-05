# mf-rentas-rp

Microfrontend para el sistema de gestión de Rentas Particulares (RP) del Portal de Sistemas de Interseguro.

## 🎯 Descripción

Este microfrontend permite gestionar y consultar información relacionada con las rentas particulares, incluyendo búsqueda de personas, gestión de beneficiarios, cotizaciones y detalles de afiliados.

## 🛠️ Tecnologías

- Vue 3 + TypeScript
- Single-SPA para microfrontends
- Vue Router para enrutamiento
- Pinia para gestión de estado
- SCSS para estilos

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Desarrollo en modo standalone
npm run serve:standalone

# Desarrollo como microfrontend (puerto 8087)
npm run serve

# Construcción para producción
npm run build

# Linting
npm run lint
```

## 🔧 Configuración

### Puerto de desarrollo
- **Puerto standalone**: Configurado por Vue CLI
- **Puerto microfrontend**: 8087

### Variables de entorno
Crear archivo `.env.local` con las variables necesarias:

```bash
VUE_APP_API_URL=http://localhost:8080
VUE_APP_ENV=development
```

## 🏗️ Estructura del proyecto

```
src/
├── @types/             # Definiciones de tipos TypeScript
├── assets/             # Recursos estáticos (imágenes, estilos)
├── components/         # Componentes Vue reutilizables
│   ├── ModalAgregarBeneficiario.vue
│   ├── ModalConfirmacion.vue
│   └── ModalSeleccionCotizacion.vue
├── composables/        # Composables de Vue 3
├── layouts/            # Layouts de la aplicación
├── routes/             # Configuración de rutas
├── services/           # Servicios para comunicación con APIs
├── store/              # Estado global con Pinia
├── types/              # Definiciones de tipos de dominio
├── utils/              # Utilidades y funciones auxiliares
├── views/              # Componentes de vista/páginas
│   ├── BuscarPersonaView.vue
│   ├── CotizacionView.vue
│   └── DetalleAfiliadoView.vue
├── App.vue             # Componente principal
└── main.ts             # Punto de entrada con lógica Single-SPA
```

## 🔗 Integración

Este microfrontend se integra en el Portal de Sistemas a través de:

1. **Root Config**: Configuración de rutas en `/rentas-rp`
2. **Layout**: Uso del layout común del portal
3. **Aplicaciones**: Aparece listado en el módulo de aplicaciones de Rentas Particulares

## 🎨 Características

- **Responsive Design**: Adaptado para desktop y móvil
- **Integración SSO**: Autenticación única con el portal
- **Shared Libraries**: Uso de librerías compartidas del portal
- **Lazy Loading**: Carga optimizada del microfrontend

## 📝 Desarrollo

### Comandos útiles

```bash
# Desarrollo con hot reload
npm run serve

# Desarrollo standalone (sin single-spa)
npm run serve:standalone

# Build optimizado
npm run build

# Análisis de código
npm run lint
```

### Testing

```bash
# Ejecutar tests unitarios (cuando estén configurados)
npm run test:unit

# Test de integración
npm run test:e2e
```

## 🌐 URLs

- **Desarrollo**: http://localhost:8087
- **Producción**: Integrado en el Portal de Sistemas

## 📞 Contacto

Para consultas técnicas sobre este microfrontend, contactar al equipo de desarrollo del Portal de Sistemas.
