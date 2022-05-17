<template>
    <div class="survey">
        <TopNav/>
        <Participant></Participant>
        <div>
            <b-btn @click.stop.prevent="showEdit= !showEdit" v-if="user.email">Edit</b-btn>
            <SurveyComponent v-if="!showEdit" />
            <SurveyForm v-if="showEdit" :survey-info="survey" />
        </div>
    </div>
</template>
<style src="./survey.scss" lang="scss" scoped></style>
<script src="./survey.js"></script>
