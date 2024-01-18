import axios from 'axios'
import { type Data } from '../types/types'

const API_URL = import.meta.env.VITE_API_BASE_URL

export const getData: (task?: string) => Promise<Data[]> = async task => {
	try {
		const res = await axios.get(`${API_URL}/todo${task ? `/?task=${task}` : ''}`)
		return res.data
	} catch (e) {
		console.log(e)
	}
}

export const addTodo: (task: string) => Promise<Data> = async task => {
	try {
		const res = await axios.post(`${API_URL}/todo`, { task })
		return res.data
	} catch (e) {
		console.log(e)
	}
}

export const deleteTodo: (id: number) => Promise<Data[]> = async id => {
	try {
		const res = await axios.delete(`${API_URL}/todo/${id}`)
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
		const res = await axios.patch(`${API_URL}/todo/${id}`, payload)
		return res.data
	} catch (e) {
		console.log(e)
	}
}
