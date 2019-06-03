<template>
    <div v-if="contentIsLoaded" class="r-block">
        <button type="button" class="btn btn-primary btn-sm breadcrumb-button">
            <router-link :to="'/' + tagLinkPostTypePath" class="back-link">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 492 492" style="enable-background:new 0 0 492 492;" xml:space="preserve">
                    <g><path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12
			C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084
			c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864
			l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"/></g>
                </svg>
                {{backLinkWording}}
            </router-link>
        </button>
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

<style scoped src="./single-post-page.scss" lang="scss"></style>
