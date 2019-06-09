import modalMixin from '../../shared/mixins/modal-mixin';

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
      this.clearCredentials();
      this.$data.active = false;

      if (this.$data.isSingleModal) {
        document.body.classList.remove(this.$data.frozenBodyClassName);
      }

      if (selfClosing) {
        this.$emit('close');
      }
    },

    submit: function () {
      if (this.$data.credentials.login && this.$data.credentials.password) {
        this.$emit('submit', this.$data.credentials);
        this.$refs.submitButton.blur();
      }
    },

    clearCredentials: function () {
      this.$data.credentials.login = null;
      this.$data.credentials.password = null;
    },

    focus: function () {
      setTimeout(() => this.$refs.loginInput.focus());
    }
  },

  mounted() {
    this.$on('open', () => this.focus());
  }
}
