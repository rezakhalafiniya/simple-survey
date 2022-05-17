import INITIAL_STATE from '../initialStates/questionState'
import apiCaller from "@/utils/apiCaller"

export default {
    namespaced: true,
    state: INITIAL_STATE,

    getters: {
        question: state => state.question,
        questions: state => state.questions
    },
    mutations: {
        setQuestion: (state, {payload}) => {
            state.question.id = payload.id
            state.question.question_text = payload.question_text
            state.question.answers = payload.answers
            state.question.survey_id = payload.survey_id
        },
        setQuestions: (state, {payload}) => {
            state.questions = payload
        }
    },
    actions: {
        getQuestion: ({commit}, {id}) => {
            return new Promise((resolve, reject) => {
                apiCaller.get('question', id).then(response => {
                    if (response.status === 200) {
                        commit('setQuestion', {payload: response.data})
                        resolve(true)
                    } else {
                        reject('response?.response?.data?.error')
                    }
                })
            })
        },
        getQuestions: ({commit}) => {
            return new Promise((resolve, reject) => {
                apiCaller.get('question').then(response => {
                    if (response.status === 200) {
                        commit('setQuestions', {payload: response.data})
                        resolve(true)
                    } else {
                        reject('response?.response?.data?.error')
                    }
                })
            })
        },
        createQuestion: ({commit}, {payload}) => {
            return new Promise((resolve, reject) => {
                let formData = new FormData()
                formData.append('question_text', payload.question_text)
                formData.append('survey_id', payload.survey_id)
                apiCaller.fetch('question', formData).then(response => {
                    if (response.status === 201) {
                        commit('setQuestion', {payload: response.data})
                        resolve(response.data)
                    } else {
                        reject('response?.response?.data?.error')
                    }
                })
            })
        },
        updateQuestion: ({commit}, {payload, id}) => {
            return new Promise((resolve, reject) => {
                let formData = new FormData()
                formData.append('question_text', payload.question_text)
                formData.append('survey_id', payload.survey_id)
                formData.append('_method', 'PUT')
                apiCaller.fetch('question', formData, id).then(response => {
                    if (response.status === 200) {
                        commit('setQuestion', {payload: response.data})
                        resolve(true)
                    } else {
                        reject(response?.response?.data?.error)
                    }
                })
            })
        },
        deleteQuestion: ({commit}, {id})=>{
            return new Promise((resolve, reject) => {
                apiCaller.delete('question', id).then(response => {
                    if (response.status === 204) {
                        commit('setQuestion', {payload:INITIAL_STATE.question})
                        resolve(true)
                    } else {
                        reject(response?.response?.data?.error)
                    }
                })
            })
        }
    }
}
