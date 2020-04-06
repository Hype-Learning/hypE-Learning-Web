<template>
  <v-form v-model="form.valid" class="mt-10">
    <v-container fill-height fluid>
      <v-card class="mx-auto" max-width="700" tile>
        <v-row justify="center" align="center">
          <v-col cols="12" md="7"><h1>Rejestracja</h1></v-col>

          <v-col cols="12" md="7">
            <v-text-field
              v-model="form.firstname"
              label="Imię"
              :rules="rules.nameRules"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="7">
            <v-text-field
              v-model="form.lastname"
              label="Nazwisko"
              :rules="rules.nameRules"
            ></v-text-field>
          </v-col>

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
              :append-icon="form.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="form.showPassword ? 'text' : 'password'"
              :rules="rules.passwordRules"
              @click:append="form.showPassword = !form.showPassword"
              label="Hasło"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="7">
            <v-text-field
              v-model="form.passwordConfirmation"
              :append-icon="form.showConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
              :type="form.showConfirmation ? 'text' : 'password'"
              :rules="rules.passwordRules.concat(passwordConfirmationRules)"
              @click:append="form.showConfirmation = !form.showConfirmation"
              label="Powtórz hasło"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="7">
            <v-btn color="success" class="mr-4" @click="signUp">
              Zarejestruj
            </v-btn></v-col
          >
        </v-row>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import { server } from "@/utils/helper";
import axios from "axios";
export default {
  name: "signUp",
  data: () => ({
    form: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      valid: false,
      showPassword: false,
      showConfirmation: false,
      error: null,
    },
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
      nameRules: [(v) => !!v || "To pole jest wymagane"],
    },
  }),
  methods: {
    signUp(e) {
      e.preventDefault();
      axios
        .post(`${server.baseURL}/auth/signup`, this.$data.form)
        .then((response) => {
          if (!response.data.accessToken) {
            this.$router.push({ name: "SignUp" });
          } else {
            this.$router.push({ name: "Home" });
          }
        })
        .catch(function(error) {
          console.error(error.response);
        });
    },
  },

  computed: {
    passwordConfirmationRules() {
      return [
        () =>
          this.form.password === this.form.passwordConfirmation ||
          "Hasła muszą do siebie pasować",
        (v) => !!v || "Potwierdzenie hasła jest wymagane",
      ];
    },
  },
};
</script>
<style></style>
