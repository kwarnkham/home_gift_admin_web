<template>
  <q-dialog ref="dialog" @hide="onDialogHide" full-width>
    <q-card class="h-300">
      <q-card-section>
        <q-form ref="form">
          <q-input
            type="password"
            dense
            label="Current Password"
            v-model="password"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Cannot be empty']"
          />
          <q-input
            type="password"
            dense
            label="New Password"
            v-model="newPassword"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Cannot be empty']"
          />
          <q-input
            type="password"
            dense
            label="Confirm Password"
            v-model="confirmPassword"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Cannot be empty',
              (val) => (val && val == newPassword) || 'Passwords do not match',
            ]"
          />
          <div class="text-right">
            <q-btn label="update" color="primary" @click="updatePassword" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { userRelatedApi } from "../../mixins/userRelatedApi";
export default {
  name: "UpdateUserInfoDialog",
  mixins: [userRelatedApi],
  data() {
    return {
      password: null,
      newPassword: null,
      confirmPassword: null,
    };
  },
  props: {
    // ...your custom props
  },

  methods: {
    updatePassword() {
      this.changePassword({
        old: this.password,
        new: this.newPassword,
        confirm: this.confirmPassword,
      }).then((success) => {
        if (success) {
          this.password = null;
          this.confirmPassword = null;
          this.newPassword = null;
          this.$refs.form.resetValidation();
        }
      });
    },
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
    },
  },
  created() {},
};
</script>
