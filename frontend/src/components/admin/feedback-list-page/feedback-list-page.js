import ItemActionResultModal from '../shared/item-action-result-modal/item-action-result-modal.vue';
import ItemDeletingConfirmModal from '../shared/item-deleting-confirm-modal/item-deleting-confirm-modal.vue';
import editItemMixin from '../shared/edit-item-mixin/edit-item-mixin';
import adminService from '../services/admin-service';

export default {
  mixins: [
    editItemMixin
  ],

  components: {
    ItemActionResultModal,
    ItemDeletingConfirmModal
  },

  data() {
    return {
      feedbackList: [],
      selectedFeedbackId: null,
      actionSuccess: null,
      actionMessage: null,
      listOfUserFeedbackMode: false,
      clearingFeedbackMode: false,
      selectedUserName: null
    };
  },

  methods: {
    init: function () {
      this.$data.selectedUserName = this.$router.history.current.params.user || null;

      if (this.$data.selectedUserName) {
        this.getListOfUserFeedback(this.$data.selectedUserName);
      }
      else {
        this.getFeedbackList();
      }
    },

    getFeedbackList: function () {
      const getFeedbackList = adminService.getFeedbackList.bind(this);
      getFeedbackList().then(res => this.handleGetListSuccess(res.body),
        () => this.handleActionError())
        .catch(err => console.log(err));
    },

    getListOfUserFeedback: function (userName) {
      const getListOfUserFeedback = adminService.getListOfUserFeedback.bind(this, userName);
      getListOfUserFeedback().then(res => this.handleGetListSuccess(res.body),
        () => this.handleActionError())
        .catch(err => console.log(err));
    },

    markFeedbackAsRead: function (id) {
      const markFeedbackAsRead = adminService.markFeedbackAsRead.bind(this, id);
      markFeedbackAsRead().then(data => {
        this.$refs.markButton.forEach(button => button.blur());
        this.init();
      }, () => this.handleActionError())
        .catch(err => console.log(err));
    },

    prepareFeedbackDeleting: function (id) {
      this.$data.clearingFeedbackMode = false;
      this.$data.selectedFeedbackId = id;
      this.openConfirmModal();
    },

    prepareFeedbackClearing: function () {
      this.$data.clearingFeedbackMode = true;
      this.openConfirmModal();
    },

    onDeleteFeedback: function () {
      if (this.$data.clearingFeedbackMode) {
        if (this.$data.selectedUserName) {
          this.clearUserFeedback(this.$data.selectedUserName);
        }
        else {
          this.clearFeedback();
        }
      }
      else {
        this.deleteFeedback(this.$data.selectedFeedbackId);
      }
    },

    deleteFeedback: function (id) {
      const deleteFeedback = adminService.deleteFeedback.bind(this, id);
      deleteFeedback().then(res => this.handleDeleteSuccess(res.body),
        () => this.handleActionError())
        .catch(err => console.log(err))
        .finally(() => this.closeConfirmModal());
    },

    clearUserFeedback: function (userName) {
      const clearUserFeedback = adminService.clearUserFeedback.bind(this, userName);
      clearUserFeedback().then(res => this.handleClearSuccess(res.body),
        () => this.handleActionError())
        .catch(err => console.log(err))
        .finally(() => this.closeConfirmModal());
    },

    clearFeedback: function () {
      const clearFeedback = adminService.clearFeedback.bind(this);
      clearFeedback().then(res => this.handleClearSuccess(res.body),
        () => this.handleActionError())
        .catch(err => console.log(err))
        .finally(() => this.closeConfirmModal());
    },

    handleGetListSuccess: function (response) {
      if (response.data) {
        this.$data.feedbackList = response.data;
      }
      else {
        this.handleCommonActionSuccess(response);
      }
    },

    handleDeleteSuccess: function (response) {
      if (response.ok) {
        this.$data.actionSuccess = true;
        this.$data.actionMessage = 'Отзыв удален';
        this.openResultModal();
      }
      else {
        this.handleCommonActionSuccess(response);
      }
    },

    handleClearSuccess: function (response) {
      if (response.ok) {
        this.$data.actionSuccess = true;
        this.$data.actionMessage = 'Все отзывы удалены';
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
      this.init();
      this.clearData();
    },

    clearFeedbackSelection: function () {
      this.$data.selectedFeedbackId = null;
    },

    clearData: function () {
      this.clearFeedbackSelection();
      this.$data.actionSuccess = null;
      this.$data.actionMessage = null;
    }
  },

  watch: {
    $route(to) {
      this.init();
    }
  },

  mounted() {
    this.init();
    this.eventHub.$on('authorized', () => this.init());
  }
}
