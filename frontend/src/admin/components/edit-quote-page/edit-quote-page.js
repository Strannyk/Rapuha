import coreMixin from '@/shared/mixins/core-mixin/core-mixin';
import QuoteForm from '../../shared/mixins/quote-form/quote-form.vue';
import ItemActionResultModal from '../../shared/components/item-action-result-modal/item-action-result-modal.vue';
import ItemDeletingConfirmModal
  from '../../shared/components/item-deleting-confirm-modal/item-deleting-confirm-modal.vue';
import editItemMixin from '../../shared/mixins/edit-item-mixin/edit-item-mixin';
import adminService from '../../services/admin-service';
import dataService from '@/common/services/data-service';

export default {
  mixins: [
    coreMixin,
    editItemMixin
  ],

  components: {
    QuoteForm,
    ItemActionResultModal,
    ItemDeletingConfirmModal
  },

  methods: {
    getQuoteId: function () {
      return sessionStorage.getItem('quote_id');
    },

    eraseQuoteId: function () {
      sessionStorage.removeItem('quote_id');
    },

    getDbData: function () {
      const getQuote = dataService.getQuote.bind(this, this.getQuoteId());
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
        this.$data.actionResultModalTitleWording = 'Редактирование цитаты';
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
        this.$data.actionResultModalTitleWording = 'Удаление цитаты';
        this.$data.actionMessage = 'Цитата удалена';
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
        this.goToQuotesList();
      }
      else {
        this.clearData();
      }
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
