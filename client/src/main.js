import "@babel/polyfill";
import "mutationobserver-shim";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import { stateSymbol, createState } from "./store/shoppingCart";

import PrimeVue from "primevue/config";
import TabMenu from "primevue/tabmenu";
import Slider from "primevue/slider";
import Button from "primevue/button";
import Divider from "primevue/divider";
import BadgeDirective from "primevue/badgedirective";
import Message from "primevue/message";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import ScrollTop from "primevue/scrolltop";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import DataView from "primevue/dataview";
import Dialog from "primevue/dialog";
import Card from "primevue/card";
import ToggleButton from "primevue/togglebutton";
import SelectButton from "primevue/selectbutton";
import Fieldset from "primevue/fieldset";
import InputNumber from "primevue/inputnumber";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./assets/styles/main.css";

const app = createApp(App);

app.component("Slider", Slider);
app.component("Button", Button);
app.component("Divider", Divider);
app.component("TabMenu", TabMenu);
app.component("Message", Message);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Toast", Toast);
app.component("ScrollTop", ScrollTop);
app.component("InputText", InputText);
app.component("Dropdown", Dropdown);
app.component("DataView", DataView);
app.component("Dialog", Dialog);
app.component("Card", Card);
app.component("ToggleButton", ToggleButton);
app.component("SelectButton", SelectButton);
app.component("Fieldset", Fieldset);
app.component("InputNumber", InputNumber);
app.directive("badge", BadgeDirective);

app.use(VueAxios, axios);
app.provide(stateSymbol, createState());
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.mount("#app");
