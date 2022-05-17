import {mapActions, mapGetters} from "vuex";

export default {
    name: "Participant",
    data() {
        return {
            form: [],
            participant: {}
        }
    },
    mounted() {
        this.participant = JSON.parse(localStorage.participant)
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
                this.$bvToast.toast(`Participant Created with nickname: ${data.nickname}`, {
                    title: `Participant Created`,
                    autoHideDelay: 5000,
                    variant: 'success',
                    toaster: 'b-toaster-top-center',
                    appendToast: false,
                    solid: true
                })
                this.getParticipant({id: data.id})
                this.participant = data
                this.$bvModal.hide('participant')

            }).catch((e) => {
                this.$bvToast.toast(e.nickname, {
                    title: `Participant was not created`,
                    autoHideDelay: 5000,
                    variant: 'danger',
                    toaster: 'b-toaster-top-center',
                    appendToast: false,
                    solid: true
                })
            })
        }
    },
}
