<template>
  <div class="swiper-gallery_2photo_wrapper">
    <div v-swiper:mySwiper="swiperOptions" class="swiper-gallery_2photo">
      <div class="swiper-wrapper">
        <div class="swiper-slide"  v-for="img in imgs">
          <img :src="img.url">
        </div>
      </div>
    </div>

    <div class="swiper-prev button-prev" slot="button-prev" :id="`prev_${this.uid}`"></div>
    <div class="swiper-next button-next" slot="button-next" :id="`next_${this.uid}`"></div>

  </div>
</template>


<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import '@/assets/less/import/sliders.less';
export default {
  props:['imgs'],
  components: {
    Swiper,
    SwiperSlide
  },
  beforeCreate() {
    this.uid = Math.floor(Math.random() * Math.floor(99999))
  },
  data(){
    return{
      swiperOptions: {
        slidesPerView:document.documentElement.clientWidth>=720?2:1,
        spaceBetween:20,
        loop:true,
        navigation: {
          nextEl: `#next_${this.uid}`,
          prevEl: `#prev_${this.uid}`
        },
      }
    }
  },
}
</script>

<style scoped lang="less">
.swiper-gallery_2photo_wrapper{
  .swiper-gallery_2photo{
    .swiper-slide{
      width: 535px;
      height: 355px;
      overflow: hidden;
      img{
        display: block;
        width: auto;
        height: 100%;
        margin: auto;
      }
    }
  }
  .swiper-next,.swiper-prev{
    position: absolute;
    top: calc(50% + 50px);
    left: 15px;
  }
  .swiper-next{
    left: initial;
    right: 15px;
  }
  @media(max-width: 720px){
    position: relative;
    .swiper-next,.swiper-prev{
      top: 50%;
      left: 0;
    }
    .swiper-next{
      left: initial;
      right: 0;
    }

  }
}

</style>