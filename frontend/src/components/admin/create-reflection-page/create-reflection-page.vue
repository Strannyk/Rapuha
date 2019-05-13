<template>
    <div>
        <tagged-item-form ref="itemForm"
                          :newItem="true"
                          :titleWording="'Новое размышление'"
                          :createButtonWording="'размышление'"
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

<script src="./create-reflection-page.js"></script>
