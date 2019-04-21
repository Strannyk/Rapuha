import AddTagModal from './add-tag-modal/add-tag-modal.vue';

export default {
  components: {
    AddTagModal
  },

  data() {
    return {
      addTagErrorMessage: null
    };
  },
  methods: {
    openAddTagModal: function () {
      this.$refs.modal.open();
    },

    onAddTag: function (tag) {
      this.$refs.modal.close();
      console.log(tag);
    },

    onClose: function () {
      this.$emit('close');
    }
  }
}
