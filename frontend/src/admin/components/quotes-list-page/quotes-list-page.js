import coreMixin from '@/shared/mixins/core-mixin/core-mixin';
import dataService from '@/common/services/data-service';

export default {
  mixins: [coreMixin],

  data() {
    return {
      quotes: []
    };
  },

  methods: {
    getQuotesList: function () {
      const getQuotesList = dataService.getQuotesList.bind(this);
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
