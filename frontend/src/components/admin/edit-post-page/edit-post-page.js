import coreMixin from '@/components/shared/core-mixin/core-mixin';
import TaggedItemForm from '../shared/tagged-item-form/tagged-item-form.vue';
import ItemActionResultModal from '../shared/item-action-result-modal/item-action-result-modal.vue';
import ItemDeletingConfirmModal from '../shared/item-deleting-confirm-modal/item-deleting-confirm-modal.vue';
import editItemMixin from '../shared/edit-item-mixin/edit-item-mixin';
import adminService from '../services/admin-service';
import commonService from '@/common/services/common-service';

export default {
  mixins: [
    coreMixin,
    editItemMixin
  ],

  components: {
    TaggedItemForm,
    ItemActionResultModal,
    ItemDeletingConfirmModal
  },

  data() {
    return {
      postType: null,
    };
  },

  computed: {
    deletingModalTitleWording: function () {
      const action = 'Удаление ';

      if (this.$data.postType === 'reflection') {
        return action + 'размышления';
      }
      else if (this.$data.postType === 'story') {
        return action + 'рассказа';
      }
    },

    deletingModalBodyWording: function () {
      const action = 'Удалить ';

      if (this.$data.postType === 'reflection') {
        return action + 'размышление?';
      }
      else if (this.$data.postType === 'story') {
        return action + 'рассказ?';
      }
    }
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

        if (this.$data.postType === 'reflection') {
          this.$data.actionResultModalTitleWording = 'Редактирование размышления';
          this.$data.actionMessage = 'Размышление успешно отредактировано';
        }
        else if (this.$data.postType === 'story') {
          this.$data.actionResultModalTitleWording = 'Редактирование рассказа';
          this.$data.actionMessage = 'Рассказ успешно отредактирован';
        }

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

        if (this.$data.postType === 'reflection') {
          this.$data.actionResultModalTitleWording = 'Удаление размышления';
          this.$data.actionMessage = 'Размышление удалено';
        }
        else if (this.$data.postType === 'story') {
          this.$data.actionResultModalTitleWording = 'Удаление рассказа';
          this.$data.actionMessage = 'Рассказ удален';
        }

        this.openResultModal();
      }
      else {
        this.handleCommonActionSuccess(response);
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
        this.clearData();
      }
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
