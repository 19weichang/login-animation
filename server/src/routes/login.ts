// const OneOf = require('../utils/oneOf');

const UserInfo = {
  account: '090001',
  password: 'a12345'
};

// function Verify({ text_Id_value, text_Password_value }) {
//   let { account, password } = UserInfo;

//   return text_Id_value === account && text_Password_value === password;
// };

// const Status = {
//   isLogin: !false
// };

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
     
      // let isServerError = Math.random() > (0 || 0.96);
     
      // let sysCode = (isServerError
      //   ? OneOf([9, 15, 500])
      //   : Verify(req.body) ? 0 : 3
      // );
      // // let sysCode = 0
      
      // let { responseMessage } = Responses.find(response => {
      //   return response.sysCode === sysCode;
      // });
      // Verify(req.body)

      let { sysCode, responseMessage } =  {
        sysCode: 0,
        responseMessage: 'DB query success!'
      };
      let responseData:Object
      if (sysCode ===0 ) {
        responseData = {  
          "playId": 1,
          "kioskId": 50,
          "entityId": 'kkk',
        }
        console.log('responseData',responseData);
      }
    
      
      // Status.isLogin = sysCode === 0;
      setTimeout(() => {
        res.json({
          sysCode,
          detail: {
            responseMessage,
            responseData
          }
        });
      }, Math.random() * 3 * 1000);
    });
  }
}