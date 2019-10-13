<template>
  <div class="col-12 row">
    <div v-for="category in categories" :key="category.id" class="col-3 flex flex-center">
      <q-btn :label="category.name" @dblclick="showEditForm(category)"  no-caps/>
    </div>
  </div>
</template>

<script>
import { categoryRelatedApi } from "../../mixins/categoryRelatedApi";
export default {
  name: "CategoryList",
  mixins: [categoryRelatedApi],
  data() {
    return {};
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    }
  },
  methods: {
    showEditForm(category) {
      this.$q
        .dialog({
          title: "Edit Category",
          message: "New Category Name",
          prompt: {
            model: category.name,
            type: "text"
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          this.updateCategory(category.id, data);
        });
    }
  },
  created() {
    this.getCategories();
  }
};
</script>