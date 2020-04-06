<template>
  <q-page>
    <div class="row">
      <div
        class="col-12 row justify-between text-h4 q-pa-sm text-weight-bolder"
      >
        <q-btn
          icon="arrow_back"
          @click="$router.push({ name: 'merchant' })"
          class="bg-primary text-white"
        />
        <span>
          {{ merchant.name }}
        </span>
        <q-btn
          icon="delete"
          @click="showTrash = !showTrash"
          :class="{ 'bg-indigo': showTrash, 'text-white': showTrash }"
        />
      </div>
      <div class="row col-12">
        <SingleItemCard
          class="col-xs-12 col-sm-6 col-md-4"
          v-for="item in paginatedItems.data"
          :key="item.id"
          :item="item"
          :isTrashed="showTrash"
        />
      </div>
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
  </q-page>
</template>

<script>
import { itemRelatedApi } from "../mixins/itemRelatedApi";
import SingleItemCard from "../components/item/SingleItemCard";
export default {
  name: "MerchantItems",
  mixins: [itemRelatedApi],
  props: {
    merchant: {
      type: Object,
      required: true,
    },
  },
  components: {
    SingleItemCard,
  },
  data() {
    return {
      paginatedItems: [],
      currentPage: null,
      showTrash: false,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(
        this.paginatedItems.total / this.paginatedItems.per_page
      );
    },
  },
  watch: {
    currentPage(value, old) {
      if (old) {
        let prop = JSON.stringify(this.merchant);
        this.$router.push({
          name: "merchantItems",
          query: {
            page: value,
          },
          params: { merchant: prop },
        });
      }
    },
    $route(to, from) {
      this.getAndSetItems();
    },
    showTrash(value) {
      this.getAndSetItems();
    },
  },
  methods: {
    getAndSetItems() {
      this.findItemByMerchant(
        this.merchant.id,
        this.showTrash,
        this.currentPage
      ).then((response) => (this.paginatedItems = response));
    },
  },
  created() {
    let currentPage = Number(this.$route.query.page);
    this.currentPage = currentPage ? currentPage : 1;
    this.getAndSetItems();
  },
  mounted() {
    this.$root.$on("refreshAllItems", this.getAndSetItems);
    this.$root.$on("refreshTrashedAllItems", this.getAndSetItems);
  },
  beforeDestroy() {
    this.$root.$on("refreshAllItems", this.getAndSetItems);
    this.$root.$off("refreshTrashedAllItems", this.getAndSetItems);
  },
};
</script>

<style></style>
