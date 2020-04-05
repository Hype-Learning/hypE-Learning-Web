<template>
  <v-app>
    <div v-if="$route.name !== 'SignIn'">
      <NavBar />
    </div>

    <router-view />
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: "App",

  components: {
    NavBar,
  },
};
</script>
