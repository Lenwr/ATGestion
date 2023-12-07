<script>
import LoginFormView from './views/loginFormView.vue'
import SignUpFormView from './views/signUpFormView.vue'
import { auth } from './components/firebaseConfig.js'
import { signOut } from 'firebase/auth'
import NavBar from './components/navBar.vue'
export default {
  components: { SignUpFormView, LoginFormView, NavBar },
  data() {
    return {
      isLoggedIn: true,
      showLogin: true,
      displayName: '',
    }
  },
  beforeUpdate() {
    if (auth.currentUser) {
      this.displayName = auth.currentUser.displayName
    }
  },
  methods: {
    logOut() {
      signOut(auth).then(() => {
        this.isLoggedIn = false
      })
    },
  },
}
</script>

<template>
  <div>
    <navBarVue />
  </div>

  <div class="bg-white">
    <NavBar />

    <div class="drawer">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <!-- Page content here -->

        <div class="h-screen w-screen">
          <div v-if="!isLoggedIn">
            <template v-if="showLogin">
              <LoginFormView @loggedIn="isLoggedIn = true" />
              <p class="text-black text-center">
                Pas encore de compte
                <span
                  @click="showLogin = false"
                  class="cursor-pointer bg-primary rounded text-accent"
                >
                  Inscription
                </span>
              </p>
            </template>
            <template v-else>
              <SignUpFormView @loggedIn="isLoggedIn = true" />
              <p class="text-black text-center">
                Déja enregistré ?
                <span
                  @click="showLogin = true"
                  class="cursor-pointer bg-primary rounded text-accent"
                >
                  Connexion
                </span>
              </p>
            </template>
          </div>

          <div v-else class="bg-white">
            <!--
         <p class="text-black px-4 ">Bienvenue {{displayName}} <span> <button class="btn btn-primary mx-4"  @click="logOut" >Deconnecter</button></span></p>
    -->
            <RouterView />
          </div>
        </div>

        <div v-if="isLoggedIn" class="btm-nav bg-base-100">
          <router-link to="/">
            <button class="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </button>
          </router-link>
          <router-link to="/scan">
            <button class="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                />
              </svg>
            </button>
          </router-link>
          <label for="my-drawer" class="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </label>
        </div>
      </div>
      <div class="drawer-side">
        <label
          for="my-drawer"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <ul class="menu p-4 w-80 min-h-full bg-primary text-base-content">
          <!-- Sidebar content here -->
          <li v-if="isLoggedIn" class="text-white text-2xl">
            {{ displayName }}
          </li>
          <li v-if="isLoggedIn" class="text-white">
            <router-link to="/planing">Planing</router-link>
          </li>
          <li v-if="isLoggedIn" class="text-white">
            <router-link to="/dailyTasks">todoListe</router-link>
          </li>
          <li v-if="isLoggedIn" class="text-white" @click="logOut">
            <a>Se deconnecter</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
