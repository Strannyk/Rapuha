import Breadcrumbs from '@/components/shared/breadcrumbs/breadcrumbs.vue';

export default {
  components: {
    Breadcrumbs
  },

  data() {
    return {
      breadcrumbs: []
    }
  },

  mounted() {
    this.$data.breadcrumbs = this.$route.meta.breadcrumb;
  }
}
