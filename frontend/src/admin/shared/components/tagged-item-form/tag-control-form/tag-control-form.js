import AddTagModal from './add-tag-modal/add-tag-modal.vue';
import adminService from '@/admin/services/admin-service';
import authService from '@/services/auth-service';

export default {
  components: {
    AddTagModal
  },

  data() {
    return {
      sendingAddTagRequest: false,
      addTagSuccess: null,
      addTagError: null
    };
  },

  methods: {
    openAddTagModal: function () {
      this.$refs.modal.open();
    },

    clearAddTagModalValue: function () {
      this.$refs.modal.clearNewTagValue();
    },

    onAddTag: function (tag) {
      this.$data.sendingAddTagRequest = true;

      const addTag = adminService.addTag.bind(this, tag);
      addTag().then(res => this.handleAddTagResponse(res.body),
        () => this.handleAddTagError())
        .catch(err => console.log(err));
    },

    handleAddTagResponse: function (response) {
      this.$data.sendingAddTagRequest = false;

      if (response.ok) {
        this.$data.addTagSuccess = 'Тег успешно добавлен';
        this.clearAddTagModalValue();
        this.$emit('tagAdded');
      }
      else if (response.error) {
        this.$data.addTagError = response.error;
      }
      else if (response.tokenExpired) {
        authService.logOutAdmin();
        this.eventHub.$emit('tokenExpired', false);
      }
    },

    handleAddTagError: function () {
      this.$data.sendingAddTagRequest = false;
      alert('Ошибка сети');
    },

    clearAddTagResults: function () {
      this.$data.addTagSuccess = null;
      this.$data.addTagError = null;
    },

    onClose: function () {
      this.$emit('close');
    }
  }
}
