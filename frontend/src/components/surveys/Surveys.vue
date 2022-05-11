<template>
    <div id="surveys">
        <b-card v-for="(survey, idx) in surveys" :key="idx"
            :title="survey.title"
            style="max-width: 20rem;"
            class="mb-2"
        >
            <b-card-text>
                {{ survey.description }}
            </b-card-text>

            <b-button :href="'survey/'+survey.slug" variant="primary">Start the Survey</b-button>
        </b-card>
    </div>
</template>

<script src="./surveys.js"></script>

<style src="./surveys.scss" lang="scss" scoped></style>
