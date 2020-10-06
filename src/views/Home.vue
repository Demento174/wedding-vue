<template>
  <div id="main">
    <Header v-if="data != undefined"
            v-bind:items="data.menu.items"
            v-bind:logo="data.menu.logo"
            v-bind:phone="data.menu.phone"
            v-bind:size="data.menu.fontsize"

            v-bind:sendGoal="this.sendGoal"
            v-bind:goal="data.metrika.goals.click_phone"
    />

    <Intro v-if="data != undefined && data.introBlock.hide !== true"
        v-bind:id="`intro`"
        v-bind:title="data.introBlock.title"
        v-bind:backgroundImg="data.introBlock.background"
        v-bind:titlecolor="data.introBlock.textcolor"
    />

    <SliderHalls v-if="data != undefined && data.tentBlock.hide !== true"
        v-bind:title="data.tentBlock.title"
        v-bind:id="'tent'"
        v-bind:halls="[{
                        title:data.tentBlock.title,
                        guests:data.tentBlock.guests,
                        minPrice:data.tentBlock.minPrice,
                        characters:data.tentBlock.characters,
                        imgs:data.tentBlock.imgs,
                        file_banket:data.tentBlock.file_banket,
                        file_furshet:data.tentBlock.file_furshet
        }]"


        v-bind:goal="data.metrika.goals.form_shattre"
    />

    <SliderHalls v-if="data != undefined && data.banquetHalls_hide !== true"
      v-bind:title="data.banquetHalls_title"
      v-bind:id="'halls'"
      v-bind:halls="data.banquetHalls"


      v-bind:goal="data.metrika.goals.form_banquet"
    />

    <SliderServices v-if="data != undefined && data.services_hide !== true"
        v-bind:title="data.services_title"
        v-bind:id="'services'"
        v-bind:services="data.services"


        v-bind:goal="data.metrika.goals.form_service"
    />

    <SliderServices v-if="data != undefined && data.specialOffers_hide !== true"
        v-bind:title="data.specialOffers_title"
        v-bind:id="'specialOffers'"
        v-bind:services="data.specialOffers"

        v-bind:goal="data.metrika.goals.form_specialoffer"
    />

    <Presents v-if="data != undefined && data.presents_hide !== true"
        v-bind:title="data.presents_title"
        v-bind:id="`presents`"
        v-bind:presents="data.presents"
    />

    <Calculator v-if="data != undefined && data.calculate.hide !== true"
        v-bind:id="`calculator`"
        v-bind:shadowVariable="data.calculate.shadow"
        v-bind:title="data.calculate.title"
        v-bind:formTitle="data.calculate.form_title"
        v-bind:presentTitle="data.calculate.present_title"
        v-bind:guest="data.calculate.guests"
        v-bind:guest_min="data.calculate.guests.min"
        v-bind:guest_max="data.calculate.guests"
        v-bind:checks="data.calculate.checks"
        v-bind:services="data.calculate.services"
        v-bind:halls="data.banquetHalls"
        v-bind:pricePresentMode="data.calculate.type"
        v-bind:formCompleate="data.calculate.form_compleate"

        v-bind:sendGoal="this.sendGoal"
        v-bind:goal="data.metrika.goals.form_calculator"
    />

    <AdditionalServices v-if="data != undefined && data.additionalServices_hide !== true"
        v-bind:id="`additionalServices`"
      v-bind:title="data.additionalServices_title"
      v-bind:additionalServices="data.additionalServices"
    />

    <SliderRow v-if="data !== undefined && data.galleryRows !== undefined && data.galleryRows.hide !== true && data.galleryRows.rows !== undefined && (typeof data.galleryRows.rows[0].imgs === 'object')"
        v-bind:id="`gallery`"
        v-bind:title="data.galleryRows.title"
        v-bind:imgs="data.galleryRows.rows[0].imgs"
        v-bind:signature="data.galleryRows.rows[0].signature"
    />

    <div v-if="data != undefined && data.galleryRows != undefined && data.galleryRows.hide !== true && data.galleryRows.rows != undefined">
      <div v-for="(gallery, index) in data.galleryRows.rows">
        <SliderRow v-if="index !== 0 && (typeof gallery.imgs === 'object')"

                   v-bind:imgs="gallery.imgs"
                   v-bind:signature="gallery.signature"
        />
      </div>

    </div>


    <FormCallback v-if="data != undefined && data.callback.hide !== true"
        v-bind:id="`callback`"
        v-bind:title="data.callback.title"
        v-bind:subtitle="data.callback.subtitle"
        v-bind:offers="data.callback.offers"
        v-bind:formCompleate="data.callback.form_compleate"

        v-bind:sendGoal="this.sendGoal"
        v-bind:goal="data.metrika.goals.form_callback"
    />

    <Map v-if="data != undefined && data.map.hide !== true"
        v-bind:id="`map`"
      v-bind:title="data.map.title"
      v-bind:coords="data.map.coords"
    />

    <Footer v-if="data != undefined"
      v-bind:address="data.footer.address"
      v-bind:phone="data.footer.phone"
      v-bind:hours="data.footer.housr"
      v-bind:email="data.footer.email"
      v-bind:social="data.footer.social"
    />
    <Modal
        v-bind:response="data.modal.response_text"
        v-bind:sendGoal="this.sendGoal"
    />
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Intro from "@/components/Intro";
import SliderHalls from "@/components/SliderHalls";
import SliderServices from "@/components/SliderServices";
import Presents from "@/components/Presents";
import Calculator from "@/components/Calculator";
import AdditionalServices from "@/components/AdditionalServices";
import SliderRow from "@/components/SliderRow";
import FormCallback from "@/components/FormCallback";
import Map from "@/components/Map";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal"




