<template>
    <div class="feedback-form">
        <fieldset>
            <legend>Оставьте комментарий</legend>
            <div class="form-group">
                <label for="r-name">Ваше имя</label>
                <input v-model="data.userName"
                       v-on:focus="clearData"
                       type="text"
                       class="form-control"
                       id="r-name"
                       placeholder="Имя">
            </div>
            <div class="form-group">
                <label for="r-feedback">Ваш комментарий</label>
                <textarea v-model="data.feedbackText"
                          v-on:focus="clearData"
                          class="form-control"
                          id="r-feedback"
                          rows="5"
                          placeholder="Комментарий">
                </textarea>
            </div>
            <div class="form-group">
                <label for="r-contacts">Как с вами свзязаться (не обязательно)</label>
                <textarea v-model="data.contacts"
                          v-on:focus="clearData"
                          class="form-control"
                          id="r-contacts"
                          rows="2"
                          placeholder="Контактные данные">
                </textarea>
            </div>
            <div class="text-success" v-if="sendingSuccess">{{message}}</div>
            <div class="text-danger" v-if="sendingError">{{message}}</div>
            <div class="form-group form-button">
                <button :disabled="!data.userName.trim() || !data.feedbackText.trim()"
                        v-on:click="send"
                        type="submit"
                        class="btn btn-primary float-right r-button">Отправить
                </button>
            </div>
        </fieldset>
    </div>
</template>

<script src="./user-feedback-form.js"></script>

<style scoped src="./user-feedback-form.scss" lang="scss"></style>
