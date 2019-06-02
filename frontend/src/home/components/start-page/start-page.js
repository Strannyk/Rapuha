import coreMixin from '@/shared/mixins/core-mixin';
import dataService from '@/services/data-service';

export default {
  mixins: [coreMixin],

  data() {
    return {
      reflectionsCount: null,
      storiesCount: null,
      quotesCount: null
    };
  },

  methods: {
    getItemsNumber: function () {
      const getItemsNumber = dataService.getItemsNumber.bind(this);
      getItemsNumber().then(data => this.handleGetNumberSuccess(data.body),
        () => this.handleActionError())
        .catch(err => console.log(err));
    },

    handleGetNumberSuccess: function (response) {
      this.$data.reflectionsCount = response.data.reflections;
      this.$data.storiesCount = response.data.stories;
      this.$data.quotesCount = response.data.quotes;
    },

    goToPage: function (pageName) {
      this.$router.history.push({ name: pageName });
    }
  },

  mounted() {
    this.getItemsNumber();
  }
}
