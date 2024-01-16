import todoServices from '../services/todoServices.js'

const todoControllers = {
	async getTodoItems(req, res) {
		try {
			const task = req.query.task
			const data = await todoServices.get(task)
			res.json(data)
		} catch (e) {
			console.log('error: ', e)
			res.sendStatus(500)
		}
	},
	async getTodoItem(req, res) {
		try {
			const todoId = req.params.todoId
			const data = await todoServices.getById(todoId)
			res.json(data)
		} catch (e) {
			console.log('error: ', e)
			res.sendStatus(500)
		}
	},
	async updateTodoItem(req, res) {
		try {
			const todoId = req.params.todoId
			const body = req.body
			const data = await todoServices.update(todoId, body)
			res.json(data)
		} catch (e) {
			console.log('error: ', e)
			res.status(400).json(e)
		}
	},
	async createTodoItem(req, res) {
		try {
			const data = await todoServices.create(req.body.task)
			res.json(data)
		} catch (e) {
			console.log('error: ', e)
			res.status(400).json(e)
		}
	},
	async deleteTodoItem(req, res) {
		try {
			const todoId = req.params.todoId
			const data = await todoServices.delete(todoId)
			res.json(data)
		} catch (e) {
			console.log('error: ', e)
			res.status(400).json(e)
		}
	}
}

export default todoControllers
