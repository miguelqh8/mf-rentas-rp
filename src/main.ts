import { createApp } from "vue";
import router from "./routes";
import { store } from "./store";
import App from "./App.vue";
import BaseLoader from "./components/BaseLoader.vue";
import GlobalLoader from "./components/GlobalLoader.vue";
import "./assets/styles/global.scss";
import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import "./assets/styles/primevue-theme.scss";

// Configuración de PrimeVue igual que mf-rentas-particular
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputNumber from 'primevue/inputnumber';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';

console.log('🚀 Iniciando aplicación Rentas RP...');

// Función helper para configurar componentes globales
function setupGlobalComponents(app: any) {
  app.component('BaseLoader', BaseLoader);
  app.component('GlobalLoader', GlobalLoader);
  
  // Configurar PrimeVue igual que mf-rentas-particular
  app.use(PrimeVue);
  app.use(ConfirmationService);
  app.use(ToastService);
  
  // Registrar directivas
  app.directive('tooltip', Tooltip);
  
  // Registro de componentes PrimeVue
  app.component('Button', Button);
  app.component('InputText', InputText);
  app.component('Dropdown', Dropdown);
  app.component('Card', Card);
  app.component('Dialog', Dialog);
  app.component('ProgressSpinner', ProgressSpinner);
  app.component('Message', Message);
  app.component('Toast', Toast);
  app.component('ConfirmDialog', ConfirmDialog);
  app.component('TabView', TabView);
  app.component('TabPanel', TabPanel);
  app.component('DataTable', DataTable);
  app.component('Column', Column);
  app.component('InputNumber', InputNumber);
}

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
  setupGlobalComponents(app);
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
        setupGlobalComponents(app);
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
    setupGlobalComponents(app);
    app.mount('#app');
    console.log('✅ Fallback: aplicación montada en modo standalone');
  });
}