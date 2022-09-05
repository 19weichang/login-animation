const utils = {
  setCookie (name:string, value:any, days:number) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires" + d.toUTCString();
    console.log(expires);
    
    document.cookie = name + "=" + value + ";" + expires
  },
  clearCookie (name:string) {
    const d = new Date();
    d.setTime(-1);//將時間變更成過期時間
    const expires = "expires" + d.toUTCString();
    document.cookie = name + "='';" + expires;
  }
}

export default utils