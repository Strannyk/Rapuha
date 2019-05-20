<template>
    <div>
        <tagged-item-form ref="itemForm"
                          :newItem="true"
                          :titleWording="postType === 'reflection' ? 'Новое размышление' : 'Новый рассказ'"
                          :submitButtonWording="postType === 'reflection' ? 'размышление' : 'рассказ'"
                          @submit="save">
        </tagged-item-form>
        <item-action-result-modal ref="modal"
                                  :postType="postType"
                                  :actionType="'creation'"
                                  :successResult="createPostSuccess"
                                  :message="createPostMessage"
                                  @close="onCloseModal">
        </item-action-result-modal>
    </div>
</template>

<script src="./create-post-page.js"></script>
