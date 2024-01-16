import axios from 'axios'
import { type Data } from '../types/types'

export const getData: (task?: string) => Promise<Data[]> = async task => {
	try {
		const res = await axios.get(`http://localhost:8000/todo${task ? `/?task=${task}` : ''}`)
		return res.data
	} catch (e) {
		console.log(e)
	}
}

export const addTodo: (task: string) => Promise<Data> = async task => {
	try {
		const res = await axios.post('http://localhost:8000/todo', { task })
		return res.data
	} catch (e) {
		console.log(e)
	}
}

export const deleteTodo: (id: number) => Promise<Data[]> = async id => {
	try {
		const res = await axios.delete(`http://localhost:8000/todo/${id}`)
		return res.data
	} catch (e) {
		console.log(e)
	}
}

export const updateTodo: (id: number, payload: { task?: string; active?: boolean }) => Promise<Data> = async (
	id,
	payload
) => {
	try {
		const res = await axios.patch(`http://localhost:8000/todo/${id}`, payload)
		return res.data
	} catch (e) {
		console.log(e)
	}
}
