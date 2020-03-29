<template>
  <q-dialog v-model="isOpen" maximized>
    <div class="bg-green-2 q-pa-md row">
      <div class="row justify-between items-center col-12">
        <q-btn
          v-close-popup
          icon="keyboard_arrow_left"
          round
          flat
          glossy
          color="white"
          class="bg-black"
        />
        <div class="text-h4">Level A categories</div>
        <q-btn
          v-close-popup
          icon="keyboard_arrow_left"
          round
          flat
          glossy
          color="white"
          class="bg-black invisible"
        />
      </div>
      <div class="bg-grey-3 col-12 q-pa-sm h-500">
        <q-card>
          <q-card-section class="row items-center">
            <div class="col">Category</div>
            <q-btn icon="delete" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: "ACategoryDialog",
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    show() {
      this.isOpen = true;
    }
  }
};
</script>

<style scoped></style>
