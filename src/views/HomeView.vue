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

<div class="flex flex-col items-center h-screen px-[10%]  py-[10%]" >

  <p v-if="displayName" class="text-black bg-primary px-4 py-4 mb-[10%] rounded shadow-2xl font-bold"  >  {{displayName}} </p>

<img class="mobile:rounded-xl mobile:w-[50%] mobile:shadow-2xl sm:hidden " src="/images/logo.png" alt="" srcset="">

  <div class="collapse bg-primary mt-[10%]">
    <input type="checkbox" class="peer" />
    <div class="     collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
      Enlèvements
    </div>
    <div class=" pt-4 collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
      <router-link to="/form">
      <p>J' enrégistre un enlèvement</p>
      </router-link>
      <div class="divider h-1"  ></div>
        <router-link to="/liste">
      <p>Liste des enlèvements</p>
        </router-link>
    </div>

  </div>
  <div class="collapse bg-primary mt-[10%]">
    <input type="checkbox" class="peer" />
    <div class="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
      Boxes
    </div>
    <div class=" pt-4 collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
      <router-link to="/form">
        <p>Nouveau Client</p>
      </router-link>
      <div class="divider h-1"  ></div>
      <router-link to="/liste">
        <p>Gestion des boxes</p>
      </router-link>
    </div>

  </div>
</div>


</template>

<style scoped>

</style>