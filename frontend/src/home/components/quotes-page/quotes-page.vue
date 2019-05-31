<template>
    <div class="r-block">
        <h2>Цитаты</h2>
        <br>
        <div v-if="contentIsLoaded">
            <div v-for="quote in quotes" class="jumbotron">
                <blockquote class="blockquote">
                    <p v-html="quote.body" class="lead mb-0"></p>
                    <footer class="blockquote-footer">
                        <cite title="Source Title">quote.author</cite>
                    </footer>
                </blockquote>
            </div>
            <div v-if="!quotes.length">&lt;Пусто&gt;</div>
        </div>
    </div>
</template>

<script src="./quotes-page.js"></script>
