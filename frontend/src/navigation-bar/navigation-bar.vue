<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <span class="navbar-brand main-link">
                <router-link to="/">Rapuha</router-link>
            </span>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav">
                    <li v-if="isAdmin"
                        v-on:click="menuOpen = false"
                        @mouseover="menuOpen = true"
                        @mouseleave="menuOpen = false"
                        class="nav-item dropdown">
                        <router-link to="/admin/feed">
                            <span class="nav-link dropdown-toggle">Администрирование</span>
                        </router-link>
                        <div :class="menuOpen ? 'visible' : null"
                             class="dropdown-menu">
                            <router-link class="dropdown-item" to="/admin/reflections">Размышления</router-link>
                            <router-link class="dropdown-item" to="/admin/stories">Рассказы</router-link>
                            <router-link class="dropdown-item" to="/admin/quotes">Цитаты</router-link>
                            <div class="dropdown-divider"></div>
                            <router-link class="dropdown-item" to="/admin/feedback">Обратная связь</router-link>
                        </div>

                    </li>
                </ul>
            </div>
            <div v-if="isAdmin" v-on:click="logOut" class="r-logout">
                <span class="r-logout-wording">Выйти</span>
            </div>
        </div>
    </nav>
</template>

<script src="./navigation-bar.js"></script>

<style scoped src="./navigation-bar.scss" lang="scss"></style>
