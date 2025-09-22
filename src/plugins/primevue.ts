import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';

// Import PrimeVue CSS
import 'primevue/resources/themes/aura-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';

// Importar componentes que vamos a usar
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

// Configuración en español
const locale = {
  accept: 'Sí',
  reject: 'No',
  choose: 'Elegir',
  upload: 'Subir',
  cancel: 'Cancelar',
  clear: 'Limpiar',
  apply: 'Aplicar',
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  today: 'Hoy',
  weekHeader: 'Sem'
};

export default {
  install(app: any) {
    app.use(PrimeVue, {
      locale,
      ripple: true
    });
    app.use(ConfirmationService);
    app.use(ToastService);
    
    // Registrar directivas
    app.directive('tooltip', Tooltip);
    
    // Registrar componentes globalmente
    app.component('Button', Button);
    app.component('InputText', InputText);
    app.component('Dropdown', Dropdown);
    app.component('Dialog', Dialog);
    app.component('Card', Card);
    app.component('ProgressSpinner', ProgressSpinner);
    app.component('Message', Message);
    app.component('Toast', Toast);
    app.component('ConfirmDialog', ConfirmDialog);
    app.component('TabView', TabView);
    app.component('TabPanel', TabPanel);
  }
};
