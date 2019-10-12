<template>
  <div class="col-12 row">
    <div v-for="location in locations" :key="location.id" class="col-3 flex flex-center">
      <q-btn :label="location.name" @dblclick="showEditForm(location)"  no-caps/>
    </div>
  </div>
</template>

<script>
import { locationRelatedApi } from "../../mixins/locationRelatedApi";
export default {
  name: "LocationList",
  mixins: [locationRelatedApi],
  data() {
    return {};
  },
  computed: {
    locations() {
      return this.$store.state.locations;
    }
  },
  methods: {
    showEditForm(location) {
      this.$q
        .dialog({
          title: "Edit Location",
          message: "New Location Name",
          prompt: {
            model: location.name,
            type: "text"
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          this.updateLocation(location.id, data);
        });
    }
  },
  created() {
    this.getLocations();
  }
};
</script>