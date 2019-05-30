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
    }
  },

  mounted() {
    this.eventHub.$on('authorized', () => this.refreshIsAdmin());
  }
}
