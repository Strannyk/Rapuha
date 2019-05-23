import modalMixin from '../modal-mixin/modal-mixin';

export default {
  mixins: [modalMixin],

  props: {
    postType: String
  },

  computed: {
    titleWording: function () {
      const action = 'Удаление ';

      switch (this.postType) {
        case 'reflection': {
          return action + 'размышления';
        }
        case 'story': {
          return action + 'рассказа';
        }
        case 'quote': {
          return action + 'цитаты';
        }
        case 'feedback': {
          return action + ' обратной связи';
        }
      }
    },

    bodyWording: function () {
      const action = 'Удалить ';

      switch (this.postType) {
        case 'reflection': {
          return action + 'размышление?';
        }
        case 'story': {
          return action + 'рассказ?';
        }
        case 'quote': {
          return action + 'цитату?';
        }
        case 'feedback': {
          return action + ' обратную связь?';
        }
      }
    }
  },

  methods: {
    confirm: function () {
      this.$emit('confirm');
    }
  }
}
