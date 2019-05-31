<template>
    <div class="r-block">
        <h2>Категории</h2>
        <br>
        <ul class="list-group">
            <li v-on:click="goToPage('reflections')"
                class="list-group-item d-flex justify-content-between align-items-center">
                Размышления
                <span class="badge badge-primary badge-pill">{{reflectionsCount}}</span>
            </li>
            <li v-on:click="goToPage('stories')"
                class="list-group-item d-flex justify-content-between align-items-center">
                Рассказы
                <span class="badge badge-primary badge-pill">{{storiesCount}}</span>
            </li>
            <li v-on:click="goToPage('quotes')"
                class="list-group-item d-flex justify-content-between align-items-center">
                Цитаты
                <span class="badge badge-primary badge-pill">{{quotesCount}}</span>
            </li>
        </ul>
    </div>
</template>

<script src="./start-page.js"></script>

<style scoped src="./start-page.scss" lang="scss"></style>
