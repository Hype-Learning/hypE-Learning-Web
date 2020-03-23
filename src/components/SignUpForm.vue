<template>
  <div>
    <h1>Rejestracja</h1>
    <form action="">
      <label for="firstname">Imię</label>
      <div>
        <input
          type="text"
          name="firstname"
          v-model="firstname"
          required
          autofocus
          placeholder="Imię"
        />
      </div>

      <label for="firstname">Nazwisko</label>
      <div>
        <input
          type="text"
          name="lastname"
          v-model="lastname"
          required
          placeholder="Nazwisko"
        />
      </div>

      <label for="email">E-mail </label>
      <div>
        <input
          type="text"
          name="email"
          v-model="email"
          required
          placeholder="E-mail"
        />
      </div>
      <label for="password">Hasło</label>
      <div>
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="Hasło"
        />
      </div>

      <button type="submit" v-on:click="handleSubmit">Zarejestruj</button>
    </form>
  </div>
</template>

<script>
import { server } from "@/utils/helper";
import axios from "axios";
export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (this.password.length > 0) {
        axios
          .post(`${server.baseURL}/auth/signup`, {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password
          })
          .then(response => {
            if (!response.data.accessToken) {
              console.log("Not signed up");
            }
            this.$router.push({ name: "Home" });
          })
          .catch(function(error) {
            console.error(error.response);
          });
      }
    }
  }
};
</script>
<style></style>
