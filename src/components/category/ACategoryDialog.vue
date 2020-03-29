<template>
  <q-dialog v-model="isOpen" maximized>
    <div class="bg-green-2 q-pa-md row">
      <div class="row justify-between items-center col-12">
        <q-btn
          v-close-popup
          icon="keyboard_arrow_left"
          round
          flat
          glossy
          color="white"
          class="bg-black"
        />
        <div class="text-h4">Level A categories</div>
        <q-btn
          v-close-popup
          icon="keyboard_arrow_left"
          round
          flat
          glossy
          color="white"
          class="bg-black invisible"
        />
      </div>
      <div class="bg-grey-3 col-12 q-pa-sm h-500">
        <q-card v-for="category in categories" :key="category.id">
          <q-card-section class="row items-center">
            <div class="col">{{ category.name }}</div>
            <q-btn icon="delete" @click="deleteA(category.id)" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { categoryRelatedApi } from "../../mixins/categoryRelatedApi";
export default {
  name: "ACategoryDialog",
  mixins: [categoryRelatedApi],
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    categories() {
      return this.$store.state.aCategories;
    }
  },
  methods: {
    show() {
      this.isOpen = true;
    },
    deleteA(id) {
      this.unMakeCategoryA(id).then(() => {
        this.getACategories().then(response =>
          this.$store.dispatch("setACategories", response)
        );
      });
    }
  },
  created() {}
};
</script>

<style scoped></style>
