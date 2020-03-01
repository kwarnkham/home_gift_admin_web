<template>
  <q-page class="column bg-grey-3" v-if="item">
    <div class="row">
      <div class="col-md-6 col-xs-12">
        <q-carousel
          ref="imageSlides"
          animated
          v-model="slide"
          arrows
          navigation
          infinite
          height="450px"
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

            <q-carousel-control
              position="bottom-right"
              :offset="[18, 18]"
              class="q-gutter-xs"
            >
              <q-btn icon="add" round color="primary" @click="addItemPic" />
            </q-carousel-control>
          </template>
        </q-carousel>
      </div>
      <div class="col-md-6 col-xs-12 q-pa-sm column justify-between">
        <div>
          <q-btn
            :label="$t('itemName')"
            flat
            no-caps
            @dblclick="showEditForm($t('editName'), $t('newName'), 'name')"
          />
          : {{ item.name }}
        </div>
        <div>
          <q-btn
            :label="$t('chineseItemName')"
            flat
            no-caps
            @dblclick="showEditForm($t('editName'), $t('newName'), 'ch_name')"
          />
          : {{ item.ch_name }}
        </div>
        <div>
          <q-btn
            :label="$t('myanmarItemName')"
            flat
            no-caps
            @dblclick="showEditForm($t('editName'), $t('newName'), 'mm_name')"
          />
          : {{ item.mm_name }}
        </div>
        <div>
          <q-btn
            :label="$t('price')"
            flat
            no-caps
            @dblclick="
              showEditForm($t('editPrice'), $t('newPrice'), 'price', 'number')
            "
          />
          : {{ item.price }} MMK
        </div>
        <div>
          <q-btn
            :label="$t('weight')"
            flat
            no-caps
            @dblclick="
              showEditForm($t('editWeight'), $t('newWeight'), 'weight')
            "
          />
          : {{ item.weight }}
        </div>
        <div>
          <q-btn
            :label="$t('merchant')"
            flat
            no-caps
            @dblclick="showEditMerchantForm()"
          />
          : {{ item.merchant.name }}
        </div>
        <div>
          <q-btn
            :label="$t('location')"
            flat
            no-caps
            @dblclick="showEditLocationForm()"
          />
          : {{ item.location.name }}
        </div>
        <div>
          <q-btn
            :label="$tc('category', 1)"
            flat
            no-caps
            @dblclick="showEditCategoriesForm()"
          />
          : {{ categories.join(", ") }}
        </div>
      </div>
    </div>

    <div class="col column bg-blue-grey-2 long-content q-pa-sm">
      <div>
        <q-btn
          :label="$t('description')"
          flat
          no-caps
          @dblclick="
            showEditForm(
              $t('editDescription'),
              $t('newDescription'),
              'description',
              'textarea'
            )
          "
        />
        <p>{{ item.description }}</p>
      </div>
      <div>
        <q-btn
          :label="$t('chineseDescription')"
          flat
          no-caps
          @dblclick="
            showEditForm(
              $t('editDescription'),
              $t('newDescription'),
              'ch_description',
              'textarea'
            )
          "
        />
        <p>{{ item.ch_description }}</p>
      </div>
      <div>
        <q-btn
          :label="$t('myanmarDescription')"
          flat
          no-caps
          @dblclick="
            showEditForm(
              $t('editDescription'),
              $t('newDescription'),
              'mm_description',
              'textarea'
            )
          "
        />
        <p>{{ item.mm_description }}</p>
      </div>
      <div>
        <q-btn
          :label="$t('notice')"
          flat
          no-caps
          @dblclick="
            showEditForm(
              $t('editNotice'),
              $t('newNotice'),
              'notice',
              'textarea'
            )
          "
        />
        <p>{{ item.notice }}</p>
      </div>
      <div>
        <q-btn
          :label="$t('chineseNotice')"
          flat
          no-caps
          @dblclick="
            showEditForm(
              $t('editNotice'),
              $t('newNotice'),
              'ch_notice',
              'textarea'
            )
          "
        />
        <p>{{ item.ch_notice }}</p>
      </div>
      <div>
        <q-btn
          :label="$t('myanmarNotice')"
          flat
          no-caps
          @dblclick="
            showEditForm(
              $t('editNotice'),
              $t('newNotice'),
              'mm_notice',
              'textarea'
            )
          "
        />
        <p>{{ item.mm_notice }}</p>
      </div>
    </div>
    <q-page-sticky position="top-left" :offset="[18, 18]">
      <q-btn round color="info" icon="arrow_back" @click="$router.go(-1)" />
    </q-page-sticky>
  </q-page>
</template>
<script>
import { extend } from "quasar";
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
      formItem: {},
      item: null
    };
  },
  computed: {
    categories() {
      var temp = [];
      this.item.categories.forEach(el => temp.push(el.name));
      return temp;
    }
  },
  methods: {
    deleteItemPic() {
      this.deleteImage(this.slide).then(response => {
        if (response != null) {
          this.initItemDetails();
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
        this.addImagesToItem(this.item.id, files).then(() =>
          this.initItemDetails()
        );
      };
      input.click();
    },
    showEditForm(title, message, field, fieldType = "text") {
      this.$q
        .dialog({
          title: title,
          message: message,
          prompt: {
            model: this.formItem[field],
            type: fieldType
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          this.formItem[field] = data;
          if (data != this.item[field])
            this.updateItem(this.formItem).then(response => {
              if (response != null) {
                this.initItemDetails();
              }
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
            this.initItemDetails();
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
            this.initItemDetails();
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
            this.initItemDetails();
          });
        });
    },
    initItemDetails() {
      this.getSingleItem(this.$route.params.itemId).then(response => {
        this.item = response.data.result.item;
        this.slide = this.item.images[0].id;
        extend(this.formItem, this.item);
      });
    }
  },
  created() {
    this.initItemDetails();
  }
};
</script>

<style scoped>
p {
  text-indent: 60px;
}
.long-content > div:not(:last-child) {
  margin-bottom: 1em;
}
</style>
