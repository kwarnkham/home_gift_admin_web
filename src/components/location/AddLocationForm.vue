<template>
  <q-form @submit="onSubmit" ref="addLocationForm">
    <q-input
      filled
      v-model="location"
      :label="$t('location')"
      lazy-rules
      :rules="[ val => val && val.length > 0 || $t('pleaseTypeSomething')]"
    />
    <q-select
      filled
      v-model="selectedProvince"
      :options="provinces"
      :label="$t('province')"
      option-label="name"
      option-value="id"
      lazy-rules
      :rules="[ val => val && val != null || $t('pleaseChooseSomething')]"
    />
    <div class="row justify-end">
      <q-btn :label="$t('add')" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { locationRelatedApi } from "../../mixins/locationRelatedApi";

export default {
  name: "AddLocationForm",
  mixins: [locationRelatedApi],
  data() {
    return {
      location: null,
      selectedProvince: null
    };
  },
  computed: {
    provinces() {
      return this.$store.state.provinces;
    }
  },
  methods: {
    onSubmit() {
      let location = {
        name: this.location,
        province_id: this.selectedProvince.id
      };
      this.addLocation(location).then(data => {
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
  },
  created() {
    this.getProvinces();
  }
};
</script>