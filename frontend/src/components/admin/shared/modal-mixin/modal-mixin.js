export default {
  data() {
    return {
      active: false,
      frozenBodyClassName: 'frozen-body'
    };
  },

  props: {
    disabled: Boolean,
    errorMessage: String
  },

  methods: {
    open: function () {
      this.active = true;
      document.body.classList.add(this.$data.frozenBodyClassName);
    },

    onFocus: function () {
      this.$emit('focus');
    }
  }
};
