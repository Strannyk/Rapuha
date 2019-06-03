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
            <router-link v-for="tag in post.tags" :to="'/' + tagLinkPostTypePath + '/tag/' + tag" class="r-tag-link">
                {{tag}}
            </router-link>

            <div v-if="isAdmin" class="float-right">
                <router-link :to="'/admin/edit/' + post.type + '/' + post.title.replace(/\?/g, '%3F')">
                    <button type="button" class="btn btn-outline-secondary btn-sm">
                        Редактировать
                    </button>
                </router-link>
            </div>

            <div id="feedback-form">
                <user-feedback-form :postTitle="post.title"></user-feedback-form>
            </div>
        </div>
    </div>
</template>

<script src="./single-post-page.js"></script>
