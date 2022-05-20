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
            <b-tabs card v-model="tabIndex">
                <template v-for="(answer,indx) in answers">
                    <b-tab :key="indx" :title="'Answer '+ (indx+1)">
                        <AnswerForm :key="indx" :questionId="questionId" :answer-info="answer"/>
                    </b-tab>
                </template>
                <b-tab @click.stop.prevent="addAnswerComponent" v-if="questionId">
                    <template #title>
                        <b-icon-plus-lg></b-icon-plus-lg>
                    </template>
                </b-tab>
            </b-tabs>
        </b-form>
    </div>
</template>
<script src="./questionForm.js"></script>
