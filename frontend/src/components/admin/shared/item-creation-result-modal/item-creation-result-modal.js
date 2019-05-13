import mixin from '../modal-mixin/modal-mixin';

export default {
  mixins: [mixin],

  data() {
    return {};
  },

  props: {
    postType: String,
    successResult: Boolean,
    message: String
  },

  methods: {
    goToAdminPanel: function () {

    },

    close: function () {
      this.$data.active = false;
      this.$emit('close');
      document.body.classList.remove(this.$data.frozenBodyClassName);
    }
  }
}
