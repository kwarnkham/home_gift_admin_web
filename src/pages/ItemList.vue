<template>
  <q-page>
    <div class="row">
      <AllItems class="col-12" v-if="!trashed" />
      <TrashedAllItems class="col-12" v-if="trashed" />
    </div>
  </q-page>
</template>

<script>
import SingleItemCard from "../components/item/SingleItemCard";
import AllItems from "../components/item/AllItems";
import TrashedAllItems from "../components/item/TrashedAllItems";
export default {
  name: "ItemList",
  props: {
    trashed: {
      default: false,
      type: Boolean
    }
  },
  components: {
    AllItems,
    TrashedAllItems
  }
};
</script>

<style></style>
