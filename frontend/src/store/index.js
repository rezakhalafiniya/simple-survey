import Vue from "vue";
import Vuex from "vuex";
import survey from './modules/survey';
import question from './modules/question';
import answer from './modules/answer';
import auth from './modules/auth';
import result from './modules/result';
import participant from './modules/participant';
import rule from './modules/rule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    survey,
    auth,
    question,
    answer,
    result,
    participant,
    rule
  },
});
