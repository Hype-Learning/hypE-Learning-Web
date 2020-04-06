<template>
  <div class="login">
    <SignUpForm />
  </div>
</template>

<script>
// @ is an alias to /src
import SignUpForm from "@/components/SignUpForm.vue";

export default {
  name: "SignUp",
  components: {
    SignUpForm,
  },
};
</script>
