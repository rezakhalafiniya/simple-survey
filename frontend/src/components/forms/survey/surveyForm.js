import QuestionForm from "@/components/forms/question/QuestionForm"
import RuleForm from "@/components/forms/rule/RuleForm"
import {mapActions, mapGetters} from "vuex";
import customToast from "@/utils/toastMessages";

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
                    customToast.success(this,'Survey Successfully Updated','Survey Updated')
                }).catch(e => {
                    customToast.errors(this,e)
                })
            }else{
                this.createSurvey({payload: this.form}).then((data) =>{
                    this.surveyId = data.id
                    customToast.success(this,'Survey Successfully Saved','Survey Saved')
                }).catch(e => {
                    customToast.errors(this,e)
                })
            }
        },
        addQuestionComponent(){
            const newIndex = this.questions.length
            this.questions.push({survey_id: this.survey.id})
            this.$nextTick(() => {
                this.$nextTick(()=>{
                    this.$nextTick(()=>{
                        requestAnimationFrame(() => {
                            this.tabIndex = newIndex
                        })
                    })
                })
            })
        },
        addRuleComponent(){
            const newIndexRule = this.rules.length
            this.rules.push({survey_id: this.survey.id})
            this.$nextTick(() => {
                this.$nextTick(()=>{
                    this.$nextTick(()=>{
                        requestAnimationFrame(() => {
                            this.tabIndexRule = newIndexRule
                        })
                    })
                })
            })
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
