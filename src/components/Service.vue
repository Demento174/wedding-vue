<template>
  <div class="block_service">
    <div class="item">
      <div class="heading">{{ title }}</div>

      <div class="content">
        <div class="anons"  v-show="!showContent" v-html="anons"></div>
        <div class="text" v-show="showContent" v-html="content"></div>
        <div class="header" v-show="anonsList">
          <div v-for="item in anonsList">
            {{ item.title }}
            <span>{{ item.value }}</span>
          </div>

        </div>
      </div>

      <div class="more" v-on:click="moreBtn($parent)" v-text="showHideContent(`Показать подробности`)"></div>

    </div>

    <div class="item">
      <SliderPhoto_1
        v-bind:imgs="imgs"
      />
      <a v-if="btn" href="#" data-toggle="modal" data-target="#modal_hall" class="btn" v-on:click="setServiceInModal(title,goal)">
        <button class="banquet-view" tabindex="0">{{ btn.content }}</button>
      </a>
    </div>
    <div class="item-bottom">
      <div v-show="price" class="price">
        Цена <span>{{ price }}</span>
      </div>
      <div class="services-photo" v-show="presentPrice">
        <img src="/images/icon-photo.png">
        Эта услуга идет в подарок<br>
        При заказе банкета от {{ presentPrice }} руб.
      </div>

    </div>
  </div>
</template>

<script>
import SliderPhoto_1 from "@/components/SliderPhoto_1";
import '@/assets/less/import/service.less'
import { bus } from '@/bus.js'
export default {
  props:{
    // parent:Node,
    title:String,
    anons:String,
    content:String,
    price:String,
    imgs:Array,
    presentPrice:String,
    anonsList:Array,
    btn:Object,
    goal:String
  },
  data(){

    return {
      showContent:false
    }
  },

  methods: {
    showHideContent(value) {
      return this.showContent?'Скрыть':value
    },
    moreBtn(parent)
    {
      this.showContent = !this.showContent

      if(this.showContent === false)
      {

        let theElement = parent.$el;
        let selectedPosX = 0;
        let selectedPosY = 0;

        while (theElement != null) {

          selectedPosX += theElement.offsetLeft;

          selectedPosY += theElement.offsetTop-50;

          theElement = theElement.offsetParent;
        }

        window.scrollTo(selectedPosX,selectedPosY);

      }

    },
    setServiceInModal: (service,goal)=>{

      bus.$emit('set-hall', service)
      bus.$emit('set-goal', goal)
    }
  },
  components:{
    SliderPhoto_1
  },

}
</script>
<style scoped lang="less">
.header {
  margin-top: 15px;
  span{
    margin-bottom: 15px;
    display: block;
    color: #a56e7d;
    font-size: 18px;
    text-transform: uppercase;
    font-family: 'Myriad Pro Bold';
  }
}
.more{
  cursor: pointer;
  color: #a56e7d;
  &:hover{
    text-decoration: underline;
  }
}
.btn{
  display: block;
  max-width: 245px;
  margin:10px auto;

  button{
    width: 100%;
    transition: all 0.5s;
    color: #fff;
    background: #db9f9d;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    border: 0;
    padding: 10px 0;
    text-transform: uppercase;
  }
}
@media (max-width: 720px) {
  .block_service{
    flex-direction: column;
    .item{
      width: 100%;
    }
  }
}

</style>






