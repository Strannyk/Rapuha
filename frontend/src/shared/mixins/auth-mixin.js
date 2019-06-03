import authService from "@/services/auth-service";

export default {
  data() {
    return {
      isAdmin: authService.isAdmin()
    };
  },

  methods: {
    refreshIsAdmin: function () {
      this.$data.isAdmin = authService.isAdmin();
    }
  },

  mounted() {
    this.eventHub.$on('logOut', () => this.refreshIsAdmin());
  }
}
