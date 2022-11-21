import Router from '@koa/router'

const exemples = new Router()
const todos = [
    {
        id: 1,
        title: 'test'
    },
    {
        id: 2,
        title: 'test 2'
    }
]


exemples.get('/', (ctx, next) => {
    ctx.body = todos
})

exemples.get('', '/todo/:id', (ctx, next) => {
    const task = todos.find(x => parseInt(ctx.params.id) === x.id )
    ctx.body = task
});

exemples.post('/', (ctx, next) => {
    const newtask = {
        id: todos.length +1,
        title: ctx.request.body.title
    }
    todos.push(newtask)
    ctx.status = 200
    ctx.body = todos
})

exemples.put('/:id', (ctx, next) => {
    const task = todos.find(t => parseInt(ctx.params.id) === t.id)
    task.title = ctx.request.body.title
    todos.push(newtask)
    
})

exemples.delete('/:id', (ctx, next) => {
    const updateTodos = todos.filter(t => parseInt(ctx.params.id) !== t.id)
    ctx.body = updateTodos
    
})

export default exemples