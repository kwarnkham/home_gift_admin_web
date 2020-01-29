<template>
  <q-page
    class="row"
    :class="{
      'bg-grey': showTrash,
      'search-bg-color': searchedItems.length > 0
    }"
  >
    <div class="col-12 q-pa-md">
      <q-input
        :label="$t('search')"
        v-model="serachedWord"
        outlined
        clearable=""
      >
        <template v-slot:after>
          <q-btn
            icon="search"
            rounded
            glossy
            color="indigo"
            @click="searchItem(serachedWord)"
          ></q-btn>
        </template>
      </q-input>
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
                item.images.length > 0
                  ? `${$store.state.imageHost}/item_images/${item.images[0].name}`
                  : $store.state.placeholderImage
              "
              class="img-full-h"
            />
          </div>

          <q-card-section>
            <div class="text-h6">{{ item.name }}</div>
            <div class="text-subtitle2">{{ item.price }}</div>
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

      <div class="q-pa-lg flex flex-center col-12" v-if="showPaginator">
        <q-pagination v-model="currentPage" :max="totalPages" input>
        </q-pagination>
      </div>
    </div>
  </q-page>
</template>
<script>
import { itemRelatedApi } from "../mixins/itemRelatedApi";
export default {
  name: "Item",
  components: {},
  mixins: [itemRelatedApi],
  data() {
    return {
      showTrash: false,
      serachedWord: "",
      timeout: null,
      currentPage: null
    };
  },
  computed: {
    showPaginator() {
      return (
        this.currentPage &&
        this.items.length &&
        this.totalPages > 1 &&
        this.searchedItems.length == 0
      );
    },
    paginatedItems() {
      this.currentPage = this.$store.state.items.current_page;
      return this.$store.state.items;
    },
    paginatedTrashedItems() {
      this.currentPage = this.$store.state.trashedItems.current_page;
      return this.$store.state.trashedItems;
    },
    items() {
      let items;
      if (!this.showTrash && this.searchedItems.length == 0) {
        items = this.paginatedItems.data;
      } else if (this.showTrash && this.searchedItems.length == 0) {
        items = this.paginatedTrashedItems.data;
      } else {
        items = this.searchedItems;
      }
      return items;
    },
    searchedItems() {
      let items = this.$store.state.searchedItems;
      if (!this.showTrash) {
        items = items.filter(el => el.deleted_at == null);
      } else if (this.showTrash) {
        items = items.filter(el => el.deleted_at != null);
      }
      return items;
    },
    totalPages() {
      if (!this.showTrash) {
        return Math.ceil(
          this.paginatedItems.total / this.paginatedItems.per_page
        );
      } else {
        return Math.ceil(
          this.paginatedTrashedItems.total / this.paginatedTrashedItems.per_page
        );
      }
    }
  },
  watch: {
    serachedWord(value) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.searchItem(this.serachedWord), 1000);
    },
    currentPage(value) {
      if (this.showTrash) {
        this.getTrashedItems(value);
      } else {
        this.getItems(value);
      }
    },
    showTrash(value) {
      if (value) {
        this.currentPage = this.paginatedTrashedItems.current_page;
      } else {
        this.currentPage = this.paginatedItems.current_page;
      }
    }
  },
  methods: {
    removeItem(id) {
      this.deleteItem(id).then(response => {
        if (response.data.code == "0") {
          let searchedItems = this.searchedItems.filter(el => el.id != id);
          this.$store.dispatch("setSearchedItems", searchedItems);
          if (this.currentPage == this.totalPages && this.items.length == 1) {
            this.getItems(this.currentPage - 1).then(() =>
              this.getTrashedItems()
            );
          } else {
            this.getItems(this.currentPage).then(() => this.getTrashedItems());
          }
        }
      });
    },
    searchItem(name) {
      this.findItemByName(name, this.showTrash);
    },
    restoreItem(id) {
      this.unDeleteItem(id).then(response => {
        if (response.data.code == "0") {
          let searchedItems = this.searchedItems.filter(el => el.id != id);
          this.$store.dispatch("setSearchedItems", searchedItems);
          if (this.currentPage == this.totalPages && this.items.length == 1) {
            this.getTrashedItems(this.currentPage - 1).then(() =>
              this.getItems()
            );
          } else {
            this.getTrashedItems(this.currentPage).then(() => this.getItems());
          }
        }
      });
    },
    setShowTrash(value) {
      this.serachedWord = "";
      this.showTrash = value;
    }
  },
  created() {},
  mounted() {
    this.$root.$on("showTrash", this.setShowTrash);
  },
  beforeDestroy() {
    this.$root.$off("showTrash", this.setShowTrash);
  }
};
</script>
<style scoped>
.item-img-height {
  height: 150px;
}

.min-items-container-height {
  min-height: calc(100vh - 138px);
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
