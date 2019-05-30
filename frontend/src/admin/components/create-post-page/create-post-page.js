import coreMixin from '@/shared/mixins/core-mixin/core-mixin';
import TaggedItemForm from '../../shared/components/tagged-item-form/tagged-item-form.vue';
import ItemActionResultModal from '../../shared/components/item-action-result-modal/item-action-result-modal.vue';
import adminService from '../../services/admin-service';
import authService from '../../../common/services/auth-service';
import dateService from '@/common/services/date-service';

export default {
  mixins: [coreMixin],

  components: {
    TaggedItemForm,
    ItemActionResultModal
  },

  data() {
    return {
      breadcrumbs: [],
      postType: null,
      createPostSuccess: null,
      createPostTitleWording: null,
      createPostMessage: null
    };
  },

  methods: {
    save: function (post) {
      const title = post.title;
      const data = post.data;

      data.type = this.$data.postType;
      data.date = dateService.getCurrentDate();

      const createPost = adminService.createPost.bind(this, title, data);
      createPost().then(res => this.handleSaveSuccess(res.body),
        () => this.handleActionError())
        .catch(err => console.log(err));
    },

    handleSaveSuccess: function (response) {
      if (response.ok) {
        this.$data.createPostSuccess = true;

        if (this.$data.postType === 'reflection') {
          this.$data.createPostTitleWording = 'Создание размышления';
          this.$data.createPostMessage = 'Размышление успешно создано';
        }
        else if (this.$data.postType === 'story') {
          this.$data.createPostTitleWording = 'Создание рассказа';
          this.$data.createPostMessage = 'Рассказ успешно создан';
        }

        this.openResultModal();
      }
      else if (response.error) {
        this.$data.createPostSuccess = false;
        this.$data.createPostMessage = response.error;
        this.openResultModal();
      }
      else if (response.tokenExpired) {
        authService.removeToken();
        this.eventHub.$emit('tokenExpired');
      }
    },

    openResultModal: function () {
      this.$refs.modal.open();
    },

    onCloseResultModal: function () {
      if (this.$data.createPostSuccess) {
        this.$refs.itemForm.clearData();
      }

      this.clearData();
    },

    clearData: function () {
      this.$data.createPostSuccess = null;
      this.$data.createPostTitleWording = null;
      this.$data.createPostMessage = null;
    },

    goToPostsList: function () {
      const route = this.$data.postType === 'reflection' ? 'reflectionsList' : 'storiesList';
      this.$router.push({ name: route });
    }
  },

  mounted() {
    const postType = this.$router.history.current.name;
    this.$data.postType = postType === 'createReflection' ? 'reflection' : 'story';
  }
}
