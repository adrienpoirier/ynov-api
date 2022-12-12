import Router from "@koa/router";
import * as listeCtrl from "#components/list/listes-controller.js"
import {isAuhtentificated} from "#middlewares/jwt-handler.js";

const listesRouter = new Router();

listesRouter.get("/", isAuhtentificated, listeCtrl.getAll);

listesRouter.get("/:id", isAuhtentificated, listeCtrl.getOne);

listesRouter.post("/", isAuhtentificated, listeCtrl.create);

listesRouter.put("/:id", isAuhtentificated, listeCtrl.edit);

listesRouter.delete("/:id", isAuhtentificated, listeCtrl.remove);

export default listesRouter;