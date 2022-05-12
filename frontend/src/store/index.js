import Vue from "vue";
import Vuex from "vuex";
import survey from './modules/survey';
import question from './modules/question';
import answer from './modules/answer';
import auth from './modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    survey,
    auth,
    question,
    answer
  },
});
