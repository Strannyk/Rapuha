<template>
    <div>
        <tagged-item-form ref="itemForm"
                          :newItem="false"
                          :titleWording="postType === 'reflection' ? 'Редактирование размышления' : 'Редактирование рассказа'"
                          :submitButtonWording="postType === 'reflection' ? 'размышление' : 'рассказ'"
                          @submit="save"
                          @cancel="goToPostsList">
        </tagged-item-form>
        <item-action-result-modal ref="modal"
                                  :postType="postType"
                                  :actionType="'editing'"
                                  :successResult="editPostSuccess"
                                  :message="editPostMessage"
                                  @close="onCloseModal">
        </item-action-result-modal>
    </div>
</template>

<script src="./edit-post-page.js"></script>
