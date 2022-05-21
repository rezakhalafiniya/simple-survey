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
                    aria-describedby="rule-logic-input-help-block"
                ></b-form-input>
                <b-form-text id="rule-logic-input-help-block">The format of the logic: Operator;startValue;endValue (operator and value are seperated by semicolon.) <br/>Example: &lt;;25 . This means that this rule text will be shown if the sum of the answered values are smaller than 25.
                    <br/>Possible Operator: = , &lt; , &gt; , &lt;= , &gt;= , &gt;==&lt; </b-form-text>
            </b-form-group>
            <b-form-group>
                <b-button type="submit" variant="primary">Save</b-button>
            </b-form-group>
        </b-form>
    </div>
</template>
<script src="./ruleForm.js"></script>
