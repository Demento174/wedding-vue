<template>
  <section class="fullphotogallery" :id="id">
    <div class="container-fluid">
      <div class="row">
        <div v-if="title" class="col-12" >
          <h2>{{ title }}</h2>

        </div>

        <div class="col-12 gallery">
          <swiper  class=" swiper slick-fullphotogallery" :options="swiperOptions">

            <swiper-slide class="item" v-for="img in imgs">
              <div class="image">
                <img :src="img.url" :alt="img.alt" class="img-fluid">
              </div>
              <div class="hover-block">{{ signature }}</div>
            </swiper-slide>

          </swiper>

          <div v-if="title">
            <div :id="`prev_${this.uid}`" class="button-prev" slot="button-prev" style="top: 160px"></div>
            <div :id="`next_${this.uid}`" class="button-next" slot="button-next" style="top: 160px"></div>
          </div>
           <div v-else>
             <div :id="`prev_${this.uid}`" class="button-prev" slot="button-prev" style="top: 160px"></div>
             <div :id="`next_${this.uid}`" class="button-next" slot="button-next" style="top: 160px"></div>
           </div>
          <div :id="`pagination_${this.uid}`" class="pagination"></div>
        </div>


      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import '@/assets/less/import/sliders.less';
export default {
  props:['id','imgs','title','signature'],
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
        slidesPerView: document.documentElement.clientWidth>=720?4:1,

        loop:true,
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

<style lang="less" scoped>
.fullphotogallery {

  margin-bottom:50px;
  .gallery{
    position: relative;
    .col-12 {
      padding-left:0;
      padding-right:0;
    }
    .item {
      position:relative;
      .hover-block {
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        background:rgba(165,110,125,0.7);
        display:flex;
        justify-content:center;
        align-items:center;
        text-align:center;
        color:#fff;
        font-size:30px;
        font-family:'Playfair Display';
        font-style:italic;
        visibility:hidden;
        opacity:0;
        transition:all 0.5s;
        padding:0 15px;
      }
      &:hover{
        .hover-block {
          visibility:visible;
          transition:all 0.5s;
          opacity:1;
        }
      }
    }
    .button-next,.button-prev{
      position: absolute;
      top: 110px;
      left: 0;
    }
    .button-next{
      left: initial;
      right: 0;
    }
  }
  .slick-fullphotogallery {
    margin-bottom:80px;
  }

}

</style>