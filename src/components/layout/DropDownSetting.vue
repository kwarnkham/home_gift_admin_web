<template>
  <q-btn-dropdown
    label="Settings"
    dropdown-icon="settings"
    no-caps
    flat
    rounded=""
  >
    <q-list>
      <q-item
        clickable
        v-close-popup
        @click="item.onClick"
        v-for="item in dropDownItems"
        :key="item.label"
      >
        <q-item-section>
          <q-item-label>{{ item.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
import UpdateUserInfoDialog from "../user/UpdateUserInfoDialog";
export default {
  name: "DropDownSetting",
  data() {
    return {
      dropDownItems: [
        { label: "User Info", onClick: this.showUpdateUserInfoDialog },
        { label: "Password", onClick: this.showUpdateUserInfoDialog },
        { label: "Logout", onClick: this.logout },
      ],
    };
  },
  methods: {
    showUpdateUserInfoDialog() {
      this.$q.dialog({
        component: UpdateUserInfoDialog,
        parent: this,
      });
    },
    logout() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Do you want to logout?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.$store.dispatch("setUser", null);
          this.$router.push({ name: "login" });
        });
    },
  },
};
</script>

<style></style>
