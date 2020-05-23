<template>
  <div class="col-12 row">
    <div
      v-for="merchant in merchants"
      :key="merchant.id"
      class="col-xs-12 col-sm-6 col-md-4 q-pa-sm"
    >
      <q-btn
        :label="merchant.name"
        no-caps
        @click="routeToMerchantItem(merchant)"
      />
      <q-icon
        name="edit"
        class="cursor-pointer q-ml-xs"
        @click="showEditForm(merchant)"
      />
    </div>
  </div>
</template>

<script>
import { merchantRelatedApi } from "../../mixins/merchantRelatedApi";
import EditMerchantFormDialog from "./EditMerchantFormDialog";
export default {
  name: "MerchantList",
  mixins: [merchantRelatedApi],
  components: {
    EditMerchantFormDialog
  },
  data() {
    return {};
  },
  computed: {
    merchants() {
      return this.$store.state.merchants;
    }
  },
  methods: {
    routeToMerchantItem(merchant) {
      let prop = JSON.stringify(merchant);
      this.$router.push({
        name: "merchantItems",
        params: { merchant: prop }
      });
    },
    showEditForm(merchant) {
      this.$q
        .dialog({
          component: EditMerchantFormDialog,
          parent: this,
          merchant: merchant
        })
        .onOk(data => {
          this.updateMerchant(merchant.id, data);
        });

      // this.$q
      //   .dialog({
      //     title: "Edit Merchant",
      //     message: "New Merchnat Name",
      //     prompt: {
      //       model: merchant.name,
      //       type: "text"
      //     },
      //     cancel: true,
      //     persistent: true
      //   })
      //   .onOk(data => {
      //     this.updateMerchant(merchant.id, data);
      //   });
    }
  },
  created() {}
};
</script>
