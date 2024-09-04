import {defineStore} from 'pinia';
import router from '../router';
import {onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {useRouter} from "vue-router";
import {auth} from "../components/firebaseConfig.js";


export const useAuthStore = defineStore({
    id: 'storeAuth',
    state:()=>{
        return {
            email: '',
            password:'',
            user:{
            }
        }
    },
    getters:{

    },
    actions:{
            async login(){
                try {
                    const res  = await signInWithEmailAndPassword(auth , this.email , this.password)
                    if(res){
                        await router.replace({name: 'home'})
                    }
                }catch(error){
                    console.log(error)
                }
            },
            async logout(){
                await signOut(auth)
                await router.replace({name: 'login'})
                this.email = ''
                this.password = ''
            },
        init() {
          onAuthStateChanged(auth , (user)=>{
              if(user){
                  this.user.id = user.uid
                  this.user.email = user.email
                  console.log(user)
                  router.replace({name: 'home'})
              }else {
                  this.user = {}
                  router.replace({name: 'login'})
              }
          })
        },
    }
})



