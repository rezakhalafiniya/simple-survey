import INITIAL_STATE from '../initialStates/answerState'
import apiCaller from "@/utils/apiCaller"

export default {
    namespaced: true,
    state: INITIAL_STATE,

    getters: {
        answer: state => state.answer,
        answers: state => state.answers
    },
    mutations: {
        setAnswer: (state, {payload}) => {
            state.answer.id = payload.id
            state.answer.answer_text = payload.answer_text
            state.answer.question_id = payload.question_id
            state.answer.value = payload.value
            state.answer.results = payload.results
        },
        setAnswers: (state, {payload}) => {
            state.answers = payload
        }
    },
    actions: {
        getAnswer: ({commit}, {id}) => {
            return new Promise((resolve, reject) => {
                apiCaller.get('answer', id).then(response => {
                    if (response.status === 200) {
                        commit('setAnswer', {payload: response.data})
                        resolve(true)
                    } else {
                        reject('response?.response?.data?.error')
                    }
                })
            })
        },
        getAnswers: ({commit}) => {
            return new Promise((resolve, reject) => {
                apiCaller.get('answer').then(response => {
                    if (response.status === 200) {
                        commit('setAnswers', {payload: response.data})
                        resolve(true)
                    } else {
                        reject('response?.response?.data?.error')
                    }
                })
            })
        },
        createAnswer: ({commit}, {payload}) => {
            return new Promise((resolve, reject) => {
                let formData = new FormData()
                formData.append('answer_text', payload.answer_text)
                formData.append('value', payload.value)
                formData.append('question_id', payload.question_id)
                apiCaller.fetch('answer', formData).then(response => {
                    if (response.status === 201) {
                        commit('setAnswer', {payload: response.data})
                        resolve(response.data)
                    } else {
                        reject('response?.response?.data?.error')
                    }
                })
            })
        },
        updateAnswer: ({commit}, {payload, id}) => {
            return new Promise((resolve, reject) => {
                let formData = new FormData()
                formData.append('answer_text', payload.answer_text)
                formData.append('value', payload.value)
                formData.append('question_id', payload.question_id)
                formData.append('_method', 'PUT')
                apiCaller.fetch('answer', formData, id).then(response => {
                    if (response.status === 200) {
                        commit('setAnswer', {payload: response.data})
                        resolve(true)
                    } else {
                        reject('response?.response?.data?.error')
                    }
                })
            })
        },
        deleteAnswer: ({commit},{id})=>{
            return new Promise((resolve, reject) => {
                apiCaller.delete('answer', id).then(response => {
                    if (response.status === 204) {
                        commit('setAnswer', {payload: INITIAL_STATE.answer})
                        resolve(true)
                    } else {
                        reject('response?.response?.data?.error')
                    }
                })
            })
        }
    }
}
