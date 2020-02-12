<template>
  <div class="row justify-between items-center border q-mb-md">
    <slot name="english"></slot>
    <slot name="chinese"></slot>
    <slot name="myanmar"></slot>
  </div>
</template>

<script>
export default {
  name: "FieldGroup",
  props: {}
};
</script>

<style scoped>
.border {
  border: 1px solid #62a7b5;
  border-radius: 10px;
  padding-top: 20px;
}
</style>
