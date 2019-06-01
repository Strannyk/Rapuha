<template>
    <div class="r-block">
        <h2 v-text="titleWording + (selectedTag ? ' по тегу ' + selectedTag : '')"></h2>
        <br>
        <div v-if="contentIsLoaded">
            <div v-for="post in posts" class="jumbotron">
                <div class="d-flex w-100 justify-content-between">
                    <router-link :to="'/post/' + post.title">
                        <h3>{{post.title}}</h3>
                    </router-link>
                    <small>{{post.creationDate}}</small>
                </div>
                <br>
                <div v-html="post.body" class="lead"></div>
                <hr class="my-4">
                <router-link :to="'/' + postsType + '/tag/' + tag" v-for="tag in post.tags" class="r-tag-link">
                    {{tag}}
                </router-link>
            </div>
            <div v-if="!posts.length">&lt;Пусто&gt;</div>
        </div>
    </div>
</template>

<script src="./posts-page.js"></script>
