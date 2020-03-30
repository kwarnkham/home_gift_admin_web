<template>
  <div class="col-12 row">
    <div class="col-12 q-pa-sm row">
      <div class="col-6 text-center row justify-around">
        <q-btn
          no-caps
          flat
          color="primary"
          class="bg-secondary"
          icon="edit"
          @click="openACategory('A')"
          label="Level A"
        />
        <q-btn
          no-caps
          flat
          color="primary"
          class="bg-secondary"
          icon="edit"
          @click="openACategory('B')"
          label="Level B"
        />
      </div>
      <div class="col-6 text-center row justify-around">
        <q-btn
          color="primary"
          flat
          icon="filter_list"
          :label="filter"
          class="bg-secondary"
        >
          <q-menu cover auto-close>
            <q-list>
              <q-item clickable @click="filter = 'ALL'">
                <q-item-section>ALL</q-item-section>
              </q-item>
              <q-item clickable @click="filter = 'A'">
                <q-item-section>A</q-item-section>
              </q-item>
              <q-item clickable @click="filter = 'B'">
                <q-item-section>B</q-item-section>
              </q-item>
              <q-item clickable @click="filter = 'C'">
                <q-item-section>C</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </div>
    <div
      v-for="category in showingCategories"
      :key="category.id"
      class="col-xs-12 col-lg-6 flex flex-center row q-pa-sm"
    >
      <SingleCategoryCard :category="category" :categories="categories" />
    </div>
    <LevelCategoryDialog ref="dialog" />
  </div>
</template>

<script>
import LevelCategoryDialog from "./LevelCategoryDialog";
import SingleCategoryCard from "./SingleCategoryCard";
import { categoryRelatedApi } from "../../mixins/categoryRelatedApi";
export default {
  name: "CategoryList",
  components: {
    LevelCategoryDialog,
    SingleCategoryCard
  },
  mixins: [categoryRelatedApi],
  data() {
    return {
      categories: [],
      filter: "ALL"
    };
  },
  computed: {
    aCategories() {
      return this.$store.state.aCategories;
    },
    bCategories() {
      return this.$store.state.bCategories;
    },
    showingCategories() {
      let categories = this.categories;
      if (this.filter == "ALL") {
        return categories;
      } else if (this.filter == "A") {
        return this.aCategories;
      } else if (this.filter == "B") {
        return this.bCategories;
      } else {
        return [];
      }
    }
  },
  methods: {
    openACategory(level) {
      this.$refs.dialog.show(level);
    }
  },
  created() {
    this.getCategories().then(response => (this.categories = response));
  }
};
</script>
