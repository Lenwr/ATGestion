import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue";
import Form from "../views/form.vue";
import ListeView from "../views/listeView.vue";
import ListeDetailsView from "../views/listeDetailsView.vue";
import SignUpFormView from "../views/signUpFormView.vue";
import App from "../App.vue";
import QrCodeView from "../views/planingCalendarView.vue";
import SoumissionFormulaire from "../views/soumissionFormulaire.vue";
import Scan from "../views/scan.vue";
import PlaningCalendarView from "../views/planingCalendarView.vue";


const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass:'classActive',
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/form',
      component: Form
    },
    {
      path: '/liste',
      component: ListeView
    },
    {
      path: '/liste/:id',
      component: ListeDetailsView
    },
    {
      path: '/qrcode',
      component: QrCodeView
    },
    {
      path: '/soumission',
      component: SoumissionFormulaire
    },
    {
      path: '/scan',
      component: Scan
    },
    {
      path: '/planing',
      component: PlaningCalendarView
    },
  ]
})


export default router



