<template>
    <div>
        <div>Admin</div>
        <router-view/>
        <admin-auth-modal ref="modal"
                          :disabled="sendingAuthRequest"
                          :errorMessage="authError"
                          @submit="sendCredentials"
                          @onFocus="authError = null"
                          @close="goToHomePage"></admin-auth-modal>
    </div>
</template>

<script src="./admin.js"></script>
