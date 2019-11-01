<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card class="q-pa-md" style="min-width:500px; min-height:200px">
      <q-card-section>
        <q-select
          v-model="selectedMerchant"
          :options="merchants"
          :label="$t('merchant')"
          option-label="name"
          option-value="id"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" :label="$t('ok')" @click="onOKClick" />
        <q-btn color="primary" :label="$tc('cancel',1)" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "MerchantSelectInputDialog",
  props: {
    merchant: {
      required: true
    }
  },
  data() {
    return {
      selectedMerchant: null
    };
  },
  computed: {
    merchants() {
      return this.$store.state.merchants;
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
      this.$emit("ok", this.selectedMerchant);
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
    this.selectedMerchant = { ...this.merchant };
    // console.log(this.$parent);
  }
};
</script>