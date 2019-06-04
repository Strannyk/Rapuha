import authMixin from '@/shared/mixins/auth-mixin';
import authService from '../services/auth-service';

export default {
  mixins: [authMixin],

  data() {
    return {
      menuOpen: false
    };
  },

  methods: {
    logOut: function () {
      authService.logOutAdmin();
      this.eventHub.$emit('logOut');

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
    },

    toggleMobileMenu: function (force) {
      if (force || document.querySelector('.navbar-collapse').style.display === 'block') {
        document.querySelector('.navbar-collapse').style.display = 'none';
      }
      else {
        document.querySelector('.navbar-collapse').style.display = 'block';
      }
    },

    closeMobileMenu: function () {
      this.toggleMobileMenu(true);
    }
  },

  mounted() {
    this.eventHub.$on('logIn', () => this.refreshIsAdmin());
  }
}
