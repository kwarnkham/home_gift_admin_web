<template>
  <q-page
    class="row"
    :class="{
      'bg-grey': showTrash,
      'search-bg-color': paginatedSearched
    }"
  >
    <div class="col-12 q-pa-md">
      <q-input :label="$t('search')" v-model="searchWord" outlined clearable="">
        <template v-slot:after>
          <q-btn
            icon="search"
            rounded
            glossy
            color="indigo"
            @click="searchItem(searchWord)"
          ></q-btn>
        </template>
      </q-input>
    </div>

    <div class="col-12 row q-pa-md">
      <q-select
        class="col-4"
        label="Merchant"
        v-model="merchantFilter"
        :options="sortedMerchants"
        option-label="name"
        option-value="id"
        outlined
        clearable
      />
    </div>

    <div class="col-12 row min-items-container-height">
      <div
        class="col-xs-12 col-sm-6 col-md-4 q-px-xs q-mt-xs"
        v-for="item in items"
        :key="item.id"
      >
        <q-card class="q-pa-xs">
          <div class="text-center item-img-height">
            <img
              :src="
                `${$store.state.imageHost}/item_images/${item.images[0].name}`
              "
              class="img-full-h"
            />
          </div>

          <q-card-section>
            <div class="text-h6 text-ellipsis-constraints">{{ item.name }}</div>
            <div class="text-subtitle2 text-ellipsis-constraints">
              {{ item.price }}
            </div>
          </q-card-section>

          <q-card-section class="desc-control"
            >{{ item.description }}{{ item.description }}</q-card-section
          >
          <q-card-actions align="around">
            <q-btn
              flat
              round
              color="teal"
              icon="launch"
              @click="
                $router.push({
                  name: 'itemDetails',
                  params: { itemId: item.id }
                })
              "
            />
            <q-btn
              v-if="!showTrash"
              flat
              round
              color="danger"
              icon="delete"
              @click="removeItem(item.id)"
            />
            <q-btn
              v-if="showTrash"
              flat
              round
              color="positive"
              icon="restore_from_trash"
              @click="restoreItem(item.id)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div class="q-pa-lg flex flex-center col-12">
      <q-pagination
        v-model="currentPage"
        :max="totalPages"
        input
        v-if="showPaginator"
      >
      </q-pagination>
    </div>
  </q-page>
</template>

