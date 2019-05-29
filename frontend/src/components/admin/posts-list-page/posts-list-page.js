import coreMixin from '@/components/shared/core-mixin/core-mixin';
import adminService from '../services/admin-service';

export default {
  mixins: [coreMixin],

  data() {
    return {
      postsType: null,
      postsTitles: []
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
    getPostsList(type) {
      type = type === 'reflections' ? 'reflection' : 'story';

      const getList = adminService.getPostsTitles.bind(this, type);
      getList().then(res => this.handleGetListSuccess(res.body),
        () => this.handleActionError())
        .catch(err => console.log(err));
    },

    handleGetListSuccess(response) {
      const titles = response.data;

      if (Array.isArray(titles)) {
        this.$data.postsTitles = titles;
      }
    },

    handleActionError() {
      alert('Ошибка сети');
    },

    editPost(title) {
      const path = this.$data.postsType === 'reflections' ? 'reflection' : 'story';
      this.$router.push('/admin/edit/' + path + '/' + title);
    }
  },

  mounted() {
    const postType = this.$router.history.current.name;
    this.$data.postsType = postType === 'reflectionsList' ? 'reflections' : 'stories';
    this.getPostsList(this.$data.postsType);
  }
}
