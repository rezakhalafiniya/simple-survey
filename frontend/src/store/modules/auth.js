import INITIAL_STATE from '../initialStates/userState'
import apiCaller from "@/utils/apiCaller"
import router from "@/router";

export default {
    namespaced: true,
    state: INITIAL_STATE,

    getters: {
        getUser: state => state.user,
    },
    mutations: {
        setUser:(state, { payload })=>{
            state.user.id = payload.id
            state.user.email = payload.email
            state.user.name = payload.name
        },

    },
    actions: {
        login: ({ commit }, {email,password}) => {
            return new Promise((resolve, reject) => {
                let formData = new FormData()
                formData.append('email',email)
                formData.append('password',password)
                apiCaller.fetch('login', formData).then(response => {
                    if (response.status === 200) {
                        commit('setUser', {payload: response.data?.user})
                        localStorage.token = response?.data?.token
                        localStorage.user = JSON.stringify(response?.data?.user)
                        resolve(true)
                    }else{
                        reject(response?.response?.data)
                    }
                })
            })
        },
        register: ({ commit }, {name,email,password}) => {
            return new Promise((resolve, reject) => {
                let formData = new FormData()
                formData.append('name',name)
                formData.append('email',email)
                formData.append('password',password)
                apiCaller.fetch('register', formData).then(response => {
                    if (response.status === 200) {
                        commit('setUser', {payload: response.data?.user})
                        localStorage.token = response?.data?.token
                        localStorage.user = JSON.stringify(response?.data?.user)
                        resolve(true)
                    }else{
                        reject(response?.response?.data)
                    }
                })
            })
        },
        logout({commit}){
            commit("setUser",{payload : {name:null,email:null,id:null}})
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            router.push('/')
        },
        setUser({commit}){
            if (localStorage.user){
                commit('setUser',{payload:JSON.parse(localStorage.user)})
            }
        }
    }
}
