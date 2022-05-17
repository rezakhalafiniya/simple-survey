import QuestionForm from "@/components/forms/question/QuestionForm"
import RuleForm from "@/components/forms/rule/RuleForm"
import {mapActions, mapGetters} from "vuex";

export default {
    name: "surveyForm",
    components: {
        QuestionForm,
        RuleForm
    },
    props :{
        surveyInfo: {},
    },
    data: () => {
        return{
            form: {},
            questions: [],
            rules:[],
            surveyId: null,
            tabIndex: 0,
            tabIndexRule: 0,
        }
    },
    methods: {
        ...mapActions({
            createSurvey: 'survey/createSurvey',
            updateSurvey: 'survey/updateSurvey',
        }),
        saveSurvey(){
            if (this.surveyId){
                this.updateSurvey({payload: this.form, id: this.surveyId}).then((data) => {
                    this.surveyId = data.id
                })
            }else{
                this.createSurvey({payload: this.form}).then((data) => {
                    this.surveyId = data.id
                })
            }
        },
        addQuestionComponent(){
            this.questions.push({survey_id: this.survey.id})
        },
        toggleShowEdit(){
            console.log('toggle')
            this.$emit('showEditChanged',false)
        }
    },
    computed: {
        ...mapGetters({
            survey: "survey/survey"
        })
    },
    mounted() {
        if (this.surveyInfo && Object.keys(this.surveyInfo).length !== 0){
            this.surveyId = this.surveyInfo.id
            this.form = this.surveyInfo
            this.questions = this.surveyInfo.questions
            this.rules = this.surveyInfo.rules
        }
    }
}
