<template>
  <q-layout view="hHh lpr fFf">
    <LayoutHeader />
    <LeftDrawer :key="$q.lang.isoName" />
    <q-page-container>
      <router-view />
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
