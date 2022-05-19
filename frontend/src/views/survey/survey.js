import {mapActions, mapGetters} from "vuex";
import TopNav from "@/components/topNav/TopNav";
import SurveyForm from "@/components/forms/survey/SurveyForm"
import SurveyComponent from "@/components/survey/Survey"
import Participant from "@/components/participant/Participant"

export default {
    name: "Survey",
    data() {
        return {
            showEdit : false
        }
    },
    components: {
        TopNav,
        SurveyForm,
        SurveyComponent,
        Participant
    },
    mounted() {
        document.title = 'Survey'
        let storedParticipant = {}
        if (localStorage.participant){
            storedParticipant= JSON.parse(localStorage.participant)
            this.getSurvey({id: this.$route.params.slug,participantId:storedParticipant.id})
        }
        if (!(storedParticipant && storedParticipant.id)){
            this.$bvModal.show('participant')
            this.getSurvey({id: this.$route.params.slug})
        }

    },
    computed: {
        ...mapGetters({
            survey: 'survey/survey',
            user: 'auth/getUser',
            participant: "participant/participant"
        })
    },
    methods: {
        ...mapActions({
            getSurvey: 'survey/getSurvey',
            createParticipant: 'participant/createParticipant',
            getParticipant: 'participant/getParticipant'
        })
    }
};
