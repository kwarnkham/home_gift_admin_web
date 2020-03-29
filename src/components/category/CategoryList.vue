<template>
  <div class="col-12 row">
    <div class="col-12 q-pa-sm row justify-around">
      <q-btn
        no-caps
        flat
        color="primary"
        class="bg-secondary"
        @click="openACategory"
        >Level A</q-btn
      >
      <q-btn no-caps flat color="primary" class="bg-secondary">Level B</q-btn>
    </div>
    <div
      v-for="category in categories"
      :key="category.id"
      class="col-xs-12 col-lg-6 flex flex-center row q-pa-sm"
    >
      <SingleCategoryCard :category="category" :categories="categories" />
    </div>
    <ACategoryDialog ref="dialog" />
  </div>
</template>

<script>
import ACategoryDialog from "./ACategoryDialog";
import SingleCategoryCard from "./SingleCategoryCard";
import { categoryRelatedApi } from "../../mixins/categoryRelatedApi";
export default {
  name: "CategoryList",
  components: {
    ACategoryDialog,
    SingleCategoryCard
  },
  mixins: [categoryRelatedApi],
  data() {
    return {
      categories: []
    };
  },
  computed: {},
  methods: {
    openACategory() {
      this.$refs.dialog.show();
    }
  },
  created() {
    this.getCategories().then(response => (this.categories = response));
  }
};
</script>
