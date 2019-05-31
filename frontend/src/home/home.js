export default {
  methods: {
    init: function () {
      if (this.$router.history.current.name === 'home') {
        this.goToStartPage();
      }
    },

    goToStartPage: function () {
      this.$router.push({ name: 'start' });
    }
  },

  watch: {
    $route() {
      this.init();
    }
  },

  mounted() {
    this.init();
  }
}
