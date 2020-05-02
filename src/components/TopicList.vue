<template>
  <div class="wrapper">
    <h1>Lista tematów</h1>
    <v-expansion-panels :inset="true" :focusable="true" :hover="true">
      <v-expansion-panel v-for="topic in topics" v-bind:key="topic.id">
        <v-expansion-panel-header> {{ topic.title }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ topic.description }}
          <br />
          <v-btn color="primary" class="mr-4">
            <a :href="topic.fileUrl"> Materiały</a>
          </v-btn>

          <router-link :to="`topics/${topic.id}/edit`">
            <v-btn color="warning" class="mr-4">
              Edytuj temat
            </v-btn>
          </router-link>
          <br />
          <v-btn
            color="success"
            class="mr-4"
            @click="deleteParticipant(user.id)"
          >
            Quiz
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
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
    };
  },

  methods: {},
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
