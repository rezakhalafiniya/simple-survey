import {mapActions, mapGetters} from "vuex";
import TopNav from "@/components/topNav/TopNav";
import SurveyForm from "@/components/forms/survey/SurveyForm"

export default {
    name: "Survey",
    data() {
        return {
            showEdit : false
        }
    },
    components: {
        TopNav,
        SurveyForm
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
            survey: 'survey/survey'
        })
    },
    methods: {
        ...mapActions({
            getSurvey: 'survey/getSurvey'
        })
    }
};
