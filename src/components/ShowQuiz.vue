<template>
  <div class="wrapper">
    <br />
    <h1>{{ quiz.title }}</h1>

    <template
      v-if="currentUser.role === 'admin' || currentUser.role === 'instructor'"
    >
      <v-btn color="error" class="mr-4" @click="deleteQuiz(quiz.id)">
        Usuń quiz
      </v-btn>

      <router-link :to="{ name: 'EditQuiz' }">
        <v-btn color="warning" class="mr-4">
          Edytuj quiz
        </v-btn>
      </router-link>
    </template>

    <div v-for="(question, i) in questions" v-bind:key="i">
      <v-form class="mt-10">
        <v-container fill-height fluid>
          <v-card class="mx-auto" max-width="700" tile>
            <h1 justify="center" align="center">Pytanie nr {{ i + 1 }}</h1>
            <v-row justify="center" align="center">
              <v-col cols="12" md="10">
                <v-text-field
                  v-model="question.title"
                  label="Pytanie"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="8">
                <v-radio-group>
                  <v-layout row align-baseline>
                    <v-radio @change="changeCorrectAnswer(i, 'a')" />
                    <v-text-field
                      cols="8"
                      md="8"
                      label="Odpowiedź nr 1"
                      v-model="questions[i].a"
                      readonly
                    ></v-text-field>
                  </v-layout>

                  <v-layout row align-baseline>
                    <v-radio @change="changeCorrectAnswer(i, 'b')" />
                    <v-text-field
                      cols="8"
                      md="8"
                      v-model="questions[i].b"
                      label="Odpowiedź nr 2"
                      readonly
                    ></v-text-field>
                  </v-layout>

                  <v-layout row align-baseline>
                    <v-radio @change="changeCorrectAnswer(i, 'c')" />
                    <v-text-field
                      cols="8"
                      md="8"
                      v-model="questions[i].c"
                      label="Odpowiedź nr 3"
                      readonly
                    ></v-text-field>
                  </v-layout>

                  <v-layout row align-baseline>
                    <v-radio @change="changeCorrectAnswer(i, 'd')" />
                    <v-text-field
                      cols="8"
                      md="8"
                      v-model="questions[i].d"
                      label="Odpowiedź nr 4"
                      readonly
                    ></v-text-field>
                  </v-layout>
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
      this.answers[id] = answer;
    },

    deleteQuiz(id) {
      const userJson = localStorage.getItem("user");
      const user = JSON.parse(userJson);
      const token = user.token;
      axios
        .delete(`${server.baseURL}/quizzes/${id}`, {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        })
        .then(this.$router.push({ name: "Home" }));
    },
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
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
