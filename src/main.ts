import { createApp } from "vue";
import router from "./routes";
import { store } from "./store";
import App from "./App.vue";
import "./assets/styles/global.scss";

console.log('🚀 Iniciando aplicación Rentas RP...');

// Verificar si estamos en modo standalone
const isStandalone = !window.singleSpaNavigate || 
                    window.location.search.includes('standalone=true') ||
                    process.env.VUE_CLI_STANDALONE === 'true';

console.log('📋 Modo:', isStandalone ? 'STANDALONE' : 'INTEGRADO');

if (isStandalone) {
  // Modo standalone: crear la aplicación Vue normal
  console.log('🎯 Creando aplicación standalone...');
  const app = createApp(App);
  app.use(router);
  app.use(store);
  app.mount('#app');
  console.log('✅ Aplicación montada en modo standalone');
} else {
  // Modo integrado: usar single-spa
  console.log('🔗 Preparando para modo integrado...');
  
  // Importar single-spa-vue dinámicamente
  import("single-spa-vue").then(({ default: singleSpaVue }) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { h } = require("vue");
    
    const vueLifecycles = singleSpaVue({
      createApp,
      appOptions: {
        render() {
          return h(App, {});
        },
      },
      handleInstance(app) {
        app.use(router);
        app.use(store);
      },
    });

    // Exports para Single-SPA
    (window as any).bootstrap = vueLifecycles.bootstrap;
    (window as any).mount = vueLifecycles.mount;
    (window as any).unmount = vueLifecycles.unmount;
    
    console.log('✅ Aplicación configurada para modo integrado');
  }).catch((error) => {
    console.error('❌ Error cargando single-spa-vue:', error);
    // Fallback: crear aplicación standalone
    const app = createApp(App);
    app.use(router);
    app.use(store);
    app.mount('#app');
    console.log('✅ Fallback: aplicación montada en modo standalone');
  });
}