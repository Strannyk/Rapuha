import TaggedItemForm from '../shared/tagged-item-form/tagged-item-form.vue';
import adminService from '../services/admin-service';
import commonService from '@/common/services/common-service';

export default {
  components: {
    TaggedItemForm
  },

  data() {
    return {
      postType: null,
      editPostSuccess: null,
      editPostMessage: null
    };
  },

  methods: {
    getPostTitle: function () {
      return this.$router.history.current.params.title;
    },

    getDbData: function (title) {
      const getPost = commonService.getPost.bind(this, title);
      getPost().then(res => this.$refs.itemForm.setData(res.body.data),
        () => console.log('err'))
        .catch(err => console.log(err));
    },

    save: function () {
      const post = this.$refs.itemForm.getData();
      post.data.title = post.title;
      post.title = this.getPostTitle();

      const updatePost = adminService.updatePost.bind(this, post.title, post.data);
      updatePost().then(res => console.log(res.body),
        () => console.log('err'))
        .catch(err => console.log(err));
    }
  },

  mounted() {
    const postType = this.$router.history.current.name;
    const postTitle = this.getPostTitle();

    this.$data.postType = postType === 'editReflection' ? 'reflection' : 'story';
    this.getDbData(postTitle);
  }
}
