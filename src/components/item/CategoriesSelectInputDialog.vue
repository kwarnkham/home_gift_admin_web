<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card class="q-pa-md" style="min-width:500px; min-height:200px">
      <q-card-section>
        <q-select
          multiple
          v-model="selectedCategories"
          :options="categories"
          :label="$tc('category', 2)"
          option-label="name"
          option-value="id"
          :rules="[
            val => (val && val.length > 0) || $t('pleaseChooseSomething')
          ]"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          color="primary"
          :label="$t('ok')"
          @click="onOKClick"
          :disable="selectedCategories.length < 1"
        />
        <q-btn
          color="primary"
          :label="$tc('cancel', 1)"
          @click="onCancelClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { categoryRelatedApi } from "../../mixins/categoryRelatedApi";
export default {
  name: "CategoriesSelectInputDialog",
  props: {
    propCategories: {
      required: true
    }
  },
  mixins: [categoryRelatedApi],
  data() {
    return {
      selectedCategories: [],
      categories: []
    };
  },
  computed: {},
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.dialog.show();
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit("hide");
    },

    onOKClick() {
      if (this.selectedCategories.length > 0) {
        this.$emit("ok", this.selectedCategories);
      }
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide();
    },

    onCancelClick() {
      // we just need to hide dialog
      this.hide();
    }
  },
  created() {
    // console.log(this.propCategories);
    this.selectedCategories = [...this.propCategories];
    this.getCategories().then(response => (this.categories = response));
    // console.log(this.$parent);
  }
};
</script>
