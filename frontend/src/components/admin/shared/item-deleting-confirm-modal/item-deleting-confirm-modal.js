import modalMixin from '../modal-mixin/modal-mixin';

export default {
  mixins: [modalMixin],

  props: {
    postType: String
  },

  computed: {
    titleWording: function () {
      const action = 'Удаление ';

      if (this.postType === 'reflection') {
        return action + 'размышления';
      }
      else if (this.postType === 'story') {
        return action + 'рассказа';
      }
      else if (this.postType === 'quote') {
        return action + 'цитаты';
      }
    },

    bodyWording: function () {
      const action = 'Удалить ';

      if (this.postType === 'reflection') {
        return action + 'размышление?';
      }
      else if (this.postType === 'story') {
        return action + 'рассказ?';
      }
      else if (this.postType === 'quote') {
        return action + 'цитату?';
      }
    }
  },

  methods: {
    confirm: function () {
      this.$emit('confirm');
    }
  }
}
