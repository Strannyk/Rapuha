import modalMixin from '../modal-mixin/modal-mixin';

export default {
  mixins: [modalMixin],

  props: {
    postType: String,
    actionType: String,
    successResult: Boolean,
    message: String
  },

  computed: {
    titleWording: function () {
      let action;

      if (this.actionType === 'creation') {
        action = 'Создание ';
      }
      else if (this.actionType === 'editing') {
        action = 'Редактирование ';
      }
      else if (this.actionType === 'deleting') {
        action = 'Удаление ';
      }

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
