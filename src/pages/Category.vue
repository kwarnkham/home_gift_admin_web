<template>
  <q-page class="row">
    <AddCategoryForm class="col-12 q-pa-md" />
    <CategoryList />
    <div class="col-12" v-for="(i, key) in 10" :key="key"></div>
  </q-page>
</template>
<script>
import axios from "axios";
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
    console.log("category created");
  },
  preFetch({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    console.log("prefetching categories");
    async function getACategories() {
      await axios({
        method: "get",
        url: `${store.state.apiUrl}/categories/get-a`
      })
        .then(response => {
          if (response.data.code == "0") {
            store.dispatch("setACategories", response.data.result.categories);
          }
        })
        .catch(error => {
          console.log(error.data);
        });
    }

    async function getBCategories() {
      await axios({
        method: "get",
        url: `${store.state.apiUrl}/categories/get-b`
      })
        .then(response => {
          if (response.data.code == "0") {
            store.dispatch("setBCategories", response.data.result.categories);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }

    return getACategories().then(() =>
      getBCategories().then(() => console.log("findish prefetch category"))
    );
  }
};
</script>
