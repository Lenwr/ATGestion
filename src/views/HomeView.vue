<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
</script>

<template>
  <div class="bg-fit bg-[url('https://img.freepik.com/vecteurs-libre/concept-doodle-service-livraison_107791-13798.jpg?t=st=1725434165~exp=1725437765~hmac=6e388539e987d75345370a0dbde76a246ff0e2d2f5983b6529ca91803a7a017d&w=1800')] ">
   <div class="  pb-10 ">
    <div class="bg-opacity-90 bg-white my-[2%] flex flex-col items-center ">
      <img
          class="mobile:rounded-xl mobile:w-[75%] my-4 mobile:shadow-2xl sm:hidden aaronTravel"
          src="/images/logo.png"
          alt=""
          srcset=""
      />

      <div
          class="bg-primary mobile:w-[80%] sm:w-[50%] py-6 my-2 rounded"
      >
        <p class=" text-black text-center">Enlèvements</p>
      </div>

<div class="flex flex-col justify-around items-center sm:flex-row my-4">
      <!-- les clients -->

      <div class="bg-[#F2F3F4] h-[20em] mobile:w-[90%] w-[40%] my-2 py-4 flex flex-col items-center justify-around shadow-xl rounded">
        <iframe class=" h-[80%] "  src="https://lottie.host/embed/5483e893-7c55-429a-83ca-62ce2f10938c/rKr64IvgHo.lottie"></iframe>
        <router-link
              class="text-black bg-white shadow-2xl text-center w-[40%] py-4 rounded"
              to="/customers"
          >
            <p>Mes clients</p>
          </router-link>
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


</div>


      <!-- boxes -->

      <div class="bg-primary mobile:w-[80%] sm:w-[50%] py-6 my-2 rounded ">
        <p class="text-black text-center">Boxes</p>
      </div>
      <div class="bg-[#F2F3F4] h-[20em] mobile:w-[90%] w-[40%] my-8 py-4 flex flex-col items-center justify-center shadow-xl rounded">
        <iframe class="w-[90%] " src="https://lottie.host/embed/efadb972-4b4e-44d8-8d9a-dcd984f36783/2RD7YOY8MK.lottie"></iframe>
        <router-link
            class="text-black bg-white shadow-2xl text-center w-[40%] py-4 rounded"
            to="/boxes"
        >
          <p>Gestion des boxes</p>
        </router-link>
      </div>


      <!-- Gestion des chargements   -->
      <div
          class="bg-primary mobile:w-[80%] sm:w-[50%] py-6 my-2 rounded"
      >
        <p class="text-black text-center">Gestion des colis des contenaires</p>
      </div>


        <div class="bg-[#F2F3F4] h-[20em] mobile:w-[90%] w-[40%] my-8 py-4 flex flex-col items-center justify-center shadow-xl rounded">
          <iframe  src="https://lottie.host/embed/8c3830ce-44fd-4f17-9ee4-1ae9f676cb72/yAZ5TJ0cZe.lottie"></iframe>
          <router-link
              class="text-black bg-white shadow-2xl text-center w-[40%] py-4 rounded"
              to="/recording"
          >
            <p>Contenaire</p>
          </router-link>
        </div>

    </div>
   </div>
  </div>


</template>

<style scoped></style>
