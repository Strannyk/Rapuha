<template>
    <div>
        <div v-if="contentIsLoaded" class="r-block">
            <div v-if="selectedTag">
                <back-button :path="postsType" :wording="backLinkWording"></back-button>
                <br><br>
            </div>

            <h2 v-html="titleWording + (selectedTag ? ' по тегу &laquo;' + selectedTag + '&raquo;' : '')"></h2>
            <br>

            <div v-for="post in posts" class="jumbotron">
                <div class="d-flex w-100 justify-content-between">
                    <router-link :to="'/post/' + post.title.replace(/\?/g, '%3F')">
                        <h3>{{post.title}}</h3>
                    </router-link>
                    <small>{{post.creationDate}}</small>
                </div>
                <br>
                <div v-html="post.body" class="lead"></div>
                <hr class="my-4">
                <router-link v-for="tag in post.tags" :to="'/' + postsType + '/tag/' + tag" class="r-tag-link">
                    {{tag}}
                </router-link>

                <div class="float-right link-button-container">
                    <router-link v-if="isAdmin"
                                 :to="'/admin/edit/' + adminEditLinkPath + '/' + post.title.replace(/\?/g, '%3F')">
                        <button type="button" class="btn btn-outline-secondary btn-sm">
                            Редактировать
                        </button>
                    </router-link>
                    <router-link :to="'/post/' + post.title.replace(/\?/g, '%3F') + '?feedback'">
                        <button type="button" class="btn btn-outline-secondary btn-sm">
                            Комментировать
                        </button>
                    </router-link>
                </div>
            </div>
            <div v-if="!posts.length">Здесь пока ничего нет</div>
        </div>
        <loader v-if="!contentIsLoaded"></loader>
    </div>
</template>

<script src="./posts-page.js"></script>
