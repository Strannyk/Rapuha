export default {
  data() {
    return {
      active: false,
      frozenBodyClassName: 'frozen-body',
      isSingleModal: true
    };
  },

  props: {
    disabled: Boolean,
    errorMessage: String
  },

  methods: {
    open: function (single = true) {
      this.$data.active = true;
      this.$data.isSingleModal = single;
      document.body.classList.add(this.$data.frozenBodyClassName);
    },

    onFocus: function () {
      this.$emit('focus');
    }
  }
}