export default {
  props:['data'],
  metaInfo () {
    return {
      title:(this.data && this.data.seo)? this.data.seo.title:'Проведение свадьбы',
      meta: [
        {
          name: 'description',
          content: (this.data && this.data.seo)? this.data.seo.description:'Проведение свадьбы'
        },
        {
          name: 'robots',
          content: (this.data && this.data.seo)? this.data.seo.index:'noindex'
        },
        {
          name: 'googlebot',
          content: (this.data && this.data.seo && this.data.seo.index !== 'noindex')? this.data.seo.index:'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        },
        {
          name: 'bingbot',
          content: (this.data && this.data.seo && this.data.seo.index !== 'noindex')? this.data.seo.index:'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        },
        {
          property: 'og:locale',
          content: 'ru_RU'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:title',
          content: (this.data && this.data.seo)? this.data.seo.open_graph_title:'Проведения свадеб'
        },
        {
          property: 'og:description',
          content: (this.data && this.data.seo)? this.data.seo.open_graph_title:'Проведения свадеб'
        },
        {
          property: 'og:url',
          content: window.location.href
        },
        {
          property: 'og:site_name',
          content: (this.data && this.data.seo)? this.data.seo.title:'Проведение свадьбы',
        },
        {
          property: 'og:image',
          content: (this.data && this.data.seo)? this.data.seo.open_graph_images:'',
        },
      ]
    }

  },
  data() {

    return {

      orders: [
        'intro_order',
        'site_tent_wedding_order',
        'bankets_order',
        'wedding_service_order',
        'special_proposition_order',
        'presents_block_order',
        'calculator_order',
        'more_service_order',
        'gallery_order',
        'callback_order',
        'map_order']

    }
  },
  methods : {
    // fetchData($domain = 'default') {
    //   fetch('http://vsvetesil.uxp.ru/wedding_api.com/wp-json/wedding/v1/domain-data/?arg_str=' + $domain)
    //       // await fetch('http://wedding-api.com/wp-json/wedding/v1/domain-data/?arg_str=' + $domain)
    //       .then((response) => {
    //         return response.json()
    //       })
    //       .then((json) => {
    //         // console.log(json)
    //         if (json.success == true) {
    //           this.data = json.data
    //           // this.orders = json.data.orders
    //         } else {
    //           this.fetchData()
    //         }
    //       })
    // },
    sendGoal(goal=''){
      console.log(this.data.metrika.id,goal);
      if(this.data.metrika.id === '' || goal === '')
      {
        return true;
      }
      console.log(this.$metrika.reachGoal(goal));



    }
  },
  name: 'Home',
  components: {
    Header,
    Intro ,
    SliderHalls,
    SliderServices,
    Presents,
    Calculator,
    AdditionalServices,
    SliderRow,
    FormCallback,
    Map,
    Footer,
    Modal,
  }
}
</script>
<style lang="less">
  #main{
    overflow: hidden;
  }
</style>