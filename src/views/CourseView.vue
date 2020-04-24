<template>
  <v-app>
    <v-content>
      <ShowCourse />
    </v-content>
  </v-app>
</template>

<script>
// @ is an alias to /src
import ShowCourse from "@/components/ShowCourse.vue";

export default {
  name: "CourseView",
  components: {
    ShowCourse,
  },
};
</script>
