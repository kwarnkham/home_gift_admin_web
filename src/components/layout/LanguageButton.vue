<template>
  <q-btn-toggle
    no-caps
    rounded
    glossy
    v-model="lang"
    toggle-color="primary"
    :options="[
      { label: '简体中文', value: 'zh-hans' },
      { label: 'English', value: 'en-us' }
    ]"
  />
</template>

<script>
export default {
  name: "LanguageButton",
  data() {
    return {
      lang: this.$i18n.locale
    };
  },
  watch: {
    lang(lang) {
      // console.log(lang);
      this.$i18n.locale = lang;
      import(`quasar/lang/${lang}`).then(language => {
        this.$q.lang.set(language.default);
      });
      localStorage.setItem("lang", lang);
      this.$store.dispatch("setLanguage", lang);
    }
  }
};
</script>

<style></style>
