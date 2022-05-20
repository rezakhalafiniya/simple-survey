<template>
    <div>
        <b-form ref="form" @submit.stop.prevent="saveAnswer">
            <b-form-group
                label="Answer Text"
                label-for="text-input"
                invalid-feedback="Title is required"
                type="text"
            >
                <b-form-input
                    id="text-input"
                    v-model="form.answer_text"
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group
                label="Answer Value"
                label-for="value-input"
                invalid-feedback="Value is required"
                type="text"
            >
                <b-form-input
                    id="text-input"
                    v-model="form.value"
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-button type="submit" variant="primary">Save</b-button>
                <b-button @click.prevent.stop="doDelete" variant="danger" v-if="answerId">Delete</b-button>
            </b-form-group>
        </b-form>
    </div>
</template>
<script src="./answerForm.js"></script>
