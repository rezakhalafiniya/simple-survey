import INITIAL_STATE from '../initialStates/participantState'
import apiCaller from "@/utils/apiCaller"

export default {
    namespaced: true,
    state: INITIAL_STATE,

    getters: {
        participant: state => state.participant,
        participants: state => state.participants
    },
    mutations: {
        setParticipant: (state, {payload}) => {
            console.log(payload.id)
            state.participant.id = payload.id
            state.participant.nickname = payload.nickname
        },
        setParticipants: (state, {payload}) => {
            state.participants = payload
        }
    },
    actions: {
        getParticipant: ({commit}, {id}) => {
            return new Promise((resolve, reject) => {
                apiCaller.get('participant', id).then(response => {
                    if (response.status === 200) {
                        commit('setParticipant', {payload: response.data})
                        localStorage.participant = JSON.stringify(response?.data)
                        resolve(true)
                    } else {
                        reject(response?.response?.data)
                    }
                })
            })
        },
        getParticipants: ({commit}) => {
            return new Promise((resolve, reject) => {
                apiCaller.get('participant').then(response => {
                    if (response.status === 200) {
                        commit('setParticipants', {payload: response.data})
                        resolve(true)
                    } else {
                        reject(response?.response?.data)
                    }
                })
            })
        },
        createParticipant: ({commit}, {payload}) => {
            return new Promise((resolve, reject) => {
                let formData = new FormData()
                formData.append('nickname', payload.nickname)
                apiCaller.fetch('participant', formData).then(response => {
                    if (response.status === 201) {
                        commit('setParticipant', {payload: response.data})
                        resolve(response.data)
                    } else {
                        reject(response?.response?.data)
                    }
                })
            })
        },
        updateParticipant: ({commit}, {payload, id}) => {
            return new Promise((resolve, reject) => {
                let formData = new FormData()
                formData.append('nickname', payload.nickname)
                formData.append('_method', 'PUT')

                try{
                    apiCaller.fetch('participant', formData, id).then(response => {
                        if (response.status === 201) {
                            commit('setParticipant', {payload: response.data})
                            resolve(true)
                        } else {
                            reject(response?.response?.data)
                        }
                    })
                }catch (e){
                    console.log(e)
                }
            })
        },
        deleteParticipant: ({commit},{id})=>{
            return new Promise((resolve, reject) => {
                apiCaller.delete('participant', id).then(response => {
                    if (response.status === 204) {
                        commit('setParticipant', {payload: INITIAL_STATE.participant})
                        resolve(true)
                    } else {
                        reject(response?.response?.data)
                    }
                })
            })
        }
    }
}
