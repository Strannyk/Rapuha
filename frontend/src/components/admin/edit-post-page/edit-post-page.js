import TaggedItemForm from '../shared/tagged-item-form/tagged-item-form.vue';
import ItemActionResultModal from '../shared/item-action-result-modal/item-action-result-modal.vue';
import ItemDeletingConfirmModal from '../shared/item-deleting-confirm-modal/item-deleting-confirm-modal.vue';
import adminService from '../services/admin-service';
import commonService from '@/common/services/common-service';

export default {
  components: {
    TaggedItemForm,
    ItemActionResultModal,
    ItemDeletingConfirmModal
  },

  data() {
    return {
      postType: null,
      actionType: null,
      actionSuccess: null,
      actionMessage: null,
      availableActionTypes: {
        editing: 'editing',
        deleting: 'deleting'
      }
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

    deleteItem: function () {
      this.closeConfirmModal();

      const deletePost = adminService.deletePost.bind(this, this.getPostTitle());
      deletePost().then(res => this.handleDeleteSuccess(res.body),
        () => this.handleActionError())
        .catch(err => console.log(err));
    },

    handleSaveSuccess: function (response) {
      this.$data.actionType = this.$data.availableActionTypes.editing;

      if (response.ok) {
        this.$data.actionSuccess = true;
        this.$data.actionMessage = this.$data.postType === 'reflection'
          ? 'Размышление успешно отредактировано'
          : 'Рассказ успешно отредактирован';
        this.openResultModal();
      }
      else {
        this.handleCommonActionSuccess(response);
      }
    },

    handleDeleteSuccess: function (response) {
      this.$data.actionType = this.$data.availableActionTypes.deleting;

      if (response.ok) {
        this.$data.actionSuccess = true;
        this.$data.actionMessage = this.$data.postType === 'reflection'
          ? 'Размышление удалено'
          : 'Рассказ удален';
        this.openResultModal();
      }
      else {
        this.handleCommonActionSuccess(response);
      }
    },

    handleCommonActionSuccess: function (response) {
      if (response.error) {
        this.$data.actionSuccess = false;
        this.$data.actionMessage = response.error;
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
      this.$refs.resultModal.open();
    },

    onCloseResultModal: function () {
      if (this.$data.actionSuccess) {
        this.goToPostsList();
      }
      else {
        this.$data.actionType = null;
        this.$data.actionSuccess = null;
        this.$data.actionMessage = null;
      }
    },

    openConfirmModal: function () {
      this.$refs.confirmModal.open();
    },

    closeConfirmModal: function () {
      this.$refs.confirmModal.close();
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
