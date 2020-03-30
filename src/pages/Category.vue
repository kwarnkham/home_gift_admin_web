<template>
  <q-page class="row">
    <AddCategoryForm class="col-12 q-pa-md" />
    <CategoryList />
    <div class="col-12" v-for="(i, key) in 10" :key="key"></div>
  </q-page>
</template>
<script>
import AddCategoryForm from "../components/category/AddCategoryForm";
import CategoryList from "../components/category/CategoryList";
import { categoryRelatedApi } from "../mixins/categoryRelatedApi";
export default {
  name: "Category",
  mixins: [categoryRelatedApi],
  components: {
    AddCategoryForm,
    CategoryList
  },
  data() {
    return {};
  },

  methods: {},
  created() {
    this.getACategories().then(response =>
      this.$store.dispatch("setACategories", response)
    );

    this.getBCategories().then(response =>
      this.$store.dispatch("setBCategories", response)
    );
  }
};
</script>
