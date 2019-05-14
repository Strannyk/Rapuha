import mixin from '../modal-mixin/modal-mixin';

export default {
  mixins: [mixin],

  props: {
    postType: String,
    successResult: Boolean,
    message: String
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
