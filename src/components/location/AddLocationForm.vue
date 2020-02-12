<template>
  <q-form @submit="onSubmit" ref="addLocationForm">
    <FieldGroup border>
      <template #english>
        <q-input
          filled
          v-model="location"
          :label="$t('location')"
          lazy-rules
          :rules="[val => (val && val.length > 0) || $t('pleaseTypeSomething')]"
          class="col-sm-12 col-md-4 q-px-xs"
        />
      </template>
      <template #chinese>
        <q-input
          filled
          v-model="chLocation"
          :label="$t('chineseLocation')"
          lazy-rules
          :rules="[val => (val && val.length > 0) || $t('pleaseTypeSomething')]"
          class="col-sm-12 col-md-4 q-px-xs"
        />
      </template>
      <template #myanmar>
        <q-input
          filled
          v-model="mmLocation"
          :label="$t('myanmarLocation')"
          lazy-rules
          :rules="[val => (val && val.length > 0) || $t('pleaseTypeSomething')]"
          class="col-sm-12 col-md-4 q-px-xs"
        />
      </template>
    </FieldGroup>

    <q-select
      filled
      v-model="selectedProvince"
      :options="provinces"
      :label="$t('province')"
      option-label="name"
      option-value="id"
      lazy-rules
      :rules="[val => (val && val != null) || $t('pleaseChooseSomething')]"
    >
      <template #after>
        <q-btn icon="add" color="green" round @click="showAddProvinceForm" />
      </template>
    </q-select>
    <div class="row justify-end">
      <q-btn :label="$t('add')" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { locationRelatedApi } from "../../mixins/locationRelatedApi";
import AddProvinceFormDialog from "./AddProvinceFormDialog";
import FieldGroup from "../FieldGroup";

export default {
  name: "AddLocationForm",
  mixins: [locationRelatedApi],
  components: {
    FieldGroup
  },
  data() {
    return {
      location: null,
      mmLocation: null,
      chLocation: null,
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
        chName: this.chLocation,
        mmName: this.mmLocation,
        provinceId: this.selectedProvince.id
      };
      this.addLocation(location).then(data => {
        this.location = null;
        this.mmLocation = null;
        this.chLocation = null;
        this.$refs.addLocationForm.resetValidation();
      });
    },
    showAddProvinceForm() {
      this.$q.dialog({
        component: AddProvinceFormDialog,
        parent: this
      });
    }
  },
  created() {
    this.getProvinces();
  }
};
</script>
