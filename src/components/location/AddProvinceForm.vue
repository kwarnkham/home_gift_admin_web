<template>
  <q-form @submit="onSubmit" ref="addPRovinceForm">
    <FieldGroup>
      <template #english>
        <q-input
          filled
          v-model="province"
          :label="$t('province')"
          lazy-rules
          :rules="[val => (val && val.length > 0) || $t('pleaseTypeSomething')]"
          class="col-sm-12 col-md-4 q-px-xs"
        />
      </template>
      <template #chinese>
        <q-input
          filled
          v-model="chProvince"
          :label="$t('chineseProvince')"
          lazy-rules
          :rules="[val => (val && val.length > 0) || $t('pleaseTypeSomething')]"
          class="col-sm-12 col-md-4 q-px-xs"
        />
      </template>
      <template #myanmar>
        <q-input
          filled
          v-model="mmProvince"
          :label="$t('myanmarProvince')"
          lazy-rules
          :rules="[val => (val && val.length > 0) || $t('pleaseTypeSomething')]"
          class="col-sm-12 col-md-4 q-px-xs"
        />
      </template>
    </FieldGroup>
    <div class="row justify-end">
      <q-btn :label="$t('add')" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { locationRelatedApi } from "../../mixins/locationRelatedApi";
import FieldGroup from "../FieldGroup";

export default {
  name: "AddProvinceForm",
  mixins: [locationRelatedApi],
  components: {
    FieldGroup
  },
  data() {
    return {
      province: null,
      mmProvince: null,
      chProvince: null
    };
  },
  computed: {
    provinces() {
      return this.$store.state.provinces;
    }
  },
  methods: {
    onSubmit() {
      let province = {
        name: this.province,
        chName: this.chProvince,
        mmName: this.mmProvince
      };
      console.log(province);
      this.addProvince(province).then(data => {
        this.province = null;
        this.mmProvince = null;
        this.chProvince = null;
        this.$refs.addPRovinceForm.resetValidation();
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
