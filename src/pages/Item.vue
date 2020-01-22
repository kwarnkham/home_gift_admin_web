<template>
  <q-page class="row">
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
              $router.push({ name: 'itemDetails', params: { itemId: item.id } })
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
      showTrash: false
    };
  },
  computed: {
    items() {
      let items;
      if (!this.showTrash) items = this.$store.state.items;
      if (this.showTrash) items = this.$store.state.trashedItems;
      items = items.filter(el => el.images[0] != undefined);
      return items;
    }
  },
  methods: {
    removeItem(id) {
      this.deleteItem(id).then(response => {
        if (response.data.code == "0")
          this.getItems().then(() => this.getTrashedItems());
      });
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

.desc-control {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
