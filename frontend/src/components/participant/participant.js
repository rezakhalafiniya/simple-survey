import {mapActions, mapGetters} from "vuex";
import customToast from "@/utils/toastMessages";

export default {
    name: "Participant",
    data() {
        return {
            form: [],
            participant: {}
        }
    },
    mounted() {
        if (localStorage.participant){
            this.participant = JSON.parse(localStorage.participant)
        }
    },
    computed: {
        ...mapGetters({
            // participant: 'participant/participant'
        })
    },
    methods: {
        ...mapActions({
            createParticipant: "participant/createParticipant",
            getParticipant: "participant/getParticipant",
        }),
        showParticipantModal(){
            this.$bvModal.show('participant')
        },
        changeParticipant(){
            this.$bvModal.show('participant')
        },
        removeParticipant(){
            localStorage.removeItem('participant')
            this.participant = {}

        },
        doCreateParticipant(){
            this.createParticipant({payload:{nickname : this.form.nickname}}).then((data)=>{
                localStorage.participant = JSON.stringify(data)

                customToast.success(this, `Participant Created with nickname: ${data.nickname}`,`Participant Created`)

                this.getParticipant({id: data.id})
                this.participant = data
                this.$bvModal.hide('participant')

            }).catch((e) => {
                customToast.errors(this,e)
            })
        }
    },
}
