import TodoSchema from '../schemas/todoSchema.js'

const todoServices = {
	async get(task) {
		const regex = new RegExp(`^${task}`, 'i')
		const todoItems = await TodoSchema.find(task ? { task: { $regex: regex } } : null)
		return todoItems
	},
	async getById(id) {
		const todoItem = await TodoSchema.findById(id)
		return todoItem
	},
	async update(id, { task, active }) {
		const todoItem = await TodoSchema.findById(id)
		todoItem.active = active
		if (task) {
			todoItem.task = task
		}
		return todoItem.save()
	},
	async create(task) {
		const todoItem = new TodoSchema({ task })
		const res = await todoItem.save()
		return res
	},
	async delete(_id) {
		const todo = await TodoSchema.deleteOne({ _id })
		return todo
	}
}

export default todoServices
