<template>
    <div v-if="contentIsLoaded" class="r-block jumbotron">
        <div class="d-flex w-100 justify-content-between">
            <h2 v-html="postTypeWording + ' &laquo;' + post.title + '&raquo;'"></h2>
            <small>{{post.creationDate}}</small>
        </div>
        <br>
        <div v-html="post.body" class="lead"></div>
        <hr class="my-4">
        <router-link :to="'/' + tagLinkPostTypePath + '/tag/' + tag" v-for="tag in post.tags" class="r-tag-link">
            {{tag}}
        </router-link>
    </div>
</template>

<script src="./single-post-page.js"></script>
