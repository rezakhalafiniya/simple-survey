<template>
    <div>
        <form ref="form" @submit.stop.prevent="doLogin">
            <b-form-group
                label="Email"
                label-for="email-input"
                invalid-feedback="Email is required"
                type="email"
            >
                <b-form-input
                    id="email-input"
                    v-model="form.email"
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group
                label="Password"
                label-for="password-input"
                invalid-feedback="Password is required"
            >
                <b-form-input
                    id="password-input"
                    v-model="form.password"
                    required
                    type="password"
                ></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-button type="submit" variant="primary">Login</b-button>
            </b-form-group>
        </form>
    </div>
</template>

<script src="./login.js"></script>
