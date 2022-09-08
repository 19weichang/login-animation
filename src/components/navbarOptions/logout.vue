<template>
  <div id="logout">
    <li class="option" @click="userLogout">
      <div class="optionsName">
        <logout-outlined class="icon"/>logout
      </div>
      <right-outlined class="outicon"/>
    </li>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { loginStore } from '/ushow後台/ushow_admin/src/store/user';
import { defineComponent,ref } from 'vue';
import { notification } from 'ant-design-vue';
import type { NotificationPlacement } from 'ant-design-vue';
  import {
    LogoutOutlined,
    RightOutlined,
    FieldTimeOutlined,
  } from '@ant-design/icons-vue';
  defineComponent({
    components: {
      LogoutOutlined,
      RightOutlined,
      FieldTimeOutlined,
    },
  });
  //delay
  function delay(t:number) {
    return new Promise((resolve, reject)=> {
      setTimeout(resolve,t); 
    });
  }
  //border lodding
  const logoutLadding = ref('none');
  //pinia state
  const logout = loginStore();
 
  //登入錯誤訊息
  const openNotification = (placement: NotificationPlacement,sysCode:any,responseMessage:any) => {      
    notification['error']({
      message: `登入失敗 syscode:${sysCode}`,
      description:
        `${responseMessage}`,
      placement,
    });
  };

  const router = useRouter();
  const userLogout = () => {
    logoutLadding.value = 'block';
    logout.fetchLogout()
     .then(()=>{
      return delay(1000);
     })
     .then(()=>{
      console.log('out');
      router.push({ name: "login" });
      
     })
     .catch((err)=>{
      console.log(err);
      openNotification('top',err.sysCode,err.message.responseMessage);
    
     })
     .finally (()=>{
      logoutLadding.value = 'none';
     })
  }
</script>

<style lang="scss" scoped>
$logoutLadding:v-bind(logoutLadding);

li {
    display: flex;
    justify-content: space-between;
    list-style: none;
    padding: 20px 0px;
    border-bottom: 2px solid darkgray;
    cursor: pointer;
    position: relative;
    .optionsName {
      .icon {
      background-color: darkgray;
      padding: 5px;
      margin-right: 5px;
      border-radius: 5px;
      }
    }
    .outicon {
      padding: 5px 5px;
    }

    
    &:hover {
      background-color: darkgray;
    }

    &:before {
      content: "";
      display: $logoutLadding;
      // display: block;
      position: absolute;
      top: 100%;
      border-bottom: 2px solid red;
      animation-name:click;
      animation: click 1s infinite linear;
      width: 20%;

      @keyframes click {
        0%{
          left: 0%;
        }
        100%{
          left: 100%;
        }
      }
    }
  }
</style>