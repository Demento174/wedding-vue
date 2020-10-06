<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="footer_wrapper">
            <div class="item">
              <div class="location-footer">
                <img src="/images/icon-metka.png">
                {{ address }}
              </div>
            </div>
            <div class="item">
              <div class="phone-footer">
                <img src="/images/icon-phone.png">
                <a :href="`tel:${phone}`">{{ phone }}</a>
              </div>
            </div>
            <div class="item">
              <div class="worktime-footer">
                <img src="/images/icon-clock.png">
                {{ hours }}
              </div>
            </div>
            <div class="item">
              <div class="email">
                {{ email }}
              </div>
            </div>
            <div class="item">
              <div class="social">
                <a  v-for="item in social" :href="item.link" target="_blank">
                  <img :src="item.img.url" :alt="item.img.alt">
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </footer>

</template>

<script>
export default {
  props:['address','phone','hours','email','social','metrika']
}
</script>

<style lang="less" scoped>
footer {
  padding:35px 0;
  background:#a56e7d;
  font-size:16px;
  color:#fff;
  text-transform:uppercase;
  a {
    color:#fff;
    &:hover {
      text-decoration:none;
      color:#fff;
    }
  }
  .footer_wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .item {
      width: 20%;
      display: flex;
      justify-content: center;
    }
  }
  .location-footer img,.phone-footer img,.worktime-footer img{
    margin: -3px 20px 0 0;
  }
  .social{
    display: flex;
    justify-content: space-between;
    a{
      display: block;
      margin:0 5px;
    }
  }
  @media(max-width: 720px){
    .footer_wrapper {
      flex-direction: column;
      .item {
        width: 100%;
      }
    }
  }
}

</style>