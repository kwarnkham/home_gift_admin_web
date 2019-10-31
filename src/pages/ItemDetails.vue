<template>
  <q-page class="row" v-if="item != undefined">
    <div class="col-4 bg-grey-5">
      <div>
        <q-btn label="Name" flat no-caps @dblclick="showEditNameForm()" />
        : {{item.name}}
      </div>
      <div>
        <q-btn label="Price" flat no-caps @dblclick="showEditPriceForm()" />
        : {{item.price}}
      </div>
      <div>
        <q-btn label="Description" flat no-caps @dblclick="showEditDescriptionForm()" />
        : {{item.description}}
      </div>
      <div>
        <q-btn label="Notice" flat no-caps @dblclick="showEditNoticeForm()" />
        : {{item.notice}}
      </div>
      <div>
        <q-btn label="Weight" flat no-caps @dblclick="showEditWeightForm()" />
        : {{item.weight}}
      </div>
      <div>
        <q-btn label="Merchant" flat no-caps @dblclick="showEditMerchantForm()" />
        : {{item.merchant.name}}
      </div>
      <div>
        <q-btn label="Location" flat no-caps @dblclick="showEditLocationForm()" />
        : {{item.location.name}}
      </div>
      <div>
        <q-btn label="Categories" flat no-caps @dblclick="showEditCategoriesForm()" />
        : {{categories.join(', ')}}
      </div>
    </div>

    <div class="col-6">
      <q-carousel
        ref="imageSlides"
        animated
        v-model="slide"
        arrows
        navigation
        infinite
        style="width:600px"
        height="300px"
      >
        <q-carousel-slide
          v-for="image in item.images"
          v-model="slide"
          :key="image.id"
          :name="image.id"
          :img-src="`${$store.state.imageHost}/item_images/${image.name}`"
        />
        <template v-slot:control>
          <q-carousel-control position="top-right" :offset="[18, 18]">
            <q-btn
              icon="close"
              round
              color="red"
              @click="deleteItemPic"
              :disable="item.images.length < 2"
            />
          </q-carousel-control>

          <q-carousel-control position="bottom-right" :offset="[18, 18]" class="q-gutter-xs">
            <q-btn icon="add" round color="primary" @click="addItemPic" />
          </q-carousel-control>
        </template>
      </q-carousel>
    </div>
  </q-page>
</template>
<script>
import { itemRelatedApi } from "../mixins/itemRelatedApi";
import MerchantSelectInputDialog from "../components/item/MerchantSelectInputDialog";
import LocationSelectInputDialog from "../components/item/LocationSelectInputDialog";
import CategoriesSelectInputDialog from "../components/item/CategoriesSelectInputDialog";

export default {
  name: "ItemDetails",
  mixins: [itemRelatedApi],
  components: {
    MerchantSelectInputDialog,
    LocationSelectInputDialog,
    CategoriesSelectInputDialog
  },
  data() {
    return {
      slide: null,
      formItem: {}
    };
  },
  computed: {
    items() {
      return this.$store.state.items;
    },
    item() {
      var temp = this.items.filter(el => el.id == this.$route.params.itemId);
      this.formItem = this.cloneObj(temp[0]);
      return temp[0];
    },
    categories() {
      var temp = [];
      this.item.categories.forEach(el => temp.push(el.name));
      return temp;
    }
  },
  watch: {
    item(value) {
      this.slide = value.images[0].id;
    }
  },
  methods: {
    deleteItemPic() {
      this.deleteImage(this.slide).then(response => {
        if (response != null) {
          this.getItems();
        }
      });
    },
    addItemPic() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".png, .jpg";
      let file;
      input.onchange = _ => {
        const files = Array.from(input.files);
        this.addImagesToItem(this.item.id, files).then(() => this.getItems());
      };
      input.click();
    },
    showEditNameForm() {
      this.$q
        .dialog({
          title: "Edit Name",
          message: "New Name",
          prompt: {
            model: this.formItem.name,
            type: "text"
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          this.formItem.name = data;
          this.updateItem(this.formItem).then(response => {
            if (response != null) {
              this.getItems();
            }
          });
          // console.log(data);
        });
    },
    showEditPriceForm() {
      this.$q
        .dialog({
          title: "Edit Price",
          message: "New Price",
          prompt: {
            model: this.formItem.price,
            type: "number"
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          this.formItem.price = data;
          this.updateItem(this.formItem).then(() => {
            this.getItems();
          });
          // console.log(data);
        });
    },
    showEditDescriptionForm() {
      this.$q
        .dialog({
          title: "Edit Description",
          message: "New Description",
          prompt: {
            model: this.formItem.description,
            type: "textarea"
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          this.formItem.description = data;
          this.updateItem(this.formItem).then(() => {
            this.getItems();
          });
          // console.log(data);
        });
    },
    showEditNoticeForm() {
      this.$q
        .dialog({
          title: "Edit Notice",
          message: "New Notice",
          prompt: {
            model: this.formItem.notice,
            type: "textarea"
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          this.formItem.notice = data;
          this.updateItem(this.formItem).then(() => {
            this.getItems();
          });
          // console.log(data);
        });
    },
    showEditWeightForm() {
      this.$q
        .dialog({
          title: "Edit Weight",
          message: "New Weight",
          prompt: {
            model: this.formItem.weight,
            type: "number"
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          this.formItem.weight = data;
          this.updateItem(this.formItem).then(() => {
            this.getItems();
          });
          // console.log(data);
        });
    },
    showEditMerchantForm() {
      this.$q
        .dialog({
          component: MerchantSelectInputDialog,
          parent: this,
          merchant: this.formItem.merchant
        })
        .onOk(merchant => {
          this.formItem.merchant = { ...merchant };
          this.updateItem(this.formItem).then(() => {
            this.getItems();
          });
        });
    },
    showEditLocationForm() {
      this.$q
        .dialog({
          component: LocationSelectInputDialog,
          parent: this,
          location: this.formItem.location
        })
        .onOk(location => {
          this.formItem.location = { ...location };
          this.updateItem(this.formItem).then(() => {
            this.getItems();
          });
        });
    },
    showEditCategoriesForm() {
      let tempCate = {};
      // tempCate.id = this.formItem.c
      this.$q
        .dialog({
          component: CategoriesSelectInputDialog,
          parent: this,
          propCategories: this.formItem.categories
        })
        .onOk(categories => {
          // console.log(categories)
          this.formItem.categories = [...categories];
          this.updateCategory(this.formItem).then(() => {
            this.getItems();
          });
        });
    },
    cloneObj(object) {
      let temp = {};
      for (let key in object) {
        if (typeof object[key] === "object") {
          if (object[key] instanceof Array) {
            temp[key] = [...object[key]];
          } else {
            temp[key] = { ...object[key] };
          }
        } else {
          temp[key] = object[key];
        }
      }
      return { ...temp };
    }
  },
  mounted() {}
};
</script>