<script>

import {auth} from "../components/firebaseConfig.js";
export default {
  data(){
    return{
      displayName : ''
    }
  },
  beforeUpdate() {
    if (auth.currentUser){
      this.displayName = 'Bienvenue ' + auth.currentUser.displayName
    }
  },

}
</script>

<template>

<div class="flex flex-col items-center py-[10%] " >

  <p v-if="displayName" class="text-black bg-primary px-4 py-4 mb-[10%] rounded shadow-2xl font-bold"  >  {{displayName}} </p>

<img class="mobile:rounded-xl mobile:w-[50%] my-4 mobile:shadow-2xl sm:hidden " src="/images/logo.png" alt="" srcset="">

<div class="bg-primary mobile:w-[80%] py-6 my-2 rounded-2xl">
  <p class="text-black text-center">Enlèvements</p>
</div>


<!-- les clients -->

<div class="bg-[#F2F3F4] mobile:w-[90%] py-6 my-2 rounded-xl">
  <div class=" mx-2 flex flex-row items-center justify-around py-4 ">
    <router-link class="text-black bg-white shadow-2xl text-center w-[60%] py-6 rounded-xl" to="/customersForm">
    <p >Enregistrer un client  </p>
   </router-link>
    <img src="/images/formulaire.png" alt="" class="w-[25%]  ">
  </div>
  <div class=" mx-2 flex flex-row items-center justify-around py-4 ">
    <router-link class="text-black bg-white shadow-2xl text-center w-[60%] py-6 rounded-xl" to="/customers">
    <p >Mes clients  </p>
    </router-link>
    <img src="/images/person.png" alt="" class="w-[25%]  ">
  </div>
  
</div>


<!-- les enlevements  -->

<div class="bg-[#F2F3F4] mobile:w-[90%] py-6 my-2 rounded-xl">
  <div class=" mx-2 flex flex-row items-center justify-around py-4 ">
    <router-link class="text-black bg-white shadow-2xl text-center w-[60%] py-6 rounded-xl" to="/form">
    <p >Enregistrer un enlevement  </p>
   </router-link>
    <img src="/images/formulaire.png" alt="" class="w-[25%]  ">
  </div>
  <div class=" mx-2 flex flex-row items-center justify-around py-4 ">
    <router-link class="text-black bg-white shadow-2xl text-center w-[60%] py-6 rounded-xl" to="/liste">
    <p >Mes enlevements  </p>
    </router-link>
    <img src="/images/colis.png" alt="" class="w-[25%]  ">
  </div>
  
</div>

<!-- boxes -->

<div class="bg-primary mobile:w-[80%] py-6 my-2 rounded-2xl mb-[10%]">
  <p class="text-black text-center">Boxes</p>
</div>



  
  
</div>


</template>

<style scoped>

</style>