import INITIAL_STATE from '../initialStates/resultState'
import apiCaller from "@/utils/apiCaller"

export default {
    namespaced: true,
    state: INITIAL_STATE,

    getters: {
        result: state => state.result,
        results: state => state.results
    },
    mutations: {
        setResult: (state, {payload}) => {
            state.result.id = payload.id
            state.result.answer_id = payload.answer_id
            state.result.question_id = payload.question_id
            state.result.survey_id = payload.survey_id
            state.result.participant_id = payload.participant_id
        },
        setResults: (state, {payload}) => {
            state.results = payload
        }
    },
    actions: {
        getResult: ({commit}, {id}) => {
            return new Promise((resolve, reject) => {
                apiCaller.get('result', id).then(response => {
                    if (response.status === 200) {
                        commit('setResult', {payload: response.data})
                        resolve(true)
                    } else {
                        reject(response?.response?.data)
                    }
                })
            })
        },
        getResults: ({commit}) => {
            return new Promise((resolve, reject) => {
                apiCaller.get('result').then(response => {
                    if (response.status === 200) {
                        commit('setResults', {payload: response.data})
                        resolve(true)
                    } else {
                        reject(response?.response?.data)
                    }
                })
            })
        },
        createResult: ({commit}, {payload}) => {
            return new Promise((resolve, reject) => {
                let formData = new FormData()
                formData.append('answer_id', payload.answer_id)
                formData.append('question_id', payload.question_id)
                formData.append('survey_id', payload.survey_id)
                formData.append('participant_id', payload.participant_id)
                apiCaller.fetch('result', formData).then(response => {
                    if (response.status === 201) {
                        commit('setResult', {payload: response.data})
                        resolve(response.data)
                    } else {
                        reject(response?.response?.data)
                    }
                })
            })
        },
        updateResult: ({commit}, {payload, id}) => {
            return new Promise((resolve, reject) => {
                let formData = new FormData()
                formData.append('answer_id', payload.answer_id)
                formData.append('question_id', payload.question_id)
                formData.append('survey_id', payload.survey_id)
                formData.append('participant_id', payload.participant_id)
                formData.append('_method', 'PUT')
                apiCaller.fetch('result', formData, id).then(response => {
                    if (response.status === 200) {
                        commit('setResult', {payload: response.data})
                        resolve(true)
                    } else {
                        reject(response?.response?.data)
                    }
                })
            })
        },
        deleteResult: ({commit},{id})=>{
            return new Promise((resolve, reject) => {
                apiCaller.delete('result', id).then(response => {
                    if (response.status === 204) {
                        commit('setResult', {payload: INITIAL_STATE.result})
                        resolve(true)
                    } else {
                        reject(response?.response?.data)
                    }
                })
            })
        }
    }
}
