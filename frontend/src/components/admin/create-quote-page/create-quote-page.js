import QuoteForm from './quote-form/quote-form.vue';
import ItemActionResultModal from '../shared/item-action-result-modal/item-action-result-modal.vue';
import adminService from '../services/admin-service';
import dateService from '@/common/services/date-service';

export default {
  components: {
    QuoteForm,
    ItemActionResultModal
  },

  data() {
    return {
      createQuoteSuccess: null,
      createQuoteMessage: null
    };
  },

  methods: {
    save: function (data) {
      data.date = dateService.getCurrentDate();

      const createQuote = adminService.createQuote.bind(this, data);
      createQuote().then(res => this.handleSaveSuccess(res.body),
        () => this.handleSaveError())
        .catch(err => console.log(err));
    },

    handleSaveSuccess: function (response) {
      if (response.ok) {
        this.$data.createQuoteSuccess = true;
        this.$data.createQuoteMessage = 'Цитата успешно создана';
        this.openResultModal();
      }
      else if (response.error) {
        this.$data.createQuoteSuccess = false;
        this.$data.createQuoteMessage = response.error;
        this.openResultModal();
      }
      else if (response.tokenExpired) {
        localStorage.removeItem('token');
        this.eventHub.$emit('tokenExpired');
      }
    },

    handleSaveError: function () {
      alert('Ошибка сети');
    },

    openResultModal: function () {
      this.$refs.modal.open();
    },

    onCloseModal: function () {
      if (this.$data.createQuoteSuccess) {
        this.$refs.quoteForm.clearData();
      }

      this.$data.createQuoteSuccess = null;
      this.$data.createQuoteMessage = null;
    }
  }
}
