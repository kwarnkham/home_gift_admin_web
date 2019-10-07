<template>
  <q-page class="row">
    <OrderListTable/>
  </q-page>
</template>

<script>
import OrderListTable from '../components/OrderListTable'
export default {
  name: 'Index',
  components:{
    OrderListTable
  },
}
</script>
