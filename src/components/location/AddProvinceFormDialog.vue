<template>
  <q-dialog ref="dialog" @hide="onDialogHide" full-width>
    <q-card class="h-200">
      <q-card-section>
        <AddProvinceForm />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import AddProvinceForm from "../location/AddProvinceForm";
export default {
  name: "AddProvinceFormDialog",
  components: { AddProvinceForm },
  props: {
    // ...your custom props
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
      this.$emit("ok");
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide();
    },

    onCancelClick() {
      // we just need to hide dialog
      this.hide();
    }
  }
};
</script>
