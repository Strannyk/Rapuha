<template>
    <div>
        <tagged-item-form ref="itemForm"
                          :newItem="true"
                          :titleWording="postType === 'reflection' ? 'Новое размышление' : 'Новый рассказ'"
                          :submitButtonWording="postType === 'reflection' ? 'размышление' : 'рассказ'"
                          @submit="save">
        </tagged-item-form>
        <item-creation-result-modal ref="modal"
                                    :postType="postType"
                                    :successResult="createPostSuccess"
                                    :message="createPostMessage"
                                    @close="onCloseModal">
        </item-creation-result-modal>
    </div>
</template>

<script src="./create-post-page.js"></script>
