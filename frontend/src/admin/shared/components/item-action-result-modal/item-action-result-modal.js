import modalMixin from '../../mixins/modal-mixin/modal-mixin';

export default {
  mixins: [modalMixin],

  props: {
    successResult: Boolean,
    titleWording: String,
    message: String
  }
}
