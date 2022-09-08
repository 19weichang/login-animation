// const OneOf = require('../utils/oneOf');

const UserInfo = {
  account: '090001',
  password: 'a12345'
};

function Verify(values:any) {
  let { account, password } = UserInfo;
  let {text_Id_value,text_Password_value} = values 

  return text_Id_value === account && text_Password_value === password;
};

// const Status = {
//   isLogin: !false
// };

function oneOf(array:any) {
  return array[Math.random() * array.length >> 0];
};

const Responses = [
  {
    sysCode: 0,
    responseMessage: 'Success'
  },
  {
    sysCode: 3,
    responseMessage: 'Player not found'
  },
  {
    sysCode: 9,
    responseMessage: 'System Maintain'
  },
  {
    sysCode: 15,
    responseMessage: 'This account has been frozen'
  },
  {
    sysCode: 500,
    responseMessage: 'Server internal error'
  },
];

module.exports = {
  install(app:any) { 
    app.post('/login.do',(req:any, res:any) => {
     console.log('server',req.body);
     
      // let pass:boolean = Verify(req.body)
      // console.log('canLoign?',pass);
      
      // let { sysCode, responseMessage } =  {
      //   sysCode: 0,
      //   responseMessage: "登入成功"
      // };

      // let responseData:Object
      // if (sysCode ===0 ) {
      //   responseData = {  
      //     "playId": 1,
      //     "kioskId": 50,
      //     "entityId": 'kkk',
      //   }
      //   console.log('responseData',responseData);
      // }

      // let { sysCode, responseMessage } = {
      //   sysCode: 128,
      //   responseMessage: 'This is the 128 error'
      // };

      let isServerError = Math.random() > (0 || 0.96);
      let sysCode = (isServerError
        ? oneOf(['9', '15', '500'])
        : Verify(req.body) ? 0 : 3
      );
      let message  = Responses.find(response => {
        return response.sysCode === sysCode;
      });
      let responseMessage = message;

      // Status.isLogin = sysCode === 0;
      
      setTimeout(() => {
        res.json({
          sysCode,
          detail: {
            responseMessage,
            // responseData
          }
        });
      }, Math.random() * 3 * 1000);
    });
    app.get('/logout.do',(req:any,res:any) => {
      console.log('logout',req.body);
      let isServerError = Math.random() < (0 || 0.1);
      // let isServerError = true;
      let sysCode = (isServerError
        ? (Math.random() < 0.75 ? 9 : 500)
        : 0
      );
      let message = Responses.find(response => {
        return response.sysCode === sysCode;
      });
      let responseMessage = message;
      console.log('isServerError',isServerError,'sysCode',sysCode,responseMessage);
      
      setTimeout(() => {
        res.json({
          sysCode,
          detail: {
            responseMessage,
            // responseData
          }
        });
      }, Math.random() * 3 * 1000);
    })
  }
}