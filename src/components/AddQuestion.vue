<template>
  <div>
    <div v-for="(question, i) in questions" v-bind:key="question.id">
      <v-form class="mt-10">
        <v-container fill-height fluid>
          <v-card class="mx-auto" max-width="700" tile>
            <h1 justify="center" align="center">Dodaj nowe pytanie</h1>
            <v-row justify="center" align="center">
              <v-col cols="12" md="10">
                {{ questions[i].id }}
                <v-text-field
                  v-model="question.text"
                  label="Pytanie"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field
                  cols="8"
                  md="8"
                  label="Odpowiedź nr 1"
                  v-model="questions[i].answers.a"
                ></v-text-field>
                <v-text-field
                  cols="8"
                  md="8"
                  v-model="questions[i].answers.b"
                  label="Odpowiedź nr 2"
                ></v-text-field>
                <v-text-field
                  cols="8"
                  md="8"
                  v-model="questions[i].answers.c"
                  label="Odpowiedź nr 3"
                ></v-text-field>
                <v-text-field
                  cols="8"
                  md="8"
                  v-model="questions[i].answers.d"
                  label="Odpowiedź nr 4"
                ></v-text-field>

                <h3>Zaznacz prawidłową odpowiedź</h3>
                <v-radio-group>
                  <v-radio
                    label="a"
                    @change="changeCorrectAnswer('a')"
                  ></v-radio>
                  <v-radio
                    label="b"
                    @change="changeCorrectAnswer('b')"
                  ></v-radio>
                  <v-radio
                    label="c"
                    @change="changeCorrectAnswer('c')"
                  ></v-radio>
                  <v-radio
                    label="d"
                    @change="changeCorrectAnswer('d')"
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-card>

          <v-col cols="12" md="7">
            <v-btn color="success" class="mr-4" @click="addQuestion"
              >Dodaj pytanie</v-btn
            >
          </v-col>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "@/utils/helper";
export default {
  name: "AddQuestion",

  data: () => ({
    id: 0,
    title: "",
    question: {
      id: "",
      text: "",
      answers: { a: "", b: "", c: "", d: "" },

      correctAnswer: "",
    },
    questions: [],
  }),
  methods: {
    addQuiz: function() {
      const userJson = localStorage.getItem("user");
      const user = JSON.parse(userJson);
      const token = user.token;
      axios.post(
        `${server.baseURL}/quizzes/${this.$route.params.topicId}`,
        {
          title: this.title,
          questions: this.questions,
        },
        {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        }
      );
    },

    addQuestion: function() {
      this.questions.push(this.question);
    },
  },
};
</script>
<style scoped></style>
