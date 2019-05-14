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
        <button type="submit"
                class="btn btn-primary float-right r-button"
                :disabled="!data.body"
                v-on:click="submit"
                v-text="newQuote ? 'Создать цитату' : 'Сохранить'"></button>
    </div>
</template>

<script src="./quote-form.js"></script>
