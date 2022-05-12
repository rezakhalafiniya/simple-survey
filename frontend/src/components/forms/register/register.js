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
                name:null,
                email:null,
                password:null,
            }
        }
    },
    methods: {
        ...mapActions({
            register: "auth/register",
        }),
        doRegister() {
            console.log(this.form,this.user)
            this.register({name:this.form.name, email: this.form.email, password: this.form.password})
        },
    },
    mounted() {}
};
