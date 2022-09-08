import { request } from "./request";

export function getlogin (values:any) {
  // let apiPath:String = path
  // let path:string = '/login.do'
  let props = {
    method: 'post',
    values,
    path:'/login.do'
  };
  console.log('props',props)
  return request(props);
};

export function getlogout () {
 let props = {
   method:'get',
   path:'/logout.do'
 }
 return request(props);
}

export default {
  getlogin,
  getlogout
}