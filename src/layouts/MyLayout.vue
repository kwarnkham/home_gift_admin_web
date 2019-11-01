<template>
  <q-layout view="hHh lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>Home Gift {{$t('admin')}}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>{{$t('adminAction')}}</q-item-label>
        <q-item>
          <q-btn-toggle
            no-caps
            rounded
            glossy
            v-model="lang"
            toggle-color="primary"
            :options="[
        {label: '简体中文', value: 'zh-hans'},
        {label: 'English', value: 'en-us'},
      ]"
          />
        </q-item>
        <q-item clickable @click="route('orders')" :active="$route.name == 'orders'">
          <q-item-section avatar>
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$tc('order', 2)}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="route('addItem')" :active="$route.name == 'addItem'">
          <q-item-section avatar>
            <q-icon name="add_box" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$t('addItem')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="route('location')" :active="$route.name == 'location'">
          <q-item-section avatar>
            <q-icon name="location_city" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$t('location')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="route('merchant')" :active="$route.name == 'merchant'">
          <q-item-section avatar>
            <q-icon name="business_center" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$t('merchant')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="route('category')" :active="$route.name == 'category'">
          <q-item-section avatar>
            <q-icon name="category" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$tc('category',1)}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          @click="route('item')"
          :active="$route.name == 'item' || $route.name == 'itemDetails'"
        >
          <q-item-section avatar>
            <q-icon name="fastfood" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$tc('item',2)}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import languages from "quasar/lang/index.json";
export default {
  name: "MyLayout",

  data() {
    return {
      leftDrawerOpen: false,
      lang: this.$i18n.locale
    };
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang;
      import(`quasar/lang/${lang}`).then(language => {
        this.$q.lang.set(language.default);
      });
    }
  },
  methods: {
    route(name) {
      if (this.$route.name != name) {
        this.$router.push({ name: name });
      }
    }
  }
};
</script>
