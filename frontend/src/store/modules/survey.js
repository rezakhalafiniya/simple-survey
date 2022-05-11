import INITIAL_STATE from '../initialStates/surveyState'
import apiCaller from "@/utils/apiCaller"

export default {
    namespaced: true,
    state: INITIAL_STATE,

    getters: {
        survey: state => state.survey,
        surveys: state => state.surveys
    },
    mutations: {
        setSurvey:(state, { payload })=>{
            state.survey.id = payload.id
            state.survey.title = payload.title
            state.survey.description = payload.description
            state.survey.questions = payload.questions
            state.survey.results = payload.results
        },
        setSurveys:(state,{ payload }) => {
            state.surveys = payload
        }
    },
    actions: {
        getSurvey: ({ commit }, {id}) => {
            return new Promise((resolve, reject) => {
                apiCaller.get('survey',id).then(response => {
                    if (response.status === 200) {
                        commit('setSurvey', {payload: response.data})
                        resolve(true)
                    }else{
                        reject('response?.response?.data?.error')
                    }
                })
            })
        },
        getSurveys: ({ commit }) => {
            return new Promise((resolve, reject) => {
                apiCaller.get('survey').then(response => {
                    if (response.status === 200) {
                        commit('setSurveys', {payload: response.data})
                        resolve(true)
                    }else{
                        reject('response?.response?.data?.error')
                    }
                })
            })
        }
    }
}
