import {mapActions, mapGetters} from "vuex";
import AnswerForm from "@/components/forms/answer/AnswerForm"
import customToast from "@/utils/toastMessages";

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
                this.updateQuestion({payload: this.form, id: this.questionId}).then((data) => {
                    this.$emit('questionAdded',{data:data, key:this.$vnode.key})
                    customToast.success(this,'Question Successfully Updated','Question Updated')
                }).catch(e => {
                    customToast.errors(this,e)
                })
            }else{
                this.createQuestion({payload: this.form}).then((data)=>{
                    this.questionId = data.id
                    this.$emit('questionAdded',{data:data, key:this.$vnode.key})
                    customToast.success(this,'Question Successfully Saved','Question Saved')
                }).catch(e => {
                    customToast.errors(this,e)
                })
            }

        },
        doDelete(){
            this.deleteQuestion({id: this.questionId})
            this.$emit('questionDeleted',this.questionId)
            this.questionId = null
        },
        addAnswerComponent() {
            const newIndex = this.answers.length
            this.answers.push({})
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
        answerDeleted(indx) {

            console.log(indx)
            for (let i = 0; i < this.answers.length; i++) {
                if (i === indx) {
                    this.answers.splice(i, 1)
                }
            }
            if (this.tabIndex === 0){
                this.tabIndex ++
            }else{
                this.tabIndex --
            }
        },
        answerAdded(answer){
            console.log(answer,this.answers)
            this.answers[answer.key]= answer.data
            // this.questionInfo.answers.push(answer)
            // this.answers.push(answer)
        }
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
