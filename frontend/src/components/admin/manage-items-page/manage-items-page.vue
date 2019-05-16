<template>
    <div class="r-block r-center">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <router-link to="/admin/quotes">
                <button type="button" class="btn btn-primary">Цитаты</button>
            </router-link>
            <router-link to="/admin/reflections">
                <button type="button" class="btn btn-primary">Размышления</button>
            </router-link>
            <router-link to="/admin/stories">
                <button type="button" class="btn btn-primary">Рассказы</button>
            </router-link>
        </div>
    </div>
</template>

<script src="./manage-items-page.js"></script>
