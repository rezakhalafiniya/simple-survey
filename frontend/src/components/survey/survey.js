import {mapGetters} from "vuex";

export default {
    name: "SurveyComponent",
    data() {
        return {
            tabIndex: 0,
        }
    },
    computed: {
        ...mapGetters({
            survey: "survey/survey"
        }),
    },
    methods: {
        goNext() {
            console.log(this.survey.questions[this.tabIndex])
            if (!this.survey.questions[this.tabIndex].selectedAnswerId) {
                this.$bvToast.toast(`Please Answer The Question First`, {
                    title: 'Question Not Answered',
                    autoHideDelay: 5000,
                    variant: 'danger',
                    toaster: 'b-toaster-top-center',
                    appendToast: 'prepend',
                    solid: true
                })
                return
            }
            this.tabIndex = this.tabIndex + 1
        },
        goBack() {
            this.tabIndex = this.tabIndex - 1
        },
        saveResult() {
            console.log(this.survey.questions)
        }
    },
}
