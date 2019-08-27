<template>
  <div class="full-page-slide-wrapper">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <template>
        <swiper-slide>
          111111
          <!-- <img @click="toTopic(item)" :src="item.bannerImageUrl" alt /> -->
        </swiper-slide>
        <swiper-slide>
          222
          <!-- <img @click="toTopic(item)" :src="item.bannerImageUrl" alt /> -->
        </swiper-slide>
        <swiper-slide>
          3333
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
  height: 120px;
  background: white;
  box-sizing: content-box;
  padding-top: 15px;
  margin-top: 10px;
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
      width: calc(100% - 50px);
      border-radius: 5px;
      background: skyblue;
      color: white;
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
    border-radius: 5px;
  }
  .slide_dot {
    display: inline-block;
    margin: 5px;
    width: 3px;
    height: 3px;
    background-color: #f2f2f2;
    border-radius: 50%;
    opacity: 0.5;
  }
  .swiper-pagination {
    height: 90px;
    bottom: 0;
  }
  .slide_dot_active {
    display: inline-block;
    width: 7px;
    height: 3px;
    border-radius: 5px;
    background: white;
    opacity: 1;
  }
}
</style>
