<template>
    <div>
        <breadcrumbs :list="breadcrumbs"></breadcrumbs>
        <div class="r-block">
            <h2>Цитаты</h2>
            <br>
            <router-link to="/admin/add/quote">
                <button type="button" class="btn btn-primary">Создать цитату</button>
            </router-link>
            <blockquote v-for="quote in quotes"
                        v-on:click="editQuote(quote.id)"
                        class="r-quote blockquote">
                <p class="mb-0" v-html="quote.body"></p>
                <footer v-if="quote.author" class="blockquote-footer">
                    <cite title="Source Title">{{quote.author}}</cite>
                </footer>
            </blockquote>
            <div v-if="!quotes.length">
                <br>
                <div>&lt;Пусто&gt;</div>
            </div>
        </div>
    </div>
</template>

<script src="./quotes-list-page.js"></script>

<style src="./quotes-list-page.scss" lang="scss"></style>
