import Router from '@koa/router'
import * as TaskController from '#components/task/task-controller.js'

const tasks = new Router()

tasks.get('/', TaskController.index);

tasks.get("/:id", TaskController.getOne);

tasks.post('/', TaskController.create)

task.put("/:id", TaskController.edit);

tasks.delete('/:id', TaskController.deleteOne)

export default tasks