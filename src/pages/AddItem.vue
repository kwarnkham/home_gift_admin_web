<template>
  <q-page class="row">
    <q-form class="col-12 q-pa-md" @submit="onSubmit" ref="addItemForm">
      <q-input
        ref="nameInput"
        filled
        v-model="name"
        :label="$t('itemName')"
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || $t('pleaseTypeSomething'),
          val => (val && !nameIsExisted) || $t('nameAlreadyExists')
        ]"
        @blur="validateName(name)"
      />
      <q-input
        ref="chNameInput"
        filled
        v-model="chName"
        :label="$t('chineseItemName')"
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || $t('pleaseTypeSomething'),
          val => (val && !chNameIsExisted) || $t('nameAlreadyExists')
        ]"
        @blur="validateName(chName, false)"
      />
      <q-input
        filled
        type="number"
        v-model="price"
        :label="$t('price') + ' MMK'"
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || $t('pleaseTypeSomething'),
          val => (val && val > 0) || $t('priceCannotBeNegativeValue')
        ]"
      />
      <q-input
        filled
        type="number"
        v-model="weight"
        :label="$t('weight')"
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || $t('pleaseTypeSomething'),
          val => (val && val > 0) || $t('weightCannotBeNegativeValue')
        ]"
      >
        <q-select
          v-slot:after
          v-model="selectedWeightUnit"
          :label="$t('weightUnit')"
          :options="weightUnits"
          filled=""
          style="width:18%"
        />
      </q-input>
      <q-input
        filled
        type="textarea"
        v-model="description"
        :label="$t('description')"
        lazy-rules
        :rules="[val => (val && val.length > 0) || $t('pleaseTypeSomething')]"
      />
      <q-input
        filled
        type="textarea"
        v-model="chDescription"
        :label="$t('chineseDescription')"
        lazy-rules
        :rules="[val => (val && val.length > 0) || $t('pleaseTypeSomething')]"
      />
      <q-input
        filled
        type="textarea"
        v-model="notice"
        :label="$t('notice')"
        :hint="$t('optional')"
      />
      <q-input
        filled
        type="textarea"
        v-model="chNotice"
        :label="$t('chineseNotice')"
        :hint="$t('optional')"
      />
      <q-select
        v-model="selectedLocation"
        :options="locations"
        :label="$t('location')"
        option-label="name"
        option-value="id"
        lazy-rules
        :rules="[val => (val && val != null) || $t('pleaseChooseSomething')]"
      >
        <template v-slot:after>
          <q-btn icon="add" color="green" round @click="showAddLocationForm" />
        </template>
      </q-select>
      <q-select
        v-model="selectedMerchant"
        :options="merchants"
        :label="$t('merchant')"
        option-label="name"
        option-value="id"
        lazy-rules
        :rules="[val => (val && val != null) || $t('pleaseChooseSomething')]"
      >
        <template v-slot:after>
          <q-btn icon="add" color="green" round @click="showAddMerchantForm" />
        </template>
      </q-select>
      <q-select
        multiple
        v-model="selectedCategories"
        :options="categories"
        :label="$tc('category', 2)"
        option-label="name"
        option-value="id"
        lazy-rules
        :rules="[val => (val && val != null) || $t('pleaseChooseSomething')]"
      >
        <template v-slot:after>
          <q-btn icon="add" color="green" round @click="showAddCategoryForm" />
        </template>
      </q-select>
      <input
        class="hidden"
        ref="fileInput"
        type="file"
        name="files"
        accept="image/*"
        multiple
        @input="setImage($event)"
      />
      <div class="row" v-if="thumbnails.length > 0">
        <div
          v-for="(thumbnail, key) in thumbnails"
          :key="key"
          class="col-6 q-pa-sm"
        >
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
        :label="$t('chooseImage')"
        @click="$refs.fileInput.click()"
        class="q-mt-sm bg-secondary text-white"
        style="width:100%"
      />
      <div class="text-right q-mt-sm">
        <q-btn
          :label="$t('add')"
          class="q-mt-sm bg-info text-white"
          rounded
          icon-right="add"
          type="submit"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { itemRelatedApi } from "../mixins/itemRelatedApi";
import AddLocationFormDialog from "../components/location/AddLocationFormDialog";
import AddMerchantFormDialog from "../components/merchant/AddMerchantFormDialog";
import AddCategoryFormDialog from "../components/category/AddCategoryFormDialog";

export default {
  name: "AddItem",
  mixins: [itemRelatedApi],
  components: {},

  data: () => ({
    name: "",
    chName: "",
    price: "",
    description: "",
    chDescription: "",
    notice: null,
    chNotice: null,
    weight: "",
    weightUnits: ["kg", "g", "lb"],
    selectedWeightUnit: "kg",
    selectedLocation: null,
    selectedMerchant: null,
    selectedCategories: null,
    images: null,
    thumbnails: [],
    nameIsExisted: false,
    chNameIsExisted: false
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
    // test(){
    //   return this.$refs.fileInput
    // }
  },
  watch: {
    name(value) {
      this.nameIsExisted = false;
    },
    chName(value) {
      this.chNameIsExisted = false;
    },
    nameIsExisted() {
      this.$refs.nameInput.validate();
    },
    chNameIsExisted() {
      this.$refs.chNameInput.validate();
    },
    images(value) {
      // console.log(value[0].name);
      if (value != null) {
        if (value.length > 0) {
          this.thumbnails = [];
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
    }
  },
  methods: {
    validateName(name, isEnglish = true) {
      this.checkExistedName(name).then(response => {
        if (response && response.data.code == "1") {
          if (isEnglish) {
            this.nameIsExisted = true;
          } else {
            this.chNameIsExisted = true;
          }
        } else {
          if (isEnglish) {
            this.nameIsExisted = false;
          } else {
            this.chNameIsExisted = false;
          }
        }
      });
    },
    removeFile(file) {
      for (let i = 0; i < this.images.length; i++) {
        if (this.images[i].name == file.name) {
          this.images.splice(i, 1);
        }
      }
      if (this.images.length < 1) {
        this.thumbnails = [];
      }
    },
    setImage(e) {
      this.images = Array.from(e.target.files);
      this.$refs.fileInput.value = "";
    },
    showAddLocationForm() {
      this.$q.dialog({
        component: AddLocationFormDialog,
        parent: this
      });
    },
    showAddMerchantForm() {
      this.$q.dialog({
        component: AddMerchantFormDialog,
        parent: this
      });
    },
    showAddCategoryForm() {
      this.$q.dialog({
        component: AddCategoryFormDialog,
        parent: this
      });
    },
    onSubmit() {
      if (this.images == null || this.images.length < 1) {
        this.$q.dialog({
          title: "Add Picture",
          message: "Please choose at least one picture for the item"
        });
      }
      if (this.images != null) {
        if (this.images.length > 0) {
          this.addItem(
            this.name,
            this.chName,
            this.price,
            this.description,
            this.chDescription,
            this.notice,
            this.chNotice,
            this.weight + this.selectedWeightUnit,
            this.selectedLocation,
            this.selectedMerchant,
            this.selectedCategories,
            this.images
          ).then(() => {
            this.name = "";
            this.chName = "";
            this.price = "";
            this.description = "";
            this.chDescription = "";
            this.notice = null;
            this.chNotice = null;
            this.weight = "";
            this.selectedLocation = null;
            this.selectedMerchant = null;
            this.selectedCategories = null;
            this.images = null;
            this.thumbnails = [];
            this.$refs.addItemForm.resetValidation();
          });
        }
      }
    }
  }
};
</script>
