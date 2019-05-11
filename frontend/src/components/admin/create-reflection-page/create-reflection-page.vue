<template>
    <tagged-item-form ref="itemForm"
                      :newItem="true"
                      :titleWording="'Новое размышление'"
                      :createButtonWording="'размышление'"
                      @submit="save">
    </tagged-item-form>
</template>

<script src="./create-reflection-page.js"></script>
