import mixin from '../modal-mixin/modal-mixin';

export default {
  mixins: [mixin],

  props: {
    postType: String,
    successResult: Boolean,
    message: String
  },

  computed: {
    titleWording: function () {
      if (this.postType === 'reflection') {
        return 'размышления';
      }
      else if (this.postType === 'story') {
        return 'рассказа';
      }
      else if (this.postType === 'quote') {
        return 'цитаты';
      }
    }
  },

  methods: {
    goToAdminPanel: function () {
      this.close();
      this.$router.push({ name: 'creation' });
    },

    close: function () {
      this.$data.active = false;
      this.$emit('close');
      document.body.classList.remove(this.$data.frozenBodyClassName);
    }
  }
}
