<template>
  <q-page class="row">
    <q-card style="width:100%">
      <q-tabs
        v-model="tab"
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="pending" :label="$t('pending')" />
        <q-tab name="confirmed" :label="$t('confirmed')" />
        <q-tab name="onTheWay" :label="$t('onTheWay')" />
        <q-tab name="Canceled" :label="$tc('cancel',2)" />
        <q-tab name="Delivered" :label="$t('delivered')" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="pending">
          <OrderListTable filter="pending" />
        </q-tab-panel>

        <q-tab-panel name="confirmed">
          <OrderListTable filter="confirmed" />
        </q-tab-panel>

        <q-tab-panel name="onTheWay">
          <OrderListTable filter="on the way" />
        </q-tab-panel>

        <q-tab-panel name="Canceled">
          <OrderListTable filter="canceled" />
        </q-tab-panel>

        <q-tab-panel name="Delivered">
          <OrderListTable filter="delivered" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import OrderListTable from "../components/OrderListTable";
import {orderRelatedApi} from '../mixins/orderRelatedApi'

export default {
  name: "Index",
  components: {
    OrderListTable
  },
  mixins:[orderRelatedApi],
  data: () => ({
    tab: "pending"
  }),
  computed: {
    orders() {
      return this.$store.state.orders;
    }
  },
  methods: {

  },
  mounted() {
    this.getOrders();
  }
};
</script>
