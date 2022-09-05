import axios from 'axios';

// const apiAddress = 'http://192.168.1.3:8763';
// const apiAddress = 'http://127.0.0.1:5173';
const apiAddress ='http://192.168.1.3:8763';
//尚未判斷是本機還是正式機網址

const genSN = (sn => () => sn++)(0);

export function request(data:any) {
  return new Promise((resolve, reject) => {
    console.log(data);
    let now = new Date();
    let {method,path,values} = data;
    // const responseTypeObject:Object = responseType
    let responseTypeObject = 'json';
    let sn = genSN();
    let url = `${apiAddress}${path}`;
    let resuestProps = {
      method,
      url,
      data: values,
      responseTypeObject
    };
   
    console.warn(`[${sn}] ${now} Client.${method}(${url})`);
    console.log(url);
    console.log(resuestProps);
    
    
    axios(resuestProps)
      .then((response) => {
        let { data } = response;
        // let { beforeResolve, afterResolve } = middlewares;

        // console.warn(`[${sn}] response; status: ${status}`);
        console.warn(response);

        // data.requestTime = requestTime;

        // if (beforeResolve) { beforeResolve(resuestProps, response); }

        resolve(data);

        // if (afterResolve) { afterResolve(resuestProps, response); }
      })
      .catch(err => {
        console.error(`Error status: ${err.response ? err.response.status : void 0}`);
        console.error(err);
        reject(err);
      });
  });
}