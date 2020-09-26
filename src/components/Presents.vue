<template>
  <section class="gift-newlyweds" :id="`id`">
    <div class="container">
      <div class="row">
        <div v-if="title" class="col-12">
          <h2>{{ title }}</h2>
        </div>
        <div class="col-12">

          <swiper class="swiper" :options="swiperOptions">
            <swiper-slide v-for="present in presents" class="block">
              <div class="image" >
                <img :src="present.img.url" :alt="present.img.alt" class="img-fluid">
              </div>
              <div class="title">{{ present.title }}</div>
              <div class="when-ordering">
                <div v-for="term in present.terms" v-html="term">

                </div>
              </div>
            </swiper-slide>
          </swiper>
          <div :id="`prev_${this.uid}`" class="button-prev" slot="button-prev" ref="head"></div>
          <div :id="`next_${this.uid}`" class="button-next" slot="button-next" ref="swiper-photo1-next"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  props:['id','title','presents'],
  components:{
    Swiper,
    SwiperSlide,
  },
  beforeCreate() {
    this.uid = Math.floor(Math.random() * Math.floor(99999))
  },
  data(){
    return{
      swiperOptions: {
        slidesPerView: document.documentElement.clientWidth>=720?3:1,
        loop: false,
        spaceBetween: document.documentElement.clientWidth>=720?30:0,
        navigation: {
          prevEl: `#prev_${this.uid}`,
          nextEl: `#next_${this.uid}`
        },
      },
    }
  },
}
</script>

<style lang="less">
.gift-newlyweds {
  margin-bottom:80px;
  .swiper-wrapper{
    justify-content: center;
  }
  .block {
    .image {
      margin-bottom:25px;
    }
    .title {
      text-transform:uppercase;
      color:#292929;
      font-size:16px;
      text-align:center;
    }
    .when-ordering {
      font-size:16px;
      font-style:italic;
      color:#292929;
      text-align:center;
      margin-top:10px;
      font-family:'Play fair display';
      span {
        color:#a56e7d;
        font-family:'Myriad Pro Bold';
        font-style:normal;
      }
    }
  }
  .button-next,.button-prev{
    position: absolute;
    top: 160px;
    left: 15px;
  }
  .button-next{
    left: initial;
    right: 15px;
  }
  @media(max-width: 720px){
    .swiper-wrapper{
      justify-content: normal;
    }
  }
}


</style>