<script setup>
import {computed, ref} from "vue";
import { StreamBarcodeReader } from "vue-barcode-reader";
import {useRoute} from "vue-router";
import {useCollection, useFirestore} from "vuefire";
import {collection} from "firebase/firestore";
import router from "../router/index.js";
const db = useFirestore()
const datas = useCollection(collection(db, 'enlevements'))
const decodedText = ref("");
let Client = ref('')
const onLoaded = () => {
  console.log("loaded");
};
const chargement = []

const onDecode = (text) => {
  decodedText.value = text;
  const detailId = ref(text)
  const client = computed(()=>{
    return datas.value.find(detail => detail.id === detailId.value)
  })
  Client = client.value ;
  console.log(Client.expediteur);
  // router.push({ path: '/liste/' + Client.id })

};


</script>

<template>


  <div class="full-screen" >
    <StreamBarcodeReader  @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>

</div>
</template>

<style scoped>
.full-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black; /* Couleur de fond du plein écran, ajustez-la selon vos préférences */
}
</style>