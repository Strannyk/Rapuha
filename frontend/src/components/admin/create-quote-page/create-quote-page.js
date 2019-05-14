import QuoteForm from './quote-form/quote-form.vue';

export default {
  components: {
    QuoteForm
  },

  data() {
    return {};
  },

  methods: {
    save: function (data) {
      console.log(data);
    }
  }
}
