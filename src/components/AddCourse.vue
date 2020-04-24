<template>
  <div>
    <v-form class="mt-10">
      <v-container fill-height fluid>
        <v-card class="mx-auto" max-width="700" tile>
          <v-row justify="center" align="center">
            <v-col cols="12" md="7"><h1>Dodaj nowy kurs</h1></v-col>

            <v-col cols="12" md="7">
              <v-text-field
                v-model="form.title"
                label="Tytuł"
                :rules="rules.notEmpty"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="7">
              <v-text-field
                v-model="form.description"
                label="Opis"
                :rules="rules.notEmpty"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="7">
              <v-text-field
                v-model="form.announcement"
                label="Ogłoszenia"
                :rules="rules.notEmpty"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="7">
              <v-btn color="success" class="mr-4" @click="addCourse">
                Dodaj kurs
              </v-btn></v-col
            >
          </v-row>
        </v-card>
      </v-container>
      <v-snackbar :color="snackbar.color" v-model="snackbar.show" :top="true">
        {{ snackbar.message }}
      </v-snackbar>
    </v-form>
  </div>
</template>
<script>
import { addCourse } from "@/helpers/course";
export default {
  data: () => ({
    form: {
      title: "",
      description: "",
      announcement: "",
    },
    rules: {
      notEmpty: [(v) => !!v || "To pole jest wymagane"],
    },
    snackbar: {
      show: false,
      message: null,
      color: null,
    },
  }),
  methods: {
    addCourse() {
      this.$store.dispatch("addCourse");

      addCourse(this.form)
        .then((res) => {
          this.$store.commit("addCourseSuccess", res);
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          this.$store.commit("addCourseFailed", { error });
          this.$router.push({ name: "AddCourse" });
        });
    },
  },
};
</script>
<style scoped></style>
