export const userRelatedApi = {
  created() {
    // console.log(store.state.apiUrl);
  },
  methods: {
    async login(data) {
      this.$q.loading.show();
      await this.$axios({
        method: "post",
        url: "/login",
        data: {
          mobile: data.mobile,
          password: data.password,
        },
      }).then((response) => {
        this.$q.loading.hide();
        this.$store.dispatch("setUser", response.data.result.user);
        this.$router.push({ name: "home" });
      });
    },
    async updateUser(data) {
      this.$q.loading.show();
      await this.$axios({
        method: "put",
        url: "/user/update",
        data: {
          mobile: data.mobile,
          name: data.name,
          address: data.address,
        },
      });
    },
  },
};
