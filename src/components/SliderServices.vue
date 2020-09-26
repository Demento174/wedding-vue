<template>
  <section class="wedding-services" :id="id">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2>{{ title }}</h2>
        </div>

        <div class="col-12" v-show="services.length>1">
          <div class="slider-nav-wrapper">
            <swiper @slideChangeTransitionEnd="changeSlide()"
                class="slider-nav-b swiper gallery-thumbs"  :options="swiperOptionThumbs" ref="swiperThumbs">
              <swiper-slide class="head"  v-for="service in services" v-html="service.title" >

              </swiper-slide>
            </swiper>
            <div class="swiper-thumb-prev button-prev" slot="button-prev" :id="`prev_${this.uid}`"></div>
            <div class="swiper-thumb-next button-next" slot="button-next" :id="`next_${this.uid}`"></div>
          </div>


        </div>


      </div>
    </div>
    
    <div class="bg-gray">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <swiper class="swiper" :options="swiperOptions" ref="swiperHalls">
              <swiper-slide v-for="service in services" >
                <Service
                    v-bind:title="service.title"
                    v-bind:anons="service.anons"
                    v-bind:content="service.content"
                    v-bind:price="service.price"
                    v-bind:imgs="service.imgs"
                    v-bind:present-price="service.presentPrice"
                    v-bind:anonsList="service.anonsList"
                    v-bind:btn="service.btn"

                    v-bind:goal="goal"
                    ref="Service"
                />
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import Service from "@/components/Service";
import '@/assets/less/import/service.less'
export default {
  props:['title','services','id','goal'],
  components: {
    Swiper,
    SwiperSlide,
    Service
  },
  beforeCreate() {
    this.uid = Math.floor(Math.random() * Math.floor(99999))
  },
  data() {

    return{
      swiperOptions: {

          simulateTouch:false,
          loop: true,
          loopedSlides: 5,
          spaceBetween: 10,

      },
      swiperOptionThumbs: {
        navigation: {
          prevEl: `#prev_${this.uid}`,
          nextEl: `#next_${this.uid}`
          },

          loop: true,
          loopedSlides: 5, // looped slides should be the same
          spaceBetween: 10,
          centeredSlides: true,
          slidesPerView:document.documentElement.clientWidth>=720?3:1,
          touchRatio: 0.2,
          slideToClickedSlide: true
        },

    }
  },
  methods:{
    changeSlide:function (){
      this.$refs.Service.forEach((service)=>{service.showContent = false})
    }
  },
  mounted() {
    this.$nextTick(() => {

      const swiperThumbs = this.$refs.swiperThumbs.$swiper
      const swiperTop = this.$refs.swiperHalls.$swiper

      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
    })
  },

}

</script>

<style scoped lang="less">
.wedding-services {
  margin-bottom:80px;
  .slider-nav-wrapper{
    position: relative;
    .slider-nav-b {
      .head {
        background:#a56e7d;
        color:#fff;
        padding:15px 0;
        font-size:16px;
        font-family:'Myriad Pro Bold';
        text-align:center;
        transition:all 0.5s;
        text-transform:uppercase;
        &:hover {
          background:#ffe2e1;
          color:#a56e7d;
          padding:15px 0;
          margin:0 10px;

          text-align:center;
          transition:all 0.5s;
          cursor:pointer;
        }
        &.slick-current {
          background:#f8f8f8;
          color:#58595e;
          padding:15px 0;
          text-align:center;
        }
      }
    }
    .button-next,.button-prev{
      position: absolute;
      top: calc(50% - 25px);
      left: -50px;
    }
    .button-next{
      left: initial;
      right: -50px;
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
  .bg-gray{
    background:#f8f8f8;
    padding:30px 0 50px 0;

  }

}



</style>