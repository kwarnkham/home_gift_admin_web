<template>
  <q-form @submit="onSubmit" ref="addLocationForm">
    <q-input
      filled
      v-model="location"
      label="Location"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please type something']"
    />
    <div class="row justify-end">
      <q-btn label="Add" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { locationRelatedApi } from "../../mixins/locationRelatedApi";

export default {
  name: "AddLocationForm",
  mixins: [locationRelatedApi],
  data(){
      return{
      location: null
      }
  },
  methods: {
    onSubmit() {
      this.addLocation(this.location).then(data => {
        this.location = null;
        this.$refs.addLocationForm.resetValidation();
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