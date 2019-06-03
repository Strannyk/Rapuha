<template>
    <div class="r-block">
        <h2>Цитаты</h2>
        <br>
        <div v-if="contentIsLoaded">
            <div v-for="quote in quotes" :class="isAdmin ? 'is-admin' : ''" class="jumbotron">
                <blockquote class="blockquote">
                    <p v-html="quote.body" class="lead mb-0"></p>
                    <footer v-if="quote.author" class="blockquote-footer">
                        <cite title="Source Title">{{quote.author}}</cite>
                    </footer>
                </blockquote>

                <button v-if="isAdmin"
                        v-on:click="editAsAdmin(quote.id)"
                        type="button"
                        class="btn btn-outline-secondary btn-sm float-right r-edit-button">Редактировать
                </button>
            </div>
            <div v-if="!quotes.length">&lt;Пусто&gt;</div>
        </div>
    </div>
</template>

<script src="./quotes-page.js"></script>

<style scoped src="./quotes-page.scss" lang="scss"></style>
