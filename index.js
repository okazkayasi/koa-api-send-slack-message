const koa = require("koa");
const bodyParser = require("koa-bodyparser");

const koaRouter = require("koa-router");
const app = new koa();
app.use(bodyParser());

const router = new koaRouter();

router.get("/", (ctx) => {
  ctx.body = "Hello World!";
});

router.post("/formdata", (ctx) => {
  const body = ctx.request.body;
  // we use the data inside body to send the message
  console.log(body, "formdata");
  const message = `Contact form is submitted by a new person:
${JSON.stringify(body).slice(1, -1).split(",").join("\n")}`;

  // this message is to be sent
  console.log(message);
});

router.post("/journeyData", (ctx) => {
  const body = ctx.request.body;
  // here we go
  const message = `Contact form is submitted by a new person:
${JSON.stringify(body).slice(1, -1).split(",").join("\n")}`;
  console.log(message);
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(1234, () => console.log("running on port 1234"));
