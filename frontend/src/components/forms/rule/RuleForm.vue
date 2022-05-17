<template>
    <div>
        <b-form ref="form" @submit.stop.prevent="saveRule">
            <b-form-group
                label="Result Text"
                label-for="result-text-input"
                invalid-feedback="Result Text is required"
                type="text"
            >
                <b-form-input
                    id="result-text-input"
                    v-model="form.result_text"
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group
                label="Rule Logic"
                label-for="rule-logic-input"
                invalid-feedback="Value is required"
                type="text"
            >
                <b-form-input
                    id="rule-logic-input"
                    v-model="form.logic"
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-button type="submit" variant="primary">Save</b-button>
            </b-form-group>
        </b-form>
    </div>
</template>
<script src="./ruleForm.js"></script>
