import QuoteForm from '../shared/quote-form/quote-form.vue';
import ItemActionResultModal from '../shared/item-action-result-modal/item-action-result-modal.vue';
import ItemDeletingConfirmModal from '../shared/item-deleting-confirm-modal/item-deleting-confirm-modal.vue';
import adminService from '../services/admin-service';
import commonService from '@/common/services/common-service';

export default {
  components: {
    QuoteForm,
    ItemActionResultModal,
    ItemDeletingConfirmModal
  },

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
    getQuoteId: function () {
      return sessionStorage.getItem('quote_id');
    },

    eraseQuoteId: function () {
      sessionStorage.removeItem('quote_id');
    },

    getDbData: function () {
      const getQuote = commonService.getQuote.bind(this, this.getQuoteId());
      getQuote().then(res => {
          if (res.body.data) {
            this.$refs.quoteForm.setData(res.body.data);
          }
          else {
            this.goToManagePage();
          }
        },
        () => this.handleActionError())
        .catch(err => console.log(err));
    },

    save: function () {
      const data = this.$refs.quoteForm.getData();
      data.id = this.getQuoteId();

      const updateQuote = adminService.updateQuote.bind(this, data);
      updateQuote().then(res => this.handleSaveSuccess(res.body),
        () => this.handleActionError())
        .catch(err => console.log(err));
    },

    deleteQuote: function () {
      this.closeConfirmModal();

      const deleteQuote = adminService.deleteQuote.bind(this, this.getQuoteId());
      deleteQuote().then(res => this.handleDeleteSuccess(res.body),
        () => this.handleActionError())
        .catch(err => console.log(err));
    },

    handleSaveSuccess: function (response) {
      this.$data.actionType = this.$data.availableActionTypes.editing;

      if (response.ok) {
        this.$data.actionSuccess = true;
        this.$data.actionMessage = 'Цитата успешно отредактирована';
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
        this.$data.actionMessage = 'Цитата удалена';
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
        this.goToQuotesList();
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

    goToQuotesList: function () {
      this.$router.push({ name: 'quotesList' });
    }
  },

  mounted() {
    this.getDbData();
  },

  destroyed() {
    this.eraseQuoteId();
  }
}
