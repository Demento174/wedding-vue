<template>
  <div class="modal fade" id="modal_hall">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">Отправить заявку</h4>
          <div class="form">
            <form @submit.prevent="sendEmail">
              <input type="tel" name="phone"  v-phone-mask="'+7(___)___-__-__'" placeholder="Ваш контактный телефон" required v-model="phoneModel">
              <input type="date"  name="date" placeholder="Введите дату свадьбы (необязательно)" ref="inputDate" v-model="dateModel">
              <input type="hidden" name="block"  v-model="blockModel">
              <input type="hidden" name="goal"  v-model="goal">
              <input class="send_form" type="submit" value="Отправить" data-form="feedback" >
              <h4 class="modal-title form_compleate">{{ response }}</h4>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from '@/bus.js'
import $ from 'jquery';
import PhoneMask from 'vue-phone-mask';
export default {
  props:['response','sendGoal'],
  data(){
    return{
        phoneModel:'',
        dateModel:'',
        blockModel:'',
        goal:'',

    }
  },
  directives: {
    'phone-mask': PhoneMask
  },
  mounted() {
    this.minValueDate(!this.$refs.inputDate.length?[this.$refs.inputDate]:this.$refs.inputDate)
    bus.$on('set-hall', (block)=>{this.blockModel = block;})
    bus.$on('set-goal', (goal)=>{this.goal = goal;})
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

      this.sendGoal(this.goal);
      document.querySelector('.modal input.send_form').style.display = 'none';
      document.querySelector('.modal .form_compleate').style.display = 'block';
      setTimeout(()=>{$('#modal_hall').modal('hide');},2000)

    },
    minValueDate:function (inputs){
      let date = new Date()
      let year = date.getFullYear()
      let month =`${Number(date.getMonth()) + 1}`.length==1?`0${Number(date.getMonth()) + 1}`:`${Number(date.getMonth()) + 1}`
      let day = date.getDate()

      inputs.forEach(input=>input.min=`${year}-${month}-${day}`)
      this.dateModel = `${year}-${month}-${day}`
    },

  }
}
</script>

<style lang="less" scoped>
.modal-body {
  background:#a56e7d;
  padding:30px;
  .modal-title {
    text-align:center;
    font-family:'Play fair display';
    font-style:italic;
    font-size:24px;
    color:#fff;
  }
  .close {
    color:#fff;
  }
  .form {
    background:url(/images/heart-white.png) no-repeat center top;
    padding:45px 0 0 0;
    margin-top:20px;
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
    input[type="submit"] {
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
  }
}
</style>