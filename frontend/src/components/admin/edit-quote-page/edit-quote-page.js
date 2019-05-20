import QuoteForm from '../shared/quote-form/quote-form.vue';
import ItemActionResultModal from '../shared/item-action-result-modal/item-action-result-modal.vue';
import adminService from '../services/admin-service';

export default {
  components: {
    QuoteForm,
    ItemActionResultModal
  },

  data() {
    return {
      editQuoteSuccess: null,
      editQuoteMessage: null
    };
  },

  methods: {
    save: function (data) {

    },

    handleSaveSuccess: function (response) {
      if (response.ok) {
        this.$data.editQuoteSuccess = true;
        this.$data.editQuoteMessage = 'Цитата успешно отредактирована';
        this.openResultModal();
      }
      else if (response.error) {
        this.$data.editQuoteSuccess = false;
        this.$data.editQuoteMessage = response.error;
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
      this.$router.push({ name: 'quotesList' });
    }
  }
}
