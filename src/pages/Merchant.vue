<template>
  <q-page class="row">
    <AddMerchantForm class="col-12 q-pa-md" />
    <MerchantList/>
    <div class="col-12" v-for="(i, key) in 10" :key="key"></div>
  </q-page>
</template>
<script>
import AddMerchantForm from "../components/merchant/AddMerchantForm";
import MerchantList from "../components/merchant/MerchantList";

export default {
  name: "Merchant",
  components: {
    AddMerchantForm,
    MerchantList
  },
  data() {
    return {};
  },

  methods: {}
};
</script>
