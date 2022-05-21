<template>
    <div>
        <b-card>
            <b-btn @click.stop.prevent="toggleShowEdit">Close Edit</b-btn>
            <b-form ref="form" @submit.stop.prevent="saveSurvey">
                <b-form-group
                    label="Title"
                    label-for="title-input"
                    invalid-feedback="Title is required"
                    type="text"
                >
                    <b-form-input
                        id="title-input"
                        v-model="form.title"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                    label="Description"
                    label-for="description-input"
                    invalid-feedback="Description is required"
                    type="text"
                >
                    <b-form-input
                        id="description-input"
                        v-model="form.description"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                    label="Slug"
                    label-for="slug-input"
                    invalid-feedback="Slug is required"
                    type="text"
                >
                    <b-form-input
                        id="slug-input"
                        v-model="form.slug"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-button type="submit" variant="primary">Save</b-button>
                </b-form-group>
            </b-form>
        </b-card>
        <b-card>
            <b-tabs card v-model="tabIndexGeneral">
                <b-tab title="Questions">
                    <b-tabs card v-model="tabIndex">
                        <template v-for="(question,indx) in questions">
                            <b-tab :key="indx" :title="'Question '+ (indx+1)" lazy>
                                <QuestionForm :key="indx" :surveyId="question.survey_id" :question-info="question"
                                              @questionAdded="questionAdded" @questionDeleted="questionDeleted(indx)"/>
                            </b-tab>
                        </template>
                        <b-tab @click.stop.prevent="addQuestionComponent" v-if="surveyId">
                            <template #title>
                                <b-icon-plus-lg></b-icon-plus-lg>
                            </template>
                        </b-tab>

                    </b-tabs>
                </b-tab>
                <b-tab title="Rules">
                    <b-tabs card v-model="tabIndexRule">
                        <template v-for="(rule,indx) in rules">
                            <b-tab :key="indx" :title="'Rule '+ (indx+1)">
                                <RuleForm :key="indx" :surveyId="rule.survey_id" :rule-info="rule"/>
                            </b-tab>
                        </template>

                        <b-tab @click.stop.prevent="addRuleComponent" v-if="surveyId">
                            <template #title>
                                <b-icon-plus-lg></b-icon-plus-lg>
                            </template>
                        </b-tab>
                    </b-tabs>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>
<script src="./surveyForm.js"></script>
