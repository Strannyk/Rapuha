import coreMixin from '@/shared/mixins/core-mixin/core-mixin';
import dataService from "@/services/data-service";

export default {
  mixins: [coreMixin],

  data() {
    return {
      quotes: [],
      contentIsLoaded: false
    };
  },

  methods: {
    getQuotes: function () {
      const getQuotes = dataService.getQuotesList.bind(this);
      getQuotes().then(res => this.handleGetQuotesSuccess(res.body),
        () => this.handleActionError())
        .catch(err => console.log(err))
        .finally(() => this.$data.contentIsLoaded = true);
    },

    handleGetQuotesSuccess: function (response) {
      const quotes = response.data;

      if (Array.isArray(quotes)) {
        this.$data.quotes = quotes;
      }
    }
  },

  mounted() {
    this.getQuotes();
  }
}
