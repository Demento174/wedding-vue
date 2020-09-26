<template>
  <section class="banquet-halls" :id="id">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2>{{ title }}</h2>
        </div>

        <div class="col-12" v-show="halls.length>1">
          <div class="slider-nav-wrapper">
            <swiper class="slider-nav-b swiper gallery-thumbs" :options="swiperOptionThumbs" ref="swiperThumbs">

              <swiper-slide  v-for="(hall,index) in halls" v-html="hall.title" :class="`head slide-${index}`">

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
              <swiper-slide v-for="(hall,index) in halls" :class="`slide-${index}`">
                    <Hall
                        v-bind:title="hall.title"
                        v-bind:guests="hall.guests"
                        v-bind:minPrice="hall.minPrice"
                        v-bind:characters="hall.characters"
                        v-bind:imgs="hall.imgs"
                        v-bind:file_banket="hall.file_banket"
                        v-bind:file_furshet="hall.file_furshet"

                        v-bind:goal="goal"
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
import Hall from "@/components/Hall";
export default {
  props:['title','halls','id','goal'],
  components: {
    Swiper,
    SwiperSlide,Hall
  },
  beforeCreate() {
    this.uid = Math.floor(Math.random() * Math.floor(99999))
  },
  data() {

    return{
      swiperOptions: {
          loop: true,
          loopedSlides: 5,
          spaceBetween: 10,
          simulateTouch:false,
      },
      swiperOptionThumbs: {
          loop: true,
          loopedSlides: 5, // looped slides should be the same
          spaceBetween: 10,
          centeredSlides: true,
          slidesPerView: document.documentElement.clientWidth>=720?3:1,
          touchRatio: 0.2,
          slideToClickedSlide: true,
          navigation: {
            nextEl: `#next_${this.uid}`,
            prevEl: `#prev_${this.uid}`
          },

        },
    }
  },
  mounted() {
    this.$nextTick(() => {

      const swiperThumbs = this.$refs.swiperThumbs.$swiper
      const swiperTop = this.$refs.swiperHalls.$swiper

      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
    })
  }
}
</script>

<style scoped lang="less">
  .slider-nav-wrapper{
    position: relative;
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
</style>