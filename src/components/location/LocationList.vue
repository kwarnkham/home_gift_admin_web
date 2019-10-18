<template>
  <div class="col-12 row">
    <div v-for="location in locations" :key="location.id" class="col-3 flex flex-center">
      <q-btn :label="location.name" @dblclick="showEditForm(location)"  no-caps/>
    </div>
  </div>
</template>

<script>
export default {
  name: "LocationList",
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
  }
};
</script>