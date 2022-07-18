<template>
  <form @submit.prevent="onSubmit">
    <h1 class="font-bold text-4xl my-5 w-full text-center text-blue-700">
      Sign In
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

    <!-- Password input -->
    <div class="mb-6">
      <input
        type="password"
        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Password"
        v-model="data.password"
      />
    </div>

    <!-- Error message -->
    <div
      class="bg-red-100 rounded-lg py-3 px-6 text-base text-red-700 mb-3"
      v-if="btnData.isError"
    >
      Invalid credentials
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
      to="/register"
      class="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
      >You don't have account? Create One.
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
      },
      btnData: {
        text: "Sign in",
        isLoading: false,
        isError: false,
      },
    };
  },
  methods: {
    async onSubmit() {
      this.btnData.text = "Loading...";
      this.btnData.isLoading = true;
      try {
        const data = await this.$store.dispatch("login", this.data);
        if (data.statusCode === 401) {
          this.btnData.isError = true;
          this.btnData.text = "Sign Up";
          this.btnData.isLoading = false;
          return null;
        }
        // this.$router.push("/");
        window.location.replace("/");
      } catch (err) {
        console.log(err);
      }
      this.btnData.isError = false;
      this.btnData.text = "Sign Up";
      this.btnData.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
