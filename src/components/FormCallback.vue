<template>
  <section class="feedback" :id="id">
    <div class="container">
      <div class="row">
        <div class="col-12 col-xs-12 col-md-12 col-lg-6 col-xl-6">
          <div class="block">
            <h6 v-show="title">{{ title }}</h6>
            <span v-show="subtitle">{{ subtitle }}</span>
            <p v-for="offer in offers">{{ offer }}</p>
          </div>
        </div>
        <div class="col-1 d-none d-lg-block"></div>
        <div class="col-12 col-xs-12 col-md-12 col-lg-5 col-xl-5">
          <div class="block bg-form">
            <form @submit.prevent="sendEmail">
              <input type="text" data-name="phone" name="phone" placeholder="Ваш контактный телефон" class="phone_input" required="">
              <input type="date" data-name="date" name="date" placeholder="Введите дату свадьбы (необязательно)" class="date_input" ref="inputDate">
              <input type="hidden" name="block" value="callback">
              <input class="send_form" type="submit" value="Получить консультацию" name="mail" data-form="feedback" data-inputs=".phone_input,.date_input" onclick="ym(64491307,'reachGoal','form_planning')">
              <h4 class="modal-title form_compleate">{{ formCompleate }}</h4>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {bus} from "@/bus";

  export default {
    props:['id','title','subtitle','offers','sendGoal','goal','formCompleate'],
    mounted() {
      this.minValueDate(!this.$refs.inputDate.length?[this.$refs.inputDate]:this.$refs.inputDate)
    },
    methods:{
      sendEmail: function(e){
        let domain = window.location.origin.replace(/(^\w+:|^)\/\//, '');
        let form = new FormData(e.target);
        form.append('domain', domain);

        // fetch('http://wedding-api.com/mail.php', {

        fetch('http://api-wedding.russkiydom.beget.tech/mail.php', {
          method: 'post',
          body: form,
        })
        e.target.querySelector('input[type="submit"]').style.display='none';
        e.target.querySelector('.form_compleate').style.display='block';

      },
      minValueDate:function (inputs){

        let date = new Date()
        let year = date.getFullYear()
        let month =`${Number(date.getMonth()) + 1}`.length==1?`0${Number(date.getMonth()) + 1}`:`${Number(date.getMonth()) + 1}`
        let day = date.getDate()

        inputs.forEach(input=>
        {
          input.min=`${year}-${month}-${day}`;
          input.value = `${year}-${month}-${day}`;
        })
        this.dateModel = `${year}-${month}-${day}`
      },
    }
  }
</script>

<style lang="less" scoped>
.feedback {
  padding:50px 0;
  background:#a56e7d;
  .block{
    h6{
      color:#fff;
      font-size:30px;
      font-style:normal;
      margin-bottom:10px;
    }
    span {
      width:100%;
      display:block;
      color:#fff;
      font-size:18px;
      font-weight:500;
      margin-bottom:50px;
    }
    p {
      color:#fff;
      font-size:18px;
      margin-bottom:15px;
      margin-left:0;
    }
    &.bg-form {
      padding-top:50px;
      background:url(/images/heart-white.png) no-repeat center top;
    }
    input[type="text"],input[type="tel"],input[type="email"],input[type="date"]{
      width:100%;
      height:45px;
      border:1px solid #fff;
      background:transparent;
      margin-bottom:15px;
      padding:0 25px;
      font-size:16px;
      color:#fff;
      &::placeholder{
        color:#fff;
      }
      &::-webkit-calendar-picker-indicator {
        filter: invert(1);
      }
    }
    input[type="submit"]{
      width:100%;
      transition:all 0.5s;
      color:#fff;
      background:#db9f9d;
      font-size:16px;
      font-weight:bold;
      text-align:center;
      border:0;
      padding:10px 0;
      text-transform:uppercase;
      &:hover {
        transition:all 0.5s;
        color:#a56e7d;
        background:#ffe2e1;
      }
    }
    .form_compleate{
      display: none;
      text-align: center;
      background: rgba(59, 158, 13, 0.7);
      color: #ffffff;
      padding: 5px;
      border-radius: 7px;
    }
  }
}

</style>