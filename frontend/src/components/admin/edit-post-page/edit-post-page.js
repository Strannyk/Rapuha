import TaggedItemForm from '../shared/tagged-item-form/tagged-item-form.vue';
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
    getDbData: function (title) {
      const getPost = commonService.getPost.bind(this, title);
      getPost().then(res => console.log(res),
        () => console.log('err'))
        .catch(err => console.log(err));
    },

    save: function () {

    }
  },

  mounted() {
    const postType = this.$router.history.current.name;
    const postTitle = this.$router.history.current.params.title;

    this.$data.postType = postType === 'editReflection' ? 'reflection' : 'story';
    this.getDbData(postTitle);
  }
}
