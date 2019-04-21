<template>
    <div class="r-block">
        <h2>{{titleWording}}</h2>
        <div class="form-group">
            <label class="col-form-label" for="r-title">Название</label>
            <input type="text"
                   placeholder="Название"
                   v-model="data.title"
                   class="form-control"
                   id="r-title"
                   autocomplete="off">
        </div>

        <div class="form-group">
            <label for="r-body">Текст</label>
            <textarea placeholder="Текст"
                      v-model="data.body"
                      class="form-control"
                      id="r-body" rows="15"></textarea>
        </div>

        <div class="form-group">
            <label>Тег(и)</label>
            <multi-select :options="allTags"
                          :selectedOptions="data.tags"
                          :isDisabled="!allTags.length"
                          @select="onSelectTags"
                          placeholder="Не выбрано">
            </multi-select>
        </div>

        <div class="form-group form-button">
            <button class="btn btn-outline-secondary float-right r-button"
                    :disabled="tagsEditMode"
                    v-on:click="tagsEditMode = true">Управлять тегами
            </button>
        </div>

        <div v-if="tagsEditMode" class="r-block-separate">
            <h4>Управление тегами</h4>

            <tag-control-form @close="closeTagManagePanel"></tag-control-form>

            <div class="tag-items" :class="allTags.length >= 10 ? 'full-form' : ''">
                <div v-for="(tag, index) in allTags" class="form-group">
                    <input type="text"
                           :readonly="!tag.changed"
                           v-model="tag.text"
                           class="form-control tag-edit-input"
                           autocomplete="off">
                    <button type="button"
                            class="btn btn-outline-success tag-edit-button"
                            v-on:click="tag.changed = false"
                            :disabled="!tag.changed">Сохранить
                    </button>
                    <button type="button"
                            class="btn btn-outline-info tag-edit-button"
                            v-on:click="tag.changed = true">Переименовать
                    </button>
                    <button type="button"
                            class="btn btn-outline-danger tag-edit-button"
                            v-on:click="allTags.splice(index, 1)">Удалить
                    </button>
                </div>
            </div>

            <tag-control-form v-if="allTags.length >= 10"
                              @close="closeTagManagePanel">
            </tag-control-form>
        </div>

        <div class="form-group form-button">
            <button type="submit"
                    class="btn btn-primary float-right r-button"
                    :disabled="!data.tags.length || !data.title || !data.body"
                    v-on:click="submit"
                    v-text="newItem ? 'Создать ' + createButtonWording : 'Сохранить'"></button>
        </div>
    </div>
</template>

<script src="./tagged-item-form.js"></script>

<style src="./tagged-item-form.scss" lang="scss"></style>
