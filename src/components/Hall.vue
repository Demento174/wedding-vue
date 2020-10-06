<template>
  <div class="block">
    <div class="item-top">
      <div class="item">
        Гостей
        <span>{{ guests }}</span>
        Минимальный заказ
        <span>{{ minPrice }}</span>
      </div>

      <div class="item">
        <ul>
          <li v-for="item in characters">{{ item }}</li>
        </ul>
      </div>
    </div>

    <div class="item-middle">
      <SliderPhoto_2
          v-if="imgs"
          v-bind:imgs="imgs"
      />
    </div>

    <div class="item-bottom">
      <div class="item" v-if="file_banket!== false">
        <a :href="`${file_banket}`" target="_blank">
          <button class="banquet-menu">Смотреть банкетное меню</button>
        </a>
      </div>
      <div class="item" v-if="file_furshet !== false">
        <a :href="`${file_furshet}`" target="_blank">
          <button class="banquet-menu">Смотреть фуршетное меню</button>
        </a>
      </div>
      <div class="item">
        <a href="#" data-toggle="modal" data-target="#modal_hall" v-on:click="setHallInModal(title,goal)">
          <button class="banquet-view">Записаться на просмотр и дегустацию</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import SliderPhoto_2 from "@/components/SliderPhoto_2";
import '@/assets/less/import/hall.less';
import { bus } from '@/bus.js'

export default {
  name:'Hall',
  props:[
      'title',
      'imgs',
      'guests',
      'minPrice',
      'characters',
      'file_furshet',
      'file_banket',
      'goal',
  ],

  methods:{
    setHallInModal: (hall,goal,modal)=>{

      bus.$emit('set-hall', hall)
      bus.$emit('set-goal',goal)
    }
  },
  components:{SliderPhoto_2},

}
</script>
