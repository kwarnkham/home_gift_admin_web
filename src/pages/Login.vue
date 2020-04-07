<template>
  <div class="flex flex-center window-height window-width bg-grey-13">
    <q-form @submit="onSubmit" class="w-300 bg-white q-pa-sm rounded-borders">
      <q-input
        filled
        type="number"
        v-model="mobile"
        label="Mobile"
        :rules="[val => (val && val.length > 0) || 'Cannot be empty']"
        dense
        prefix="09"
        clearable
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Password"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Cannot be empty']"
        dense=""
      />

      <div class="text-right">
        <q-btn label="Login" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { userRelatedApi } from "../mixins/userRelatedApi";
import store from "../store";
export default {
  name: "Login",
  mixins: [userRelatedApi],
  data() {
    return {
      mobile: null,
      password: null
    };
  },
  methods: {
    onSubmit() {
      this.login({ mobile: this.mobile, password: this.password });
    }
  },
  beforeRouteEnter(to, from, next) {
    if (store.state.user) {
      next({ name: "home" });
    } else {
      next();
    }
  }
};
</script>

<style></style>
