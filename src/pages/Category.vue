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

export default {
  name: "Category",
  components: {
    AddCategoryForm,
    CategoryList
  },
  data() {
    return {};
  },

  methods: {}
};
</script>
