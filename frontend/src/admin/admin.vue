<template>
    <div>
        <div v-if="isAdmin">
            <router-view/>
        </div>
        <admin-auth-modal ref="authModal"
                          :disabled="sendingAuthRequest"
                          :errorMessage="authError"
                          @submit="sendCredentials"
                          @focus="authError = null"
                          @close="onCloseAuthModel">
        </admin-auth-modal>
    </div>
</template>

<script src="././admin.js"></script>
