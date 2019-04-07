<template>
    <div>
        <div>Admin</div>
        <admin-auth-modal ref="modal"
                          :disabled="sendingAuthRequest"
                          :isError="authError"
                          @submit="sendCredentials"
                          @onFocus="authError = false"
                          @close="goToHome"></admin-auth-modal>
    </div>
</template>

<script src="./admin.js"></script>
