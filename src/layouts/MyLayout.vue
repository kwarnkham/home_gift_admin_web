<template>
  <q-layout view="hHh Lpr fFf">
    <LayoutHeader />
    <LeftDrawer />
    <q-page-container>
      <router-view :key="$store.state.lang" />
    </q-page-container>
  </q-layout>
</template>

<script>
import LayoutHeader from "../components/layout/LayoutHeader";
import LeftDrawer from "../components/layout/LeftDrawer";
export default {
  name: "MyLayout",
  components: {
    LayoutHeader,
    LeftDrawer
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
