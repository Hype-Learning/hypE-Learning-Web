<template>
  <div>
    <h1>Sign in</h1>
    <form action="">
      <label for="email">E-mail </label>
      <div>
        <input
          type="text"
          name="email"
          v-model="email"
          required
          autofocus
          placeholder="E-mail"
        />
      </div>
      <label for="password">Password</label>
      <div>
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="Password"
        />
      </div>

      <button type="submit" v-on:click="handleSubmit">Sign in</button>
    </form>
  </div>
</template>

<script>
import { server } from "@/utils/helper";
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (this.password.length > 0) {
        axios
          .post(`${server.baseURL}/auth/signin`, {
            email: this.email,
            password: this.password
          })
          .then(response => {
            if (!response.data.accessToken) {
              console.log("Not signed in");
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
