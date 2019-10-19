<template>
  <q-page class="row q-pa-sm q-gutter-md justify-evenly">
    <div class="col-3" v-for="item in items" :key="item.id">
      <q-card>
        <img :src="`${$store.state.imageHost}/item_images/${item.images[0].name}`" />

        <q-card-section>
          <div class="text-h6">{{item.name}}</div>
          <div class="text-subtitle2">{{item.price}}</div>
        </q-card-section>

        <q-card-section>{{item.description}}</q-card-section>
        <q-card-actions align="around">
          <!-- <q-btn flat round color="red" icon="favorite" /> -->
          <q-btn
            flat
            round
            color="teal"
            icon="launch"
            @click="$router.push({name:'itemDetails', params:{itemId:item.id}})"
          />
          <q-btn flat round color="primary" icon="delete" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>
<script>
export default {
  name: "Item",
  components: {},
  data() {
    return {};
  },
  computed: {
    items() {
      return this.$store.state.items;
    }
  },
  methods: {},
  created() {}
};
</script>
