<template>
    <div>
        <b-card>
            <b-card-body v-for="(resultText,indx) in results" :key="indx" >
                {{resultText}}
            </b-card-body>
        </b-card>
    </div>
</template>

<script src="./resultTexts.js"></script>

<style src="./resultTexts.scss" lang="scss" scoped></style>
