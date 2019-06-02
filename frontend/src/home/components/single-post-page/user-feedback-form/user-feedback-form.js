import coreMixin from '@/shared/mixins/core-mixin';
import dateService from '@/services/date-service';
import dataService from '@/services/data-service';

export default {
  mixins: [coreMixin],

  data() {
    return {
      data: {
        userName: '',
        feedbackText: '',
        contacts: null
      },

      sendingSuccess: null,
      sendingError: null,
      message: null
    };
  },

  props: {
    postTitle: String
  },

  methods: {
    send: function () {
      const feedback = {
        userName: this.$data.data.userName,
        body: this.$data.data.feedbackText,
        contacts: this.$data.data.contacts,
        subject: this.postTitle,
        creationDate: dateService.getCurrentDate()
      };

      const createFeedback = dataService.createFeedback.bind(this, feedback);
      createFeedback().then(res => this.handleSendingSuccess(res.body),
        () => this.handleActionError())
        .catch(err => console.log(err))
    },

    handleSendingSuccess: function (response) {
      if (response.ok) {
        this.$data.sendingSuccess = true;
        this.$data.message = 'Спасибо за ваш отзыв!';
        this.clearFormData();
      }
      else if (response.error) {
        this.$data.sendingError = true;
        this.$data.message = response.error;
      }
    },

    clearData: function () {
      this.$data.sendingSuccess = null;
      this.$data.sendingError = null;
      this.$data.message = null;
    },

    clearFormData: function () {
      this.$data.data.userName = '';
      this.$data.data.feedbackText = '';
      this.$data.data.contacts = null;
    }
  }
}
