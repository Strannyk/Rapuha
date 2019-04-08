export default {
  data() {
    return {
      active: false,
      credentials: {
        login: null,
        password: null
      }
    };
  },

  props: {
    'disabled': Boolean,
    'errorMessage': String
  },

  methods: {
    open: function () {
      this.active = true;
    },

    close: function (selfClosing) {
      this.active = false;

      if (selfClosing) {
        this.$emit('close');
      }
    },

    submit: function () {
      this.$emit('submit', this.$data.credentials);
      this.$refs.submitButton.blur();
    },

    onFocus: function () {
      this.$emit('onFocus');
    }
  }
}
