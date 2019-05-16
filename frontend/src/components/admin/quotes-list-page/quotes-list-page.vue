<template>
    <div class="r-block">
        <h2>Цитаты</h2>
        <br>
        <router-link to="/admin/add/quote">
            <button type="button" class="btn btn-primary">Создать цитату</button>
        </router-link>
        <blockquote v-for="quote in quotes" class="r-quote blockquote">
            <p class="mb-0">{{quote.body}}</p>
            <footer v-if="quote.author" class="blockquote-footer">{{quote.author}}</footer>
        </blockquote>
        <div v-if="!quotes.length">&lt;Пусто&gt;</div>
    </div>
</template>

<script src="./quotes-list-page.js"></script>

<style src="./quotes-list-page.scss" lang="scss"></style>
