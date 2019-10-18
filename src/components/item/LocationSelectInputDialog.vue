<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card class="q-pa-md" style="min-width:500px; min-height:200px">
      <q-card-section>
        <q-select
          v-model="selectedLocation"
          :options="locations"
          label="Location"
          option-label="name"
          option-value="id"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "LocationSelectInputDialog",
  props: {
    location: {
      required: true
    }
  },
  data() {
    return {
      selectedLocation: null
    };
  },
  computed: {
    locations() {
      return this.$store.state.locations;
    }
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.dialog.show();
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit("hide");
    },

    onOKClick() {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit("ok", this.selectedLocation);
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide();
    },

    onCancelClick() {
      // we just need to hide dialog
      this.hide();
    }
  },
  created() {
    this.selectedLocation = { ...this.location };
    // console.log(this.$parent);
  }
};
</script>