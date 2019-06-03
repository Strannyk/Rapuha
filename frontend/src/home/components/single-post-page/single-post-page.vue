<template>
    <div v-if="contentIsLoaded" class="r-block">
        <back-button :path="tagLinkPostTypePath" :wording="backLinkWording"></back-button>
        <br><br>

        <div class="jumbotron">
            <div class="d-flex w-100 justify-content-between">
                <h2>{{post.title}}</h2>
                <small>{{post.creationDate.replace(/-/g, '.')}}</small>
            </div>
            <br>
            <div v-html="post.body" class="lead"></div>
            <hr class="my-4">
            <router-link :to="'/' + tagLinkPostTypePath + '/tag/' + tag" v-for="tag in post.tags" class="r-tag-link">
                {{tag}}
            </router-link>

            <user-feedback-form :postTitle="post.title"></user-feedback-form>
        </div>
    </div>
</template>

<script src="./single-post-page.js"></script>
