import AdminAuthModal from './components/admin-auth-modal/admin-auth-modal.vue';
import adminService from './services/admin-service';
import authService from '../common/services/auth-service';

export default {
  components: {
    AdminAuthModal
  },

  data() {
    return {
      isAdmin: authService.isAdmin(),
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
      this.$refs.authModal.open(singleMode);
    },

    closeAuthModal: function () {
      this.$refs.authModal.close();
    },

    clearAuthModalValues: function () {
      this.$refs.authModal.clearCredentials();
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
        authService.setToken(token);
        this.closeAuthModal();
        this.routeAdminPage();
        this.clearAuthModalValues();

        this.$data.isAdmin = true;
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

    onCloseAuthModel: function () {
      this.selectPath();
      this.eventHub.$emit('loggingOut');
    },

    selectPath: function () {
      const allowedNames = [
        'createReflection',
        'editReflection',
        'createStory',
        'editStory',
        'createQuote',
        'editQuote'
      ];

      if (!allowedNames.includes(this.$route.name)) {
        this.goToHomePage();
      }
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
