<template>
  <header v-on:scroll="handleScroll" class="sticky">
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <div class="col-8 col-sm-8 col-md-6 col-lg-2 col-xl-2">
          <div class="logo">
            <a href="/">
              <img :src="logo" class="img-fluid">
            </a>
          </div>
        </div>
        <button class="navbar-toggler collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#navbarResponsive"
                aria-controls="navbarResponsive"
                aria-expanded="false"
                aria-label="Toggle navigation">

          <span class="icon-bar top-bar"></span>
          <span class="icon-bar middle-bar"></span>
          <span class="icon-bar bottom-bar"></span>
          <span class="sr-only">Toggle navigation</span>
        </button>
        <div class="collapse navbar-collapse col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 dff" id="navbarResponsive">
          <div class="overlay-mobile">
            <div class="menu">
              <ul  class="menu">
                <li v-for="item in items" id="menu-item-309" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-309">
                  <a @click.prevent="scrollToNavigation(item.link)"  :href="item.link"    :target="item.target" :style="`fontSize:${size}px`" >{{ item.title }}</a>
                </li>
              </ul>
            </div>
            <div class="header-contacts">
              <div class="phone"><a :href="`tel:${phone}`" @click="sendGoal(goal)">{{ phone }}</a></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>

export default {
  props:
      {
        items:Array,
        phone:String,
        logo:String,
        size:String,
        sendGoal:Function,
        goal:String
      },


        created () {
          window.addEventListener('scroll', this.handleScroll);
        },
        destroyed () {
          window.removeEventListener('scroll', this.handleScroll);
        },
        methods: {
          handleScroll (event) {
            if(window.scrollY>this.$el.clientHeight){
              this.$el.classList.remove('sticky')
            }else {
              this.$el.classList.add('sticky')
            }
          },
          scrollToNavigation:function (id){
            if(!document.querySelector(id))
            {
              return ;
            }
            document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
          }
        }


}

</script>

<style scoped lang="less">
  header {
    width: 100%;
    position: fixed;
    padding: 15px 0;
    z-index: 101;
    transition: all 0.5s;
    background: #fff;
    &.sticky{
      box-shadow: 0 3px 5px #ccc;
      transition: all 0.5s;
      padding: 15px 0;
      z-index: 100;
    }
    .logo {
      position: relative;
      left: -30px;
    }
    .dff {
      display:flex;
      justify-content:space-between;
    }
    .menu {
      width: 100%;
      ul {
        margin:0;
        padding:0;
        list-style:none;
        display:flex;
        justify-content:start;
        li{
          a{
            color:#2b2b2b;
            font-size:13px;
            font-family:'Myriad Pro Regular';
            transition:all 0.5s;
            text-transform:uppercase;
            display: block;
            text-align: center;
            &:hover{
              color:#a56e7d;
              transition:all 0.5s;
              text-decoration:none;
            }
          }
        }
      }
    }
    .header-contacts {
      width:20%;
      text-align:right;
      .phone{
        a{
          color:#2b2b2b;
          font-size:16px;
          font-family:'Myriad Pro Bold';
          &:hover{
            text-decoration:none;
          }
        }
      }
    }
    .overlay-mobile {
      width:100%;
      display:flex;
      justify-content:space-between;
    }
    @media (max-width: 720px) {
      .navbar{
        padding: 0;
      }
      .logo{
        position: static;
      }
      .menu {
        width:100%;
        background:#fff;
      }
      .menu ul, header .dff {
        flex-wrap:wrap;
      }
      .menu ul li {
        width:100%;
        text-align:center;
        padding:10px 0;
      }
      .menu ul li a {
        font-size:16px;
      }
      .header-contacts {
        width:100%;
        text-align:center;
        margin-top:20px;
      }
      .navbar-toggler {
        border:none;
        background:transparent !important;
      }
      .navbar-toggler:focus {
        outline:none;
        background:transparent !important;
      }
      .navbar-toggler .icon-bar {
        background-color:#d3d1d1;
        transform:rotate(0deg) translate(0px, 0px);
        transition:ease all .2s;
      }
      .navbar-toggler .icon-bar {
        display:block;
        width:40px;
        height:2px;
        border-radius:1px;
      }
      .navbar-toggler .icon-bar+.icon-bar {
        margin-top:10px;
      }
      .icon-bar:nth-child(2) {
        width:34px;
        transition:ease all .2s;
      }
      .navbar-toggler:hover>.icon-bar:nth-child(2) {
        width:40px;
        transition:ease all .2s;
      }
      .navbar-toggler:active>.icon-bar:nth-child(2) {
        width:40px;
        transition:ease all .2s;
      }
      .navbar-toggler:not(.collapsed) .icon-bar:nth-child(1) {
        transform:rotate(45deg) translate(12px, 11px);
        transition:ease all .2s;
      }
      .navbar-toggler:not(.collapsed) .icon-bar:nth-child(2) {
        opacity:0;
        transition:ease all .2s;
      }
      .navbar-toggler:not(.collapsed) .icon-bar:nth-child(3) {
        transform:rotate(-45deg) translate(6px, -5px);
        transition:ease all .2s;
      }
      .collapse:not(.show) {
        display: none;
      }
      .overlay-mobile{
        flex-direction: column;
        height: auto;
      }
    }
  }

</style>