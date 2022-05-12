import axios from 'axios'

const apiUrl = 'http://localhost:888/api/'

const apiCaller = {
    fetch: async (endpoint, formdata, id) => {
        if (id){
            endpoint = endpoint + '/'+id
        }
        if (formdata) {
            try {
                return await axios.post(
                    apiUrl + endpoint,
                    formdata
                    // { withCredentials: true }
                )
            } catch (error) {
                return error
            }
        }
        throw new Error('FormData is missing')
    },
    get: async (endpoint,payload) => {
        if (payload){
            endpoint = endpoint + '/'+payload
        }
        try {
            return await axios.get(
                apiUrl + endpoint,
                // { withCredentials: true }
            )
        } catch (error) {
            return error
        }
    },
    delete: async (endpoint,id) => {
        try {
            return await axios.delete(
                apiUrl + endpoint + '/' + id,
                // { withCredentials: true }
            )
        } catch (error) {
            return error
        }
    }
}
export default apiCaller
