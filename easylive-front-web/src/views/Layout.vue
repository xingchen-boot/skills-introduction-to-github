<template>
    <div class="main-container"
    :style="{
        'max-width': proxy.bodyMaxWidth+'px',
        'min-width': proxy.bodyMinWidth+'px',
    }"
    >
    <div class="header" ><layoutHeader></layoutHeader></div>
    <div class="header-fixed" v-if="showFixedHeader"><layoutHeader theme="dark"></layoutHeader></div>
    <div class="body-inner"></div>
    account组件
    <Account></Account>
</div>

</template>

<script setup>
import Account from './account/Account.vue';
import layoutHeader from './layoutHeader.vue';
import {ref,getCurrentInstance,reactive,nextTick,onMounted} from 'vue'
const {proxy}=getCurrentInstance()
import { useRoute,useRouter } from 'vue-router';
const router=useRouter()
const route=useRoute()

onMounted(()=>{
    // 监听滚动条事件
    window.addEventListener('scroll',windowScrollHandler)
})

const showFixedHeader=ref(false)

const windowScrollHandler=()=>{
  var curScrollTop=window.scrollY; 
  if(curScrollTop<40){
    showFixedHeader.value=false;
  }else{
    showFixedHeader.value=true;}
}
</script>

<style>
body{
    background-color: #ededed !important;
}
</style>
<style lang="scss" scoped>
.main-container {
   background-color: #fff; 
   margin: 0 auto;
   min-height: calc(100vh);

   .body-inner {
    height: 20000px; 
   }

   .header{
    margin: 0 auto;
    height: 180px;
    background-color: #7c9ce1;
    width: 100%;
    background-position: center;
    position: relative;
    background-repeat: no-repeat;
    background-image: url(../assets/banner_bg.png);
   }

   .header-fixed{
    background-color: #fff;
    position: fixed;
    width: 100%;
    top: 0;
   }
}


</style>
