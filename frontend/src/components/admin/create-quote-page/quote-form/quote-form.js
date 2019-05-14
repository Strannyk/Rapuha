export default {
  data() {
    return {
      data: {
        author: null,
        body: null
      }
    };
  },

  props: {
    newQuote: Boolean
  },

  methods: {
    submit: function () {
      this.$emit('submit', this.$data.data);
    },

    clearData: function () {
      this.$data.data.author = null;
      this.$data.data.body = null;
    }
  }
}
