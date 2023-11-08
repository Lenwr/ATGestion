<script >
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from "../components/firebaseConfig.js";
export default {
  data(){
   return{
     email: '' ,
     motDePasse:''
   }
  },
  methods:{
    login(){
      signInWithEmailAndPassword(auth , this.email ,this.motDePasse)
          .then(()=>{
            this.$emit('loggedIn')
          })
    }
  }
}


</script>

<template>

  <div class="flex  min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-[10em] w-auto" src="/images/logo.png" alt="Your Company" />
      <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Connexion</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent = login >
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <div class="mt-2">
            <input id="email" name="email" v-model="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Mot de passe</label>
          </div>
          <div class="mt-2">
            <input id="password" name="password" v-model="motDePasse" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-accent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Connexion</button>
        </div>
      </form>
    </div>
  </div>
</template>


<style scoped>

</style>