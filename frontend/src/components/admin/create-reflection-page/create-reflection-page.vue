<template>
    <div>
        <tagged-item-form ref="itemForm"
                          :newItem="true"
                          :titleWording="'Новое размышление'"
                          :createButtonWording="'размышление'"
                          @submit="save">
        </tagged-item-form>
        <item-creation-result-modal ref="modal"
                                    @close="clearFormData">
        </item-creation-result-modal>
    </div>
</template>

<script src="./create-reflection-page.js"></script>
