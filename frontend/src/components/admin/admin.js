import AdminAuthModal from './admin-auth-modal/admin-auth-modal.vue';
import adminService from './services/admin-service';

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
      else if (this.$router.history.current.name === 'admin') {
        this.routeAdminPage();
      }
    },

    writeToken: function (token) {
      localStorage.setItem('token', token);
    },

    openAuthModal: function (singleMode = true) {
      this.$refs.modal.open(singleMode);
    },

    closeAuthModal: function () {
      this.$refs.modal.close();
    },

    clearAuthModalValues: function () {
      this.$refs.modal.clearCredentials();
    },

    sendCredentials: function (data) {
      this.$data.sendingAuthRequest = true;

      const authAdmin = adminService.authAdmin.bind(this, data.login, data.password);
      authAdmin().then(res => this.handleAuthResponse(res.body),
        () => this.handleAuthError())
        .catch(err => console.log(err));
    },

    handleAuthResponse: function (response) {
      const token = response.token;
      const error = response.error;

      if (token) {
        this.writeToken(token);
        this.closeAuthModal();
        this.routeAdminPage();

        this.clearAuthModalValues();
      }
      else if (error) {
        this.$data.authError = error;
      }

      this.$data.sendingAuthRequest = false;
    },

    handleAuthError: function () {
      this.$data.sendingAuthRequest = false;
      alert('Ошибка сети.');
      this.goToHomePage();
    },

    selectPath: function () {
      // add condition
      // this.goToHomePage();
    },

    goToHomePage: function () {
      this.$router.push({ name: 'home' });
    },

    routeAdminPage: function () {
      if (this.$router.history.current.name === 'admin') {
        this.goToCreationPage();
      }
    },

    goToCreationPage: function () {
      this.$router.push({ name: 'creation' });
    }
  },

  mounted() {
    this.checkToken();
    this.eventHub.$on('tokenExpired', () => this.openAuthModal(false));
  }
}
