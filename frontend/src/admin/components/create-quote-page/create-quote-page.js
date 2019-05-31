import coreMixin from '@/shared/mixins/core-mixin/core-mixin';
import QuoteForm from '../../shared/mixins/quote-form/quote-form.vue';
import ItemActionResultModal from '../../shared/components/item-action-result-modal/item-action-result-modal.vue';
import adminService from '../../services/admin-service';
import authService from '../../../services/auth-service';
import dateService from '@/services/date-service';

export default {
  mixins: [coreMixin],

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
        () => this.handleActionError())
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
        authService.logOutAdmin();
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
      if (this.$data.createQuoteSuccess) {
        this.$refs.quoteForm.clearData();
      }

      this.$data.createQuoteSuccess = null;
      this.$data.createQuoteMessage = null;
    },

    goToQuotesList: function () {
      this.$router.push({ name: 'quotesList' });
    }
  }
}
