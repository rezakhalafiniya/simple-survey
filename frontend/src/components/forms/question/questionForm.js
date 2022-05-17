import {mapActions, mapGetters} from "vuex";
import AnswerForm from "@/components/forms/answer/AnswerForm"

export default {
    name: "QuestionForm",
    components: {
        AnswerForm
    },
    props:{
        surveyId:null,
        questionInfo: {}
    },
    data: () => {
        return {
            form: {},
            answers: [],
            questionId:null,
            tabIndex:0,
        }
    },
    methods: {
        ...mapActions({
            createQuestion: "question/createQuestion",
            updateQuestion: "question/updateQuestion",
            deleteQuestion: "question/deleteQuestion",
        }),
        saveQuestion() {
            this.form.survey_id = this.surveyId
            if (this.questionId){
                this.updateQuestion({payload: this.form, id: this.questionId})
            }else{
                this.createQuestion({payload: this.form}).then((data)=>{
                    this.questionId = data.id
                })
            }

        },
        doDelete(){
            this.form.question_text = ''
            this.deleteQuestion({id: this.questionId})
            this.questionId = null
        },
        addAnswerComponent() {
            this.answers.push({})
        },
    },
    computed: {
        ...mapGetters({
            question : "question/question"
        })
    },
    mounted() {
        if (Object.keys(this.questionInfo).length !== 0){
            this.questionId = this.questionInfo.id
            this.form = this.questionInfo
            if (this.questionInfo.answers){
                this.answers = this.questionInfo.answers
            }else{
                this.answers = []
            }
        }
    }}
