import authService from '../common/services/auth-service';

export default {
  data() {
    return {
      isAdmin: authService.isAdmin(),
      menuOpen: false
    };
  },

  methods: {
    refreshIsAdmin: function () {
      this.$data.isAdmin = authService.isAdmin();
    },

    logOut: function () {
      authService.removeToken();
      this.refreshIsAdmin();
      this.goToHomePage();
    },

    goToHomePage: function () {
      this.$router.push({ name: 'home' });
    }
  },

  mounted() {
    this.eventHub.$on('authorized', () => this.refreshIsAdmin());
  }
}
