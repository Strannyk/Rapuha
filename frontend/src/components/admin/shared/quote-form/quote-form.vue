<template>
    <div class="r-block">
        <h2 v-text="newQuote ? 'Новая цитата' : 'Редактирование цитаты'"></h2>
        <div class="form-group">
            <label class="col-form-label" for="r-author">Автор</label>
            <input type="text"
                   placeholder="Автор"
                   v-model="data.author"
                   class="form-control"
                   id="r-author"
                   autocomplete="off">
        </div>
        <div class="form-group">
            <label for="r-body">Текст</label>
            <textarea placeholder="Текст"
                      v-model="data.body"
                      class="form-control"
                      id="r-body" rows="5"></textarea>
        </div>
        <div class="form-group form-button float-right">
            <button type="submit"
                    class="btn r-button"
                    :class="newQuote ? 'btn-primary' : 'btn-outline-success'"
                    :disabled="!data.body"
                    v-on:click="submit"
                    v-text="newQuote ? 'Создать цитату' : 'Сохранить'"></button>
            <button v-if="!newQuote"
                    type="button"
                    class="btn r-button btn-outline-danger"
                    v-on:click="deleteQuote">Удалить цитату
            </button>
        </div>
    </div>
</template>

<script src="./quote-form.js"></script>
