<template>
  <div>
    <v-form class="mt-10">
      <v-container fill-height fluid>
        <v-card class="mx-auto" max-width="700" tile>
          <v-row justify="center" align="center">
            <v-col cols="12" md="7"><h1>Edytuj temat</h1></v-col>

            <v-col cols="12" md="7">
              <v-text-field v-model="title" label="Tytuł"></v-text-field>
            </v-col>

            <v-col cols="12" md="7">
              <v-text-field v-model="description" label="Opis"></v-text-field>
            </v-col>

            <v-col cols="12" md="7">
              <v-file-input
                v-model="file"
                loading="true"
                label="Materiały"
              ></v-file-input>
            </v-col>

            <v-col cols="12" md="7">
              <v-btn color="success" class="mr-4" @click="editTopic">
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
  name: "EditTopic",
  data() {
    return {
      title: "",
      description: "",
      file: "",
    };
  },

  methods: {
    editTopic: function() {
      const userJson = localStorage.getItem("user");
      const user = JSON.parse(userJson);
      const token = user.token;
      this.userId = user.id;
      const data = new FormData();
      data.append("title", this.title);
      data.append("description", this.description);
      data.append("file", this.file);
      axios.put(`${server.baseURL}/topics/${this.userId}`, data, {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      });
    },
  },
};
</script>
