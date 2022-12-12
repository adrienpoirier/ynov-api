import Router from "@koa/router";
import * as tasksCtrl from "#components/tasks/tasks-controller.js"
import {isAuhtentificated, isAuthentificatedWithUser} from "../../middlewares/jwt-handler.js";

const tasksRouter = new Router();

// tasksRouter.use(["/", "/:id"], isAuhtentificated);

tasksRouter.get("/", isAuhtentificated, tasksCtrl.getAll);

// tasksRouter.get("/protected", isAuthentificatedWithUser,(ctx) => {
//     ctx.ok({message:"this route is protected", user: ctx.state.user})
// });

tasksRouter.get("/:id", isAuhtentificated, tasksCtrl.getOne);

tasksRouter.get('/lists/:listId', isAuhtentificated, tasksCtrl.getAllByListId)

tasksRouter.post("/", isAuhtentificated, tasksCtrl.create);

tasksRouter.put("/:id", isAuhtentificated, tasksCtrl.edit);

tasksRouter.delete("/:id", isAuhtentificated, tasksCtrl.remove);

export default tasksRouter;