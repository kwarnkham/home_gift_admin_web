<template>
  <div class="q-pa-md">
    <q-table title="Orders" :data="orders" :columns="columns" row-key="id" separator="vertical">
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
            <q-badge color="secondary">Action</q-badge>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "OrderListTable",
  data() {
    return {
      separator: "vertical",

      columns: [
        {
          name: "id",
          required: true,
          label: "Order Id",
          align: "left",
          field: row => row.id,
          //   format: val => `${val}`,
          sortable: true
        },
        {
          name: "name",
          align: "center",
          label: "Customer Name",
          field: row => row.name,
          sortable: true
        },
        {
          name: "mobile",
          label: "Phone",
          field: row => row.mobile,
          sortable: true
        },
        {
          name: "address",
          label: "Address",
          field: row => row.address,
          sortable: true
        },
        {
          name: "amount",
          label: "Amount",
          field: row => row.amount,
          sortable: true
        },
        {
          name: "createdAt",
          label: "Order Time",
          field: row => row.created_at,
          sortable: true
        },
        {
          name: "status",
          label: "Status",
          field: row => row.status,
          sortable: true
        },
        {
          name: "action",
          label: "Action",
        },
      ],
      data: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%"
        }
      ],
      orders: [
        {
          id: 1,
          name: "",
          mobile: "",
          address: "",
          amount: "",
          created_at: "",
          status: ""
        }
      ]
    };
  },
  methods: {
    getOrders() {
      axios({
        method: "get",
        url: "http://localhost:8000/api/orders"
      })
        .then(response => {
          this.orders = response.data.result;
          console.log(response.data.result);
        })
        .catch(error => console.log(error));
    }
  },
  mounted() {
    this.getOrders();
  }
};
</script>