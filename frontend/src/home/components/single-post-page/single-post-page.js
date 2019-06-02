import coreMixin from '@/shared/mixins/core-mixin';
import UserFeedbackForm from './user-feedback-form/user-feedback-form.vue';
import dataService from "@/services/data-service";

export default {
  mixins: [coreMixin],

  components: {
    UserFeedbackForm
  },

  data() {
    return {
      post: null,
      contentIsLoaded: false
    };
  },

  computed: {
    postTypeWording: function () {
      const postType = this.$data.post.type;

      if (postType === 'reflection') {
        return 'Размышление';
      }
      else if (postType === 'story') {
        return 'Рассказ';
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
      const postTitle = this.$route.params.title;
      this.getPost(postTitle);
    },

    getPost: function (title) {
      const getPost = dataService.getPost.bind(this, title);
      getPost().then(res => this.handleGetPostsSuccess(res.body),
        () => this.handleActionError())
        .catch(err => console.log(err))
        .finally(() => this.$data.contentIsLoaded = true);
    },

    handleGetPostsSuccess: function (response) {
      this.$data.post = response.data;
    }
  },

  mounted() {
    this.init();
  }
}
