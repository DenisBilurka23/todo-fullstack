import { Schema, model } from 'mongoose'

const todoSchema = new Schema({
	task: { type: String, required: true, minLength: 1, maxLength: 30 },
	active: { type: Boolean, default: true },
	createdAt: { type: Number, default: () => Date.now() },
	updatedAt: { type: Number, default: () => Date.now() }
})

export default model('Todo', todoSchema)
