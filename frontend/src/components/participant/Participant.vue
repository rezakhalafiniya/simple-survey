<template>
    <div>
        <p v-if="participant.id" > Taking Part as: <strong>{{participant.nickname}}</strong> <a href="#" @click="changeParticipant">Change</a> <a href="#" @click="removeParticipant">Remove</a> </p>
        <p v-else><a href="#" @click="showParticipantModal">Please create a Participant nickname first</a></p>        <b-modal id="participant" hide-footer>
            <form ref="form" @submit.stop.prevent="doCreateParticipant">
            <b-form-group
                label="Nickname"
                label-for="email-input"
                invalid-feedback="Nickname is required"
                type="text"
            >
                <b-form-input
                    id="nicknanme-input"
                    v-model="form.nickname"
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-button type="submit" variant="primary">Create</b-button>
            </b-form-group>
        </form>
        </b-modal>
    </div>
</template>

<script src="./participant.js"></script>

<style src="./participant.scss" lang="scss" scoped></style>
