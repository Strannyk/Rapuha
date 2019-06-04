import coreMixin from '@/shared/mixins/core-mixin';
import authMixin from "@/shared/mixins/auth-mixin";
import UserFeedbackForm from './user-feedback-form/user-feedback-form.vue';
import BackButton from '../../shared/components/back-button/back-button.vue';
import Loader from '../../shared/components/loader/loader.vue';
import dataService from "@/services/data-service";
import authService from "@/services/auth-service";

export default {
  mixins: [
    coreMixin,
    authMixin
  ],

  components: {
    UserFeedbackForm,
    BackButton,
    Loader
  },

  data() {
    return {
      post: null,
      contentIsLoaded: false
    };
  },

  computed: {
    backLinkWording: function () {
      const postType = this.$data.post.type;

      if (postType === 'reflection') {
        return 'Все размышления';
      }
      else if (postType === 'story') {
        return 'Все рассказы';
      }
    },

    tagLinkPostTypePath: function () {
      const postType = this.$data.post.type;

      if (postType === 'reflection') {
        return 'reflections';
      }
      else if (postType === 'story') {
        return 'stories';
      }
    }
  },

  methods: {
    init: function () {
      const postTitle = this.$route.params.title.replace(/\?/g, '%3F');
      this.getPost(postTitle);
    },

    getPost: function (title) {
      const getPost = dataService.getPost.bind(this, title);
      getPost().then(res => this.handleGetPostsSuccess(res.body),
        () => this.handleActionError())
        .catch(err => console.log(err));
    },

    handleGetPostsSuccess: function (response) {
      if (response.data) {
        this.$data.post = response.data;
        this.$data.contentIsLoaded = true;
        this.checkQueryParams();
      }
      else {
        this.goToNotFoundPage();
      }
    },

    checkQueryParams: function () {
      const scrollToFeedbackQueryParam = 'feedback';

      if (scrollToFeedbackQueryParam in this.$route.query) {
        setTimeout(() => this.scrollToFeedbackForm());
      }
    },

    scrollToFeedbackForm: function () {
      const vueScrollTo = require('vue-scrollto');
      vueScrollTo.scrollTo('#feedback-form', 500);
    },

    refreshIsAdmin: function () {
      this.$data.isAdmin = authService.isAdmin();
    }
  },

  mounted() {
    this.init();
  }
}
