<template>
  <q-page>
    <div class="row">
      <div class="col-12 q-pa-md">
        <q-input
          :label="$t('search')"
          v-model="searchWord"
          outlined
          clearable=""
        >
          <template v-slot:before>
            <q-icon
              name="delete"
              class="cursor-pointer"
              :class="{ 'text-orange': showTrash }"
              @click="showTrash = !showTrash"
            />
          </template>
          <template v-slot:after>
            <q-btn
              icon="search"
              rounded
              glossy
              color="indigo"
              @click="clearPageNumberAndSearch(searchWord)"
            ></q-btn>
          </template>
        </q-input>
      </div>
      <div class="row col-12" v-if="paginatedItems">
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
    </div>
  </q-page>
</template>

<script>
import { itemRelatedApi } from "../mixins/itemRelatedApi";
import SingleItemCard from "../components/item/SingleItemCard";
export default {
  name: "Search",
  mixins: [itemRelatedApi],
  components: {
    SingleItemCard,
  },
  data() {
    return {
      showTrash: false,
      searchWord: null,
      paginatedItems: null,
      currentPage: null,
    };
  },
  watch: {
    showTrash() {
      this.currentPage = 1;
      this.searchItem(this.searchWord);
    },
    currentPage(value, old) {
      if (old) {
        this.$router.push({
          name: "search",
          query: { page: this.currentPage },
        });
      }
    },
    $route() {
      this.searchItem(this.searchWord, this.currentPage);
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
    searchItem(word, page = 1) {
      if (word) {
        this.findItemByName(word, this.showTrash, page).then((response) => {
          this.paginatedItems = response;
        });
      }
    },
    clearPageNumberAndSearch(word) {
      this.currentPage = 1;
      this.searchItem(word);
    },
  },
  created() {
    let currentPage = Number(this.$route.query.page);
    this.currentPage = currentPage ? currentPage : 1;
  },
};
</script>

<style></style>
