import {mapActions, mapGetters} from "vuex";
import SurveyForm from "@/components/forms/survey/SurveyForm"
import ResultTexts from "@/components/resultTexts/ResultTexts"
import customToast from "@/utils/toastMessages";

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
        if (localStorage.participant){
            this.participant = JSON.parse(localStorage.participant)
        }
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
            if (localStorage.participant){
                this.participant =  JSON.parse(localStorage.participant)
            }else{
                customToast.danger(this,`Please create a Nickname first`,'No Participant Nickname')
                return
            }
            if (!this.survey.questions[this.tabIndex].selectedAnswerId) {
                customToast.danger(this,`Please Answer The Question First`,'Question Not Answered')
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
                    customToast.errors(this,e)
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
                    customToast.errors(this,e)
                })
            }
        },
        goBack() {
            this.tabIndex = this.tabIndex - 1
        },
        saveResult() {
            this.getResultTexts({surveyId:this.survey.id,participantId:this.participant.id}).then(()=>{
                this.showResults = true
            })
        }
    },
}
