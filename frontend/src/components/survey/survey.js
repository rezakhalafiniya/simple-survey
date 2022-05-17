import {mapActions, mapGetters} from "vuex";

export default {
    name: "SurveyComponent",
    data() {
        return {
            tabIndex: 0,
            participant: {}
        }
    },
    computed: {
        ...mapGetters({
            survey: "survey/survey",
        }),
    },
    mounted() {
        this.participant = JSON.parse(localStorage.participant)
    },
    methods: {
        ...mapActions({
            createResult: "result/createResult",
            updateResult: "result/updateResult",
        }),

        goNext() {
            if (!this.survey.questions[this.tabIndex].selectedAnswerId) {
                this.$bvToast.toast(`Please Answer The Question First`, {
                    title: 'Question Not Answered',
                    autoHideDelay: 5000,
                    variant: 'danger',
                    toaster: 'b-toaster-top-center',
                    appendToast: false,
                    solid: true
                })
                return
            }
            if (this.survey.questions[this.tabIndex].resultId){
                this.updateResult({
                    payload: {
                        answer_id: this.survey.questions[this.tabIndex].selectedAnswerId,
                        question_id: this.survey.questions[this.tabIndex].id,
                        participant_id: this.participant.id,
                        survey_id: this.survey.questions[this.tabIndex].survey_id,
                    },id : this.survey.questions[this.tabIndex].resultId
                }).then((data) => {
                    this.survey.questions[this.tabIndex].resultId = data.id
                    this.tabIndex = this.tabIndex + 1
                }).catch(e => {
                    this.$bvToast.toast(`${e.message}`, {
                        title: 'Answer not saved',
                        autoHideDelay: 5000,
                        variant: 'danger',
                        toaster: 'b-toaster-top-center',
                        appendToast: false,
                        solid: true
                    })
                })
            }else{
                this.createResult({
                    payload: {
                        answer_id: this.survey.questions[this.tabIndex].selectedAnswerId,
                        question_id: this.survey.questions[this.tabIndex].id,
                        participant_id: this.participant.id,
                        survey_id: this.survey.questions[this.tabIndex].survey_id,
                    }
                }).then((data) => {
                    this.survey.questions[this.tabIndex].resultId = data.id
                    this.tabIndex = this.tabIndex + 1
                }).catch(e => {
                    this.$bvToast.toast(`${e.message}`, {
                        title: 'Answer not saved',
                        autoHideDelay: 5000,
                        variant: 'danger',
                        toaster: 'b-toaster-top-center',
                        appendToast: false,
                        solid: true
                    })
                })
            }


        },
        goBack() {
            this.tabIndex = this.tabIndex - 1
        },
        saveResult() {
            console.log(this.survey.questions, localStorage.participant)
        }
    },
}
