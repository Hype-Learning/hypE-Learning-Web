<template>
  <div>
    <v-form class="mt-10">
      <v-container fill-height fluid>
        <v-card class="mx-auto" max-width="700" tile>
          <v-row justify="center" align="center">
            <v-col cols="12" md="7"><h1>Dodaj temat</h1></v-col>

            <v-col cols="12" md="7">
              <v-text-field v-model="form.title" label="Tytuł"></v-text-field>
            </v-col>

            <v-col cols="12" md="7">
              <v-text-field
                v-model="form.description"
                label="Opis"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="7">
              <v-file-input
                v-model="form.file"
                loading="true"
                label="Materiały"
              ></v-file-input>
            </v-col>

            <v-col cols="12" md="7">
              <v-btn color="success" class="mr-4" @click="addTopic">
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
  name: "AddTopic",
  data() {
    return {
      form: {
        title: "",
        description: "",
        file: "",
      },
    };
  },

  methods: {
    addTopic() {
      const userJson = localStorage.getItem("user");
      const user = JSON.parse(userJson);
      const token = user.token;
      const data = new FormData();
      data.append("title", this.form.title);
      data.append("description", this.form.description);
      data.append("file", this.form.file);
      data.append("courseId", this.$route.params.id);
      axios.post(`${server.baseURL}/topics`, data, {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      });
    },
  },
};
</script>
