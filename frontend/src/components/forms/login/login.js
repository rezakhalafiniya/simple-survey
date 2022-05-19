import {mapActions, mapGetters} from "vuex";
import customToast from "@/utils/toastMessages";

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
            this.login({email: this.form.email, password: this.form.password}).then(
                () => {
                    this.$bvModal.hide('login')
                }
            ).catch((e) => {
                customToast.errors(this,e)
            })
        },
    },
    mounted() {}
};
