import Vue from 'vue'
import { BootstrapVue} from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.js'
import '@/assets/less/style.less'
import 'swiper/css/swiper.css'
import VueMeta from 'vue-meta'
import VueYandexMetrika from 'vue-yandex-metrika'
import VueLazyload from 'vue-lazyload'
import Axios from "axios";


Vue.use(VueMeta)
Vue.use(BootstrapVue)
Vue.use(VueAwesomeSwiper)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
})

Vue.config.productionTip = false;



(async function  (){
  let domain = window.location.origin.replace(/(^\w+:|^)\/\//, '');
  // domain = 'wedding.russkiydom.beget.tech';
  let data = await Axios.get(`http://api-wedding.russkiydom.beget.tech/wp-json/wedding/v1/domain-data/?arg_str=${domain}`);
  data = data.data.data;
  if(data)
  {
    if(data.metrika.id)
    {
      Vue.use(VueYandexMetrika, {
        id: data.metrika.id,
        // env: process.env.NODE_ENV
      })
    }


    new Vue({
      metaInfo: {
        titleTemplate: (title) => title ? `${title}` : ''
      },
      router,
      render: h => h(App,{props:{data:data}}),
      // data:data
    }).$mount('#weddings')
  }


})()

async function fetchData(domain='default')
{
  let json = false;
  domain = 'wedding.russkiydom.beget.tech';

  let response =  await fetch(`http://api-wedding.russkiydom.beget.tech/wp-json/wedding/v1/domain-data/?arg_str=${domain}`)
  if (response.ok)
  {

    json = await response.json();
  }
    else
      {
        this.fetchData()
      }
  return json;

  // .then((response) => {
      //
      //   return response.json()
      // })
      // .then((json) => {
      //
      //   if (json.success == true) {
      //     const data = json.data
      //
      //     return data;
      //
      //   } else {
      //     this.fetchData()
      //   }
      // })
}






