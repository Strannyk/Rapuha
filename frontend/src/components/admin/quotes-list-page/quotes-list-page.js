import coreMixin from '@/components/shared/core-mixin/core-mixin';
import commonService from '@/common/services/common-service';

export default {
  mixins: [coreMixin],

  data() {
    return {
      quotes: []
    };
  },

  methods: {
    getQuotesList: function () {
      const getQuotesList = commonService.getQuotesList.bind(this);
      getQuotesList().then(res => this.handleGetListSuccess(res.body),
        () => this.handleActionError())
        .catch(err => console.log(err));
    },

    handleGetListSuccess: function (response) {
      const quotes = response.data;

      if (Array.isArray(quotes)) {
        this.$data.quotes = quotes;
      }
    },

    handleActionError: function () {
      alert('Ошибка сети');
    },

    editQuote: function (id) {
      sessionStorage.setItem('quote_id', id);
      this.$router.push({ name: 'editQuote' });
    }
  },

  mounted() {
    this.getQuotesList();
  }
}
