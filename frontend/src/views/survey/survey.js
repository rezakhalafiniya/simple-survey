import {mapActions, mapGetters} from "vuex";
import TopNav from "@/components/topNav/TopNav";

export default {
    name: "Survey",
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
    computed:{
        ...mapGetters({
            survey: 'survey/survey'
        })
    },
    methods: {
        ...mapActions({
            getSurvey: 'survey/getSurvey'
        })
    },
    components:{
        TopNav
    }
};
