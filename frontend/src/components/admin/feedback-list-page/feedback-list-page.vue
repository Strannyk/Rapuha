<template>
    <div class="r-block">
        <h2 v-text="'Отзывы' + (selectedUserName ? ' посетителя ' + selectedUserName : '')"></h2>
        <br>
        <div v-if="feedbackList.length">
            <button v-on:click="prepareFeedbackClearing"
                    v-text="'Удалить все отзывы' + (selectedUserName ? ' посетителя ' + selectedUserName : '')"
                    type="button"
                    class="btn btn-outline-danger">
            </button>
            <br><br>
        </div>
        <div v-for="feedback in feedbackList"
             :class="feedback.unread ? 'border-warning': 'border-primary'"
             class="card mb-3">
            <div class="card-body">
                <div class="d-flex w-100 justify-content-between">
                    <router-link :to="'/admin/feedback/' + feedback.userName"
                                 v-on:click.native="getListOfUserFeedback(feedback.userName)">
                        <h4 class="card-title">{{feedback.userName}}</h4>
                    </router-link>
                    <small>{{feedback.creationDate}}</small>
                </div>
                <h6 class="card-subtitle mb-2 text-muted">{{feedback.contacts}}</h6>
                <p class="card-text">{{feedback.body}}</p>
                <a href="#" class="card-link">{{feedback.subject}}</a>
                <div class="float-right">
                    <button ref="markButton"
                            v-if="feedback.unread"
                            v-on:click="markFeedbackAsRead(feedback.id)"
                            type="button"
                            class="btn btn-outline-secondary btn-sm r-button">Отметить просмотренным
                    </button>
                    <button v-on:click="prepareFeedbackDeleting(feedback.id)"
                            type="button"
                            class="btn btn-outline-secondary btn-sm r-button">Удалить
                    </button>
                </div>
            </div>
        </div>
        <div v-if="!feedbackList.length">&lt;Пусто&gt;</div>
        <item-action-result-modal ref="resultModal"
                                  :successResult="actionSuccess"
                                  :titleWording="clearingFeedbackMode ? 'Удаление отзывов' : 'Удаление отзыва'"
                                  :message="actionMessage"
                                  @close="onCloseResultModal">
        </item-action-result-modal>
        <item-deleting-confirm-modal ref="confirmModal"
                                     :titleWording="clearingFeedbackMode ? 'Удаление отзывов' : 'Удаление отзыва'"
                                     :bodyWording="clearingFeedbackMode ? 'Удалить все отзывы?' : 'Удалить отзыв?'"
                                     @confirm="onDeleteFeedback"
                                     @close="clearFeedbackSelection">
        </item-deleting-confirm-modal>
    </div>
</template>

<script src="./feedback-list-page.js"></script>

<style scoped src="./feedback-list-page.scss" lang="scss"></style>
