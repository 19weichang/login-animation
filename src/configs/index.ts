const flavor = import.meta.env.MODE

const production = process.env.NODE_ENV === 'production';
console.log('MODE.flavor',flavor,production);
const version = {
  test: '0.0207',
  public: 0.0207, // should be a Number
}[production ? 'public' : 'test'];

console.log(`version: ${flavor}_${version}(production: ${production})`);


// console.log('version:', version);
const kioskRouter = {
  serve: {
    version: version,
    urlName: 'cdnfilelib.u-show777.online',
  },
}

export default {
  production,
  flavor,
  version,
  kioskRouter
};