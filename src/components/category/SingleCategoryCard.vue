<template>
  <q-card flat bordered class="bg-grey-1 col-12">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6">{{ category.name }}</div>
        </div>

        <div class="col-auto">
          <q-btn color="grey-7" round flat icon="more_vert">
            <q-menu cover>
              <q-list>
                <q-item clickable @click="showEditForm(category)">
                  <q-item-section>Edit Name</q-item-section>
                </q-item>
                <q-item
                  clickable
                  :disable="disableMakeA"
                  @click="makeA(category.id)"
                >
                  <q-item-section>Make Level A</q-item-section>
                </q-item>
                <q-item clickable disable @click="showEditForm(category)">
                  <q-item-section>Make Level B</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>
    <!-- <q-separator /> -->

    <!-- <q-card-actions>
          <q-btn flat>Action 1</q-btn>
          <q-btn flat>Action 2</q-btn>
        </q-card-actions> -->
  </q-card>
</template>

<script>
import { categoryRelatedApi } from "../../mixins/categoryRelatedApi";
import EditCategoryFormDialog from "./EditCategoryFormDialog";
export default {
  name: "SingleCategoryCard",
  components: {
    EditCategoryFormDialog
  },
  mixins: [categoryRelatedApi],
  props: {
    category: {
      type: Object,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  computed: {
    disableMakeA() {
      if (this.aCategories.length == 6) return true;
      return !!this.aCategories.find(el => el.id == this.category.id);
    },
    aCategories() {
      return this.$store.state.aCategories;
    }
  },
  methods: {
    makeA(id) {
      this.makeCategoryA(id).then(() =>
        this.getACategories().then(response => {
          this.$store.dispatch("setACategories", response);
        })
      );
    },
    showEditForm(category) {
      this.$q
        .dialog({
          component: EditCategoryFormDialog,
          parent: this,
          category: category
        })
        .onOk(data => {
          this.updateCategory(category.id, data);
        });
    }
  }
};
</script>

<style scoped></style>
