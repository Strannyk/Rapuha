import commonService from '@/common/services/common-service';

export default {
  data() {
    return {
      quotes: []
    };
  },

  methods: {
    getQuotes: function () {
      const getQuotes = commonService.getQuotes.bind(this);
      getQuotes().then(res => this.handleGetListSuccess(res.body),
        () => this.handleGetListError())
        .catch(err => console.log(err));
    },

    handleGetListSuccess: function (response) {
      const quotes = response.data;

      if (Array.isArray(quotes)) {
        this.$data.quotes = quotes;
      }
    },

    handleGetListError: function () {
      alert('Ошибка сети');
    },

    editQuote: function (id) {
      sessionStorage.setItem('quote_id', id);
      this.$router.push({ name: 'editQuote' });
    }
  },

  mounted() {
    this.getQuotes();
  }
}
