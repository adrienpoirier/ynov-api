import Router from "@koa/router";
import tasksRoutes from "#components/tasks/tasks-routes.js";
import listesRoutes from "#components/list/listes-routes.js";
import userRoutes from "#components/users/users-routes.js";

const API_V1_ROUTER = new Router({prefix: "/api/v1"});

API_V1_ROUTER.use("/tasks", tasksRoutes.routes(), tasksRoutes.allowedMethods());
API_V1_ROUTER.use("/listes", listesRoutes.routes(), listesRoutes.allowedMethods());
API_V1_ROUTER.use("/users", userRoutes.routes(), userRoutes.allowedMethods());

export { API_V1_ROUTER }