
import { defineStore } from 'pinia'
import api from '../api/user'

export const loginStore = defineStore({
  id:'user',//必填 唯一
  state: () =>{
   return{
    loginData:'welcome'
   }
  },
  actions: {
    fetchLogin (values:any) {
      return new Promise ((resolve, reject) => {
        console.log(values);
        
        api.getlogin(values)
          .then((data:any)=>{
            console.log(data);
            let {sysCode, detail}  = data;
            switch (sysCode) {
              case 0: {
                resolve(data);
                break;
              }
              default: {
                reject({ sysCode, message: detail.responseMessage });
              }
            }
          })
          .catch((err)=>{
            reject(err);
          })
      })
    }
  }
})