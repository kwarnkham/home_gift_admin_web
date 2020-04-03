<template>
  <div class="q-pa-xs">
    <q-card>
      <div class="text-center h-150">
        <img
          :src="`${$store.state.imageHost}/item_images/${item.images[0].name}`"
          class="img-full-h"
        />
      </div>

      <q-card-section>
        <div class="text-h6 text-ellipsis-constraints">{{ item.name }}</div>
        <div class="text-subtitle2 text-ellipsis-constraints">
          {{ item.price }}
        </div>
      </q-card-section>

      <q-card-section class="desc-control">
        {{ item.description }}
      </q-card-section>
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
          v-if="!isTrashed"
          flat
          round
          color="danger"
          icon="delete"
          @click="removeItem(item.id)"
        />
        <q-btn
          v-if="isTrashed"
          flat
          round
          color="positive"
          icon="restore_from_trash"
          @click="restoreItem(item.id)"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { itemRelatedApi } from "../../mixins/itemRelatedApi";
export default {
  name: "SingleItemCard",
  mixins: [itemRelatedApi],
  props: {
    item: {
      required: true,
      type: Object
    },
    isTrashed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    removeItem(id) {
      this.deleteItem(id).then(response => {
        if (response.data.code == "0") {
          this.$root.$emit("refreshAllItems");
        }
      });
    },
    restoreItem(id) {
      this.unDeleteItem(id).then(response => {
        if (response.data.code == "0") {
          this.$root.$emit("refreshTrashedAllItems");
        }
      });
    }
  }
};
</script>

<style scoped>
.desc-control {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
