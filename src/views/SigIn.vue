<template>
    <div class="login">
        <div class="gradientbg">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="myForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账 号" prop="acc"  class="font1">
          <el-input type="text" v-model="ruleForm.acc" placeholder=" 请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="pass" class="font1">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder=" 请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pass2" class="font3">
            <el-input type="password" v-model="ruleForm.pass2" autocomplete="off" placeholder=" 再输入密码"></el-input>
          </el-form-item>
          <el-form-item label="邮 箱" prop="email"  class="font1">
            <el-input type="text" v-model="ruleForm.email" placeholder=" 请输入邮箱"></el-input>
          </el-form-item>
         <el-form-item label="验 证 码" prop="code" class="font4">
          <el-row :gutter="20">
            <el-col :span="12"><el-input v-model.number="ruleForm.code" placeholder=" 请输入验证码"></el-input></el-col>
            <el-col :span="8"><el-button @click="sentCode">发送验证码</el-button></el-col>
          </el-row>
        </el-form-item>
        <div>
          <el-button  class="post comback" @click="combackForm">返回</el-button>
          <el-button type="primary" @click="submitForm" class="post">注册</el-button>
          <el-button  class="rigist post">重置</el-button>
        </div>
      </el-form>
    </div>
    <p class="p">Designed By © RJKFxiangmuzu</p>
</div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, nextTick, watch } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
    interface FormData {
    acc: string;
    pass: string;
    pass2: string;
    code:string;
    email:string
    }
    const ruleForm = ref({
      acc: '',
      pass: '',
      pass2: '',
      code: '',
      email: ''
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
    // 验证确认密码
    const validatePass2 = (rule: any, value: string, callback: (error?: Error) => void) => {
      console.log(value)
      if (value !== ruleForm.value.pass) {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }
    // 验证邮箱
    const validateEmail = (rule: any, value: string, callback: (error?: Error) => void) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        callback()
      }
    }

    // 验证验证码
    const checkCode = (rule: any, value: string, callback: (error?: Error) => void) => {
      console.log(value)
      if (!value) {
        return callback(new Error('验证码不能为空'))
      }
    }
    // 返回
    const combackForm = () => {
      router.push('/') // 跳转到登录页面
    }
    // 给后端传数据
    const submitForm = () => {
  nextTick(() => {
    myForm.value.validate().then(isValid => {
      if (isValid) {
        const { acc, pass } = ruleForm.value
        const requestBody = {
          account: acc,
          password: pass
        }
            axios.post('/api/register', requestBody)
              .then(response => {
                console.log(response.data) // 打印后端返回数据
                if (response.data.code === 200) {
                  alert(response.data.msg)
                } else if (response.data.code === 100) {
                  alert(response.data.msg)
                }
              })
          }
        })
      })
    }
    // 发送验证码
    const sentCode = () => {
  nextTick(() => {
    myForm.value.validate().then(isValid => {
      if (isValid) {
        const { email } = ruleForm.value
        const requestBody = {
          email: email
        }
            axios.post('/api/SendEmail', requestBody)
              .then(response => {
                console.log(response.data) // 打印后端返回数据
                if (response.data.code === 200) {
                  alert(response.data.msg)
                } else if (response.data.code === 100) {
                  alert(response.data.msg)
                }
              })
          }
        })
      })
    }
interface ValidationRules {
  acc: { validator: (rule: any, value: string, callback: (error?: Error) => void) => void; trigger: string }[];
  pass: { validator: (rule: any, value: string, callback: (error?: Error) => void) => void; trigger: string }[];
  pass2: { validator: (rule: any, value: string, callback: (error?: Error) => void) => void; trigger: string }[];
  email: { validator: (rule: any, value: string, callback: (error?: Error) => void) => void; trigger: string }[];
  code: { validator: (rule: any, value: string, callback: (error?: Error) => void) => void; trigger: string }[];
}
const rules = reactive<ValidationRules>({
      acc: [
        { validator: validateAcc, trigger: 'blur' }
      ],
      pass: [
        { validator: validatePass, trigger: 'blur' }
      ],
      pass2: [
        { validator: validatePass2, trigger: 'blur' }
      ],
      email: [
        { validator: validateEmail, trigger: 'blur' }
      ],
      code: [
        { validator: checkCode, trigger: 'blur' }
      ]
    })



</script>

<style scoped>
@import url('../assets/SigIn.css');
</style>