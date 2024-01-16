import { type ReactNode } from 'react'

export interface Data {
	task: string
	active: boolean
	createdAt: number
	updatedAt: number
	_id: number
}

export interface Modal {
	isOpen: boolean
	setIsOpen: any
	title: string
	handler: () => Promise<any>
	children: ReactNode
}
