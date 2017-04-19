const gateway=require('../ab-ble-gateway-sdk.js');


const http = require('http');
const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  ctx.body = 'Hello World';
});
app.

app.listen(8080);
