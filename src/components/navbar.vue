<template>
  <div id="nav">
    <!-- <div class="log"><img src="../assets/logo.png"></div> -->
    <div class="setup">
      <div class="user">  
        <div><user-outlined /></div>
        <h4>管理者</h4>
      </div>
      <div class="hamburgerMenu" @click="toggleMenu">
        <span class="bar"></span>
      </div>


    </div>
    <div class="navList" id="navList">
      <div class="navbarList">
        <ul>
          <Logout/>
          <TimeRange/>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Logout from '../components/navbarOptions/logout.vue'
import TimeRange from '../components/navbarOptions/timeRange.vue'
import { defineComponent,ref } from 'vue';
import {
  UserOutlined,
} from '@ant-design/icons-vue';
defineComponent({
  components: {
    UserOutlined
  },
});

const openUserMenu = ref('translateX(100%)');
const openUserMenuMedia = ref('translateX(100%)')
const barColor = ref('#333');
const beforeTop = ref('-.8rem');
const beforeTransform = ref('rotate(0deg)')
const afterTop = ref('.8rem')
const afterTransform = ref('rotate(0deg)')


const toggleMenu = () => {
  let translateValue =  openUserMenu.value;
  if (translateValue == 'translateX(100%)') {
    //menu
    openUserMenu.value = 'translateX(70%)';
    openUserMenuMedia.value = 'translateX(0%)'
    //bar
    barColor.value = 'transparent';
    beforeTop.value = '0';
    beforeTransform.value = 'rotate(135deg)';
    afterTop.value = '0';
    afterTransform.value = 'rotate(-135deg)';

  } else {
    //menu
    openUserMenu.value = 'translateX(100%)'
    openUserMenuMedia.value = 'translateX(100%)'
    //bar
    barColor.value = '#333';
    beforeTop.value = '-.8rem';
    beforeTransform.value = 'rotate(0deg)';
    afterTop.value = '.8rem';
    afterTransform.value = 'rotate(0deg)';
  }
 
}

</script>

<style lang="scss" scoped>

$clickBtn:v-bind(openUserMenu);
$clickBtnMedia:v-bind(openUserMenuMedia);
$barColor:v-bind(barColor);
$beforeTop:v-bind(beforeTop);
$beforeTransform:v-bind(beforeTransform);
$afterTop:v-bind(afterTop);
$afterTransform:v-bind(afterTransform);

 #nav {
  display: flex;
  justify-content: flex-end;
  background-color: #eee;
  box-shadow: 1px 1px 4px #292828;

  .setup {
    display: flex;
    padding: 5px;
    
    .user {
      display: flex;
      padding: 0px 10px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .hamburgerMenu {
    height:3.125rem;
    width:3.125rem;
    background-color: #eee;
    border-radius: .4rem;
    box-shadow:
      .5rem .5rem 1rem #cacaca,
      -.5rem -.5rem 1rem #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;

    &:hover {
      box-shadow:
        inset .5rem .5rem 1rem #cacaca,
        inset -.5rem -.5rem 1rem #fff;
          
    }

      .bar {
          width: 2rem;
          height: 2px;
          // background-color: #333;
          background-color: $barColor;
          display: inline-block;
          position: relative;
          transition: backgroud-color .5s;

          &:before,
          &:after {
              content: "";
              position: absolute;
              width: inherit;
              height: inherit;
              background-color: #333;
              transition: all .5s;
          }

          &:before {
              // top: -.8rem;
              top:$beforeTop;
              transform:$beforeTransform;
          }

          &:after {
              // top: .8rem;
              top:$afterTop;
              transform:$afterTransform;
          }
      }

    }
  }
  .navList {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    background-color: #eee;
    transform:$clickBtnMedia;
    box-shadow: -.5rem 0 1rem rgba(0, 0, 0, 0.1);
    z-index: 1500;
    transition: transform 1s;
    font-size: 1.5rem;

    .navbarList {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
        ul {
          padding-top: 70px;
          position: absolute;
          justify-content: center;
          align-items: center;
          width: 100%;

          @media screen and (min-width: 992px) {
            width: 30%;
          }
        }
    }

    @media screen and (min-width: 992px) {
      transform:$clickBtn
    }
  }
 }

</style>