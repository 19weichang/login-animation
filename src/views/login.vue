<template>
  <div id="login">
    <div class="title">
      Ushow
    </div>
    <div class="trapezoid"></div>
    <div class="loginBox">
      <div class="colFrom">
        <a-form
          class="loginFrom"
          :model="formState"
          name="basic"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            label="Username"
            name="text_Id_value"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input v-model:value="formState.text_Id_value" />
          </a-form-item>

          <a-form-item
            label="Password"
            name="text_Password_value"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-input-password v-model:value="formState.text_Password_value" />
          </a-form-item>

          <!-- <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
            <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
          </a-form-item> -->

          <a-form-item>
            <button 
              data-btn
              html-type="submit"
              class="login-form-button"
              :disabled="loginLoading">Submit</button>
          </a-form-item>
        </a-form>

        
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { onMounted,defineComponent, reactive, ref,inject} from 'vue';
import { loginStore } from '../store/user'
import { useRouter, useRoute } from "vue-router";
// import utils from '../cookie/utils'
import { notification } from 'ant-design-vue';
import type { NotificationPlacement } from 'ant-design-vue';
import gsap from 'gsap'

//  const cookies:any = useCookies();

interface FormState {
  text_Id_value: string;
  text_Password_value: string;
  // remember: boolean;
}
export default defineComponent({
  setup() {
    const formState = reactive<FormState>({
      text_Id_value: '',
      text_Password_value: '',
      // remember: true,
    });

    //Trapezoid width

    //gsap
    
    const trapezoid = () =>{
      gsap.fromTo('.trapezoid', {
        scaleX: 0
      }, {
          duration: 1,
          scaleX: 1
      });
      gsap.fromTo('.loginBox', {
          // yParcant: 40,
          opacity: 0
      }, {
          duration: 1,
          delay: 1.3,
          // yParcant: -50,
          opacity: 1
      });
      gsap.fromTo('.title', {
          x: -200,
          opacity: 0
      }, {
          duration: 1,
          delay: 1,
          x: 0,
          opacity: 1
      });
    }

    const closeLogin = ()=>{
      gsap.fromTo('.trapezoid', {
        scaleX: 1
      }, {
          duration: 1,
          scaleX: 2.2
      });
    }
    onMounted(()=>{
      trapezoid();
    })
    
    //pinia state
    const login = loginStore();

    //delay
    function delay(t:number) {
      return new Promise((resolve, reject)=> {
        console.log(t);
        // setTimeout(() => {
        // }, t);
        setTimeout(resolve,t); 
      });
    }

    //#region 表單送出

    //前往main
    const router = useRouter();
    const goMainRoute = () => {
      router.push({ name: "main" });
    }
    //登入按鈕點擊一次
    const loginLoading = ref(false);
    
    //submit動畫
    const loginAnimation = ref('none');
    
    //登入錯誤訊息
    const openNotification = (placement: NotificationPlacement,sysCode:any,responseMessage:any) => {      
      notification['error']({
        message: `登入失敗 syscode:${sysCode}`,
        description:
          `${responseMessage}`,
        placement,
      });
    };

    const onFinish = (values: any) => { 
      console.log('Success:', values);  
      console.log(login.loginData);
      loginLoading.value = true;
      loginAnimation.value = 'block';

      //尚未選擇時區 固定為8
      let offset:number = 8;
      const submitValues = {
        text_Id_value:values.text_Id_value,
        text_Password_value:values.text_Password_value,
        offset
      }
         
      login.fetchLogin(submitValues)
      .then((data)=>{
        // utils.setCookie('login',10,30)
        // console.log('cookie',document.cookie);
        closeLogin();
        return delay(1000)
      })
      .then(()=>{
        console.log('go');
        // window.sessionStorage.fromlogin = true;
        goMainRoute();
      })
      .catch((data)=>{
         console.log('err',data)
         openNotification('top',data.sysCode,data.message.responseMessage);
      })
      .finally(()=>{  
        setTimeout(() => {
          loginAnimation.value = 'none';
          loginLoading.value = false;  
        }, 1000);
      })
    };
    //#endregion 

    //#region 送出失敗(未填寫資料)
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
    //#endregion

    return {
      formState,
      onFinish,
      onFinishFailed,
      goMainRoute,
      loginLoading,
      loginAnimation,
    };
  },
});
</script>

