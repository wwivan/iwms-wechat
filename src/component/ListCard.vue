<template>
  <m-card :icon="icon" :title="title">
    <div>
      <div class="nav jc-around">
        <div
          class="nav-item"
          :class="{ active: active === i }"
          v-for="(category, i) in categories"
          :key="i"
          @click="$refs.list.swiper.slideTo(i)"
        >
          <div class="nav-link fs-md">{{ category.name }}</div>
        </div>
      </div>
      <div class="pt-3">
        <swiper
          ref="list"
          :options="{ autoHeight: true }"
          @slide-change="() => (active = $refs.list.swiper.realIndex)"
        >
          <swiper-slide v-for="(category, i) in categories" :key="i">
            <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </m-card>
</template>
<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    categories: { type: Array, required: true }
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>
<style lang="scss" scoped>
// @import "../assets/scss/_variables.scss";
// .nav {
//   display: flex;

//   .nav-item {
//     border-bottom: 3px solid transparent;
//     padding-bottom: 0.2rem;

//     &.active {
//       color: map-get($map: $colors, $key: "primary");
//       border-bottom-color: map-get($colors, "primary");
//     }
//   }

//   &.nav-inverse {
//     .nav-item {
//       color: map-get($colors, "white");

//       &.active {
//         border-bottom-color: map-get($colors, "white");
//       }
//     }
//   }
// }
</style>
