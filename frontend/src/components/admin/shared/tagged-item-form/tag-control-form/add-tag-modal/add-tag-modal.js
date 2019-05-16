import mixin from '@/components/admin/shared/modal-mixin/modal-mixin';

export default {
  mixins: [mixin],

  data() {
    return {
      newTag: null
    };
  },

  props: {
    successMessage: String
  },

  methods: {
    close: function () {
      this.$data.active = false;
      this.$data.newTag = null;
      this.$emit('close');
      document.body.classList.remove(this.$data.frozenBodyClassName);
    },

    submit: function () {
      this.$emit('addTag', this.$data.newTag);
    },

    clearNewTagValue: function () {
      this.$data.newTag = null;
    }
  }
}
