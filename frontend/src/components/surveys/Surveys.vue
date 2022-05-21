<template>
    <div id="surveys">
        <b-col v-for="(survey, idx) in surveys" :key="idx">
            <b-card
                :title="survey.title"
                style="max-width: 20rem;"
                class="mb-2"
            >
                <b-card-text>
                    {{ survey.description }}
                </b-card-text>

                <b-button :href="'survey/'+survey.id" variant="primary">Start the Survey</b-button>
            </b-card>
        </b-col>
    </div>
</template>

<script src="./surveys.js"></script>

<style src="./surveys.scss" lang="scss" scoped></style>
