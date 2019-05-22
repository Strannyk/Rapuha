import modalMixin from '../shared/modal-mixin/modal-mixin';

export default {
  mixins: [modalMixin],

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
      this.$data.active = false;
      this.$data.credentials.login = null;
      this.$data.credentials.password = null;

      if (this.$data.isSingleModal) {
        document.body.classList.remove(this.$data.frozenBodyClassName);
      }

      if (selfClosing) {
        this.$emit('close');
      }
    },

    submit: function () {
      this.$emit('submit', this.$data.credentials);
      this.$refs.submitButton.blur();
    },

    clearCredentials: function () {
      this.$data.credentials.login = null;
      this.$data.credentials.password = null;
    }
  }
}
