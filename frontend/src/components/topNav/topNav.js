import {mapActions, mapGetters} from "vuex";
import Login from "@/components/forms/login/Login";
import Register from "@/components/forms/register/Register";

export default {
    name: "TopNav",
    components: {
        Login,
        Register
    },
    computed: {
        ...mapGetters({
            user: "auth/getUser"
        })
    },
    methods: {
        ...mapActions({
            logout: "auth/logout",
            setUser: "auth/setUser"
        }),
    },
    mounted() {
        this.setUser()
    }
};
