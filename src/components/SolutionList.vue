<template>
  <div class="wrapper">
    <h1>Rozwiązania</h1>
    <v-expansion-panels :inset="true" :focusable="true" :hover="true">
      <v-expansion-panel v-for="solution in solutions" v-bind:key="solution.id">
        <v-expansion-panel-header>
          {{ solution.solvers[0].firstName }} {{ solution.solvers[0].lastName }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-btn color="primary" class="mr-4">
            <br />
            <a :href="solution.fileUrl"> Rozwiązanie</a>
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
  name: "SolutionList",
  data() {
    return {
      solutions: [],
    };
  },

  methods: {},
  mounted() {
    const userJson = localStorage.getItem("user");
    const user = JSON.parse(userJson);
    const token = user.token;
    axios
      .get(`${server.baseURL}/topics/${this.$route.params.topicId}`, {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      })
      .then((solutions) => (this.solutions = solutions.data));
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
