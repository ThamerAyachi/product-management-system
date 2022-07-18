<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="p-2 my-2">
    <p class="text-gray-800 text-lg">{{ product.name }}</p>
    <p class="text-gray-500 my-1">{{ product.description }}</p>
    <p class="mb-3 mt-2 text-xs">
      <span class="text-white bg-gray-500 p-1 rounded"
        >Price: {{ product.price }}$</span
      >
    </p>
    <hr />
  </div>
</template>

<script>
export default {
  props: ["product"],
};
</script>

<style lang="scss" scoped></style>
