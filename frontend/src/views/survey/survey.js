import {mapActions, mapGetters} from "vuex";
import TopNav from "@/components/topNav/TopNav";
import SurveyForm from "@/components/forms/survey/SurveyForm"
import SurveyComponent from "@/components/survey/Survey"

export default {
    name: "Survey",
    data() {
        return {
            showEdit : false
        }
    },
    components: {
        TopNav,
        SurveyForm,
        SurveyComponent
    },
    mounted() {
        document.title = 'Survey'
        this.getSurvey({id: this.$route.params.slug})

    },
    watch: {
        $route(to, from) {
            console.log(to, from)
            // react to route changes...
        }
    },
    computed: {
        ...mapGetters({
            survey: 'survey/survey',
            user: 'auth/getUser'
        })
    },
    methods: {
        ...mapActions({
            getSurvey: 'survey/getSurvey',
        })
    }
};
