<template>
  <div @click="$router.push({ name: routeName })">
    <q-card class="hover-border min-height bg-grey-3">
      <q-card-section>
        <p class="text-center text-h4">{{ title }}</p>
        <p class="text-subtitle">{{ desc }}</p>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "HomeCard",
  props: {
    routeName: {
      required: true,
      type: String
    },
    title: {
      required: true,
      type: String
    },
    desc: {
      required: false,
      default: "",
      type: String
    }
  }
};
</script>

<style scoped>
.hover-border:hover {
  cursor: pointer;
  font-weight: bolder;
  border: 1px solid gold;
  background: white !important;
}
.min-height {
  min-height: 150px;
}
</style>
