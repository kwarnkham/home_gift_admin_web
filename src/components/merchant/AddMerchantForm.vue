<template>
  <q-form @submit="onSubmit" ref="addMerchantForm">
    <FieldGroup>
      <template #english>
        <q-input
          filled
          v-model="merchant"
          :label="$t('merchant')"
          lazy-rules
          :rules="[val => (val && val.length > 0) || $t('pleaseTypeSomething')]"
          class="col-sm-12 col-md-4 q-px-xs"
        />
      </template>
      <template #chinese>
        <q-input
          filled
          v-model="chMerchant"
          :label="$t('chineseMerchant')"
          lazy-rules
          :rules="[val => (val && val.length > 0) || $t('pleaseTypeSomething')]"
          class="col-sm-12 col-md-4 q-px-xs"
        />
      </template>
      <template #myanmar>
        <q-input
          filled
          v-model="mmMerchant"
          :label="$t('myanmarMerchant')"
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
import { merchantRelatedApi } from "../../mixins/merchantRelatedApi";
import FieldGroup from "../FieldGroup";

export default {
  name: "AddMerchantForm",
  mixins: [merchantRelatedApi],
  components: {
    FieldGroup
  },
  data() {
    return {
      merchant: null,
      chMerchant: null,
      mmMerchant: null
    };
  },
  methods: {
    onSubmit() {
      this.addMerchant({
        name: this.merchant,
        chName: this.chMerchant,
        mmName: this.mmMerchant
      }).then(data => {
        this.merchant = null;
        this.mmMechant = null;
        this.chMerchant = null;
        this.$refs.addMerchantForm.resetValidation();
      });
    }
  }
};
</script>
