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
    'isError': Boolean
  },

  methods: {
    open: function () {
      this.active = true;
    },

    close: function () {
      this.active = false;
      this.$emit('close');
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
