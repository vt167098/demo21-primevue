import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';

import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/tailwind-light/theme.css';
import 'primeicons/primeicons.css';
import './index.css'
import 'primeflex/primeflex.css';

import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import SplitButton from 'primevue/splitbutton';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice'
import Toolbar from 'primevue/toolbar';
import Tooltip from 'primevue/tooltip';

const app = createApp(App);
app.use(PrimeVue);
app.use(router);
app.use(store);
app.use(ToastService);

app.directive('tooltip', Tooltip);

app.component('Button', Button);
app.component('Checkbox', Checkbox);
app.component('Column', Column);
app.component('DataTable', DataTable);
app.component('Dialog', Dialog);
app.component('Dropdown', Dropdown);
app.component('InputNumber', InputNumber);
app.component('InputText', InputText);
app.component('SplitButton', SplitButton);
app.component('Textarea', Textarea);
app.component('Toast', Toast);
app.component('Toolbar', Toolbar);

app.mount('#app');