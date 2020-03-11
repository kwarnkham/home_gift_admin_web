<template>
  <q-item clickable :active="$route.name == routeName" active-class="is-active">
    <q-item-section avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "DrawerListNavItem",
  props: {
    routeName: {
      required: true,
      type: String
    },
    icon: {
      required: true,
      type: String
    },
    label: {
      required: true,
      type: String
    }
  }
};
</script>

<style scoped>
.is-active{
  color: #00BCD4;
}
</style>
