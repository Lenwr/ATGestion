import {createRouter, createWebHashHistory} from 'vue-router'
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
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {toast} from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import {get} from "@vueuse/core";
// import DailyTasksAppView from '../views/dailyTasks/DailyTasksAppView.vue'

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: 'classActive',
    routes: [
        {
            path: '/register',
            component: SignUpFormView,
        },
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
            meta: {
                authNeeded: true,
            },
        },
        {
            path: '/liste/:id',
            component: ListeDetailsView,
            meta: {
                authNeeded: true,
            },
        },
        {
            path: '/qrcode',
            component: QrCodeView,
            meta: {
                authNeeded: true,
            },
        },
        {
            path: '/soumission',
            component: SoumissionFormulaire,
            meta: {
                authNeeded: true,
            },
        },
        {
            path: '/scan',
            component: Scan,
            meta: {
                authNeeded: true,
            },
        },
        {
            path: '/planing',
            component: PlaningCalendarView,
            meta: {
                authNeeded: true,
            },
        },
        {
            path: '/customersForm',
            component: CustomersFormView,
            meta: {
                authNeeded: true,
            },
        },
        {
            path: '/customers',
            component: CustomersView,
            meta: {
                authNeeded: true,
            },
        },
        {
            path: '/customersDetails/:id',
            component: CustomersDetailsView,
            meta: {
                authNeeded: true,
            },
        },
        {
            path: '/selectForm',
            component: SelectCustomersView,
            meta: {
                authNeeded: true,
            },
        },
        {
            path: '/FormulaireBox',
            component: BoxCustomersForm,
            meta: {
                authNeeded: true,
            },
        },
        {
            path: '/boxes',
            component: BoxPage,
            meta: {
                authNeeded: true,
            },
        },
        {
            path: '/recording',
            component: LoadingPackagesRecording,
            meta: {
                authNeeded: true,
            },
        },
        {
            path: '/chargementsDetails/:id',
            component: ChargementsDetails,
            meta: {
                authNeeded: true,
            },
        },
        // {
        //   path: '/dailyTasks',
        //   component: DailyTasksAppView,
        // },
    ],
})

      /**  toast("vous n'avez pas accès ", {
            "theme": "auto",
            "type": "warning",
            "autoClose": 1000,
            "dangerouslyHTMLString": true
        }) **/

      function isAuthenticated() {
          const auth = getAuth();
          return new Promise((resolve, reject) => {
              onAuthStateChanged(auth, (user) => {
                  if (user) {
                      resolve(true);
                      console.log('we have an user')
                  } else {
                      reject(false);
                      toast("vous n'avez pas accès à cette page ", {
                          "theme": "auto",
                          "type": "warning",
                          "autoClose": 1000,
                          "dangerouslyHTMLString": true
                      })
                  }
              });
          });
      }

router.beforeEach(async (to, from, next) => {
    if (to.meta.authNeeded && !(await isAuthenticated())) {
        toast("Vous n'avez pas accès", {
            theme: "auto",
            type: "warning",
            autoClose: 1000,
            dangerouslyHTMLString: true,
        });
        next("/");
    } else {
        next();
    }
});

export default router
