import TaggedItemForm from '../shared/tagged-item-form/tagged-item-form.vue';

export default {
  components: {
    TaggedItemForm
  },

  methods: {
    save: function () {
      const data = this.$refs.itemForm.getData();
      console.log(data);
    }
  }
}
