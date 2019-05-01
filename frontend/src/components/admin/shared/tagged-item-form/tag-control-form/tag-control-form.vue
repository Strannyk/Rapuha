<template>
    <div class="float-right">
        <div class="form-group form-button">
            <button type="button"
                    class="btn btn-outline-secondary btn-sm"
                    v-on:click="openAddTagModal">Добавить тег
            </button>
            <button type="button"
                    class="btn btn-outline-secondary btn-sm"
                    v-on:click="onClose">Закрыть
            </button>
        </div>
        <add-tag-modal ref="modal"
                       :disabled="sendingAddTagRequest"
                       :successMessage="addTagSuccess"
                       :errorMessage="addTagError"
                       @addTag="onAddTag"
                       @close="clearAddTagResults"
                       @focus="clearAddTagResults">
        </add-tag-modal>
    </div>
</template>

<script src="./tag-control-form.js"></script>

<style scoped src="./tag-control-form.scss" lang="scss"></style>
