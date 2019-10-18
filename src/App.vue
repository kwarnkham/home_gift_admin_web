<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { itemRelatedApi } from "./mixins/itemRelatedApi";
import { locationRelatedApi } from "./mixins/locationRelatedApi";
import { merchantRelatedApi } from "./mixins/merchantRelatedApi";
import { categoryRelatedApi } from "./mixins/categoryRelatedApi";

export default {
  name: "App",
  mixins: [
    itemRelatedApi,
    merchantRelatedApi,
    locationRelatedApi,
    categoryRelatedApi
  ],
  created() {
    this.getItems();
    this.getLocations();
    this.getMerchants();
    this.getCategories();
  }
};
</script>
