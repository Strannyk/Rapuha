import AdminAuthModal from '../admin-auth-modal/admin-auth-modal.vue';

export default {
  components: {
    AdminAuthModal
  },

  data() {
    return {
      sendingAuthRequest: false,
      authError: false
    };
  },

  methods: {
    checkToken: function () {
      if (!localStorage.getItem('token')) {
        this.openAuthModal();
      }
    },

    openAuthModal: function () {
      this.$refs.modal.open();
    },

    sendCredentials: function (data) {
      this.$data.sendingAuthRequest = true;
      this.$http.post(this.baseUrl + 'admin/auth', {
        login: data.login,
        password: data.password
      }).then(res => console.log(res),
        err => console.log(err));

      // setTimeout(() => {
      //   this.$data.authError = true;
      //   this.$data.sendingAuthRequest = false;
      // }, 5000);

      console.log(data);
    },

    goToHome: function () {
      this.$router.push('/');
    }
  },

  mounted() {
    this.checkToken();
  }
}
