<template>
    <div class="survey">
        <TopNav/>
        <div>
            <b-btn @click.stop.prevent="showEdit= !showEdit">Edit</b-btn>
            <b-card v-if="!showEdit" :title="survey.title" :sub-title="survey.slug">
                <b-card-text>
                    {{ survey.description}}
                </b-card-text>

                <div v-for="(question,indx) in survey.questions" :key="indx">
                    <b-card :title="question.question_text">
                        <b-card-text v-for="(answer,indx) in question.answers" :key="indx">
                            {{answer.answer_text}}
                        </b-card-text>

                    </b-card>
                </div>
            </b-card>
            <SurveyForm v-if="showEdit" :surveyInfo="survey"/>
            <b-btn>submit</b-btn>
        </div>
    </div>
</template>
<style src="./survey.scss" lang="scss" scoped></style>
<script src="./survey.js"></script>
