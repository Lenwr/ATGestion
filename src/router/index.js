import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Form from '../views/form.vue'
import ListeView from '../views/listeView.vue'
import ListeDetailsView from '../views/listeDetailsView.vue'
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
import LoginFormView from "../views/loginFormView.vue";
import {useAuthStore} from "../stores/useAuthStore.js";
import Trajets from "../views/trajets.vue";
import Boxes from "../views/boxes.vue";
import boxeDetailsView from "../views/boxeDetailsView.vue";
import RentalView from "../views/rentalView.vue";
import GeneratorBarCode from '../components/GeneratorBarCode.vue'
// import DailyTasksAppView from '../views/dailyTasks/DailyTasksAppView.vue'

const requireAuth = (to ,from , next )=>{
    let store = useAuthStore()
    if(!store.user){
        next({name:'login'})
    }else {
        next()
    }
}


const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: 'classActive',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginFormView,
        },
        {
            path: '/tasks',
            name: 'tasks',
            component: Trajets,
        },
        {
            path: '/',
            name:'home',
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
            path: '/boxes',
            component: Boxes,
            meta: {
                authNeeded: true,
            },
        },
        {
            path: '/boxes/:id',
            component: boxeDetailsView,
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
            path: '/BarCode',
            component: GeneratorBarCode,
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
        },
        {
            path: '/customers',
            component: CustomersView,
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
        {
            path: '/rental',
            component: RentalView,
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
