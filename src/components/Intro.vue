<template>
  <section class="fullscreen" :style="{'background-image':`url(${backgroundImg})`}" :id="id">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="block">
            <h1 v-html="title" :style="{'color:':`${textcolor}`}"></h1>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    'title':String,
    'backgroundImg':String,
    'textcolor':String,
    id:{
      required:true,
      type:String
    }
  },
  computed:{
    getBackground:function (){

      return {
        'background-image':this.background
      }
    }
  }
}
</script>

<style scoped lang="less">
  .fullscreen {
    width:100%;
    height:100vh;
    background-repeat: no-repeat;
    background-position: center;
    background-size:cover;
    margin-bottom:80px;
    .container,  .row {
      position:relative;
      height:100%;
    }
    .block {
      position:absolute;
      bottom:90px;
      left:0;
      h1 {
        color:#2f2f2f;
        font-size:100px;
        line-height:85px;
      }
      span {
        width:50%;
        color:#2b2b2b;
        margin-top:40px;
        font-size:18px;
        text-transform:uppercase;
        display:block;
      }
    }
    @media (max-width: 720px){
      .block {
        padding:0 15px;
        h1 {
          line-height:normal;
          font-size:40px;
        }
        span {
          width:100%;
          font-size:16px;
        }
      }
    }
  }

</style>