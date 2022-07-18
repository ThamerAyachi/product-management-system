<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="w-full bg-white text-center py-5">
      <p class="text-3xl font-medium text-gray-800">
        Hello {{ user.fullName }}
      </p>
      <p class="text-gray-600">Username: @{{ user.username }}</p>
    </div>

    <!-- grids -->
    <div class="grid lg:grid-cols-3 grid-cols-1 my-10 space-y-3 lg:space-y-0">
      <div class="col-span-2">
        <div class="bg-white mx-3 shadow-sm rounded border border-gray-100 p-3">
          <!-- title -->
          <div class="text-lg font-medium text-gray-800 mb-2">Products</div>
          <hr />
          <!-- products -->
          <Product
            v-for="product in Products"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
      <div>
        <div class="bg-white mx-3 shadow-sm rounded border border-gray-100 p-3">
          <!-- title -->
          <div class="text-lg font-medium text-gray-800 mb-2">Users</div>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from "../components/Product.vue";

export default {
  data: () => {
    return {
      Products: [],
      user: { fullName: "Loading ...", username: "Loading ....", id: "" },
    };
  },
  components: { Product },
  async mounted() {
    // get User
    this.user = await this.$store.dispatch("getUser");

    // get Products
    this.Products = await this.$store.dispatch("getProducts");
  },
  methods: {
    async getUser() {},
  },
};
</script>

<style></style>
