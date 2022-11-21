import Router from '@koa/router'
import * as ExempleController from '#components/exemple/exemple-controller.js'

const exemples = new Router()

exemples.get('/', ExempleController.index)

exemples.get('/', (ctx, next) => {
    ctx.body = todos
})

exemples.get('/:id', (ctx, next) => {
    
});

exemples.post('/', ExempleController.create)


exemples.put('/:id', (ctx, next) => {
    const task = todos.find(t => parseInt(ctx.params.id) === t.id)
    task.title = ctx.request.body.title
    todos.push(newtask)
    
})

exemples.delete('/:id', ExempleController.deleteOne)

export default exemples