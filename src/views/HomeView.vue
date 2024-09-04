<script setup>
</script>

<template>
  <div class="bg-fit bg-[url('https://img.freepik.com/vecteurs-libre/concept-doodle-service-livraison_107791-13798.jpg?t=st=1725434165~exp=1725437765~hmac=6e388539e987d75345370a0dbde76a246ff0e2d2f5983b6529ca91803a7a017d&w=1800')] ">
   <div class="">
    <div class="bg-opacity-90 bg-white my-[10%] flex flex-col items-center py-[10%]">
      <img
          class="mobile:rounded-xl mobile:w-[75%] my-4 mobile:shadow-2xl sm:hidden aaronTravel"
          src="/images/logo.png"
          alt=""
          srcset=""
      />

      <div
          class="bg-primary mobile:w-[80%] sm:w-[50%] py-6 my-2 rounded"
      >
        <p class="text-black text-center">Enlèvements</p>
      </div>


      <!-- les clients -->

      <div class="bg-[#F2F3F4] mobile:w-[90%] w-[40%] py-6 my-2 rounded">
        <div class="mx-2 flex flex-row  items-center justify-around py-4">
          <router-link
              class="text-black bg-white shadow-2xl text-center w-[60%] py-6 rounded"
              to="/customersForm"
          >
            <p>Enregistrer un client</p>
          </router-link>
          <img src="/images/formulaire.png" alt="" class="w-[25%]"/>
        </div>
        <div class="mx-2 flex flex-row items-center justify-around py-4">
          <router-link
              class="text-black bg-white shadow-2xl text-center w-[60%] py-6 rounded"
              to="/customers"
          >
            <p>Mes clients</p>
          </router-link>
          <img src="/images/person.png" alt="" class="w-[25%]"/>
        </div>
      </div>

      <!-- les enlevements  -->

      <div class="bg-[#F2F3F4] mobile:w-[90%]  w-[40%] py-6 my-2 rounded">
        <div class="mx-2 flex flex-row items-center justify-around py-4">
          <router-link
              class="text-black bg-white shadow-2xl text-center w-[60%] py-2 rounded"
              to="/form"
          >
            <p>Enregistrer un</p>
            <p> enlevement</p>
          </router-link>
          <img src="/images/formulaire.png" alt="" class="w-[25%]"/>
        </div>
        <div class="mx-2 flex flex-row items-center justify-around py-4">
          <router-link
              class="text-black bg-white shadow-2xl text-center w-[60%] py-6 rounded"
              to="/liste"
          >
            <p>Mes enlevements</p>
          </router-link>
          <img src="/images/colis.png" alt="" class="w-[25%]"/>
        </div>
      </div>


      <!-- boxes -->

      <div class="bg-primary mobile:w-[80%] sm:w-[50%] py-6 my-2 rounded mb-[10%]">
        <p class="text-black text-center">Boxes</p>
      </div>


      <!-- Gestion des chargements   -->
      <div
          class="bg-primary mobile:w-[80%] sm:w-[50%] py-6 my-2 rounded"
      >
        <p class="text-black text-center">Gestion des colis des contenaires</p>
      </div>

      <div class="bg-[#F2F3F4] mobile:w-[90%] mb-20  w-[40%] py-6 my-2 rounded">
        <div class="mx-2 flex flex-row items-center justify-around py-4">
          <router-link
              class="text-black bg-white shadow-2xl text-center w-[60%] py-2 rounded"
              to="/recording"
          >
            <p>Enregistrer les</p>
            <p> colis pour un contenaire </p>
          </router-link>
          <img src="/images/formulaire.png" alt="" class="w-[25%]"/>
        </div>
      </div>
    </div>
   </div>
  </div>


</template>

<style scoped></style>
