import Breadcrumbs from '@/shared/components/breadcrumbs/breadcrumbs.vue';

export default {
  components: {
    Breadcrumbs
  },

  data() {
    return {
      breadcrumbs: []
    };
  },

  methods: {
    initBreadcrumbs: function () {
      this.$data.breadcrumbs = this.$route.meta.breadcrumb;
    },

    handleActionError: function () {
      alert('Ошибка сети');
    },

    goToNotFoundPage: function () {
      this.$router.history.push({ name: '404' });
    }
  },

  mounted() {
    this.initBreadcrumbs();
  },

  watch: {
    $route() {
      this.initBreadcrumbs();
    }
  }
}
