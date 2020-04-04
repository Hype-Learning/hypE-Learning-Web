<template>
  <div class="signin">
    <div>
      <p>Logowanie</p>

      <form @submit.prevent="authenticate">
        <label for="email">E-mail</label>
        <input type="email" v-model="form.email" placeholder="E-mail" />
        <label for="email">Hasło</label>
        <input type="password" v-model="form.password" placeholder="Hasło" />

        <input type="submit" value="Zaloguj" />

        <div v-if="authError">
          <p class="error">
            {{ authError }}
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { signIn } from "../helpers/auth";
export default {
  name: "signIn",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    authenticate() {
      this.$store.dispatch("signIn");

      signIn(this.$data.form)
        .then((res) => {
          this.$store.commit("signInSuccess", res);
          this.$router.push({ name: "About" });
        })
        .catch((error) => {
          this.$store.commit("signInFailed", { error });
        });
    },
  },

  computed: {
    authError() {
      return this.$store.getters.authError;
    },
  },
};
</script>

<style scoped>
.error {
  text-align: center;
  color: red;
}
</style>
