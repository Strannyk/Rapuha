import coreMixin from '@/shared/mixins/core-mixin/core-mixin';
import dataService from "@/services/data-service";

export default {
  mixins: [coreMixin],

  data() {
    return {
      postsType: null,
      posts: []
    };
  },

  computed: {
    titleWording: function () {
      if (this.$data.postsType === 'reflections') {
        return 'Размышления';
      }
      else if (this.$data.postsType === 'stories') {
        return 'Рассказы';
      }
    }
  },

  methods: {
    init: function () {
      const postType = this.$router.history.current.name;
      this.$data.postsType = postType === 'reflections' ? 'reflections' : 'stories';
      this.getPosts(this.$data.postsType);
    },

    getPosts: function (type) {
      type = type === 'reflections' ? 'reflection' : 'story';

      const getPosts = dataService.getPostsList.bind(this, type);
      getPosts().then(res => this.handleGetPostsSuccess(res.body),
        () => this.handleActionError())
        .catch(err => console.log(err));
    },

    handleGetPostsSuccess: function (response) {
      const posts = response.data;

      if (Array.isArray(posts)) {
        this.$data.posts = posts;
      }
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
