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
      <SingleCategoryCard :category="category" />
    </div>
    <ACategoryDialog ref="dialog" />
  </div>
</template>

<script>
import ACategoryDialog from "./ACategoryDialog";
import SingleCategoryCard from "./SingleCategoryCard";
export default {
  name: "CategoryList",
  components: {
    ACategoryDialog,
    SingleCategoryCard
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
    openACategory() {
      this.$refs.dialog.show();
    }
  },
  created() {}
};
</script>
