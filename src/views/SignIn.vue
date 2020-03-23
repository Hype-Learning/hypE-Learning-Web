<template>
  <div class="login">
    <SignInForm />
  </div>
</template>

<script>
// @ is an alias to /src
import SignInForm from "@/components/SignInForm.vue";

export default {
  name: "SignIn",
  components: {
    SignInForm
  }
};
</script>
