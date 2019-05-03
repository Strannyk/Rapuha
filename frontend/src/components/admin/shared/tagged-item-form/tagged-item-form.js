import { MultiSelect } from 'vue-search-select';
import TagControlForm from './tag-control-form/tag-control-form.vue';
import commonService from '@/common/services/common-service';

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
    this.changed = false;
  }
}
