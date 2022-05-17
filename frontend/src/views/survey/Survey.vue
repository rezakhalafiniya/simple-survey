<template>
    <div class="survey">
        <TopNav/>
        <Participant></Participant>
        <div>
            <SurveyComponent v-if="!showEdit" />
        </div>
    </div>
</template>
<style src="./survey.scss" lang="scss" scoped></style>
<script src="./survey.js"></script>
