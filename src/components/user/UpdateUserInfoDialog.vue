<template>
  <q-dialog ref="dialog" @hide="onDialogHide" full-width>
    <q-card class="h-300">
      <q-card-section>
        <q-form @submit="onSubmit">
          <q-input
            label="name"
            v-model="user.name"
            :rules="[val => (val && val.length > 0) || 'Cannot be empty']"
          />
          <q-input
            label="mobile"
            v-model="user.mobile"
            type="number"
            prefix="09"
            :rules="[val => (val && val.length > 0) || 'Cannot be empty']"
          />
          <q-input
            label="address"
            v-model="user.address"
            :rules="[val => (val && val.length > 0) || 'Cannot be empty']"
          />
          <div class="text-right">
            <q-btn label="Update" type="submit" color="primary" />
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
  props: {
    // ...your custom props
  },
  data() {
    return {
      user: JSON.parse(JSON.stringify(this.$store.state.user))
    };
  },
  computed: {},

  methods: {
    onSubmit() {
      this.changeUser(this.user).then(user => {
        if (user) this.$store.dispatch("setUser", user);
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
    }
  }
};
</script>
