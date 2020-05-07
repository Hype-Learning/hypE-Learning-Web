<template>
  <div>
    <v-form class="mt-10">
      <v-container fill-height fluid>
        <v-card class="mx-auto" max-width="700" tile>
          <v-row justify="center" align="center">
            <v-col cols="12" md="7">
              <h1>Edytuj tytuł quizu</h1>
            </v-col>

            <br />
            <v-col cols="12" md="8">
              <v-text-field v-model="title" label="Tytuł"></v-text-field>
            </v-col>

            <v-col>
              <v-btn color="success" class="mr-4" @click="editQuiz"
                >Edytuj</v-btn
              >
            </v-col>
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
  name: "EditQuiz",

  data: () => ({
    title: "",
  }),
  methods: {
    editQuiz: function() {
      const userJson = localStorage.getItem("user");
      const user = JSON.parse(userJson);
      const token = user.token;
      axios.put(
        `${server.baseURL}/quizzes/${this.$route.params.quizId}`,
        {
          title: this.title,
        },
        {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        }
      );
    },
  },
};
</script>
<style scoped></style>
