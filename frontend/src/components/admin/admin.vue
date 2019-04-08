<template>
    <div>
        <div>Admin</div>
        <admin-auth-modal ref="modal"
                          :disabled="sendingAuthRequest"
                          :errorMessage="authError"
                          @submit="sendCredentials"
                          @onFocus="authError = null"
                          @close="goToHome"></admin-auth-modal>
    </div>
</template>

<script src="./admin.js"></script>
