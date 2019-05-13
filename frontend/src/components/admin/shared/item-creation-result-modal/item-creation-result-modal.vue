<template>
    <div v-if="active">
        <div class="modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Добавить тег</h5>
                        <button v-on:click="close"
                                type="button"
                                class="close"
                                :disabled="disabled"
                                data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p class="text-success" v-if="successMessage">{{successMessage}}</p>
                        <p class="text-danger" v-if="errorMessage">{{errorMessage}}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                ref="submitButton"
                                :disabled="!newTag || disabled"
                                v-on:click="submit"
                                class="btn btn-primary">На панель администратора
                        </button>
                        <button type="button"
                                :disabled="disabled"
                                v-on:click="close"
                                class="btn btn-secondary"
                                data-dismiss="modal">Создать
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="r-overlay"></div>
    </div>
</template>

<script src="./item-creation-result-modal.js"></script>
