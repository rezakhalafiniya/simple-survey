import {mapActions, mapGetters} from "vuex";
import SurveyForm from "@/components/forms/survey/SurveyForm"
import ResultTexts from "@/components/resultTexts/ResultTexts"

export default {
    name: "SurveyComponent",
    data() {
        return {
            tabIndex: 0,
            participant: {},
            showEdit : false,
            showResults: false
        }
    },
    components:{
        SurveyForm,
        ResultTexts
    },

    computed: {
        ...mapGetters({
            survey: "survey/survey",
            user: "auth/getUser"
        }),
    },
    mounted() {
        this.participant = JSON.parse(localStorage.participant)
    },
    methods: {
        ...mapActions({
            createResult: "result/createResult",
            updateResult: "result/updateResult",
            getResultTexts: "survey/getResultTexts"
        }),

        updateShowEdit(showEdit){
            console.log(showEdit)
          this.showEdit = showEdit
        },

        goNext() {
            this.participant =  JSON.parse(localStorage.participant)
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
            this.getResultTexts({surveyId:this.survey.id,participantId:this.participant.id}).then((data)=>{
                console.log(data)
                this.showResults = true
            })
            console.log(this.survey.questions, localStorage.participant)
        }
    },
}
