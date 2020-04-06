<template>
  <div class="row">
    <SingleItemCard
      class="col-xs-12 col-sm-6 col-md-4"
      v-for="item in paginatedItems.data"
      :key="item.id"
      :item="item"
      isTrashed
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
  name: "TrashedAllItems",
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
          name: "trash",
          query: {
            page: value,
          },
        });
      }
    },
    $route(to, from) {
      this.getAndSetTrashed();
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
    getAndSetTrashed() {
      this.getTrashedItems(this.currentPage).then((response) => {
        console.log(response);
        this.paginatedItems = response;
      });
    },
  },
  created() {
    let currentPage = Number(this.$route.query.page);
    this.currentPage = currentPage ? currentPage : 1;
    this.getAndSetTrashed();
  },
  mounted() {
    this.$root.$on("refreshTrashedAllItems", this.getAndSetTrashed);
  },
  beforeDestroy() {
    this.$root.$on("refreshTrashedAllItems", this.getAndSetTrashed);
  },
};
</script>

<style scoped></style>
