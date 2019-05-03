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
        updateTag().then(res => {
          if (res.body.ok) {
            this.handleUpdateTagSuccess();
          }
          else {
            this.handleUpdateTagError(tagIndex);
          }
        }, () => this.handleUpdateTagError(tagIndex, true))
          .catch(err => {
            this.handleUpdateTagError(tagIndex);
            console.log(err);
          });
      }
    },

    handleUpdateTagSuccess: function () {
      this.getAllTags();
      // check if selected tags contain updated tag
    },

    handleUpdateTagError: function (tagIndex, networkError = false) {
      const tag = this.$data.allTags[tagIndex];
      console.log(tag);
      tag.value = tag.text;

      if (networkError) {
        alert('Ошибка сети');
      }
    },

    closeTagManagePanel: function () {
      this.$data.tagsEditMode = false;
    },

    submit: function () {
      this.$emit('submit', this.$data.data);
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
