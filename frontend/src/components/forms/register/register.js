import {mapActions, mapGetters} from "vuex";
import customToast from "@/utils/toastMessages";

export default {
    name: "Login",
    computed: {
        ...mapGetters({
            user: "auth/getUser"
        })
    },
    data() {
        return {
            form: {
                name: null,
                email: null,
                password: null,
            }
        }
    },
    methods: {
        ...mapActions({
            register: "auth/register",
        }),
        doRegister() {
            console.log(this.form, this.user)
            this.register({name: this.form.name, email: this.form.email, password: this.form.password}).then(() => {
                this.$bvModal.hide('register')
            }).catch(e => {
                customToast.errors(this, e)
            })
        },
    },
    mounted() {
    }
};
