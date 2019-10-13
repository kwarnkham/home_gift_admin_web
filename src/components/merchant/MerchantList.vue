<template>
  <div class="col-12 row">
    <div v-for="merchant in merchants" :key="merchant.id" class="col-3 flex flex-center">
      <q-btn :label="merchant.name" @dblclick="showEditForm(merchant)" no-caps />
    </div>
  </div>
</template>

<script>
import { merchantRelatedApi } from "../../mixins/merchantRelatedApi";
export default {
  name: "MerchantList",
  mixins: [merchantRelatedApi],
  data() {
    return {};
  },
  computed: {
    merchants() {
      return this.$store.state.merchants;
    }
  },
  methods: {
    showEditForm(merchant) {
      this.$q
        .dialog({
          title: "Edit Merchant",
          message: "New Merchnat Name",
          prompt: {
            model: merchant.name,
            type: "text"
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          this.updateMerchant(merchant.id, data);
        });
    }
  },
  created() {
    this.getMerchants();
  }
};
</script>