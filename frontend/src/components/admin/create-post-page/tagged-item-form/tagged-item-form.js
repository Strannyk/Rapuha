import { MultiSelect } from 'vue-search-select';
import TagControlForm from './tag-control-form/tag-control-form.vue';
import commonService from '@/common/services/common-service';
import adminService from '../../services/admin-service';

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
      tagsEditMode: false
    };
  },

  props: {
    newItem: Boolean,
    titleWording: String,
    createButtonWording: String
  },

  methods: {
    getAllTags: function () {
      const getTags = commonService.getTags.bind(this);
      getTags().then(res => this.createTagItems(res.body.data))
        .catch(err => console.log(err));
    },

    createTagItems: function (tags) {
      this.$data.allTags = tags.map(tag => new TagItem(tag));
    },

    onSelectTags: function (tags) {
      this.$data.data.tags = tags;
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
        localStorage.removeItem('token');
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

    submit: function () {
      this.$emit('submit', this.getData());
    },

    clearData: function () {
      this.$data.data.title = null;
      this.$data.data.body = null;
      this.$data.data.tags = [];
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
