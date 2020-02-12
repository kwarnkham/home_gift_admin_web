<template>
  <q-page class="row">
    <AddLocationForm class="col-12 q-pa-md" />
    <LocationList />
    <div class="col-12" v-for="(i, key) in 10" :key="key"></div>
  </q-page>
</template>
<script>
import AddLocationForm from "../components/location/AddLocationForm";
import LocationList from "../components/location/LocationList";

export default {
  name: "Location",
  components: {
    AddLocationForm,
    LocationList
  },
  data() {
    return {};
  },

  methods: {}
};
</script>
