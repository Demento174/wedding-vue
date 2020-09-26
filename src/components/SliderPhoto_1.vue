<template>
  <div class="swiper-gallery_1photo_wrapper" ref="body_">
    <swiper class="swiper photo" :options="swiperOptionsPhoto_1" ref="swiperPhoto">
      <swiper-slide v-for="img in imgs" >
        <div class="item">
          <img :src="img.url" :alt="img.alt" class="img-fluid">
        </div>
      </swiper-slide>
    </swiper>


    <div :id="`prev_${this.uid}`" class="button-prev" slot="button-prev" ref="head"></div>
    <div :id="`next_${this.uid}`" class="button-next" slot="button-next" ref="swiper-photo1-next"></div>
    <div :id="`pagination_${this.uid}`" class="pagination"></div>
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
      swiperOptionsPhoto_1: {
        slidesPerView: 1,

        loop:false,
        navigation: {
          prevEl: `#prev_${this.uid}`,
          nextEl: `#next_${this.uid}`
        },
        pagination:{
          el: `#pagination_${this.uid}`
        }
      }
    }
  },
}
</script>

<style scoped lang="less">
.swiper-gallery_1photo_wrapper{
  position: relative;
  .photo{
    .swiper-slide{
      width: 100%;
      height: 355px;
      overflow: hidden;
      .item{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        overflow: hidden;
        img{
          width: 100%;
          height: auto;
        }
      }

    }
  }
  .button-next,.button-prev{
    position: absolute;
    top: calc(50% - 50px);
    left: 15px;
  }
  .button-next{
    left: initial;
    right: 15px;
  }
  @media(max-width: 720px){
    .button-prev{
      left: 0;
    }
    .button-next{
      right: 0;
    }
  }
}

</style>