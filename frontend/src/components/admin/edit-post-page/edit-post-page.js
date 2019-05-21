import TaggedItemForm from '../shared/tagged-item-form/tagged-item-form.vue';
import ItemActionResultModal from '../shared/item-action-result-modal/item-action-result-modal.vue';
import adminService from '../services/admin-service';
import commonService from '@/common/services/common-service';

export default {
  components: {
    TaggedItemForm,
    ItemActionResultModal
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
      getPost().then(res => {
          if (res.body.data) {
            this.$refs.itemForm.setData(res.body.data);
          }
          else {
            this.goToManagePage();
          }
        },
        () => this.handleActionError())
        .catch(err => console.log(err));
    },

    save: function () {
      const post = this.$refs.itemForm.getData();
      post.data.title = post.title;
      post.title = this.getPostTitle();

      const updatePost = adminService.updatePost.bind(this, post.title, post.data);
      updatePost().then(res => this.handleSaveSuccess(res.body),
        () => this.handleActionError())
        .catch(err => console.log(err));
    },

    handleSaveSuccess: function (response) {
      if (response.ok) {
        this.$data.editPostSuccess = true;
        this.$data.editPostMessage = this.$data.postType === 'reflection'
          ? 'Размышление успешно отредактировано'
          : 'Рассказ успешно отредактирован';
        this.openResultModal();
      }
      else if (response.error) {
        this.$data.editPostSuccess = false;
        this.$data.editPostMessage = response.error;
        this.openResultModal();
      }
      else if (response.tokenExpired) {
        localStorage.removeItem('token');
        this.eventHub.$emit('tokenExpired');
      }
    },

    handleActionError: function () {
      alert('Ошибка сети');
    },

    openResultModal: function () {
      this.$refs.modal.open();
    },

    onCloseModal: function () {
      if (this.$data.editPostSuccess) {
        this.goToPostsList();
      }
      else {
        this.$data.editPostSuccess = null;
        this.$data.editPostMessage = null;
      }
    },

    goToManagePage: function () {
      this.$router.push({ name: 'manage' });
    },

    goToPostsList: function () {
      const route = this.$data.postType === 'reflection' ? 'reflectionsList' : 'storiesList';
      this.$router.push({ name: route });
    }
  },

  mounted() {
    const postType = this.$router.history.current.name;
    const postTitle = this.getPostTitle();

    this.$data.postType = postType === 'editReflection' ? 'reflection' : 'story';
    this.getDbData(postTitle);
  }
}
