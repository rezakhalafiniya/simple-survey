<template>
    <div class="survey">
        <TopNav/>
        <div>
            <b-card :title="survey.title" :sub-title="survey.slug">
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
            <b-btn>submit</b-btn>
        </div>
    </div>
</template>
<style src="./newSurvey.scss" lang="scss" scoped></style>
<script src="./newSurvey.js"></script>
