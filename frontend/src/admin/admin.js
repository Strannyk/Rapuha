import AdminAuthModal from './components/admin-auth-modal/admin-auth-modal.vue';
import adminService from './services/admin-service';
import authService from '../common/services/auth-service';

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
    checkAdminRole: function () {
      if (!authService.isAdmin()) {
        this.openAuthModal();
      }
      else if (this.$router.history.current.name === 'admin') {
        this.routeAdminPage();
      }
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
        authService.authorizeAdmin(token);
        this.closeAuthModal();
        this.routeAdminPage();

        this.clearAuthModalValues();
        this.eventHub.$emit('authorized');
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
        this.goToManagePage();
      }
    },

    goToManagePage: function () {
      this.$router.push({ name: 'manage' });
    }
  },

  mounted() {
    this.checkAdminRole();
    this.eventHub.$on('tokenExpired', (singleMode = true) => this.openAuthModal(singleMode));
  }
}
