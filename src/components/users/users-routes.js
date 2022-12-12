import Router from "@koa/router";
import * as UsersCtrl from "#components/users/users-controller.js";
import {isAuthentificatedWithUser} from "#middlewares/jwt-handler.js";

const UsersRouter = new Router();

UsersRouter.post("/register", UsersCtrl.register);
UsersRouter.post("/login", UsersCtrl.login);
UsersRouter.get("/profile", isAuthentificatedWithUser, UsersCtrl.profile)
UsersRouter.post("/profile", isAuthentificatedWithUser, UsersCtrl.editProfile)

export default UsersRouter;