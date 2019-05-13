import mixin from '../modal-mixin/modal-mixin';

export default {
  mixins: [mixin],

  data() {
    return {};
  },

  props: {
    success: Boolean,
    error: Boolean,
    message: String
  },

  methods: {
    close: function () {
      this.$data.active = false;
      this.$emit('close');
      document.body.classList.remove(this.$data.frozenBodyClassName);
    }
  }
}
