import authService from '../services/auth-service';

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
      authService.logOutAdmin();
      this.refreshIsAdmin();

      if (this.$route.path.split('/')[1] === 'admin') {
        this.goToHomePage();
      }
    },

    goToHomePage: function () {
      this.$router.push({ name: 'home' });
    },

    blurLinks: function () {
      const links = document.querySelectorAll('.nav-link');
      links.forEach(link => link.blur());
    }
  },

  mounted() {
    this.eventHub.$on('authorized', () => this.refreshIsAdmin());
    this.eventHub.$on('loggingOut', () => this.refreshIsAdmin());
  }
}
