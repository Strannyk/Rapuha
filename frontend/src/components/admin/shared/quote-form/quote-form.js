export default {
  data() {
    return {
      data: {
        author: null,
        body: null
      },

      dataIsChanged: false
    };
  },

  props: {
    newQuote: Boolean
  },

  methods: {
    submit: function () {
      this.$emit('submit', this.$data.data);
    },

    cancel: function () {
      this.$emit('cancel');
    },

    clearData: function () {
      this.$data.data.author = null;
      this.$data.data.body = null;
    },

    getData: function () {
      return {
        author: this.$data.data.author,
        body: this.$data.data.body
      };
    },

    setData: function (data) {
      this.$data.data.author = data.author;
      this.$data.data.body = data.body;
    },

    deleteQuote: function () {
      this.$emit('delete');
    }
  }
}
