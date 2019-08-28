<template>
  <div class="full-page-slide-wrapper">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <template v-for="(item, index) in items">
        <swiper-slide :key="index" :style="`background:${item.bgColor}`">
          <div class="title fs-xl">{{ item.name1 }}</div>
          <div class="value bg-peach-red" :style="`background:${item.color}`">
            {{ item.value }}
          </div>
          <span class="fs-md">{{ item.name2 }}</span>
          <span class="fs-md">{{ item.totalValue }}</span>
          <!-- <img @click="toTopic(item)" :src="item.bannerImageUrl" alt /> -->
        </swiper-slide>
      </template>
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
    </swiper>
  </div>
</template>

<script>
// import "swiper/dist/css/swiper.css";
// import { swiper, swiperSlide } from "vue-awesome-swiper";
// import { getFirstConfig } from "@/services/main.service";
const COMPONENT_NAME = "pull-page-slide";
export default {
  name: COMPONENT_NAME,
  props: {
    items: {
      type: Array
    }
  },
  data() {
    return {
      defaultIndex: 0,
      swiperOption: {
        direction: "horizontal",
        loop: true,
        autoplay: 5000,
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 10,
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          bulletActiveClass: "slide_dot_active",
          bulletClass: "slide_dot"
        }
      }
    };
  },
  //   mounted() {
  //     this.getConfig();
  //   },
  methods: {
    // toTopic(item) {
    //   if (item.topicId) {
    //     this.$router.push({
    //       name: "topic.detail",
    //       params: { id: item.topicId }
    //     });
    //   }
    // }
    // async getConfig() {
    //   let { datas } = await getFirstConfig().catch(e => console.error(e));
    //   this.items = datas;
    // }
  }
};
</script>
<style lang="scss">
.full-page-slide-wrapper {
  width: 100%;
  height: 1.2rem;
  background: white;
  box-sizing: content-box;
  padding-top: 0.15rem;
  margin-top: 0.1rem;
  position: relative;
  overflow: hidden;
  .swiper-container {
    width: 100%;
    height: 100%;
    .swiper-wrapper {
      display: flex;
      align-items: center;
    }
    .swiper-slide {
      width: calc(100% - 0.5rem);
      border-radius: 0.1rem;
      // opacity: 0.6;
      color: white;
      height: 1.2rem;
      line-height: 0;
      .title {
        margin-top: 0.05rem;
        line-height: 0.3rem;
      }
      .value {
        line-height: 0.4rem;
        font-size: 0.25rem;
      }
    }
    .swiper-slide-prev {
      height: 90% !important;
    }
    .swiper-slide-next {
      height: 90% !important;
    }
  }
  img {
    object-fit: fill;
    height: 100%;
    width: 100%;
    border-radius: 0.05rem;
  }
  .slide_dot {
    display: inline-block;
    margin: 0.05rem;
    width: 0.03rem;
    height: 0.03rem;
    background-color: #f2f2f2;
    border-radius: 50%;
    opacity: 0.5;
  }
  .swiper-pagination {
    height: 0.9rem;
    bottom: 0;
  }
  .slide_dot_active {
    display: inline-block;
    width: 0.07rem;
    height: 0.03rem;
    border-radius: 0.05rem;
    background: white;
    opacity: 1;
  }
}
</style>
