export default {
  data() {
    return {
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

    clearData: function () {
      this.$data.actionType = null;
      this.$data.actionSuccess = null;
      this.$data.actionMessage = null;
    },

    openConfirmModal: function () {
      this.$refs.confirmModal.open();
    },

    closeConfirmModal: function () {
      this.$refs.confirmModal.close();
    },

    goToManagePage: function () {
      this.$router.push({ name: 'manage' });
    }
  }
}
