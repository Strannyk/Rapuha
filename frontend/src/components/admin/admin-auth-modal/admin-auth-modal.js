import mixin from '../shared/modal-mixin/modal-mixin';

export default {
  mixins: [mixin],

  data() {
    return {
      credentials: {
        login: null,
        password: null
      }
    };
  },

  methods: {
    close: function (selfClosing) {
      this.active = false;
      document.body.classList.remove(this.$data.frozenBodyClassName);

      if (selfClosing) {
        this.$emit('close');
      }
    },

    submit: function () {
      this.$emit('submit', this.$data.credentials);
      this.$refs.submitButton.blur();
    }
  }
}
