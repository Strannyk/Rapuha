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
