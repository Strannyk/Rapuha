import modalMixin from '../modal-mixin/modal-mixin';

export default {
  mixins: [modalMixin],

  props: {
    titleWording: String,
    bodyWording: String
  },

  methods: {
    confirm: function () {
      this.$emit('confirm');
    }
  }
}
