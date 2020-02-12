<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card class="q-pa-md" style="min-width:500px; min-height:200px">
      <q-card-section>
        <FieldGroup>
          <template #english>
            <q-input
              filled
              v-model="name"
              :label="$t('category')"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || $t('pleaseTypeSomething')
              ]"
              class="col-sm-12 col-md-4 q-px-xs"
            />
          </template>
          <template #chinese>
            <q-input
              filled
              v-model="chName"
              :label="$t('chineseCategory')"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || $t('pleaseTypeSomething')
              ]"
              class="col-sm-12 col-md-4 q-px-xs"
            />
          </template>
          <template #myanmar>
            <q-input
              filled
              v-model="mmName"
              :label="$t('myanmarCategory')"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || $t('pleaseTypeSomething')
              ]"
              class="col-sm-12 col-md-4 q-px-xs"
            />
          </template>
        </FieldGroup>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" :label="$t('ok')" @click="onOKClick" />
        <q-btn
          color="primary"
          :label="$tc('cancel', 1)"
          @click="onCancelClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import FieldGroup from "../FieldGroup";
export default {
  name: "EditCategoryFormDialog",
  components: {
    FieldGroup
  },
  props: {
    category: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      name: this.category.name,
      chName: this.category.ch_name,
      mmName: this.category.mm_name
    };
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
      this.$emit("ok", {
        name: this.name,
        chName: this.chName,
        mmName: this.mmName
      });
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
