<template>
  <q-form @submit="onSubmit" ref="addCategoryForm">
    <FieldGroup>
      <template #english>
        <q-input
          filled
          v-model="name"
          :label="$tc('category', 1)"
          lazy-rules
          :rules="[val => (val && val.length > 0) || $t('pleaseTypeSomething')]"
          class="col-12-sm col-md-4 q-px-xs"
        />
      </template>
      <template #chinese>
        <q-input
          filled
          v-model="chName"
          :label="$tc('chineseCategory', 1)"
          lazy-rules
          :rules="[val => (val && val.length > 0) || $t('pleaseTypeSomething')]"
          class="col-12-sm col-md-4 q-px-xs"
        />
      </template>
      <template #myanmar>
        <q-input
          filled
          v-model="mmName"
          :label="$tc('myanmarCategory', 1)"
          lazy-rules
          :rules="[val => (val && val.length > 0) || $t('pleaseTypeSomething')]"
          class="col-12-sm col-md-4 q-px-xs"
        />
      </template>
    </FieldGroup>

    <div class="row justify-end">
      <q-btn :label="$t('add')" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { categoryRelatedApi } from "../../mixins/categoryRelatedApi";
import FieldGroup from "../FieldGroup";
export default {
  name: "AddCategoryForm",
  mixins: [categoryRelatedApi],
  components: {
    FieldGroup
  },
  data() {
    return {
      name: null,
      chName: null,
      mmName: null
    };
  },
  methods: {
    onSubmit() {
      this.addCategory({
        name: this.name,
        chName: this.chName,
        mmName: this.mmName
      }).then(data => {
        this.name = null;
        this.mmName = null;
        this.chName = null;
        this.$refs.addCategoryForm.resetValidation();
      });
      //   if (this.accept !== true) {
      //     this.$q.notify({
      //       color: "red-5",
      //       textColor: "white",
      //       icon: "warning",
      //       message: "You need to accept the license and terms first"
      //     });
      //   } else {
      //     this.$q.notify({
      //       color: "green-4",
      //       textColor: "white",
      //       icon: "cloud_done",
      //       message: "Submitted"
      //     });
      //   }
    }
  }
};
</script>
