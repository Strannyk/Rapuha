import TaggedItemForm from "../shared/tagged-item-form/tagged-item-form.vue";

export default {
  components: {
    TaggedItemForm
  },

  data() {
    return {
      postType: null,
      editPostSuccess: null,
      editPostMessage: null
    };
  },

  methods: {
    save: function () {

    }
  },

  mounted() {
    const postType = this.$router.history.current.name;
    this.$data.postType = postType === 'editReflection' ? 'reflection' : 'story';
  }
}
