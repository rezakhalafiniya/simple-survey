<template>
    <div>
        <b-form ref="form" @submit.stop.prevent="saveQuestion">
            <b-form-group
                label="Question Text"
                label-for="text-input"
                invalid-feedback="Title is required"
                type="text"
            >
                <b-form-input
                    id="text-input"
                    v-model="form.question_text"
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-button type="submit" variant="primary">Save</b-button>
                <b-button @click.prevent.stop="doDelete" variant="danger">Delete</b-button>
            </b-form-group>
            <b-btn @click.stop.prevent="addAnswerComponent" v-if="questionId">Add Answer Option</b-btn>
            <template v-for="(answer,indx) in answers" >
                <AnswerForm :key="indx" :questionId="questionId" :answer-info="answer"/>
            </template>
        </b-form>
    </div>
</template>
<script src="./questionForm.js"></script>
