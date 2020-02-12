<template>
  <div class="col-12 row q-pa-sm">
    <div v-for="location in locations" :key="location.id" class="col-3">
      <q-btn-dropdown color="primary" :label="location.name" no-caps>
        <q-list>
          <q-item
            clickable
            v-close-popup
            @click="showEditLocationNameForm(location)"
          >
            <q-item-section>
              <q-item-label>{{ location.name }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-close-popup
            @click="showEditLocationProvinceForm(location)"
          >
            <q-item-section>
              <q-item-label>{{ location.province.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <!-- <q-btn :label="location.name" @dblclick="showEditForm(location)" no-caps /> -->
    </div>
  </div>
</template>

<script>
import { locationRelatedApi } from "../../mixins/locationRelatedApi";
import EditLocationNameDialog from "./EditLocationNameDialog";
import ProvinceSelectInputDialog from "../../components/location/ProvinceSelectInputDialog";
export default {
  name: "LocationList",
  components: {
    ProvinceSelectInputDialog
  },
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
    showEditLocationNameForm(location) {
      this.$q
        .dialog({
          component: EditLocationNameDialog,
          location: location,
          parent: this
        })
        .onOk(data => {
          let newLocation = {
            name: data.name,
            chName: data.chName,
            mmName: data.mmName,
            id: location.id,
            province: location.province
          };
          this.updateLocation(newLocation);
        });
    },
    showEditLocationProvinceForm(location) {
      this.$q
        .dialog({
          component: ProvinceSelectInputDialog,
          parent: this,
          province: location.province
        })
        .onOk(province => {
          let newLocation = {
            name: location.name,
            chName: location.ch_name,
            mmName: location.mm_name,
            id: location.id,
            province: province
          };
          this.updateLocation(newLocation);
        });
    }
  },
  created() {}
};
</script>
