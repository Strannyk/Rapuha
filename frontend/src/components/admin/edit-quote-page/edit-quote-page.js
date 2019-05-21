import QuoteForm from '../shared/quote-form/quote-form.vue';
import ItemActionResultModal from '../shared/item-action-result-modal/item-action-result-modal.vue';
import adminService from '../services/admin-service';
import commonService from '@/common/services/common-service';

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
            this.goToQuotesList();
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
      if (this.$data.editQuoteSuccess) {
        this.goToQuotesList();
      }
      else {
        this.$data.editQuoteSuccess = null;
        this.$data.editQuoteMessage = null;
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
