import AddTagModal from './add-tag-modal/add-tag-modal.vue';
import adminService from '../../../services/admin-service';

export default {
  components: {
    AddTagModal
  },

  data() {
    return {
      sendingAddTagRequest: false,
      addTagError: null
    };
  },
  methods: {
    openAddTagModal: function () {
      this.$refs.modal.open();
    },

    closeAddTagModal: function () {
      this.$refs.modal.close();
    },

    onAddTag: function (tag) {
      this.$data.sendingAddTagRequest = true;

      adminService.addTag(this, tag)
        .then(res => this.handleAddTagResponse(res.body),
          () => this.handleAddTagError())
        .catch(err => console.log(err));
    },

    handleAddTagResponse: function (response) {
      this.$data.sendingAddTagRequest = false;
      console.log(response);
      this.closeAddTagModal();
    },

    handleAddTagError: function () {
      this.$data.sendingAddTagRequest = false;
      alert('Ошибка сети.');
    },

    onClose: function () {
      this.$emit('close');
    }
  }
}
