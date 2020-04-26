const state = {
  loading: false,
};

const getters = {};

const mutations = {
  addCourse(state) {
    state.loading = true;
  },

  addCourseSuccess(state) {
    state.loading = false;
  },

  addCourseFailed(state) {
    state.loading = false;
  },

  editCourse(state) {
    state.loading = true;
  },

  editCourseSuccess(state) {
    state.loading = false;
  },

  editCourseFailed(state) {
    state.loading = false;
  },
};
const actions = {
  addCourse({ commit }) {
    commit("addCourse");
  },
  editCourse({ commit }) {
    commit("editCourse");
  },
};

export default { state, getters, mutations, actions };
//koflikt nazw? (loading)
