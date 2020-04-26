<template>
  <v-app>
    <v-content>
      <ShowProfile />
    </v-content>
  </v-app>
</template>

<script>
// @ is an alias to /src
import ShowProfile from "@/components/ShowProfile.vue";

export default {
  name: "UserProfile",
  components: {
    ShowProfile,
  },
};
</script>
