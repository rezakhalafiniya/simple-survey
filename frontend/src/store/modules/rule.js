import INITIAL_STATE from '../initialStates/ruleState'
import apiCaller from "@/utils/apiCaller"

export default {
    namespaced: true,
    state: INITIAL_STATE,

    getters: {
        rule: state => state.rule,
        rules: state => state.rules
    },
    mutations: {
        setRule: (state, {payload}) => {
            console.log(payload)
            state.rule.id = payload.id
            state.rule.logic = payload.logic
            state.rule.result_text = payload.result_text
            state.rule.survey_id = payload.survey_id
        },
        setRules: (state, {payload}) => {
            state.rules = payload
        }
    },
    actions: {
        getRule: ({commit}, {id}) => {
            return new Promise((resolve, reject) => {
                apiCaller.get('rule', id).then(response => {
                    if (response.status === 200) {
                        commit('setRule', {payload: response.data})
                        resolve(true)
                    } else {
                        reject(response?.response?.data)
                    }
                })
            })
        },
        getRules: ({commit}) => {
            return new Promise((resolve, reject) => {
                apiCaller.get('rule').then(response => {
                    if (response.status === 200) {
                        commit('setRules', {payload: response.data})
                        resolve(true)
                    } else {
                        reject(response?.response?.data)
                    }
                })
            })
        },
        createRule: ({commit}, {payload}) => {
            return new Promise((resolve, reject) => {
                let formData = new FormData()
                formData.append('id', payload.id)
                formData.append('logic', payload.logic)
                formData.append('result_text', payload.result_text)
                formData.append('survey_id', payload.survey_id)
                apiCaller.fetch('rule', formData).then(response => {
                    if (response.status === 201) {
                        commit('setRule', {payload: response.data})
                        resolve(response.data)
                    } else {
                        reject(response?.response?.data)
                    }
                })
            })
        },
        updateRule: ({commit}, {payload, id}) => {
            return new Promise((resolve, reject) => {
                let formData = new FormData()
                formData.append('logic', payload.logic)
                formData.append('result_text', payload.result_text)
                formData.append('survey_id', payload.survey_id)
                formData.append('_method', 'PUT')
                apiCaller.fetch('rule', formData, id).then(response => {
                    if (response.status === 200) {
                        commit('setRule', {payload: response.data})
                        resolve(true)
                    } else {
                        reject(response?.response?.data)
                    }
                })
            })
        },
        deleteRule: ({commit},{id})=>{
            return new Promise((resolve, reject) => {
                apiCaller.delete('rule', id).then(response => {
                    if (response.status === 204) {
                        commit('setRule', {payload: INITIAL_STATE.rule})
                        resolve(true)
                    } else {
                        reject(response?.response?.data)
                    }
                })
            })
        }
    }
}
