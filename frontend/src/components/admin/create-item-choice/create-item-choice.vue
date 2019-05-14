<template>
    <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <router-link to="/admin/add/quote">
            <button type="button" class="btn btn-primary">Добавить цитату</button>
        </router-link>
        <router-link to="/admin/add/reflection">
            <button type="button" class="btn btn-primary">Добавить размышление</button>
        </router-link>
        <router-link to="/admin/add/story">
            <button type="button" class="btn btn-primary">Добавить рассказ</button>
        </router-link>
    </div>
</template>

<script src="./create-item-choice.js"></script>
