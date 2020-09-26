<template>
  <section class="additional-options" :id="id">
    <div class="container">
      <div class="row">
        <div v-show="title" class="col-12">
          <h2>{{ title }}</h2>
        </div>


        <div v-for="services in servicesMany" class="col-12 col-xs-12 col-md-6 col-lg-4 col-xl-4">
          <div class="block">
            <div class="content">
              <ul>

                <li v-for="service in services" >{{ service }}</li>

              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import {chunkArray} from "@/Classes/functions";

export default {
  props:['id','title','additionalServices'],
  data(){

    return{
        servicesMany:chunkArray(this.additionalServices,2)
    }
  }
}
</script>

<style lang="less" scoped>
.additional-options {
  margin-bottom:80px;
  .block {
    color:#58595e;
    font-size:15px;
    font-family:'Myriad Pro Regular';
    .content{
      ul {
        margin:0;
        padding:0;
        list-style:none;
        li {
          margin:10px 0;
        }
      }
    }
    .price {
      font-size:24px;
      font-family:'Play fair display';
      font-style:italic;
      margin:10px 0;
      span {
        font-family:'Myriad Pro Bold';
        color:#a56e7d;
        font-style:normal;
      }
    }
    .sendclaim {
      margin-top:15px;
      text-align:center;
      a {
        background:#da9d9b;
        border:0;
        color:#fff;
        padding:10px 0;
        font-size:16px;
        font-family:'Myriad Pro Bold';
        text-transform:uppercase;
        transition:all 0.5s;
        display:block;
        &:hover {
          background:#ffe2e1;
          color:#a56e7d;
          transition:all 0.5s;
          text-decoration:none;
        }
      }
    }
  }
}

</style>