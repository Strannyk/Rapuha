<template>
    <div>
        <div class="modal" :class="active ? 'active' : ''">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Войти, как Администратор</h5>
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
                                <label class="col-form-label" for="r-login">Логин</label>
                                <input type="text"
                                       placeholder="Логин"
                                       v-model="credentials.login"
                                       class="form-control"
                                       :class="isError ? 'is-invalid' : ''"
                                       v-on:focus="onFocus"
                                       id="r-login"
                                       autocomplete="off">
                            </fieldset>
                        </div>
                        <div class="form-group">
                            <fieldset :disabled="disabled">
                                <label class="col-form-label" for="r-password">Пароль</label>
                                <input type="password"
                                       placeholder="Пароль"
                                       v-model="credentials.password"
                                       class="form-control"
                                       :class="isError ? 'is-invalid' : ''"
                                       v-on:focus="onFocus"
                                       id="r-password"
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
                        <p class="text-danger" v-if="isError">Ошибка авторизации</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                ref="submitButton"
                                :disabled="!credentials.login || !credentials.password || disabled"
                                v-on:click="submit"
                                class="btn btn-primary">Войти
                        </button>
                        <button type="button"
                                :disabled="disabled"
                                v-on:click="close"
                                class="btn btn-secondary"
                                data-dismiss="modal">Отмена
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./admin-auth-modal.js"></script>

<style src="./admin-auth-modal.scss" lang="scss"></style>
