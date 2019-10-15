<template>
  <q-page class="row">
    <q-form class="col-12 q-pa-md">
      <q-input
        filled
        v-model="name"
        label="Item Name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
        filled
        type="number"
        v-model="price"
        label="Price"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something', val => val && val > 0 || 'Price cannot be negative value']"
      />
      <q-input
        filled
        type="number"
        v-model="weight"
        label="Weight in kg"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something', val => val && val > 0 || 'Price cannot be negative value']"
      />
      <q-input
        filled
        type="textarea"
        v-model="description"
        label="Description"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input filled type="textarea" v-model="notice" label="Notice" hint="Optional" />
      <q-select
        v-model="selectedLocation"
        :options="locations"
        label="Location"
        option-label="name"
        option-value="id"
      />
      <q-select
        v-model="selectedMerchant"
        :options="merchants"
        label="Merchant"
        option-label="name"
        option-value="id"
      />

      <q-select
        multiple
        v-model="selectedCategories"
        :options="categories"
        label="Categories"
        option-label="name"
        option-value="id"
      />
      <input
        class="hidden"
        ref="fileInput"
        type="file"
        name="files"
        accept="image/*"
        multiple
        @change="setImage($event)"
      />
      <div class="row" v-if="thumbnails.length>0">
        <div v-for="(thumbnail, key) in thumbnails" :key="key" class="col-6 q-pa-sm">
          <q-img :src="thumbnail.content">
            <div class="absolute-top text-right" style="padding:0px;">
              <q-btn
                icon="close"
                round
                size="10px"
                color="red"
                class="q-ma-xs"
                @click="removeFile(thumbnail)"
              />
            </div>
          </q-img>
        </div>
      </div>
      <q-btn
        label="Choose Image"
        @click="$refs.fileInput.click()"
        class="q-mt-sm bg-secondary text-white"
        style="width:100%"
      />
      <div class="text-right q-mt-sm">
        <q-btn label="Add" class="q-mt-sm bg-info text-white" rounded icon-right="add"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { locationRelatedApi } from "../mixins/locationRelatedApi";
import { merchantRelatedApi } from "../mixins/merchantRelatedApi";
import { categoryRelatedApi } from "../mixins/categoryRelatedApi";

export default {
  name: "AddItem",
  mixins: [locationRelatedApi, merchantRelatedApi, categoryRelatedApi],
  components: {},

  data: () => ({
    name: "",
    price: "",
    description: "",
    notice: "",
    weight: "",
    selectedLocation: null,
    selectedMerchant: null,
    selectedCategories: null,
    images: null,
    thumbnails: []
  }),
  computed: {
    locations() {
      return this.$store.state.locations;
    },
    merchants() {
      return this.$store.state.merchants;
    },
    categories() {
      return this.$store.state.categories;
    }
  },
  watch: {
    images(value) {
      this.thumbnails = [];
      // console.log(value[0].name);
      if (value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          let reader = new FileReader();
          reader.readAsDataURL(value[i]);
          reader.onload = reader =>
            this.thumbnails.push({
              name: value[i].name,
              content: reader.target.result
            });
        }
      }
    }
  },
  methods: {
    removeFile(file) {
      for (let i = 0; i < this.images.length; i++) {
        if (this.images[i].name == file.name) {
          this.images.splice(i, 1);
        }
      }
    },
    setImage(e) {
      this.images = Array.from(e.target.files);
    }
  },
  mounted() {
    this.getLocations();
    this.getMerchants();
    this.getCategories();
  }
};
</script>