<style lang="scss" scoped>
// @import '../styles/login.scss';
// body {
//   background-color: #0b1746;
// }
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

$loading:gainsboro;
$loading2:#1e2853;
$clickBtn:v-bind(loginAnimation);

#login {
  // min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color:#1e2853;
  // width: 100%;
  height: 100vh;
  
  .title {
    position: absolute;
    top: 30px;
    left: 30px;
    font-size: 1.6rem;
    color: #EEE;
    text-decoration: none;
    text-transform: uppercase;
    /*英文字體大小寫*/
    letter-spacing: 1px;
    outline: 2px solid #eee;
    padding: 0rem 1.5rem;

  }
  .trapezoid {
      width: 60%;
      height: inherit;
      background-color: #eee;
      position: absolute;
      top: 0;
      right: 0;
      clip-path: polygon(20% 0, 100% 0, 100% 100%, 0 100%);
      transform-origin: right;
      z-index: 10;
  }
  .loginBox {
      background-color: white;
      box-shadow: 2px 2px 4px #292828;
      max-width: 400px;
      border-radius: 20px;
      height: 500px;
      width: 90%;
      z-index:100;
      

      @media screen and (min-width: 992px) {
        display: flex;
        width: 100%;
      }

    .colFrom {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;

        @media screen and (min-width: 992px) {
          width: 100%;
          // padding: 100px 0px;
        }
      }
      .loginFrom {
        // border: 1px solid black;
      .login-form-button {
        border-radius: 5px;
        background-color:white;
        color:#1e2853;
        border: 2px #1e2853 solid;
        height: 40px;
        width: 100%;
        font-size: 18px;
        font-weight: 800;
        position: relative;
        overflow: hidden;
    
        // @keyframes sheen {
        //   0% {
        //     transform: skewY(-45deg) translateX(0);
        //   }
        //   100% {
        //     transform: skewY(-45deg) translateX(12.5em);
        //   }
        // }
        // @media screen and (min-width: 992px) {
        //   &:before {  
        //     content: "";
        //     background-color: rgba(255,255,255,0.5);
        //     height: 100%;
        //     width: 3em;
        //     display: block;
        //     position: absolute;
        //     top: 0;
        //     left: -4.5em;
        //     transform: skewX(-45deg) translateX(0);
        //     transition: none;
        //   }
        // }
        &:before {
          content: "";
          position: absolute;
          display:$clickBtn;
          top: 0;
          left:0;
          width: 100%;
          height: 100%;
          background-color: red;
          background:linear-gradient(
            52deg,
            // $loading  0%,$loading 20%,
            // $loading2 20%,$loading2 45%,
            // $loading 45%,$loading 70%,
            // $loading2 70%,$loading2 95%,
            // $loading 95%,$loading 100%
            

            $loading  0%,$loading 15%,
            $loading2 15%,$loading2 30%,
            $loading 30%,$loading 45%,
            $loading2 45%,$loading2 60%,
            $loading 60%,$loading 75%,
            $loading2 75%,$loading2 90%,
            $loading 90%,$loading 100%
          );
          animation-name:click;
          animation: click 1s infinite linear;
          background-position:0 0;
      

          @keyframes click {
            0%{
              background-position:0 0;
            }
            100%{
              background-position:93.8px 0;
            }
          }
        }

        &:hover {
          background-color:#1e2853;
          color: white;
          cursor: pointer;

          // @media screen and (min-width: 992px) {
          //    &:before {
          //       transform: skewX(-45deg) translateX(21em);
          //       transition: all 0.5s ease-in-out;
          //     }
          // }
        
        }
      }
    }
   
  }
 
}
</style>