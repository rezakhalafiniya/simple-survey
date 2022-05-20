<template>
    <div>
        <SurveyForm v-if="showEdit" :survey-info="survey" @showEditChanged="updateShowEdit"/>
        <b-card v-if="!showEdit && !showResults"  :title="survey.title" :sub-title="survey.slug">
            {{survey.description}}
            <div>
                <b-btn @click.stop.prevent="showEdit= !showEdit" v-if="user.email">Edit</b-btn>
            </div>
            <b-tabs card v-model="tabIndex">
                <b-tab v-for="(question,indx) in survey.questions" :key="indx" :title="'Question '+ (indx+1)" >
                    <h2>{{question.question_text}}</h2>
                    <b-card-text >
                        <b-form-radio-group
                            :id="question.question_text"
                            v-model="question.selectedAnswerId"
                            :options="radioOptions"
                            stacked
                        ></b-form-radio-group>
                    </b-card-text>
                </b-tab>
            </b-tabs>
            <b-btn @click="goBack">Back</b-btn>
            <b-btn @click="goNext">Next</b-btn>
        </b-card>
        <ResultTexts v-if="showResults"></ResultTexts>
        <b-btn v-if="!showResults && !showEdit" @click="saveResult">submit</b-btn>
    </div>
</template>

<script src="./survey.js"></script>

<style src="./survey.scss" lang="scss" scoped></style>
