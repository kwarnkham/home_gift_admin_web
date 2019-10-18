<template>
  <q-page class="row">
    <div class="col-12" v-if="item != undefined">
      <q-carousel animated v-model="slide" arrows navigation infinite>
        <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
        <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
        <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
        <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
      </q-carousel>
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
      slide: 1,
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
  methods: {
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
          this.updateItem(this.formItem).then(() => {
            this.getItems();
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
          // this.updateItem(this.formItem).then(() => {
          //   this.getItems();
          // });
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
  created() {}
};
</script>
