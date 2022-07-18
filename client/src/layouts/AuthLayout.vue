<template>
  <section class="h-screen">
    <div class="container px-6 py-12 h-full">
      <div
        class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800"
      >
        <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
