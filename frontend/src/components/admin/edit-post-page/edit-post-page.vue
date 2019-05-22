<template>
    <div>
        <tagged-item-form ref="itemForm"
                          :newItem="false"
                          :titleWording="postType === 'reflection'
                          ? 'Редактирование размышления' : 'Редактирование рассказа'"
                          :submitButtonWording="postType === 'reflection' ? 'размышление' : 'рассказ'"
                          @submit="save"
                          @delete="openConfirmModal"
                          @cancel="goToPostsList">
        </tagged-item-form>
        <item-action-result-modal ref="resultModal"
                                  :postType="postType"
                                  :actionType="actionType"
                                  :successResult="actionSuccess"
                                  :message="actionMessage"
                                  @close="onCloseResultModal">
        </item-action-result-modal>
        <item-deleting-confirm-modal ref="confirmModal"
                                     :postType="postType"
                                     @confirm="deleteItem">
        </item-deleting-confirm-modal>
    </div>
</template>

<script src="./edit-post-page.js"></script>
