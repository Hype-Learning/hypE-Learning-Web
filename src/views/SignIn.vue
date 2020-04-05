<template>
  <v-app>
    <v-content>
      <SignInForm />
    </v-content>
  </v-app>
</template>

<script>
// @ is an alias to /src
import SignInForm from "@/components/SignInForm.vue";

export default {
  name: "SignIn",
  components: {
    SignInForm,
  },
};
</script>
