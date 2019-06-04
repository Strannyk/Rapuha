import coreMixin from '@/shared/mixins/core-mixin';
import Loader from '../../shared/components/loader/loader.vue';
import authMixin from '@/shared/mixins/auth-mixin';
import dataService from "@/services/data-service";

export default {
  mixins: [
    coreMixin,
    authMixin
  ],

  components: {
    Loader
  },

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
    },

    editAsAdmin: function (id) {
      sessionStorage.setItem('quoteId', id);
      this.$router.push({ name: 'editQuote' });
    }
  },

  mounted() {
    this.getQuotes();
  }
}
