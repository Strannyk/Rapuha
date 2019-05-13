import TaggedItemForm from '../shared/tagged-item-form/tagged-item-form.vue';
import ItemCreationResultModal from '../shared/item-creation-result-modal/item-creation-result-modal.vue';
import adminService from '../services/admin-service';

export default {
  components: {
    TaggedItemForm,
    ItemCreationResultModal
  },

  data() {
    return {
      createPostSuccess: null,
      createPostError: null,
      createPostMessage: null
    };
  },

  methods: {
    save: function () {
      const post = this.$refs.itemForm.getData();
      const title = post.title;
      const data = post.data;
      const createPost = adminService.createPost.bind(this, title, data);

      data.type = 'reflection';
      data.date = this.getCurrentDate();

      createPost().then(res => this.handleSaveSuccess(res.body),
        () => this.handleSaveError())
        .catch(err => console.log(err));
    },

    handleSaveSuccess: function (response) {
      console.log(response);

      if (response.tokenExpired) {
        localStorage.removeItem('token');
        this.eventHub.$emit('tokenExpired');
      }
    },

    handleSaveError: function () {
      alert('Ошибка сети');
    },

    getCurrentDate: function () {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const date = currentDate.getDate();
      let month = String(currentDate.getMonth() + 1);

      month = month.length === 1 ? 0 + month : month;

      return year + '-' + month + '-' + date;
    },

    clearFormData: function () {
      this.$refs.itemForm.clearData();
    }
  }
}
