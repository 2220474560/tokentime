<template>
  <div class="login" id="login-page">
    <div class="gradientbg">
      <el-form :model="ruleForm" :rules="rules" status-icon ref="myForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="acc" class="account" >
          <el-input v-model="ruleForm.acc" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <div>
          <el-button type="primary" class="post" @click="submitForm">提交</el-button>
          <el-button class="rigist post" @click="rigist">注册</el-button>
        </div>
      </el-form>
    </div>
    <p class="p">Designed By © RJKFxiangmuzu</p>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick, onMounted, watch } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElForm } from 'element-plus'
import axios from 'axios'




const router = useRouter()

interface FormData {
  acc: string;
  pass: string;
}
const ruleForm = ref<FormData>({
  acc: '',
  pass: '',
})

interface MyFormType {
  validate: () => Promise<boolean>
  // 其他相关属性和方法
}
const myForm: Ref<MyFormType> = ref(null!)



// 验证账号
const validateAcc = (rule: any, value: string, callback: (error?: Error) => void) => {
  console.log(value)
  if (value === '') {
    callback(new Error('请输入账号'))
  } else {
    callback()
  }
}
 // 验证密码
const validatePass = (rule: any, value: string, callback: (error?: Error) => void) => {
  console.log(value)
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}

interface ValidationRules {
  acc: { validator: (rule: any, value: string, callback: (error?: Error) => void) => void; trigger: string }[];
  pass: { validator: (rule: any, value: string, callback: (error?: Error) => void) => void; trigger: string }[];
}
const rules = reactive<ValidationRules>({
      acc: [
        { validator: validateAcc, trigger: 'blur' }
      ],
      pass: [
        { validator: validatePass, trigger: 'blur' }
      ]
    })

const submitForm = () => {
  nextTick(() => {
    myForm.value.validate().then(isValid => {
      if (isValid) {
        const { acc, pass } = ruleForm.value
        const requestBody = {
          account: acc,
          password: pass
        }
        axios.post('/api/login', requestBody)
              .then(response => {
                console.log(response.data) // 打印后端返回数据
                if (response.data.code === 200) {
                  const oldtoken = response.data.data; // 后端返回的data字段为token
                  localStorage.setItem('token', oldtoken); // 将token存储到localStorage中 
                    console.log(oldtoken); // 打印出token
                  if (oldtoken===response.data.data) {
                  alert(response.data.msg) 
                  router.push('/HomePage')
                  }else {
                    alert("token不正确")
                  }
                } else if (response.data.code === 100) {
                  alert(response.data.msg)
                  }  
                })
              } 
    })
  })
}
const rigist = () => {
  router.push('/SigIn') // 跳转到注册页面
} 

</script>

<style scoped>
@import url('../assets/LogIn.css');
</style>