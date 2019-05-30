import { MultiSelect } from 'vue-search-select';
import TagControlForm from './tag-control-form/tag-control-form.vue';
import dataService from '@/common/services/data-service';
import adminService from '../../../services/admin-service';
import authService from '../../../../common/services/auth-service';

export default {
  components: {
    MultiSelect,
    TagControlForm
  },

  data() {
    return {
      data: {
        title: null,
        body: null,
        tags: []
      },

      allTags: [],
      tagsEditMode: false,
      dataIsChanged: false
    };
  },

  props: {
    newItem: Boolean,
    titleWording: String,
    submitButtonWording: String
  },

  methods: {
    getAllTags: function () {
      const getTags = dataService.getTags.bind(this);
      getTags().then(res => this.createTagItems(res.body.data))
        .catch(err => console.log(err));
    },

    createTagItems: function (tags) {
      this.$data.allTags = tags.map(tag => new TagItem(tag));
    },

    onSelectTags: function (tags) {
      this.$data.data.tags = tags;
      this.onChange();
    },

    updateTag: function (tagIndex) {
      const tag = this.$data.allTags[tagIndex];

      tag.changing = false;

      if (tag.value !== tag.text) {
        const updateTag = adminService.updateTag.bind(this, tag.text, tag.value);
        updateTag().then(res => this.handleTagActionSuccess(res.body, tag.text),
          () => this.handleUpdateTagError(tagIndex))
          .catch(err => console.log(err));
      }
    },

    deleteTag: function (tagIndex) {
      const tag = this.$data.allTags[tagIndex];
      const deleteTag = adminService.deleteTag.bind(this, tag.text);
      deleteTag().then(res => this.handleTagActionSuccess(res.body, tag.text),
        () => this.handleDeleteTagError())
        .catch(err => console.log(err));
    },

    handleTagActionSuccess: function (response, tagText) {
      if (response.tokenExpired) {
        authService.logOutAdmin();
        this.eventHub.$emit('tokenExpired');
      }

      this.getAllTags();

      if (response.ok) {
        this.updateSelectedTags(tagText)
      }
    },

    handleUpdateTagError: function (tagIndex) {
      const tag = this.$data.allTags[tagIndex];
      tag.value = tag.text;
      alert('Ошибка сети');
    },

    handleDeleteTagError: function () {
      alert('Ошибка сети');
    },

    updateSelectedTags: function (itemToDelete) {
      this.$data.data.tags = this.$data.data.tags.filter(tag => tag.text !== itemToDelete);
    },

    closeTagManagePanel: function () {
      this.$data.tagsEditMode = false;
    },

    getData: function () {
      const formData = this.$data.data;
      const data = {};

      data.title = formData.title;
      data.data = {};
      data.data.body = formData.body;
      data.data.tags = formData.tags.map(tag => tag.value);

      return data;
    },

    setData: function (data) {
      this.$data.data.title = data.title;
      this.$data.data.body = data.body;
      this.$data.data.tags = data.tags.map(tagName => new TagItem(tagName));
    },

    submit: function () {
      this.$emit('submit', this.getData());
    },

    deleteItem: function () {
      this.$emit('delete');
    },

    cancel: function () {
      this.$emit('cancel');
    },

    clearData: function () {
      this.$data.data.title = null;
      this.$data.data.body = null;
      this.$data.data.tags = [];
    },

    onChange: function () {
      this.$data.dataIsChanged = true;
    }
  },

  mounted() {
    this.getAllTags();
  }
}

class TagItem {
  constructor(value) {
    this.value = value;
    this.text = value;
    this.changing = false;
  }
}
