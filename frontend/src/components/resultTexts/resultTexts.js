import {mapGetters} from "vuex";

export default {
    name: "ResultTexts",
    computed:{
        ...mapGetters({
            results: "survey/surveyResultTexts"
        }),
    }
}
