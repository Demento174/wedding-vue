<template>
  <section class="calculation" :id="id">
    <div class="container">
      <div class="row">
        <div v-show="title"  class="col-12">
          <h2>{{ title }}</h2>
        </div>
        <div class="col-12">
          <div class="block">
            <div class="item one">

              <label>
                Количество гостей
                <input type="number" @change="calculate" v-model="guestsModel"  :placeholder="guest_min"  :min="guest_min" :max="guest_max" id="people_text">
                <input type="range" @change="calculate" v-model="guestsModel"  :placeholder="guest_min"  :min="guest_min" :max="guest_max" id="people">
              </label>

              <label>
                Выберите средний чек на гостя
                <select id="1human_price"  v-model="checkModel" @change="calculate">
                  <option  v-for="check in checks" :value="check" >{{ check }} руб./чел.</option>

                </select>
              </label>

              <label class="date">
                Дата торжества
                <input type="date" @change="changeDate(dateModel)" :min="today" id="date_wedding" v-model="dateModel">
              </label>

            </div>
            <div class="item two">
              <h6>Какие свадебные услуги потребуются</h6>
              <div class="box shadow_wrapper">
                <div v-show="shadow" class="shadow">
                  <span>выберите примерную дату торжества от этого зависит Ваш подарок</span>
                </div>

                <div class="bl" v-for="(service,index) in services">
                  <input
                      :id="`checkbox-${index}`"
                      @change="changeSerivce"
                      class="checkbox-custom dops_box"
                      type="checkbox"
                      v-bind:pricePresent="service.no_present?'false':service.pricePresent.simple"
                      v-bind:title="service.title"
                      v-bind:present="`false`"
                      v-model="servicesModel"
                      :value="service.price"
                      ref="service"
                  >
                  <label :for="`checkbox-${index}`" class="checkbox-custom-label">
                    <span>{{ service.title }}</span>
                    <span class="checkbox-text" v-if="service.signature">от {{ service.price }} {{ service.signature }}</span>
                    <span class="checkbox-text" v-else>от {{ service.price }} руб.</span>
                    <a href="#" class="btn_receive_gift" @click.prevent="getServicePresent($event)" style="display: none;">Получить в подарок</a>
                    <div class="tooltip top_tooltip"  style="display: none;">
                      Эту услугу вы можете получить в подарок при сумме от<strong>70000</strong>,Вы можете убрать галочку и увеличить свой бюджет на <strong ></strong>₽
                    </div>
                  </label>
                </div>

              </div>
            </div>
          </div>
          <div class="block-color shadow_wrapper">
            <div v-show="shadow" class="shadow">
              <span>выберите примерную дату торжества от этого зависит Ваш подарок</span>
            </div>
            <div class="item one">
              <div class="box-suit-you">
                <div class="container">
                  <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                      <div class="suit-you">
                        <h6>Ваш бюджет</h6>
                        <span id="result" ref="elementResult" >{{ resultModel }}</span> руб.
                        <input  type="hidden" v-model="resultModel">
                      </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                      <div class="suit-you">
                        <h6>Вам подойдет</h6>
                        <div class="halls" ref="halls">

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="presents">
                <h6 v-if="presentTitle">{{ presentTitle }}</h6>
                <div class="gift-list" ref="presentsList">
                  <div class="gift" data-id="">

                  </div>
                </div>
              </div>
            </div>
            <div class="item two">
              <form class="sendform" @submit.prevent="sendEmail">
                <h5 v-if="formTitle">{{ formTitle }}</h5>
                <input type="tel" v-phone-mask="'+7(___)___-__-__'" placeholder="Ваш контактный телефон" name="phone" class="calculation_phone" required>
                <input type="submit" value="Да, перезвоните мне" class="send_form" data-form="calculation">
                <input type="hidden" name="block" value="calculate">
                <input type="hidden" name="guests" :value="this.guestsModel">
                <input type="hidden" name="check" :value="this.checkModel">
                <input type="hidden" name="date" :value="this.dateModel">
                <input type="hidden" name="budget" :value="this.resultModel">

                <h4 class="modal-title form_compleate">{{ formCompleate }}</h4>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import {getParent} from "@/Classes/functions";
