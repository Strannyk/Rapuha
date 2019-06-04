<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <router-link to="/" class="navbar-brand home-link">Rapuha</router-link>
            <button v-on:click="toggleMobileMenu(false)" class="navbar-toggler" type="button">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div  v-on:click="closeMobileMenu" class="collapse navbar-collapse">
                <ul class="navbar-nav" v-on:click="blurLinks">
                    <li v-if="isAdmin"
                        v-on:click="menuOpen = false"
                        @mouseover="menuOpen = true"
                        @mouseleave="menuOpen = false"
                        class="nav-item dropdown">
                        <router-link to="/admin/feed" class="nav-link dropdown-toggle">Администрирование
                        </router-link>
                        <div :class="menuOpen ? 'visible' : null"
                             class="dropdown-menu">
                            <router-link to="/admin/reflections" class="dropdown-item">Размышления</router-link>
                            <router-link to="/admin/stories" class="dropdown-item">Рассказы</router-link>
                            <router-link to="/admin/quotes" class="dropdown-item">Цитаты</router-link>
                            <div class="dropdown-divider"></div>
                            <router-link class="dropdown-item" to="/admin/feedback">Обратная связь</router-link>
                        </div>
                    </li>
                    <li class="navbar-nav">
                        <router-link to="/reflections" class="nav-link">Размышления</router-link>
                    </li>
                    <li class="navbar-nav">
                        <router-link to="/stories" class="nav-link">Рассказы</router-link>
                    </li>
                    <li class="navbar-nav">
                        <router-link to="/quotes" class="nav-link">Цитаты</router-link>
                    </li>
                </ul>
                <ul v-if="isAdmin" class="nav navbar-nav ml-auto">
                    <li class="nav-item">
                        <a v-on:click="logOut" class="nav-link r-logout">Выйти</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script src="./navigation-bar.js"></script>

<style scoped src="./navigation-bar.scss" lang="scss"></style>
