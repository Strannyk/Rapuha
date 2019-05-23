import ItemDeletingConfirmModal from '../shared/item-deleting-confirm-modal/item-deleting-confirm-modal.vue';
import adminService from '../services/admin-service';

export default {
  data() {
    return {
      feedbackList: []
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

    deleteFeedback: function (id) {
      console.log(id);
    },

    clearFeedback: function () {

    },

    handleGetListSuccess: function (response) {
      if (response.data) {
        this.$data.feedbackList = response.data;
      }
      else if (response.tokenExpired) {
        localStorage.removeItem('token');
        this.eventHub.$emit('tokenExpired');
      }
    },

    handleActionError: function () {
      alert('Ошибка сети');
    }
  },

  mounted() {
    this.getFeedbackList();

    this.eventHub.$on('authorized', () => this.getFeedbackList());
  }
}
