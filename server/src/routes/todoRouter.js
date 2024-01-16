import { Router } from 'express'
import todoControllers from '../controllers/todoControllers.js'

const todoRouter = Router()

todoRouter.get('/', todoControllers.getTodoItems)
todoRouter.get('/:todoId', todoControllers.getTodoItem)
todoRouter.patch('/:todoId', todoControllers.updateTodoItem)
todoRouter.delete('/:todoId', todoControllers.deleteTodoItem)
todoRouter.post('/', todoControllers.createTodoItem)

export default todoRouter
