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
          password: data.password
        }
      })
        .then(response => {
          this.$q.loading.hide();
          if (response.data.code == "0") {
            this.$store.dispatch("setUser", response.data.result.user);
            this.$router.push({ name: "home" });
          } else {
            this.$q.notify(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
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
          address: data.address
        }
      });
    },
    async changePassword(data) {
      let result;
      this.$q.loading.show();
      await this.$axios({
        method: "put",
        url: "/user/password",
        headers: {
          Authorization: "Bearer " + this.$store.state.user.api_token,
          Accept: "application/json"
        },
        data: {
          password: data.old,
          new: data.new,
          new_confirmation: data.confirm
        }
      }).then(response => {
        this.$q.loading.hide();
        if (response.data.code == "0") {
          this.$q.notify("Success");
          result = true;
        } else {
          this.$q.notify(response.data.msg);
        }
      });
      return result;
    },

    async checkToken() {
      this.$q.loading.show();
      await this.$axios({
        method: "get",
        url: "/user",
        headers: {
          Authorization: "Bearer " + this.$store.state.user.api_token,
          Accept: "application/json"
        }
      }).then(response => {
        this.$q.loading.hide();
        console.log(response);
        if (response.data.code == "0") {
          this.$q.notify("Success");
        } else {
          this.$q.notify("Fail");
        }
      });
    }
  }
};
