<template>
  <q-page class="row" :class="{ 'bg-grey': showTrash }">
    <div class="col-12 q-pa-md">
      <q-input :label="$t('search')" v-model="searchWord" outlined="">
        <template v-slot:after
          ><q-btn
            icon="search"
            rounded
            glossy
            color="indigo"
            @click="searchItem(searchWord)"
          ></q-btn
        ></template>
      </q-input>
    </div>
    <div class="col-12 row min-items-container-height">
      <div
        class="col-xs-12 col-sm-6 col-md-3 q-px-xs q-mt-xs"
        v-for="item in items"
        :key="item.id"
      >
        <q-card v-if="item.images[0] != undefined" class="q-pa-xs">
          <div class="text-center item-img-height">
            <img
              :src="
                `${$store.state.imageHost}/item_images/${item.images[0].name}`
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
      searchWord: "",
      timeout: null
    };
  },
  computed: {
    items() {
      let items;
      if (!this.showTrash && this.searchedItems.length == 0) {
        items = this.$store.state.items;
      } else if (this.showTrash && this.searchedItems.length == 0) {
        items = this.$store.state.trashedItems;
      } else {
        items = this.searchedItems;
      }
      items = items.filter(el => el.images[0] != undefined);
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
    }
  },
  watch: {
    searchWord(value) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.searchItem(this.searchWord), 1000);
    }
  },
  methods: {
    removeItem(id) {
      this.deleteItem(id).then(response => {
        if (response.data.code == "0")
          this.getItems().then(() => this.getTrashedItems());
      });
    },
    searchItem(name) {
      this.findItem(name);
    },
    restoreItem(id) {
      this.unDeleteItem(id).then(response => {
        if (response.data.code == "0")
          this.getTrashedItems().then(() => this.getItems());
      });
    },
    setShowTrash(value) {
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
  height: 180px;
}

.min-items-container-height {
  min-height: 100vh;
}
.desc-control {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
