import TaggedItemForm from './tagged-item-form/tagged-item-form.vue';
import ItemCreationResultModal from '../shared/item-creation-result-modal/item-creation-result-modal.vue';
import adminService from '../services/admin-service';

export default {
  components: {
    TaggedItemForm,
    ItemCreationResultModal
  },

  data() {
    return {
      postType: null,
      createPostSuccess: null,
      createPostMessage: null
    };
  },

  methods: {
    save: function (post) {
      const title = post.title;
      const data = post.data;

      data.type = this.$data.postType;
      data.date = this.getCurrentDate();

      const createPost = adminService.createPost.bind(this, title, data);
      createPost().then(res => this.handleSaveSuccess(res.body),
        () => this.handleSaveError())
        .catch(err => console.log(err));
    },

    handleSaveSuccess: function (response) {
      if (response.ok) {
        this.$data.createPostSuccess = true;
        this.$data.createPostMessage = this.$data.postType === 'reflection'
          ? 'Размышление успешно создано'
          : 'Рассказ успешно создан';
        this.openResultModal();
      }
      else if (response.error) {
        this.$data.createPostSuccess = false;
        this.$data.createPostMessage = response.error;
        this.openResultModal();
      }
      else if (response.tokenExpired) {
        localStorage.removeItem('token');
        this.eventHub.$emit('tokenExpired');
      }
    },

    handleSaveError: function () {
      alert('Ошибка сети');
    },

    openResultModal: function () {
      this.$refs.modal.open();
    },

    getCurrentDate: function () {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const date = currentDate.getDate();
      let month = String(currentDate.getMonth() + 1);

      month = month.length === 1 ? 0 + month : month;

      return year + '-' + month + '-' + date;
    },

    onCloseModal: function () {
      if (this.$data.createPostSuccess) {
        this.$refs.itemForm.clearData();
      }

      this.$data.createPostSuccess = null;
      this.$data.createPostMessage = null;
    }
  },

  mounted() {
    const postType = this.$router.history.current.name;
    this.$data.postType = postType === 'createReflection' ? 'reflection' : 'story';
  }
}
