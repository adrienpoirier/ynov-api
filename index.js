import Koa from "koa";
import respond from "koa-respond";
import bodyParser from "koa-bodyparser";
import {API_V1_ROUTER} from "#routes/index.js";
import "#config/database.js";
import "#config/maildev.js";

const app = new Koa();
app
    .use(bodyParser())
    .use(respond())
    .use(API_V1_ROUTER.routes())
    .use(API_V1_ROUTER.allowedMethods())

app.listen(process.env.PORT, () => console.log(`server running on http://localhost:${process.env.PORT}`))

//TODO:
// transform all find by find One