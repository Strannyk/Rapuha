import mixin from '../../../modal-mixin/modal-mixin';

export default {
  mixins: [mixin],

  data() {
    return {
      newTag: null
    };
  },

  methods: {
    close: function () {
      this.active = false;
      this.newTag = null;
      document.body.classList.remove(this.$data.frozenBodyClassName);
    },

    submit: function () {
      this.$emit('addTag', this.$data.newTag);
    }
  }
}
