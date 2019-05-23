<template>
    <div class="r-block">
        <h2>Обратная связь</h2>
        <br>
        <button v-on:click="clearFeedback"
                type="button"
                class="btn btn-outline-danger">Очистить обратную связь
        </button>
        <br><br>
        <div v-for="feedback in feedbackList"
             :class="feedback.unread ? 'border-warning': 'border-primary'"
             class="card mb-3">
            <div class="card-body">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="card-title">{{feedback.userName}}</h4>
                    <small>{{feedback.creationDate}}</small>
                </div>
                <h6 class="card-subtitle mb-2 text-muted">{{feedback.contacts}}</h6>
                <p class="card-text">{{feedback.body}}</p>
                <a href="#" class="card-link">{{feedback.subject}}</a>
                <div class="float-right">
                    <button v-if="feedback.unread"
                            v-on:click="markFeedbackAsRead(feedback.id)"
                            type="button"
                            class="btn btn-outline-secondary btn-sm r-button">Отметить просмотренным
                    </button>
                    <button v-on:click="deleteFeedback(feedback.id)"
                            type="button"
                            class="btn btn-outline-secondary btn-sm r-button">Удалить
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./feedback-list-page.js"></script>

<style scoped src="./feedback-list-page.scss" lang="scss"></style>
