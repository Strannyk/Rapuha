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
                        <div class="form-group">
                            <fieldset :disabled="disabled">
                                <label class="col-form-label" for="r-new-tag">Новый тег</label>
                                <input type="text"
                                       placeholder="Новый тег"
                                       v-model="newTag"
                                       class="form-control"
                                       :class="errorMessage ? 'is-invalid' : null"
                                       v-on:focus="onFocus"
                                       id="r-new-tag"
                                       autocomplete="off">
                            </fieldset>
                        </div>

                        <div v-if="disabled" class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated"
                                 role="progressbar"
                                 aria-valuenow="100"
                                 aria-valuemin="0"
                                 aria-valuemax="100"
                                 style="width: 100%"></div>
                        </div>
                        <p class="text-success" v-if="successMessage">{{successMessage}}</p>
                        <p class="text-danger" v-if="errorMessage">{{errorMessage}}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                ref="submitButton"
                                :disabled="!newTag || disabled"
                                v-on:click="submit"
                                class="btn btn-primary">Добавить
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

<script src="./add-tag-modal.js"></script>
