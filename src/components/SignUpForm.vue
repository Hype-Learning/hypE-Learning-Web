<template>
  <v-form v-model="valid" class="mt-10">
    <v-container fill-height fluid>
      <v-card class="mx-auto" max-width="700" tile>
        <v-row justify="center" align="center">
          <v-col cols="12" md="7"><h1>Rejestracja</h1></v-col>

          <v-col cols="12" md="7">
            <v-text-field
              v-model="form.firstName"
              label="Imię"
              :rules="rules.nameRules"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="7">
            <v-text-field
              v-model="form.lastName"
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
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              :rules="rules.passwordRules"
              @click:append="showPassword = !showPassword"
              label="Hasło"
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
    <v-snackbar :color="snackbar.color" v-model="snackbar.show" :top="true">
      {{ snackbar.message }}
    </v-snackbar>
  </v-form>
</template>

<script>
import { server } from "@/utils/helper";
import axios from "axios";
export default {
  name: "signUp",
  data: () => ({
    form: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    showPassword: false,
    valid: false,
    error: null,
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
    snackbar: {
      show: false,
      message: null,
      color: null,
    },
  }),
  methods: {
    signUp(e) {
      e.preventDefault();
      axios
        .post(`${server.baseURL}/auth/signup`, this.$data.form)
        .then((response) => {
          if (!response) {
            this.$router.push({ name: "SignUp" });
            this.$data.snackbar = {
              message: "Rejestracja nie powiodła się",
              color: "error",
              show: true,
            };
          } else {
            this.$router.push({ name: "Home" });
          }
        })
        .catch(function(error) {
          console.error(error.response);
        });
    },
  },
};
</script>
<style></style>
