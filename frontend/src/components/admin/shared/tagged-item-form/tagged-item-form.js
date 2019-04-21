import { MultiSelect } from 'vue-search-select';
import TagControlForm from './tag-control-form/tag-control-form.vue';

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

      allTags: [
        { value: 1, text: 'Tag 1', changed: false },
        { value: 2, text: 'Tag 2', changed: false },
        { value: 3, text: 'Tag 3', changed: false },
        { value: 4, text: 'Tag 4', changed: false },
        { value: 5, text: 'Tag 5', changed: false },
        { value: 6, text: 'Tag 6', changed: false },
        { value: 7, text: 'Tag 7', changed: false },
        { value: 8, text: 'Tag 8', changed: false },
        { value: 9, text: 'Tag 9', changed: false },
        { value: 10, text: 'Tag 10', changed: false },
        { value: 11, text: 'Tag 11', changed: false }
      ],

      tagsEditMode: false
    };
  },

  props: {
    newItem: Boolean,
    titleWording: String,
    createButtonWording: String
  },

  methods: {
    onSelectTags: function (tags) {
      this.$data.data.tags = tags;
    },

    closeTagManagePanel: function () {
      this.$data.tagsEditMode = false;
    },

    submit: function () {
      this.$emit('submit', this.$data.data);
    }
  }
}
