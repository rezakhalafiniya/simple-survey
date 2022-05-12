<template>
    <div id="nav" style="padding: 0">
        <b-navbar toggleable="lg" type="dark" class="nav-bar">
            <b-navbar-brand href="#">
                <router-link :to="{ name: 'Home'}">TeamWay Survey</router-link>
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <b-nav-item>
                        <b-nav>
                            <router-link :to="{name:'About'}">About</router-link>
                        </b-nav>
                    </b-nav-item>
                    <b-nav-item v-if="user.email">
                        <b-nav>
                            <router-link :to="{name:'NewSurvey'}">Add New Survey</router-link>
                        </b-nav>
                    </b-nav-item>

                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em v-if="user.email">{{ user.email }}</em>
                            <em v-else>User</em>
                        </template>

                        <b-dropdown-item v-b-modal.login v-if="!user.email">Login</b-dropdown-item>
                        <b-dropdown-item v-b-modal.register v-if="!user.email">Register</b-dropdown-item>
                        <b-dropdown-item @click.stop.prevent="logout" v-if="user.email">Logout</b-dropdown-item>
                    </b-nav-item-dropdown>

                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <b-modal id="login" title="BootstrapVue" hide-footer>
            <Login/>

        </b-modal>
        <b-modal id="register" title="BootstrapVue" hide-footer>
            <Register/>
        </b-modal>
    </div>
</template>

<script src="./topNav.js"></script>

<style src="./topNav.scss" lang="scss" scoped></style>
