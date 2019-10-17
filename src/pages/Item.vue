<template>
  <q-page class="row q-pa-sm q-gutter-md justify-evenly">
    <q-card class="col-3" v-for="item in items" :key="item.id">
      <img :src="`${$store.state.imageHost}/item_images/item_placeholder.png`" />

      <q-card-section>
        <div class="text-h6">{{item.name}}</div>
        <div class="text-subtitle2">{{item.price}}</div>
      </q-card-section>

      <q-card-section>{{item.description}}</q-card-section>
      <q-card-actions align="around">
        <!-- <q-btn flat round color="red" icon="favorite" /> -->
        <q-btn flat round color="teal" icon="launch" />
        <q-btn flat round color="primary" icon="delete" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>
<script>
import { itemRelatedApi } from "../mixins/itemRelatedApi";
export default {
  name: "Item",
  components: {},
  mixins: [itemRelatedApi],
  data() {
    return {};
  },
  computed: {
    items() {
      return this.$store.state.items;
    }
  },
  methods: {},
  created() {
    this.getItems();
  }
};
</script>
