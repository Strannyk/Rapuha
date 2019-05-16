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

    handleGetListSuccess(response) {
      this.$data.quotes = response.data;
    },

    handleGetListError() {
      alert('Ошибка сети');
    }
  },

  mounted() {
    this.getQuotes();
  }
}
