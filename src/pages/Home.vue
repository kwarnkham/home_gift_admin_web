<template>
  <q-page class="bg-grey-8">
    <div class="row">
      <HomeCard
        v-for="homeCard in homeCards"
        :key="homeCard.routeName"
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-xs"
        :title="homeCard.title"
        :desc="homeCard.desc"
        :routeName="homeCard.routeName"
      />
    </div>
  </q-page>
</template>

<script>
import HomeCard from "../components/home/HomeCard";
export default {
  name: "Home",
  components: {
    HomeCard
  },
  data() {
    return {
      homeCards: [
        {
          title: this.$tc("order", 2),
          desc: "Manage orders here",
          routeName: "orders"
        },
        {
          title: this.$t("location"),
          desc: "Manage locations here",
          routeName: "location"
        },
        {
          title: this.$t("merchant"),
          desc: "Manage merchants here",
          routeName: "merchant"
        },
        {
          title: this.$tc("category", 1),
          desc: "Manage categories here",
          routeName: "category"
        },
        {
          title: this.$t("addItem"),
          desc: "Add new item here",
          routeName: "addItem"
        },
        {
          title: this.$tc("item", 2),
          desc: "Manage items here",
          routeName: "items"
        },
        {
          title: this.$t("deliveryFees"),
          desc: "Manage delivery fees here",
          routeName: "deliveryFees"
        }
      ]
    };
  },
  created() {
    // console.log("home just created");
  }
};
</script>

<style scoped></style>
