<template>
  <div
    class="row justify-between items-center"
    :class="{ border: border, 'q-mb-md': border }"
  >
    <slot name="english"></slot>
    <slot name="chinese"></slot>
    <slot name="myanmar"></slot>
  </div>
</template>

<script>
export default {
  name: "FieldGroup",
  props: {
    border: {
      default: false,
      type: Boolean
    }
  }
};
</script>
