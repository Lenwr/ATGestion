<script >
import {ref} from "vue";
import {auth} from '../components/firebaseConfig.js';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';

export default {
  emits:['loggedIn'],
  data () {
    return {
        nom : '' ,
        email: '' ,
        motDePasse:'',

    }
  },
  methods: {
     submit(){
       createUserWithEmailAndPassword(auth, this.email , this.motDePasse)
           .then(()=>{
             updateProfile(auth.currentUser,{
               displayName: this.nom
             })
                 .then(()=>{
                   this.$emit('loggedIn')
                 })
           })
     }
  }


}



</script>

<!--
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-white">
    <body class="h-full">
    ```
  -->
  <div class="flex  min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-[10em] w-auto" src="/images/logo.png" alt="Your Company"/>
      <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Inscription</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="submit">

        <div>
          <label for="nom" class="block text-sm font-medium leading-6 text-gray-900">Nom d'utilisateur</label>
          <div class="mt-2">
            <input id="nom" name="nom" v-model="nom" type="text" autocomplete="noms" required=""
                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <div class="mt-2">
            <input id="email" name="email" v-model="email" type="email" autocomplete="email" required=""
                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Mot de passe</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-primary hover:text-accent">Mot de passe oublié?</a>
            </div>
          </div>
          <div class="mt-2">
            <input id="password" name="password" v-model="motDePasse" type="password" autocomplete="current-password"
                   required=""
                   class="block w-full rounded-md border-0 py-1.5 text-accent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div>
          <button type="submit"
                  class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  v-on:click="submit">Inscription
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<style scoped>

</style>