import TopNav from "@/components/topNav/TopNav";
import SurveyForm from "@/components/forms/survey/SurveyForm";
import QuestionForm from "@/components/forms/question/questionForm";

export default {
    name: "NewSurvey",
    components: {
        TopNav,
        SurveyForm,
        QuestionForm
    },
    mounted() {
        document.title = 'New Survey'
    },
};
