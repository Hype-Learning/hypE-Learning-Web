<template>
  <v-form v-model="form.valid" class="mt-10">
    <v-container fill-height fluid>
      <v-card class="mx-auto" max-width="700" tile>
        <v-row justify="center" align="center">
          <v-col cols="12" md="7"><h1>Logowanie</h1></v-col>
          <v-col cols="12" md="7">
            <v-text-field
              v-model="form.email"
              :rules="rules.emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="7">
            <v-text-field
              v-model="form.password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :rules="rules.passwordRules"
              @click:append="show = !show"
              label="Hasło"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="7">
            <v-btn color="success" class="mr-4" @click="authenticate">
              Zaloguj
            </v-btn></v-col
          >
          <v-col cols="12" md="7">
            <p class="error">{{ authError }}</p>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import { signIn } from "../helpers/auth";
export default {
  name: "signIn",
  data: () => ({
    form: {
      email: "",
      password: "",
      error: null,
      valid: false,
    },
    show: false,
    rules: {
      emailRules: [
        (v) => !!v || "E-mail jest wymagany",
        (v) => /.+@.+/.test(v) || "E-mail musi być prawidłowy",
      ],
      passwordRules: [
        (value) => !!value || "Hasło jest wymagane",
        (value) => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
          return (
            pattern.test(value) ||
            "Hasło musi mieć minimum 8 znaków i co najmniej jedną wielką literę"
          );
        },
      ],
    },
  }),

  methods: {
    authenticate() {
      this.$store.dispatch("signIn");

      signIn(this.form)
        .then((res) => {
          this.$store.commit("signInSuccess", res);
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          this.$store.commit("signInFailed", { error });
          this.$router.push({ name: "SignIn" });
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
  color: white;
}
</style>
