<template>
  <form @submit.prevent="onSubmit">
    <h1 class="font-bold text-4xl my-5 w-full text-center text-blue-700">
      Register
    </h1>
    <!-- Username input -->
    <div class="mb-6">
      <input
        type="text"
        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Username"
        v-model="data.username"
      />
    </div>

    <!-- FullName input -->
    <div class="mb-6">
      <input
        type="text"
        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Full name"
        v-model="data.fullName"
      />
    </div>

    <!-- Password input -->
    <div class="mb-6">
      <input
        type="password"
        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Password"
        v-model="data.password"
      />
    </div>

    <!-- Submit button -->
    <button
      type="submit"
      class="inline-block px-7 py-3 mb-6 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
      data-mdb-ripple="true"
      data-mdb-ripple-color="light"
      :disabled="btnData.isLoading"
    >
      {{ btnData.text }}
    </button>
    <router-link
      to="/login"
      class="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
      >You have account? Sign in.
    </router-link>
  </form>
</template>

<script>
export default {
  data: () => {
    return {
      data: {
        username: "",
        password: "",
        fullName: "",
      },
      btnData: {
        text: "Sign Up",
        isLoading: false,
      },
    };
  },
  methods: {
    async onSubmit() {
      this.btnData.text = "Loading ...";
      this.btnData.isLoading = true;
      try {
        const data = await this.$store.dispatch("register", this.data);
        if (data === "Request failed with status code 400") {
          console.log(data);
          this.btnData.text = "Sign Up";
          this.btnData.isLoading = false;
          return null;
        }
        this.$router.push("login");
      } catch (err) {
        console.log(err);
      }
      this.btnData.text = "Sign Up";
      this.btnData.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
