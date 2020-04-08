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
          if (response.data.code == "0" && response.data.result.user.is_admin) {
            this.$store.dispatch("setUser", response.data.result.user);
            this.$router.push({ name: "home" });
          } else {
            this.$q.notify("Not authorized");
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

    async checkToken(user) {
      let result;
      this.$q.loading.show();
      await this.$axios({
        method: "get",
        url: "/user",
        headers: {
          Authorization: "Bearer " + user.api_token
        }
      }).then(response => {
        this.$q.loading.hide();
        if (response.data.code == "0") {
          result = response.data.result.user;
        }
      });
      return result;
    },

    async changeUser(user) {
      this.$q.loading.show();
      let result;
      await this.$axios({
        method: "put",
        url: "/user",
        data: {
          name: user.name,
          mobile: user.mobile,
          address: user.address
        }
      }).then(response => {
        this.$q.loading.hide();
        if (response.data.code == "0") {
          this.$q.notify("Updated");
          result = response.data.result.user;
        } else {
          this.$q.notify(response.data.msg);
        }
      });
      return result;
    }
  }
};
