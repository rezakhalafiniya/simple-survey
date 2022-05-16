<template>
    <div>
        <b-card :title="survey.title" :sub-title="survey.slug">
            {{survey.description}}
            <b-tabs card v-model="tabIndex">
                <b-tab v-for="(question,indx) in survey.questions" :key="indx" :title="'Question '+ (indx+1)" >
                    <h2>{{question.question_text}}</h2>
                    <b-card-text v-for="(answer,indx) in question.answers" :key="indx">
                        <b-radio :value="answer.id" v-model="question.selectedAnswerId">{{ answer.answer_text }}</b-radio>
                    </b-card-text>
                </b-tab>
            </b-tabs>
            <b-btn @click="goBack">Back</b-btn>
            <b-btn @click="goNext">Next</b-btn>
        </b-card>
        <b-btn @click="saveResult">submit</b-btn>
    </div>
</template>

<script src="./survey.js"></script>

<style src="./survey.scss" lang="scss" scoped></style>
