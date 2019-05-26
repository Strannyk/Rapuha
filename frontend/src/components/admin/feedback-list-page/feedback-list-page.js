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
      actionMessage: null
    };
  },

  methods: {
    getFeedbackList: function () {
      const getFeedbackList = adminService.getFeedbackList.bind(this);
      getFeedbackList().then(res => this.handleGetListSuccess(res.body),
        () => this.handleActionError())
        .catch(err => console.log(err));
    },

    markFeedbackAsRead: function (id) {
      console.log(id);
    },

    prepareFeedbackDeleting: function (id) {
      this.$data.selectedFeedbackId = id;
      this.openConfirmModal();
    },

    deleteFeedback: function () {
      const deleteFeedback = adminService.deleteFeedback.bind(this, this.$data.selectedFeedbackId);
      deleteFeedback().then(res => this.handleDeleteSuccess(res.body),
        () => this.handleActionError())
        .catch(err => console.log(err))
        .finally(() => {
          this.closeConfirmModal();
        });
    },

    clearFeedback: function () {

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
      this.getFeedbackList();
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

  mounted() {
    this.getFeedbackList();
    this.eventHub.$on('authorized', () => this.getFeedbackList());
  }
}
