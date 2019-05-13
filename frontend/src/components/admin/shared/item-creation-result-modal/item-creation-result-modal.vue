<template>
    <div v-if="active">
        <div class="modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 v-text="'Создание ' + (postType === 'reflection' ? 'размышления' : 'истории')"
                            class="modal-title"></h5>
                        <button v-on:click="close"
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p :class="successResult ? 'text-success' : 'text-danger'">{{message}}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                ref="submitButton"
                                :disabled="!successResult"
                                v-on:click="goToAdminPanel"
                                class="btn btn-primary">На панель администратора
                        </button>
                        <button type="button"
                                :disabled="disabled"
                                v-on:click="close"
                                class="btn btn-secondary"
                                data-dismiss="modal">Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="r-overlay"></div>
    </div>
</template>

<script src="./item-creation-result-modal.js"></script>
