import coreMixin from '@/shared/mixins/core-mixin/core-mixin';
import dataService from "@/services/data-service";

export default {
  mixins: [coreMixin],

  data() {
    return {
      postsType: null,
      selectedTag: null,
      posts: [],
      contentIsLoaded: false
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
      const tag = this.$route.params.tag;

      this.$data.postsType = postType.includes('reflections') ? 'reflections' : 'stories';
      this.$data.selectedTag = tag || null;
      this.getPosts(this.$data.postsType, tag);
    },

    getPosts: function (type, tag) {
      type = type === 'reflections' ? 'reflection' : 'story';

      const getPosts = tag
        ? dataService.getPostsByTag.bind(this, type, tag)
        : dataService.getPostsList.bind(this, type);

      getPosts().then(res => this.handleGetPostsSuccess(res.body),
        () => this.handleActionError())
        .catch(err => console.log(err))
        .finally(() => this.$data.contentIsLoaded = true);
    },

    handleGetPostsSuccess: function (response) {
      const posts = response.data;

      if (Array.isArray(posts)) {
        this.$data.posts = posts;
        this.blurLinks();
      }
    },

    blurLinks: function () {
      const links = document.querySelectorAll('.r-tag-link');
      links.forEach(link => link.blur());
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
