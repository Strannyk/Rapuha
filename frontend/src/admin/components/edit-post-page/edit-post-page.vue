<template>
    <div>
        <breadcrumbs :list="breadcrumbs"></breadcrumbs>
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
                                  :successResult="actionSuccess"
                                  :titleWording="actionResultModalTitleWording"
                                  :message="actionMessage"
                                  @close="onCloseResultModal">
        </item-action-result-modal>
        <item-deleting-confirm-modal ref="confirmModal"
                                     :titleWording="deletingModalTitleWording"
                                     :bodyWording="deletingModalBodyWording"
                                     @confirm="deleteItem">
        </item-deleting-confirm-modal>
    </div>
</template>

<script src="./edit-post-page.js"></script>
