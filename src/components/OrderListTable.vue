<template>
  <div class="q-pa-md">
    <q-table
      title="Orders"
      :data="tableOrders"
      :columns="columns"
      row-key="id"
      separator="vertical"
    >
      <template v-slot:top>
        <q-space />
        <q-btn
          outline
          color="primary"
          :label="$t('update')"
          @click="getOrders()"
        >
          <q-badge color="orange" floating v-if="newOrderCount > 0">{{
            newOrderCount
          }}</q-badge>
        </q-btn>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">{{ props.row.id }}</q-td>
          <q-td key="name" :props="props">
            <q-badge color="green">{{ props.row.name }}</q-badge>
          </q-td>
          <q-td key="mobile" :props="props">
            <q-badge color="purple">{{ props.row.mobile }}</q-badge>
          </q-td>
          <q-td key="address" :props="props">
            <q-badge color="orange">{{ props.row.address }}</q-badge>
          </q-td>
          <q-td key="amount" :props="props">
            <q-badge color="primary">{{ props.row.amount }}</q-badge>
          </q-td>
          <q-td key="createdAt" :props="props">
            <q-badge color="teal">{{ props.row.created_at }}</q-badge>
          </q-td>
          <q-td key="status" :props="props">
            <q-badge color="accent">{{ props.row.status }}</q-badge>
          </q-td>
          <q-td key="action" :props="props">
            <q-btn-dropdown
              color="primary"
              :label="$t('action')"
              :disable="disableActionBtn"
            >
              <q-list>
                <q-item
                  clickable
                  v-close-popup
                  @click="actOnOrder(props.row.id, 'confirmed')"
                  v-if="filter == 'pending'"
                >
                  <q-item-section>
                    <q-item-label>{{ $t("confirm") }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-close-popup
                  @click="actOnOrder(props.row.id, 'on the way')"
                  v-if="filter == 'confirmed'"
                >
                  <q-item-section>
                    <q-item-label>{{ $t("dispatch") }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-close-popup
                  @click="actOnOrder(props.row.id, 'delivered')"
                  v-if="filter == 'on the way'"
                >
                  <q-item-section>
                    <q-item-label>{{ $t("finish") }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-close-popup
                  @click="actOnOrder(props.row.id, 'canceled')"
                >
                  <q-item-section>
                    <q-item-label>{{ $tc("cancel", 1) }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { orderRelatedApi } from "../mixins/orderRelatedApi";
export default {
  name: "OrderListTable",
  props: {
    filter: {
      type: String,
      required: true
    }
  },
  mixins: [orderRelatedApi],
  data() {
    return {
      separator: "vertical",
      columns: [
        {
          name: "id",
          required: true,
          label: this.$t("orderId"),
          align: "left",
          field: row => row.id,
          //   format: val => `${val}`,
          sortable: true
        },
        {
          name: "name",
          align: "center",
          label: this.$t("customerName"),
          field: row => row.name,
          sortable: true
        },
        {
          name: "mobile",
          label: this.$t("phone"),
          field: row => row.mobile,
          sortable: true
        },
        {
          name: "address",
          label: this.$t("address"),
          field: row => row.address,
          sortable: true
        },
        {
          name: "amount",
          label: this.$t("amount"),
          field: row => row.amount,
          sortable: true
        },
        {
          name: "createdAt",
          label: this.$t("orderTime"),
          field: row => row.created_at,
          sortable: true
        },
        {
          name: "status",
          label: this.$t("status"),
          field: row => row.status,
          sortable: true
        },
        {
          name: "action",
          label: this.$t("action")
        }
      ]
    };
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    },
    tableOrders() {
      if (this.filter == "pending") {
        let orders = this.$store.state.orders;
        return orders.filter(order => order.status == "pending");
      }
      if (this.filter == "confirmed") {
        let orders = this.$store.state.orders;
        return orders.filter(order => order.status == "confirmed");
      }
      if (this.filter == "on the way") {
        let orders = this.$store.state.orders;
        return orders.filter(order => order.status == "on the way");
      }
      if (this.filter == "canceled") {
        let orders = this.$store.state.orders;
        return orders.filter(order => order.status == "canceled");
      }
      if (this.filter == "delivered") {
        let orders = this.$store.state.orders;
        return orders.filter(order => order.status == "delivered");
      }
    },
    disableActionBtn() {
      if (this.filter == "delivered" || this.filter == "canceled") {
        return true;
      } else {
        return false;
      }
    },
    newOrderCount() {
      return this.$store.state.newOrderCount;
    }
  },
  methods: {},
  created() {}
};
</script>
