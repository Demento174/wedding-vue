<template>
  <div id="weddings">
    <router-view v-bind:data="data" />
  </div>
</template>

<script>
  export default {
    props:['data']
  }
</script>