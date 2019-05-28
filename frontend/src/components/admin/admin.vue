<template>
    <div>
        <router-view/>
        <admin-auth-modal ref="modal"
                          :disabled="sendingAuthRequest"
                          :errorMessage="authError"
                          @submit="sendCredentials"
                          @focus="authError = null"
                          @close="selectPath">
        </admin-auth-modal>
    </div>
</template>

<script src="./admin.js"></script>
