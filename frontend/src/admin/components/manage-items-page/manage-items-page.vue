<template>
    <div class="r-block r-center">
        <h2>Администрирование</h2>
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <div>
                <router-link to="/admin/reflections">
                    <button type="button" class="btn btn-primary btn-lg btn-block r-button">Размышления</button>
                </router-link>
                <router-link to="/admin/quotes">
                    <button type="button" class="btn btn-primary btn-lg btn-block r-button">Цитаты</button>
                </router-link>
            </div>
            <div>
                <router-link to="/admin/stories">
                    <button type="button" class="btn btn-primary btn-lg btn-block r-button">Рассказы</button>
                </router-link>
                <router-link to="/admin/feedback">
                    <button type="button" class="btn btn-primary btn-lg btn-block r-button">Обратная связь</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped src="./manage-items-page.scss" lang="scss"></style>
