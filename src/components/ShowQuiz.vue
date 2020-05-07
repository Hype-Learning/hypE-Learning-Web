<template>
  <div class="wrapper">
    <br />
    <h1>{{ quiz.title }}</h1>

    <div v-for="(question, i) in questions" v-bind:key="question.id">
      <v-form class="mt-10">
        <v-container fill-height fluid>
          <v-card class="mx-auto" max-width="700" tile>
            <h1 justify="center" align="center">
              Pytanie nr {{ questions[i].id }}
            </h1>
            <v-row justify="center" align="center">
              <v-col cols="12" md="10">
                <v-text-field
                  v-model="question.title"
                  label="Pytanie"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field
                  cols="8"
                  md="8"
                  label="Odpowiedź nr 1"
                  v-model="questions[i].a"
                ></v-text-field>
                <v-text-field
                  cols="8"
                  md="8"
                  v-model="questions[i].b"
                  label="Odpowiedź nr 2"
                ></v-text-field>
                <v-text-field
                  cols="8"
                  md="8"
                  v-model="questions[i].c"
                  label="Odpowiedź nr 3"
                ></v-text-field>
                <v-text-field
                  cols="8"
                  md="8"
                  v-model="questions[i].d"
                  label="Odpowiedź nr 4"
                ></v-text-field>

                <h3>Zaznacz prawidłową odpowiedź</h3>
                <v-radio-group>
                  <v-radio
                    label="a"
                    @change="changeCorrectAnswer(question.id, 'a')"
                  ></v-radio>
                  <v-radio
                    label="b"
                    @change="changeCorrectAnswer(question.id, 'b')"
                  ></v-radio>
                  <v-radio
                    label="c"
                    @change="changeCorrectAnswer(question.id, 'c')"
                  ></v-radio>
                  <v-radio
                    label="d"
                    @change="changeCorrectAnswer(question.id, 'd')"
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-form>
    </div>

    <v-btn color="secondary" class="mr-4" @click="sendQuiz(quiz.id)">
      Wyślij quiz
    </v-btn>

    <template v-if="result >= 0">
      <h1>Twój wynik to:</h1>
      <h1>{{ result }}</h1>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "@/utils/helper";

export default {
  name: "ShowQuiz",
  data() {
    return {
      quiz: {},
      questions: [],
      answers: [],
      result: "",
    };
  },

  methods: {
    sendQuiz: function() {
      const userJson = localStorage.getItem("user");
      const user = JSON.parse(userJson);
      const token = user.token;
      axios
        .post(
          `${server.baseURL}/quizzes/solve/${this.$route.params.quizId}`,
          {
            answers: this.answers,
          },
          {
            headers: {
              Authorization: ` Bearer ${token}`,
            },
          }
        )
        .then((res) => (this.result = res.data));
    },

    changeCorrectAnswer: function(id, answer) {
      this.answers[id - 1] = answer;
    },
  },

  mounted() {
    const userJson = localStorage.getItem("user");
    const user = JSON.parse(userJson);
    const token = user.token;
    axios
      .get(`${server.baseURL}/quizzes/${this.$route.params.quizId}`, {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      })
      .then(
        (quiz) => (
          (this.quiz = quiz.data), (this.questions = quiz.data.questions)
        )
      );
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex;
  align-items: center;
  flex-direction: column;
}
ul {
  list-style: none;
  width: 80%;
  height: 100%;
}

a {
  color: white;
  text-decoration: none;
  text-transform: uppercase;
}
</style>
