import {mapActions, mapGetters} from "vuex";
import customToast from "@/utils/toastMessages";

export default {
    name: "RuleForm",
    components: {},
    data: () => {
        return {
            form: {},
            ruleId:null
        }
    },
    props:{
        surveyId:null,
        ruleInfo: {}
    },
    methods: {
        ...mapActions({
            createRule: "rule/createRule",
            updateRule: "rule/updateRule",
            deleteRule: "rule/deleteRule"
        }),
        saveRule(){
            this.form.survey_id = this.surveyId
            if (this.ruleId){
                this.updateRule({payload: this.form, id: this.ruleId}).then(() => {
                    customToast.success(this,'Rule Successfully Updated','Rule Updated')
                }).catch(e => {
                    customToast.errors(this,e)
                })
            }else {
                this.createRule({payload: this.form}).then((data)=>{
                    this.ruleId = data.id
                    customToast.success(this,'Rule Successfully Saved','Rule Saved')
                }).catch(e => {
                    customToast.errors(this,e)
                })
            }
        }
    },
    computed: {
        ...mapGetters({
            rule: "rule/rule"
        })
    },
    mounted() {
        if (Object.keys(this.ruleInfo) !== 0 ){
            this.ruleId = this.ruleInfo.id
            this.form = this.ruleInfo
        }
    }
}
