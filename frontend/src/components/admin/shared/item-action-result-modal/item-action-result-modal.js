import mixin from '../modal-mixin/modal-mixin';

export default {
  mixins: [mixin],

  props: {
    postType: String,
    actionType: String,
    successResult: Boolean,
    message: String
  },

  computed: {
    titleWording: function () {
      const action = this.actionType === 'creation' ? 'Создание ' : 'Редактирование ';

      if (this.postType === 'reflection') {
        return action + 'размышления';
      }
      else if (this.postType === 'story') {
        return action + 'рассказа';
      }
      else if (this.postType === 'quote') {
        return action + 'цитаты';
      }
    }
  }
}
