<template>
  <q-form @submit="onSubmit" ref="addCategoryForm">
    <q-input
      filled
      v-model="category"
      label="Category"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please type something']"
    />
    <div class="row justify-end">
      <q-btn label="Add" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { categoryRelatedApi } from "../../mixins/categoryRelatedApi";

export default {
  name: "AddCategoryForm",
  mixins: [categoryRelatedApi],
  data(){
      return{
      category: null
      }
  },
  methods: {
    onSubmit() {
      this.addCategory(this.category).then(data => {
        this.category = null;
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