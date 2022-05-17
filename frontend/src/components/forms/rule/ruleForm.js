import {mapActions, mapGetters} from "vuex";

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
                this.updateRule({payload: this.form, id: this.ruleId})
            }else {
                this.createRule({payload: this.form}).then((data)=>{
                    this.ruleId = data.id
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
