<template>
    <div class="r-block">
        <h2>{{titleWording}}</h2>
        <div class="form-group">
            <label class="col-form-label" for="r-title">Название</label>
            <input type="text"
                   placeholder="Название"
                   v-model="data.title"
                   v-on:input="onChange"
                   class="form-control"
                   id="r-title"
                   autocomplete="off">
        </div>

        <div class="form-group">
            <label for="r-body">Текст</label>
            <textarea placeholder="Текст"
                      v-model="data.body"
                      v-on:input="onChange"
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

            <tag-control-form @tagAdded="getAllTags"
                              @close="closeTagManagePanel"></tag-control-form>

            <div v-if="allTags.length === 0">Нет тегов</div>

            <div class="tag-items" :class="allTags.length >= 10 ? 'full-form' : ''">
                <div v-for="(tag, index) in allTags" class="form-group">
                    <input type="text"
                           :readonly="!tag.changing"
                           v-model="tag.value"
                           class="form-control tag-edit-input"
                           autocomplete="off">
                    <button type="button"
                            class="btn btn-outline-success tag-edit-button"
                            v-on:click="updateTag(index)"
                            :disabled="!tag.changing">Сохранить
                    </button>
                    <button type="button"
                            class="btn btn-outline-info tag-edit-button"
                            v-on:click="tag.changing = true">Переименовать
                    </button>
                    <button type="button"
                            class="btn btn-outline-danger tag-edit-button"
                            v-on:click="deleteTag(index)">Удалить
                    </button>
                </div>
            </div>

            <div class="bottom-form-group">
                <tag-control-form v-if="allTags.length >= 10"
                                  @tagAdded="getAllTags"
                                  @close="closeTagManagePanel">
                </tag-control-form>
            </div>
        </div>

        <div class="form-group form-button float-right">
            <button type="submit"
                    class="btn r-button"
                    :class="newItem ? 'btn-primary' : 'btn-outline-success'"
                    :disabled="!data.tags.length || !data.title || !data.body || (!newItem && !dataIsChanged)"
                    v-on:click="submit"
                    v-text="(newItem ? 'Создать ' : 'Сохранить ') + submitButtonWording"></button>
            <button v-if="!newItem"
                    type="button"
                    class="btn r-button btn-outline-danger"
                    v-on:click="deleteItem"
                    v-text="'Удалить ' + submitButtonWording"></button>
            <button type="button"
                    class="btn r-button"
                    :class="newItem ? 'btn-secondary' : 'btn-outline-secondary'"
                    v-on:click="cancel">Отмена
            </button>
        </div>
    </div>
</template>

<script src="./tagged-item-form.js"></script>

<style src="./tagged-item-form.scss" lang="scss"></style>
