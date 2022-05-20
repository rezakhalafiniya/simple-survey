import {mapActions, mapGetters} from "vuex";
import customToast from "@/utils/toastMessages";

export default {
    name: "AnswerForm",
    components: {},
    data: () => {
        return {
            form: {},
            answerId:null,
        }
    },
    props:{
        questionId:null,
        answerInfo: {},
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
                this.updateAnswer({payload: this.form, id: this.answerId}).then((data) => {
                    this.$emit('answerAdded',{data:data, key:this.$vnode.key})
                    customToast.success(this,'Answer Successfully Updated','Answer Updated')
                }).catch(e => {
                    customToast.errors(this,e)
                })
            }else {
                this.createAnswer({payload: this.form}).then((data) => {
                    this.answerId = data.id
                    this.$emit('answerAdded', {data:data, key:this.$vnode.key})
                    customToast.success(this,'Answer Successfully Saved','Answer Saved')
                }).catch(e => {
                    customToast.errors(this,e)
                })
            }
        },
        doDelete(){
            this.deleteAnswer({id: this.answerId})
            this.$emit('answerDeleted',this.answerId)
            this.answerId = null

        },
    },
    computed: {
        ...mapGetters({
            answer: "answer/answer",
        })
    },
    mounted() {
        if (Object.keys(this.answerInfo) !== 0 ){
            this.answerId = this.answerInfo.id
            this.form = this.answerInfo
        }
    }
}
