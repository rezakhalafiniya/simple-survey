import INITIAL_STATE from '../initialStates/surveyState'
import apiCaller from "@/utils/apiCaller"

export default {
    namespaced: true,
    state: INITIAL_STATE,

    getters: {
        survey: state => state.survey,
        surveys: state => state.surveys,
        surveyResultTexts: state => state.survey.results
    },
    mutations: {
        setSurvey: (state, {payload}) => {
            state.survey.id = payload.id
            state.survey.title = payload.title
            state.survey.description = payload.description
            state.survey.slug = payload.slug
            state.survey.questions = payload.questions
            state.survey.rules = payload.rules
            state.survey.results = payload.results
        },
        setSurveys: (state, {payload}) => {
            state.surveys = payload
        },
        setSurveyResults: (state, {payload}) => {
            state.survey.results = payload.result_texts
        }
    },
    actions: {
        getSurvey: ({commit}, {id}) => {
            return new Promise((resolve, reject) => {
                apiCaller.get('survey', id).then(response => {
                    if (response.status === 200) {
                        commit('setSurvey', {payload: response.data})
                        resolve(true)
                    } else {
                        reject(response?.response?.data)
                    }
                })
            })
        },
        getSurveys: ({commit}) => {
            return new Promise((resolve, reject) => {
                apiCaller.get('survey').then(response => {
                    if (response.status === 200) {
                        commit('setSurveys', {payload: response.data})
                        resolve(true)
                    } else {
                        reject(response?.response?.data)
                    }
                })
            })
        },
        createSurvey: ({commit}, {payload}) => {
            return new Promise((resolve, reject) => {
                let formData = new FormData()
                formData.append('title', payload.title)
                formData.append('description', payload.description)
                formData.append('slug', payload.slug)
                apiCaller.fetch('survey', formData).then(response => {
                    if (response.status === 201) {
                        commit('setSurvey', {payload: response.data})
                        resolve(response.data)
                    } else {
                        reject(response?.response?.data)
                    }
                })
            })
        },
        updateSurvey: ({commit}, {payload, id}) => {
            return new Promise((resolve, reject) => {
                let formData = new FormData()
                formData.append('title', payload.title)
                formData.append('description', payload.description)
                formData.append('slug', payload.slug)
                formData.append('_method', 'PUT')
                apiCaller.fetch('survey', formData, id).then(response => {
                    if (response.status === 200) {
                        commit('setSurvey', {payload: response.data})
                        resolve(response.data)
                    } else {
                        reject(response?.response?.data)
                    }
                })
            })
        },
        getResultTexts: ({commit},{surveyId,participantId}) =>{
            return new Promise((resolve, reject) => {
                apiCaller.get(`survey/${surveyId}/results/${participantId}`).then(response => {
                    if (response.status === 200) {
                        commit('setSurveyResults', {payload: response.data})
                        resolve(response.data)
                    } else {
                        reject(response?.response?.data)
                    }
                })
            })
        },
        deleteQuestion: ({commit},{id})=>{
            return new Promise((resolve, reject) => {
                apiCaller.delete('survey', id).then(response => {
                    if (response.status === 204) {
                        commit('setSurvey', {payload: INITIAL_STATE.survey})
                        resolve(true)
                    } else {
                        reject(response?.response?.data)
                    }
                })
            })
        }
    }
}
