import {mapActions, mapGetters} from "vuex";

export default {
    name: "AnswerForm",
    components: {},
    data: () => {
        return {
            form: {},
            answerId:null
        }
    },
    props:{
        questionId:null,
        answerInfo: {}
    },
    methods: {
        ...mapActions({
            createAnswer: "answer/createAnswer",
            updateAnswer: "answer/updateAnswer",
            deleteAnswer: "answer/deleteAnswer"
        }),
        saveAnswer(){
            this.form.question_id = this.questionId
            if (this.answerId){
                this.updateAnswer({payload: this.form, id: this.answerId})
            }else {
                this.createAnswer({payload: this.form}).then((data)=>{
                    this.answerId = data.id
                })
            }
        }
    },
    computed: {
        ...mapGetters({
            answer: "answer/answer"
        })
    },
    mounted() {
        if (Object.keys(this.answerInfo) !== 0 ){
            this.answerId = this.answerInfo.id
            this.form = this.answerInfo
        }
    }
}
