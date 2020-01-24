<template>
  <q-form @submit="onSubmit" ref="addMerchantForm">
    <q-input
      filled
      v-model="merchant"
      :label="$t('merchant')"
      lazy-rules
      :rules="[val => (val && val.length > 0) || $t('pleaseTypeSomething')]"
    />
    <div class="row justify-end">
      <q-btn :label="$t('add')" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { merchantRelatedApi } from "../../mixins/merchantRelatedApi";

export default {
  name: "AddMerchantForm",
  mixins: [merchantRelatedApi],
  data() {
    return {
      merchant: null
    };
  },
  methods: {
    onSubmit() {
      this.addMerchant(this.merchant).then(data => {
        this.merchant = null;
        this.$refs.addMerchantForm.resetValidation();
      });
    }
  }
};
</script>
