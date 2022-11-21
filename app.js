import '#config/database.js'
import Koa from 'koa'
import Exemple from '#components/exemple/exemple-model.js'
import Task from '#components/task/task-model.js'
import respond from 'koa-respond'
import bodyParser from 'koa-bodyparser'
import { API_V1_ROUTER } from '#routes/index.js'

const app = new Koa()


app
.use(bodyParser())
.use(respond())
.use(API_V1_ROUTER.routes())
.use(API_V1_ROUTER.allowedMethods())

app.listen(process.env.PORT, () => console.log("server running on " + process.env.PORT));