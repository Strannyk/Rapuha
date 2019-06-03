import coreMixin from '@/shared/mixins/core-mixin';
import authMixin from "@/shared/mixins/auth-mixin";
import BackButton from '../../shared/components/back-button/back-button.vue';
import dataService from "@/services/data-service";
import authService from "@/services/auth-service";

export default {
  mixins: [
    coreMixin,
    authMixin
  ],

  components: {
    BackButton
  },

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
    },

    backLinkWording: function () {
      if (this.$data.postsType === 'reflections') {
        return 'Все размышления';
      }
      else if (this.$data.postsType === 'stories') {
        return 'Все рассказы';
      }
    },

    adminEditLinkPath: function () {
      if (this.$data.postsType === 'reflections') {
        return 'reflection';
      }
      else if (this.$data.postsType === 'stories') {
        return 'story';
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

    refreshIsAdmin: function () {
      this.$data.isAdmin = authService.isAdmin();
    },

    blurLinks: function () {
      const links = document.querySelectorAll('.r-tag-link');
      links.forEach(link => link.blur());
    }
  },

  watch: {
    $route() {
      this.init();
      document.documentElement.scrollTop = 0;
    }
  },

  mounted() {
    this.init();
  }
}
