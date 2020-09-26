<template>
  <section class="map" :id="id">
    <yandex-map :settings="settings" :coords="coords" style="width: 100%;height: 100%">
      <!--Markers-->
    </yandex-map>
    <div v-show="this.shadow" class="shadow" @click="setShadow(false)">{{ title }}</div>
  </section>
</template>


<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
export default {
  props:['id','coords','title'],
  components: { yandexMap, ymapMarker },
  data(){
    return{
      shadow:true,
      settings:{
        apiKey: 'f34df18e-c45e-4e0b-af59-710dd58321de',
        lang: 'ru_RU',
        coordorder: 'latlong',
        version: '2.1',

      }
    }
  },
  methods:{
    setShadow:function (value){
      this.shadow = false
    }
  }
}
</script>

<style lang="less"scoped>
.map{
  height: 450px;
  position: relative;
  .shadow{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9;
    background-color: rgba(255, 255, 255, 0.8);
    color: rgb(0, 0, 0);
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0px;
    right: 0px;
  }
}
</style>