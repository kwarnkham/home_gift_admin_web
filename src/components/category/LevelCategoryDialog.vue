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
        <div class="text-h4">Level {{ levelType }} categories</div>
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
        <q-card
          v-for="category in categories"
          :key="category.id"
          class="q-ma-xs"
        >
          <q-card-section class="row items-center">
            <div class="col">{{ category.name }}</div>
            <q-btn icon="delete" @click="deleteLevel(category.id)" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { categoryRelatedApi } from "../../mixins/categoryRelatedApi";
export default {
  name: "LevelCategoryDialog",
  mixins: [categoryRelatedApi],
  data() {
    return {
      isOpen: false,
      levelType: null
    };
  },
  computed: {
    categories() {
      if (this.levelType == "A") return this.$store.state.aCategories;
      else if (this.levelType == "B") {
        return this.$store.state.bCategories;
      }
    }
  },
  methods: {
    show(level) {
      this.isOpen = true;
      this.levelType = level;
    },
    deleteA(id) {
      this.unMakeCategoryA(id).then(() => {
        this.getACategories().then(response =>
          this.$store.dispatch("setACategories", response)
        );
      });
    },
    deleteB(id) {
      this.unMakeCategoryB(id).then(() => {
        this.getBCategories().then(response =>
          this.$store.dispatch("setBCategories", response)
        );
      });
    },

    deleteLevel(id) {
      if (this.levelType == "A") {
        this.deleteA(id);
      } else if (this.levelType == "B") {
        this.deleteB(id);
      }
    }
  },
  created() {}
};
</script>

<style scoped></style>
