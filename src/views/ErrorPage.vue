<template>
  <v-app>
    <v-content>
      <ErrorPageComponent />
    </v-content>
  </v-app>
</template>

<script>
// @ is an alias to /src
import ErrorPageComponent from "@/components/ErrorPageComponent.vue";

export default {
  name: "ErrorPage",
  components: {
    ErrorPageComponent,
  },
};
</script>