import PhoneMask from 'vue-phone-mask';

export default {
  props:
      [
        'id',
        'title',
        'guests',
        'guest_min',
        'guest_max',
        'checks',
        'services',
        'halls',
        'pricePresentMode',
        'sendGoal',
        'goal',
        'formCompleate',
        'shadowVariable',
        'formTitle',
        'presentTitle'
      ],
  data(){
    let date = new Date()
    let year = date.getFullYear()
    let month =`${Number(date.getMonth()) + 1}`.length==1?`0${Number(date.getMonth()) + 1}`:`${Number(date.getMonth()) + 1}`
    let day = date.getDate()

    return{
      guestsModel:this.guest_min,
      checkModel:'3000',
      dateModel:`${year}-${month}-${day}`,
      resultModel:'0',
      servicesModel:[],
      today:`${year}-${month}-${day}`,
      shadow:this.shadowVariable,
    }
  },
  directives: {
    'phone-mask': PhoneMask
  },
  methods:{
    sendEmail: function(e){
      let domain = window.location.origin.replace(/(^\w+:|^)\/\//, '');
      let form = new FormData(e.target);

      let presents = [];
      let halls = [];
      let services  = [];

      if(this.$refs.presentsList.querySelectorAll('div').length>0)
      {

        this.$refs.presentsList.querySelectorAll('div').forEach(item =>
        {
          console.log(item.innerText);
          if(item.innerText)
          {
            presents.push(item.innerText)
          }
        })
      }

      if(this.$refs.halls.querySelectorAll('div'))
      {
        this.$refs.halls.querySelectorAll('div').forEach(item =>{halls.push(item.innerText)})
      }

      let servicesBlocks = !this.$refs.service.length?[this.$refs.service]:this.$refs.service

      servicesBlocks.forEach(service=>{
          if(service.getAttribute('present')=='false' && service.checked==true)
          {
              services.push(service.parentElement.querySelector('span').innerText)
          }
      })

      form.append('domain', this.guestsModel);
      form.append('presents', presents);
      form.append('halls', halls);
      form.append('services', services);



      this.sendGoal(this.goal)
      // fetch('http://wedding-api.com/mail.php', {
      fetch('http://api-wedding.russkiydom.beget.tech/mail.php', {
        method: 'post',
        body: form,
      })
      e.target.querySelector('input[type="submit"]').style.display='none';
      e.target.querySelector('.form_compleate').style.display='block'

    },

    changeDate:function (value){
      this.shadow = false;

      let services = !this.$refs.service.length?[this.$refs.service]:this.$refs.service

      switch (this.pricePresentMode){
        case 'week':
          services.forEach((service,index)=>{

            if(service.getAttribute('pricePresent') !=='false')
            {
              service.setAttribute('pricepresent',this.services[index]['pricePresent'][this.pricePresentMode][this.getWeekDay(value)])
            }

            })
            break;
        case 'month':
          services.forEach((service,index)=>{
            if(service.getAttribute('pricePresent') !=='false')
            {
              service.setAttribute('pricepresent',this.services[index]['pricePresent'][this.pricePresentMode][this.getMonth(value)])
            }

          })
          break;
        default:
          services.forEach((service,index)=>{
            if(service.getAttribute('pricePresent') !=='false')
            {
              service.setAttribute('pricepresent',this.services[index]['pricePresent'][this.pricePresentMode])
            }

          })
          break;
      }

        this.calculate()
    },

    getWeekDay:function (dateString) {

      const date = new Date(dateString);

      let days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];

      return days[date.getDay()];
    },

    getMonth:function (dateString){
      const date = new Date(dateString);

      let months = ['january','february','march','april','may','june','july','august','september','october','november','december',];

      return months[date.getMonth()]
    },

    changeSerivce:function (){
      // this.setServicePresent()
      this.calculate()
    },

    setServicePresent:function (){

      let services = !this.$refs.service.length?[this.$refs.service]:this.$refs.service

      services.forEach(service=> {


        let btn = getParent(service, '.bl').querySelector('.btn_receive_gift')

        if (Number(service.getAttribute('pricePresent')) <= this.resultModel && service.getAttribute('pricePresent') !== 'false')
          {
            btn.style.display = 'block'
          }
          else
            {
              btn.style.display = 'none'
              service.setAttribute('present', 'false')

            }
      })
    },

    getServicePresent: function (event){
      const inputElement = getParent(event.target,'.bl').querySelector('input[type="checkbox"]')

      if(inputElement.getAttribute('present')==='false')
      {
        inputElement.checked = true
        inputElement.setAttribute('present','true')
        event.target.innerText = 'Убрать из подарков'

        let div =document.createElement('div')
        div.classList.add('gift')
        div.setAttribute('data-id',inputElement.getAttribute('id'))
        div.innerText = inputElement.getAttribute('title')
        this.$refs.presentsList.append(div)

      }else
        {
          inputElement.checked = false
          inputElement.setAttribute('present','false')
          event.target.innerText = 'Получить в подарок'

          this.$refs.presentsList.querySelector(`[data-id="${inputElement.getAttribute('id')}"]`).remove()
        }
        this.calculate()
    },

    calculateServices:function () {
      let servicesPrice = 0
      let services = !this.$refs.service.length?[this.$refs.service]:this.$refs.service

      services.forEach(service=>{

        servicesPrice  += (service.getAttribute('present')=='false' && service.checked==true)?Number(service.getAttribute('value')):0

      })

      services.forEach(service=>{

        if((service.getAttribute('present')=='true' && service.checked==true) && (Number(service.getAttribute('pricepresent'))>Number(this.resultModel+servicesPrice)))
        {

            service.setAttribute('present','false')
            servicesPrice  +=Number(service.getAttribute('value'))

            this.$refs.presentsList.querySelector(`[data-id="${service.getAttribute('id')}"]`).remove()

        }

      })




      return servicesPrice
    },

    calculateHalls:function (){
      this.$refs.halls.innerHTML = ' ';

      this.halls.forEach(hall=>{
        if(hall.maxGuests>=Number(this.guestsModel)){
            let div = document.createElement('div')
            div.innerHTML = hall.title
            this.$refs.halls.append(div)
        }
      })
    },

    calculate:function (){
      if(this.guestsModel =='' || this.checkModel =='' || this.dateModel =='')
      {
        this.resultModel = '0';
        return
      }


      this.resultModel = Number(this.guestsModel) * Number(this.checkModel)

      this.resultModel += this.calculateServices()

      this.calculateHalls()

      this.setServicePresent()

    }

  }
}
</script>

