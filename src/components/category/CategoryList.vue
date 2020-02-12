<template>
  <div class="col-12 row">
    <div
      v-for="category in categories"
      :key="category.id"
      class="col-3 flex flex-center"
    >
      <q-btn
        :label="category.name"
        @dblclick="showEditForm(category)"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { categoryRelatedApi } from "../../mixins/categoryRelatedApi";
import EditCategoryFormDialog from "./EditCategoryFormDialog";
export default {
  name: "CategoryList",
  mixins: [categoryRelatedApi],
  components: {
    EditCategoryFormDialog
  },
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
          component: EditCategoryFormDialog,
          parent: this,
          category: category
        })
        .onOk(data => {
          this.updateCategory(category.id, data);
        });
    }
  },
  created() {}
};
</script>
