<template>
    <div class="r-block">
        <h2>{{titleWording}}</h2>
        <br>
        <table v-if="postsTitles.length" class="table table-hover r-table">
            <thead>
            <tr>
                <th scope="col">Название</th>
                <th scope="col">Дата создания</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(post, index) in postsTitles"
                class="r-row"
                :class="index % 2 === 0 ? 'table-primary' : ''">
                <td>{{post.title}}</td>
                <td>{{post.creationDate}}</td>
            </tr>
            </tbody>
        </table>
        <div v-if="!postsTitles.length">&lt;Пусто&gt;</div>
    </div>
</template>

<script src="./posts-list-page.js"></script>

<style src="./posts-list-page.scss" lang="scss"></style>
