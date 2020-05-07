<template>
  <div class="wrapper">
    <br />
    <h1>Lista tematów</h1>
    <br />
    <v-expansion-panels :inset="true" :focusable="true" :hover="true">
      <v-expansion-panel v-for="topic in topics" v-bind:key="topic.id">
        <v-expansion-panel-header>
          <h2>{{ topic.title }}</h2></v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <br />
          <h3>Opis</h3>
          <p>{{ topic.description }}</p>
          <br />
          <v-btn color="primary" class="mr-4">
            <a :href="topic.fileUrl"> Materiały</a>
          </v-btn>

          <br />
          <br />
          <br />

          <template
            v-if="
              currentUser.role === 'admin' || currentUser.role === 'instructor'
            "
          >
            <br />
            <h3>Zarządzaj tematem</h3>
            <router-link :to="`topics/${topic.id}/edit`">
              <v-btn color="warning" class="mr-4">
                Edytuj temat
              </v-btn>
            </router-link>
            <v-btn color="error" class="mr-4" @click="deleteTopic(topic.id)">
              Usuń temat
            </v-btn>
            <br />
            <br />
          </template>

          <div>
            <template v-if="currentUser.role === 'student'">
              <v-file-input
                v-model="file"
                loading="true"
                label="Dodaj rozwiązanie"
                color="teal"
              >
              </v-file-input>

              <v-btn
                color="secondary"
                class="mr-4"
                @click="addSolution(topic.id)"
              >
                Wyślij rozwiązanie
              </v-btn>
            </template>
            <template
              v-if="
                currentUser.role === 'admin' ||
                  currentUser.role === 'instructor'
              "
            >
              <router-link :to="`topics/${topic.id}/solutions`">
                <v-btn color="success" class="mr-4">
                  Rozwiązania zadań studentów
                </v-btn>
              </router-link>
            </template>
          </div>

          <br />
          <v-spacer></v-spacer>
          <h3>Quiz</h3>

          <router-link :to="`topics/${topic.id}/quiz/${topic.quiz.id}/solve`">
            <v-btn color="success" class="mr-4">
              Rozpocznij quiz
            </v-btn>
          </router-link>

          <template
            v-if="
              currentUser.role === 'admin' || currentUser.role === 'instructor'
            "
          >
            <router-link :to="`topics/${topic.id}/quiz`">
              <v-btn color="success" class="mr-4">
                Utwórz quiz
              </v-btn>
            </router-link>

            <router-link
              :to="`topics/${topic.id}/quiz/${topic.quiz.id}/questions`"
            >
              <v-btn color="secondary" class="mr-4">
                Dodaj pytanie
              </v-btn>
            </router-link>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <br />

    <template
      v-if="currentUser.role === 'admin' || currentUser.role === 'instructor'"
    >
      <router-link :to="{ name: 'AddTopic' }">
        <v-btn color="success" class="mr-4">
          Dodaj temat
        </v-btn>
      </router-link>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "@/utils/helper";

export default {
  name: "TopicList",
  data() {
    return {
      topics: [],
      file: "",
    };
  },

  methods: {
    deleteTopic(id) {
      const userJson = localStorage.getItem("user");
      const user = JSON.parse(userJson);
      const token = user.token;
      axios
        .delete(`${server.baseURL}/topics/${id}`, {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        })
        .then(this.$router.push({ name: "Home" }));
    },

    addSolution(id) {
      const userJson = localStorage.getItem("user");
      const user = JSON.parse(userJson);
      const token = user.token;
      const data = new FormData();
      console.log(id);
      data.append("file", this.file);
      axios
        .post(`${server.baseURL}/topics/${id}/solutions`, data, {
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
      .get(`${server.baseURL}/courses/${this.$route.params.id}/topics`, {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      })
      .then((topics) => (this.topics = topics.data));
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
