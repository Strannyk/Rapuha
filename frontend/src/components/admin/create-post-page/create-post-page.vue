<template>
    <div>
        <tagged-item-form ref="itemForm"
                          :newItem="true"
                          :titleWording="postType === 'reflection' ? 'Новое размышление' : 'Новый рассказ'"
                          :submitButtonWording="postType === 'reflection' ? 'размышление' : 'рассказ'"
                          @submit="save"
                          @cancel="goToPostsList">
        </tagged-item-form>
        <item-action-result-modal ref="modal"
                                  :successResult="createPostSuccess"
                                  :titleWording="createPostTitleWording"
                                  :message="createPostMessage"
                                  @close="onCloseResultModal">
        </item-action-result-modal>
    </div>
</template>

<script src="./create-post-page.js"></script>
