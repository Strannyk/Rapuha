import AddTagModal from './add-tag-modal/add-tag-modal.vue';
import adminService from '../../../services/admin-service';

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
      adminService.addTag(this, tag)
        .then(res => console.log(res.body))
        .catch(err => console.log(err));

      this.$refs.modal.close();
    },

    onClose: function () {
      this.$emit('close');
    }
  }
}
