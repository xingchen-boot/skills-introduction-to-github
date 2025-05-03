<template>
  <Dialog
    :show="dialogConfig.show"
    :title="dialogConfig.title"
    :buttons="dialogConfig.buttons"
    width="1000px"
    :showCancel="false"
    @close="dialogConfig.show = false"
  >
  <div class="dialog-panel">
    <div class="bg">
      <img src="../../assets/login_bg.png" alt="">
    </div>
    <el-form class="login-register" :model="formData" :rules="rules" ref="formDataRef" @submit.prevent">
      <div class="tab-panel">
        <div :class="[opType==1?'active':'']" @click="showPanel(1)">登录</div>
        <el-divider direction="vertical"></el-divider>
        <div :class="[opType==0?'active':'']" @click="showPanel(0)">注册</div>
      </div>
      <el-form-item label="" prop="email">
        <el-input 
        clearable
        v-model.trim="formData.email" 
        placeholder="请输入邮箱"
        size="large"
        :maxlength="150"
        >
      <template #prefix>
        <span class="iconfont icon-account"></span>
      </template>
      </el-input>
       
      </el-form-item>
      <div v-if="opType==0">
        <el-form-item label="" prop="nickName" v-if="opType==0">
        <el-input 
        clearable
        v-model.trim="formData.nickName" 
        placeholder="请输入昵称"
        size="large"
        :maxlength="150"
        >
      <template #prefix>
        <span class="iconfont icon-account"></span>
      </template>
      </el-input>   
      </el-form-item>
      <el-form-item label="" prop="registerPassword">
        <el-input 
        size="large"
        show-password
        v-model.trim="formData.registerPassword" 
        placeholder="请输入密码"
        >
      <template #prefix>
        <span class="iconfont icon-password"></span>
      </template>
      </el-input>
       
      </el-form-item>
      <el-form-item label="" prop="ReregisterPassword">
        <el-input 
        size="large"
        show-password
        v-model.trim="formData.ReregisterPassword" 
        placeholder="请再次输入密码"
        >
      <template #prefix>
        <span class="iconfont icon-password"></span>
      </template>
      </el-input>
       
      </el-form-item>
      </div>
      
      <el-form-item label="" prop="password" v-if="opType==1">
        <el-input 
        size="large"
        show-password
        v-model.trim="formData.password" 
        placeholder="请输入密码"
        >
      <template #prefix>
        <span class="iconfont icon-password"></span>
      </template>
      </el-input>
       
      </el-form-item>
      <el-form-item label="" prop="checkCode">
        <div class="check-code-panel">
          <div class="input">
            <el-input  
        size="large"
        show-password
        v-model.trim="formData.checkCode" 
        placeholder="请输入验证码"  
        >
      <template #prefix>
        <span class="iconfont icon-checkcode"></span>
      </template>
      </el-input>
          </div>
          <img src="" alt="">       
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSubmit" class="login-btn" size="large">
          <span v-if="opType==0">注册</span>
          <span v-if="opType==1">登录</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  </Dialog>
</template>


<script setup>
import { validator } from 'artplayer'
import { ref,reactive,getCurrentInstance,nextTick, shallowReactive } from 'vue'
const { proxy } = getCurrentInstance()
const dialogVisible = ref(true)
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

import {useLoginStore} from "@/stores/loginStore.js"
const loginStore=useLoginStore()

const checkCodeInfo=ref({})
const changeCheckCode=async()=>{
  let result=await proxy.Request({
    url:proxy.Api.checkCode
  })
  if(!result){
    return
  }
  checkCodeInfo.value=result.data
}

const formData=ref({})
const formDataRef=ref()

const validatePassword = (rule, value, callback) => {
  if(value!==formData.value.password){
    callback(new Error('两次密码不一致'));
  }else{
    callback();
  }
}

const rules={
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
  ],
  password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { 
            pattern: /^[a-zA-Z\d~!@#$^&*_]{6,16}$/, 
            message: '密码只能由数字、字母和特殊字符（~!@#$^&*_）组成，长度为 6 - 16 位', 
            trigger: 'blur' 
        }
    ],
  nickName:[
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 1, max: 20, message: '昵称长度在 1 到 20 个字符', trigger: 'blur'}
  ],
  registerPassword:[
    { required: true, message: '请输入密码', trigger: 'blur' }, 
    { 
            pattern: /^[a-zA-Z\d~!@#$^&*_]{6,16}$/, 
            message: '密码只能由数字、字母和特殊字符（~!@#$^&*_）组成，长度为 6 - 16 位', 
            trigger: 'blur' 
        }
    
  ],
ReregisterPassword:[
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    // 校验两次密码是否一致
    {validator: validatePassword, trigger: 'blur'}
  ],
  checkCode:[
    { required: true, message: '请输入验证码', trigger: 'blur' },
   
  ]
}

const dialogConfig = reactive({
  show: true, // 控制对话框的显示状态
  
  buttons:[
    
  ] 
})

const opType=ref(1)

const showPanel=(type)=>{
 opType.value=type 
 resetForm()
}

const resetForm=()=>{
  changeCheckCode()
  nextTick(()=>{
    formDataRef.value.resetFields();
    formData.value={}
  })
}

const doSubmit=()=>{
  formDataRef.value.validate(async (valid)=>{
    if(!valid){
      return;
    }
    let params={}
    Object.assign(params,formData.value);
    let result=await proxy.Request({
      url:'api/xxx',
      params
    })
    if(!result){
      return;
    }
  }) 
}
</script>

<style lang="scss" scoped>
.dialog-panel{
  display: flex;
  align-items: center;
  justify-content: space-around;
  .bg{
    width: 450px;
    height: 580px;
    overflow: hidden;
    img{
      width: 100%;
    }
  }

  .login-register{
    width: 350px;
    .tab-panel{
      margin: 10px auto;
      display: flex;
      width: 130px;
      font-size: 18px;
      align-items: center;
      justify-content: space-around;
      cursor: pointer;
      .active{
        color:var(--blue2)
      }
    }
    .no-account{
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .login-btn{
      width: 100%;
    }
    .bottom-btn{
      margin-bottom: 0;
    }
  }
}

.check-code-panel{
  display: flex;
  align-items: center;
  width: 100%;
  .input{
    flex:1;
  }
  .right-panel{
    margin-left: 5px;
    cursor: pointer;
  }
}
</style>