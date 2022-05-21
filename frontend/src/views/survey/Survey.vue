<template>
    <div class="survey">
        <TopNav/>
        <b-container>
            <b-row class="justify-content-center">
                <b-col>
                    <Participant></Participant>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <SurveyComponent v-if="!showEdit" />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<style src="./survey.scss" lang="scss" scoped></style>
<script src="./survey.js"></script>
