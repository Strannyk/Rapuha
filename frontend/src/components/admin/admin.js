import AdminAuthModal from '../admin-auth-modal/admin-auth-modal.vue';

export default {
  components: {
    AdminAuthModal
  },

  data() {
    return {
      sendingAuthRequest: false,
      authError: null
    };
  },

  methods: {
    checkToken: function () {
      if (!localStorage.getItem('token')) {
        this.openAuthModal();
      }
    },

    writeToken: function (token) {
      localStorage.setItem('token', token);
    },

    openAuthModal: function () {
      this.$refs.modal.open();
    },

    closeAuthModal: function () {
      this.$refs.modal.close();
    },

    sendCredentials: function (data) {
      this.$data.sendingAuthRequest = true;
      this.$http.post(this.baseUrl + 'admin/auth', {
        login: data.login,
        password: data.password
      }).then(res => this.handleAuthResponse(res.body),
        () => this.handleAuthError());
    },

    handleAuthResponse: function (response) {
      const token = response.token;
      const error = response.error;

      if (token) {
        this.writeToken(token);
        this.closeAuthModal();
      }
      else if (error) {
        this.$data.authError = error;
      }

      this.$data.sendingAuthRequest = false;
    },

    handleAuthError: function () {
      this.$data.sendingAuthRequest = false;
      alert('Ошибка сети.');
      this.goToHome();
    },

    goToHome: function () {
      this.$router.push('/');
    }
  },

  mounted() {
    this.checkToken();
  }
}
