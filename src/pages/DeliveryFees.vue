<template>
  <q-page class="q-pa-sm">
    <div
      class="row justify-center text-h5"
      v-if="activeDeliveryFees"
      :key="activeDeliveryFees"
    >
      Current Delivery Fees :&nbsp;<span
        :class="{ animated: activeDeliveryFees }"
      >
        {{ activeDeliveryFees }} </span
      >&nbsp;MMK
    </div>
    <div class="row flex-center q-gutter-sm">
      <q-select
        class="col-6"
        :label="$t('deliveryFees')"
        option-label="fees"
        option-value="id"
        :options="options"
        v-model="selectedDeliveryFees"
      />
      <div>
        <q-btn
          :label="$t('confirmed')"
          color="primary"
          @click="setDeliveryFees(selectedDeliveryFees.id)"
          :disable="!selectedDeliveryFees"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { deliveryFeesRelatedApi } from "../mixins/deliveryFeesRelatedApi";
export default {
  name: "DeliveryFees",
  mixins: [deliveryFeesRelatedApi],
  data() {
    return {
      options: [{ id: 1, value: 2000 }],
      selectedDeliveryFees: null,
      activeDeliveryFees: null
    };
  },
  methods: {
    setDeliveryFees(id) {
      this.updateDeliveryFees(id).then(response => {
        this.activeDeliveryFees = response.data.result.deliveryFees.fees;
        this.selectedDeliveryFees = null;
        this.$q.notify({
          message: "Delivery Fees Updated",
          position: "top-right"
        });
      });
    }
  },
  created() {
    this.getAllDeliveryFees().then(response => {
      this.options = response.data.result.deliveryFees;
    });
    this.getDeliveryFees().then(response => {
      this.activeDeliveryFees = response.data.result.deliveryFees.fees;
    });
  }
};
</script>

<style scoped>
.animated {
  animation-name: text-color;
  animation-duration: 1s;
  animation-iteration-count: 2;
}

@keyframes text-color {
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
