<template>
  <q-card flat bordered class="bg-grey-1 col-12">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div
            class="text-h6"
            :class="{ 'text-amber-8': isA, 'text-green': isB }"
          >
            {{ category.name }}
          </div>
        </div>

        <div class="col-auto">
          <q-btn color="grey-7" round flat icon="more_vert">
            <q-menu cover auto-close>
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
                <q-item
                  clickable
                  :disable="isA || isB"
                  @click="makeB(category.id)"
                >
                  <q-item-section>Make Level B</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>
    <q-separator />

    <q-card-actions align="right">
      <div class="w-150">
        <q-select
          :disable="isA || !isB"
          :options="aCategories"
          option-label="name"
          option-value="id"
          v-model="selectedA"
          label="Level A"
          clearable
        />
      </div>
    </q-card-actions>
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
  data() {
    return {
      selectedA: null,
      canWatchSelectedA: false
    };
  },
  watch: {
    selectedA(value) {
      if (value) {
        if (this.canWatchSelectedA) {
          this.joinAB(value.id, this.category.id).then(() => {});
        }
      } else if (value == null) {
        this.unJoinAB(this.bCategory.b_category_id).then(() => {});
      }
    },
    isB(value) {
      if (value) {
        this.canWatchSelectedA = true;
      }
    }
  },
  computed: {
    disableMakeA() {
      if (this.aCategories.length == 6) return true;
      return this.isA || this.isB;
    },
    isA() {
      return !!this.aCategories.find(el => el.id == this.category.id);
    },
    isB() {
      return !!this.bCategories.find(el => el.id == this.category.id);
    },
    bCategory() {
      return this.bCategories.find(el => el.id == this.category.id);
    },
    aCategories() {
      return this.$store.state.aCategories;
    },
    bCategories() {
      return this.$store.state.bCategories;
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
    makeB(id) {
      this.makeCategoryB(id).then(() =>
        this.getBCategories().then(response => {
          this.$store.dispatch("setBCategories", response);
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
  },
  created() {
    if (this.isB)
      this.getJoinedA(this.bCategory.b_category_id)
        .then(response => {
          this.selectedA = response;
        })
        .finally(() => {
          this.canWatchSelectedA = true;
        });
  }
};
</script>

<style scoped></style>
