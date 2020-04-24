<template>
  <v-app>
    <v-content>
      <AddCourse />
    </v-content>
  </v-app>
</template>

<script>
// @ is an alias to /src
import AddCourse from "@/components/AddCourse.vue";

export default {
  name: "AddCoursePage",
  components: {
    AddCourse,
  },
};
</script>