<style lang="less">
.calculation {
  margin-bottom:80px;
  .shadow_wrapper{
    position: relative;
    .shadow{
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: rgba(0,0,0,0.8);
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99;
      span{
        font-size: 20px;
        color: #ffffff;
      }
    }
  }
  .block {
    display:flex;
    justify-content:space-between;
    margin-bottom: 40px;
    .item{
      &.one {
        width:30%;
        label {
          color:#292929;
          text-transform:uppercase;
          font-size:16px;
          margin-bottom:0;
          &.date{
            margin: 1rem 0;
          }
        }

        input[type="number"],input[type="date"]{
          width:100%;
          height:40px;
          border:1px solid #a56e7d;
          border-radius:5px;
          padding:0 15px;
          margin-top:10px;
          color:#000000;
          font-size:18px;
        }
        input[type="number"]::placeholder {
          color:#000000;
        }
        input[type="range"] {
          width: 100%;
          margin:15px 0 23px 0;
        }
        select{
          background-color: #ffffff;
          width:100%;
          height:40px;
          border:1px solid #a56e7d;
          border-radius:5px;
          padding:0 15px;
          margin-top:15px;
          color:#000000;
          font-size:18px;
        }
      }
      &.two{
        width:65%;
        h6 {
          color:#292929;
          text-align:center;
          text-transform:uppercase;
          font-size:16px;
        }
        .box {
          border:1px solid #a56e7d;
          border-radius:5px;
          padding:20px 25px 0 25px;
          margin-top:15px;
          display:flex;
          justify-content:space-between;
          flex-wrap:wrap;
          .bl {
            width:33%;
            padding:0 10px;
            margin-bottom:30px;
            font-size:16px;
            color:#58595e;
            text-transform:uppercase;
            label {
              margin-bottom:0;
              .btn_receive_gift{
                text-transform: none;
                color: #8d2860;
                display: none;
                text-decoration: underline;
              }
            }
            span {
              text-transform:none;
              display:block;
            }
          }
        }

      }
    }
  }
  .checkbox-custom {
    opacity:0;
    position:absolute;
    display:inline-block;
    vertical-align:middle;
    cursor:pointer;
  }
  .checkbox-custom-label {
    position:relative;
    padding-left:30px;
  }
  .checkbox-custom + .checkbox-custom-label:before{
    content:'';
    background:#fff;
    border:1px solid #ab7886;
    border-radius:3px;
    width:20px;
    height:20px;
    padding:2px;
    position:absolute;
    top:5px;
    left:0;
  }
  .checkbox-custom:checked + .checkbox-custom-label:before {
    content: '';
    position: absolute;
    left: 4px;
    top: 12px;
    background: #768173;
    width: 2px;
    height: 2px;
    box-shadow: 2px 0 0 #768173, 4px 0 0 #768173, 4px -2px 0 #768173, 4px -4px 0 #768173, 4px -6px 0 #768173, 4px -8px 0 #768173;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    border: 0px solid #ab7886;
    border-radius: 3px;
    padding: 2px;
    z-index: 1;
  }
  .checkbox-custom:checked + .checkbox-custom-label:after{
    content: '';
    background: #fff;
    border: 1px solid #ab7886;
    border-radius: 3px;
    width: 20px;
    height: 20px;
    padding: 2px;
    position: absolute;
    top: 5px;
    left: 0;
  }
  .block-color {
    display:flex;
    justify-content:space-between;
    background:#a56e7d;
    padding:50px 20px;
    .item{
      &.one{
        width:60%;
        color:#fff;
        .halls{

          div{
            display: block;
            margin: 5px 0 !important;
            font-size: 20px;
            font-family: 'Playfair Display';
            font-style: italic;
            span{
              font-size: 20px;
            }
          }
        }
        .suit-you {
          font-size:16px;
          font-family:'Myriad Pro Bold';
          margin-bottom:40px;
          span {
            font-size:22px;
            font-family:'Playfair Display';
            font-style:italic;
          }
          .presents {
            font-size:16px;
            font-family:'Myriad Pro Bold';
            .gift-list {
              display:flex;
              justify-content:space-between;
              flex-wrap:wrap;
              .gift {
                width:50%;
                margin-top:25px;
                font-size:16px;
                font-family:'Myriad Pro Regular';
                padding-right: 20px;
                display: none;
                span {
                  text-transform:uppercase;
                  display:block;
                  &:nth-child(2) {
                    font-size: 16px;
                    text-transform: inherit;
                    letter-spacing: 1px;
                  }
                }
              }
            }
          }
        }
      }
      &.two{
        width:40%;
        .sendform {
          background:#fff;
          padding:40px 50px;
          h5{
            color:#a56e7d;
            font-size:24px;
            font-family:'Playfair Display';
            font-style:italic;
            margin-bottom:24px;
            text-align:center;
          }
          input[type="tel"] {
            width:100%;
            height:40px;
            margin-bottom:20px;
            border:1px solid #a56e7d;
            padding:0 20px;
            color:#000000;
            font-size:16px;
          }
          input[type="submit"] {
            width:100%;
            height:40px;
            color:#fff;
            background:#db9f9d;
            border:1px solid #e8e8e8;
            font-size:16px;
            text-transform:uppercase;
            font-family:'Myriad Pro Bold';
            transition:all 0.5s;
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
    }
  }
}

</style>

