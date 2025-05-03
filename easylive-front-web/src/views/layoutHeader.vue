<template>
    <div :class="['header-bar','header-bar-'+theme]">
        <div class="menu"><router-link class="iconfont icon-logo" to="/">首页</router-link></div>
        <div class="search-body">
            <!-- input输入 -->
            <div class="search-panel">
                <div class="search-panel-inner">
                    <div class="input-panel">
                        <input type="text">
                    <div class="iconfont icon-search"></div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="user-panel">
            <div class="user-avatar">
                <img src="../assets/user.png" alt="">
            </div>
            <div class="user-panel-item">
                <div class="iconfont icon-message"></div>
                <div>消息</div>
            </div>
            <div class="user-panel-item">
                <div class="iconfont icon-collection"></div>
                <div>收藏</div>
            </div>
            <div class="user-panel-item">
                <div class="iconfont icon-history"></div>
                <div>历史</div>
            </div>
            <div class="user-panel-item">
                <div class="iconfont icon-light"></div>
                <div>创作中心</div>
            </div>
            <div class="btn-upload">
                
                <el-button size="large" type="primary">
                    <span class="iconfont icon-upload"></span>
                    <span>投稿</span>
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref,getCurrentInstance,reactive,nextTick} from 'vue'
const {proxy}=getCurrentInstance()
import { useRoute,useRouter } from 'vue-router';
const router=useRouter()
const route=useRoute()

const props=defineProps({
    theme:{
        type:String,
        default:'light',//light白色,dark黑色
    }
})
</script>

<style lang="scss" scoped>
.header-bar {
    width: 100%;
    height: 64px;
    padding: 0px 25px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    .menu{
        
        display: flex;
        align-items: center;
        a{
                text-decoration: none;
            }
        .icon-logo{
            
            font-size: 16px;
            
            &::before{
                float: left;
                
                font-size: 25px;
                margin-right: 5px;
            }
        }
    }
    .search-body{
      
       color: #61666d; 
       .search-panel{
        margin: 0 auto;
        position: relative;
        max-width: 80%; 
        .search-panel-inner{
           width: 100%;
           position: absolute; 
           top: 10px;
           left: 0;
           border: 1px solid #000;
           border-radius: 8px;
           overflow: hidden;
           z-index: 1001;
           .input-panel{
              display: flex;
              align-items: center;
              background: #f1f2f3;
              input{
                width: 100%;
                border: none;
                background: #f1f2f3;
                border-radius: 5px;
                padding: 8px 10px;
                margin:3px 10px;
                &:focus{
                    outline: none;
                }
              }
              .iconfont{
                font-size: 20px;
                margin-right: 10px;
                color:#2f3238;
                width:35px;
                height:30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 5px;
                cursor: pointer;
                &:hover{
                    background: #ddd;
                }
              }
           }
        }
       }
    }
   .user-panel {
      display: flex;
      justify-content: flex-end;
     align-items: center;
      .user-avatar{
        width: 35px;
        height: 35px;
        img{
            width: 100%;
            border-radius: 50%;
        }
      }
      .user-panel-item{
         text-align: center;
         cursor: pointer;
         padding: 0px 13px;
        
         .iconfont{
            font-size: 20px;
            text-align: center;
            font-weight: normal; 
         }
      }
     .btn-upload{
        margin-left: 10px; 
        .el-button{
            background: #fb7299;
            border-color: #fb7299;
            border-radius: 8px;
            padding: 0px 20px;
            .iconfont{
                &::before{
                  margin-right: 5px;  
                }
            }
        }
     }
   }

}

.header-bar-light {
    color: #fff;
    .menu{
        color: #fff;
    } 
    a{
        color: #fff;
    }

}
.header-bar-dark {
    color: #61666d;
    .menu{
        color: #61666d;
    }
    a{
        color: #61666d;
    }
}
</style>