<script>
import { itemRelatedApi } from "../mixins/itemRelatedApi";
export default {
  name: "items",
  mixins: [itemRelatedApi],
  data() {
    return {
      searchWord: "",
      timeout: null,
      currentPage: null,
      paginatedItems: null,
      paginatedTrashed: null,
      paginatedSearched: null,
      merchantFilter: null
    };
  },
  methods: {
    getAndSetMerchantFilter(page = 1) {
      if (this.merchantFilter) {
        this.findItemByMerchant(
          this.merchantFilter.id,
          this.showTrash,
          page
        ).then(response => {
          // console.log(response);
          this.paginatedItems = response.data.result.items;
        });
      }
    },
    getAndSetItems(page) {
      this.getItems(page).then(response => {
        this.paginatedItems = response.data.result.items;
      });
    },
    getAndSetTrashed(page) {
      this.getTrashedItems(page).then(response => {
        this.paginatedTrashed = response.data.result.items;
      });
    },
    getAndSetSearched(searchWord, showTrash = this.showTrash, page) {
      this.findItemByName(searchWord, showTrash, page).then(response => {
        if (response) this.paginatedSearched = response.data.result.items;
        else this.paginatedSearched = null;
      });
    },
    removeFromSearched(id) {
      if (this.paginatedSearched) {
        this.paginatedSearched.data = this.paginatedSearched.data.filter(
          el => el.id != id
        );
        if (this.paginatedSearched.data.length == 0) {
          this.getAndSetSearched(this.searchWord, this.showTrash);
        }
      }
    },
    removeItem(id) {
      this.deleteItem(id).then(response => {
        if (response.data.code == "0") {
          this.paginatedItems.data = this.paginatedItems.data.filter(
            el => el.id != id
          );
          if (this.paginatedItems.data.length == 0) {
            this.getAndSetItems();
          }
          this.removeFromSearched(id);
        }
      });
    },
    restoreItem(id) {
      this.unDeleteItem(id).then(response => {
        if (response.data.code == "0") {
          this.paginatedTrashed.data = this.paginatedTrashed.data.filter(
            el => el.id != id
          );
          if (this.paginatedTrashed.data.length == 0) {
            this.getAndSetTrashed();
          }
          this.removeFromSearched(id);
        }
      });
    }
  },
  computed: {
    merchants() {
      return this.$store.state.merchants;
    },
    sortedMerchants() {
      let temp = JSON.stringify(this.merchants);
      let tmp = JSON.parse(temp);
      tmp.sort((el1, el2) => el1.name.localeCompare(el2.name));
      return tmp;
    },
    showTrash() {
      return this.$store.state.showTrash;
    },
    totalPages() {
      if (this.paginatedSearched) {
        return Math.ceil(
          this.paginatedSearched.total / this.paginatedSearched.per_page
        );
      } else if (this.showTrash && this.paginatedTrashed) {
        return Math.ceil(
          this.paginatedTrashed.total / this.paginatedTrashed.per_page
        );
      } else if (!this.showTrash && this.paginatedItems) {
        return Math.ceil(
          this.paginatedItems.total / this.paginatedItems.per_page
        );
      } else {
        return 1;
      }
    },
    items() {
      let items = [];

      if (!this.showTrash && !this.paginatedSearched && this.paginatedItems) {
        items = this.paginatedItems.data;
      } else if (
        this.showTrash &&
        !this.paginatedSearched &&
        this.paginatedTrashed
      ) {
        items = this.paginatedTrashed.data;
      } else if (this.paginatedSearched) {
        items = this.paginatedSearched.data;
      }

      return items;
    },
    showPaginator() {
      return this.totalPages > 1 && this.currentPage != null;
    }
  },
  watch: {
    merchantFilter() {
      this.getAndSetMerchantFilter();
    },
    searchWord() {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(
        () => this.getAndSetSearched(this.searchWord),
        1000
      );
    },
    paginatedItems(value) {
      if (value) {
        this.currentPage = value.current_page;
      }
    },
    paginatedSearched(value) {
      if (value) {
        this.currentPage = value.current_page;
      }
    },
    paginatedTrashed(value) {
      if (value && this.showTrash) {
        this.currentPage = value.current_page;
      }
    },
    currentPage(value) {
      if (value) {
        sessionStorage.setItem("itemCurrentPage", value);
        if (!this.merchantFilter) {
          if (
            this.paginatedSearched &&
            value != this.paginatedSearched.current_page
          ) {
            this.getAndSetSearched(this.searchWord, this.showTrash, value);
          }
          if (
            this.showTrash &&
            this.paginatedTrashed &&
            value != this.paginatedTrashed.current_page
          ) {
            this.getAndSetTrashed(value);
          } else {
            if (
              this.paginatedItems &&
              value != this.paginatedItems.current_page
            )
              this.getAndSetItems(value);
          }
        } else if (this.merchantFilter) {
          if (
            this.paginatedItems &&
            value != this.paginatedItems.current_page
          ) {
            console.log(value);
            this.getAndSetMerchantFilter(value);
          }
        }
      }
    },
    showTrash(value) {
      this.searchWord = "";
      if (this.currentPage == 1) {
        if (value) this.getAndSetTrashed();
        else this.getAndSetItems();
      } else {
        this.currentPage = 1;
      }
    }
  },
  created() {
    if (!this.showTrash)
      this.getAndSetItems(sessionStorage.getItem("itemCurrentPage") || 1);
    else this.getAndSetTrashed(sessionStorage.getItem("itemCurrentPage") || 1);
  }
};
</script>

<style scoped>
.item-img-height {
  height: 150px;
}

.min-items-container-height {
  min-height: calc(100vh - 238px);
}
.desc-control {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.search-bg-color {
  background: #00e5ff !important;
}
</style>
