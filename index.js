const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const fetch = require("node-fetch");

const koaRouter = require("koa-router");
const app = new koa();
app.use(bodyParser());

const router = new koaRouter();

const sendMessage = async (message) => {
  fetch(
    "https://hooks.slack.com/services/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",
    { method: "POST", body: JSON.stringify(message) }
  )
    .then((res) => console.log(res))
    .catch((err) => console.log(err, "err"));
};

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
  const mes = { text: message };
  sendMessage(mes);
  ctx.body = "Ok";
});

router.post("/journeyData", (ctx) => {
  const body = ctx.request.body;
  // here we go
  const message = `Journey is completed by a new person:
${JSON.stringify(body).slice(1, -1).split(",").join("\n")}`;
  console.log(message);
  const mes = { text: message };
  sendMessage(mes);
  ctx.body = "Ok";
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(1234, () => console.log("running on port 1234"));
