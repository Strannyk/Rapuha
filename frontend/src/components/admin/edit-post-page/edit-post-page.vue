<template>
    <div>
        <tagged-item-form ref="itemForm"
                          :newItem="false"
                          :titleWording="postType === 'reflection' ? 'Редактирование размышления' : 'Редактирование рассказа'"
                          :submitButtonWording="postType === 'reflection' ? 'размышление' : 'рассказ'"
                          @submit="save">
        </tagged-item-form>
    </div>
</template>

<script src="./edit-post-page.js"></script>
