import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Form from '../views/form.vue'
import ListeView from '../views/listeView.vue'
import ListeDetailsView from '../views/listeDetailsView.vue'
import SignUpFormView from '../views/signUpFormView.vue'
import App from '../App.vue'
import QrCodeView from '../views/planingCalendarView.vue'
import SoumissionFormulaire from '../views/soumissionFormulaire.vue'
import Scan from '../views/scan.vue'
import PlaningCalendarView from '../views/planingCalendarView.vue'
import CustomersView from '../views/customersView.vue'
import CustomersFormView from '../views/customersFormView.vue'
import CustomersDetailsView from '../views/customersDetailsView.vue'
import SelectCustomersView from '../views/selectCustomersView.vue'
import BoxCustomersForm from "../views/BoxCustomersForm.vue";
import BoxPage from "../views/boxPage.vue";
import LoadingPackagesRecording from "../views/loadingPackagesRecording.vue";
import ChargementsDetails from "../views/chargementsDetails.vue";
// import DailyTasksAppView from '../views/dailyTasks/DailyTasksAppView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'classActive',
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/form',
      component: Form,
    },
    {
      path: '/liste',
      component: ListeView,
    },
    {
      path: '/liste/:id',
      component: ListeDetailsView,
    },
    {
      path: '/qrcode',
      component: QrCodeView,
    },
    {
      path: '/soumission',
      component: SoumissionFormulaire,
    },
    {
      path: '/scan',
      component: Scan,
    },
    {
      path: '/planing',
      component: PlaningCalendarView,
    },
    {
      path: '/customersForm',
      component: CustomersFormView,
    },
    {
      path: '/customers',
      component: CustomersView,
    },
    {
      path: '/customersDetails/:id',
      component: CustomersDetailsView,
    },
    {
      path: '/selectForm',
      component: SelectCustomersView,
    },
    {
      path: '/FormulaireBox',
      component: BoxCustomersForm,
    },
    {
      path: '/boxes',
      component: BoxPage,
    },
    {
      path: '/recording',
      component: LoadingPackagesRecording,
    },
    {
      path: '/chargementsDetails/:id',
      component:ChargementsDetails,
    },
    // {
    //   path: '/dailyTasks',
    //   component: DailyTasksAppView,
    // },
  ],
})

export default router
