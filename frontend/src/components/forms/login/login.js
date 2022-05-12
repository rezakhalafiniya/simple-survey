import {mapActions, mapGetters} from "vuex";

export default {
    name: "Login",
    computed: {
        ...mapGetters({
            user: "auth/getUser"
        })
    },
    data(){
        return{
            form:{
                email:null,
                password:null,
            }
        }
    },
    methods: {
        ...mapActions({
            login: "auth/login",
        }),
        doLogin() {
            console.log(this.form,this.user)
            this.login({email: this.form.email, password: this.form.password})
        },
    },
    mounted() {}
};
