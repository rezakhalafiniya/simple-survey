import {mapActions, mapGetters} from "vuex";

export default {
    name: "Surveys",
    data() {
        return {
        }
    },
    mounted(){

        this.getSurveys().then((data) => {
            if (data) {
                console.log(this.surveys)
            }
        })
    },
    methods: {
        ...mapActions({
            getSurvey: 'survey/getSurvey',
            getSurveys: 'survey/getSurveys',
        })
    },
    computed:{
        ...mapGetters({
            surveys: 'survey/surveys'
        })
    }
};
