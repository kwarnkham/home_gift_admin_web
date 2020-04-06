<template>
  <div class="row">
    <SingleItemCard
      class="col-xs-12 col-sm-6 col-md-4"
      v-for="item in paginatedItems.data"
      :key="item.id"
      :item="item"
    />
    <div class="q-pa-lg flex flex-center col-12">
      <q-pagination
        v-model="currentPage"
        :max="totalPages"
        :max-pages="20"
        boundary-links
      >
      </q-pagination>
    </div>
  </div>
</template>

<script>
import { itemRelatedApi } from "../../mixins/itemRelatedApi";
import SingleItemCard from "./SingleItemCard";
export default {
  name: "AllItems",
  mixins: [itemRelatedApi],
  components: {
    SingleItemCard,
  },
  data() {
    return {
      paginatedItems: [],
      currentPage: null,
    };
  },
  watch: {
    currentPage(value, old) {
      if (old) {
        this.$router.push({
          name: "items",
          query: {
            page: value,
          },
        });
      }
    },
    $route(to, from) {
      this.getAndSetItems();
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(
        this.paginatedItems.total / this.paginatedItems.per_page
      );
    },
  },
  methods: {
    getAndSetItems() {
      this.getItems(this.currentPage).then((response) => {
        this.paginatedItems = response.data.result.items;
      });
    },
  },
  created() {
    let currentPage = Number(this.$route.query.page);
    this.currentPage = currentPage ? currentPage : 1;
    this.getAndSetItems();
  },
  mounted() {
    this.$root.$on("refreshAllItems", this.getAndSetItems);
  },
  beforeDestroy() {
    this.$root.$on("refreshAllItems", this.getAndSetItems);
  },
};
</script>

<style scoped></style>
