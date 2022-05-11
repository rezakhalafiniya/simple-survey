<template>
    <div id="nav" style="padding: 0">
        <b-navbar toggleable="lg" type="dark" class="nav-bar">
            <b-navbar-brand href="#"><router-link :to="{ name: 'Home'}">TeamWay Survey</router-link></b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <b-nav-item>
                        <b-nav><router-link :to="{name:'About'}">About</router-link></b-nav>
                    </b-nav-item>

                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em>User</em>
                        </template>
                        <b-dropdown-item href="#">Login</b-dropdown-item>
                        <b-dropdown-item href="#">Register</b-dropdown-item>
                    </b-nav-item-dropdown>

                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script src="./topNav.js"></script>

<style src="./topNav.scss" lang="scss" scoped></style>
