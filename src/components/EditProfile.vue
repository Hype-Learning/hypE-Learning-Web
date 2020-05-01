<template>
  <div>
    <v-form class="mt-10">
      <v-container fill-height fluid>
        <v-card class="mx-auto" max-width="700" tile>
          <v-row justify="center" align="center">
            <v-col cols="12" md="7"><h1>Edytuj profil</h1></v-col>

            <v-col cols="12" md="7">
              <v-text-field v-model="email" label="E-mail"></v-text-field>
            </v-col>

            <v-col cols="12" md="7">
              <v-text-field v-model="password" label="Hasło"></v-text-field>
            </v-col>

            <v-col cols="12" md="7">
              <v-file-input
                v-model="file"
                loading="true"
                accept="image/*"
                label="Zdjęcie profilowe"
              ></v-file-input>
            </v-col>

            <v-col cols="12" md="7">
              <v-btn color="success" class="mr-4" @click="editProfile">
                Zapisz
              </v-btn></v-col
            >
          </v-row>
        </v-card>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "@/utils/helper";

export default {
  name: "EditProfile",
  data() {
    return {
      userId: "",
      email: "",
      file: "",
      password: "",
    };
  },

  methods: {
    editProfile: function() {
      const userJson = localStorage.getItem("user");
      const user = JSON.parse(userJson);
      const token = user.token;
      this.userId = user.id;
      console.log(this.file);
      const data = new FormData();
      data.append("email", this.email);
      data.append("password", this.password);
      data.append("file", this.file);
      axios
        .put(`${server.baseURL}/users/${this.userId}`, data, {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        })
        .then(this.$store.commit("logout"))
        .then(this.$router.push({ name: "Home" }));
    },
  },
};
</script>
