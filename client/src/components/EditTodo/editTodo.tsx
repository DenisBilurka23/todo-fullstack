import { Switch } from '@headlessui/react'
import { type ChangeEvent, type Dispatch, type FC, type SetStateAction, useEffect, useState } from 'react'
import Modal from 'components/Modal/modal'
import { type Data } from '../../types/types'
import { updateTodo } from '../../api/api'

interface PropTypes {
	editItem: Data | null
	setModalOpen: Dispatch<SetStateAction<Data>>
	setData: Dispatch<SetStateAction<Data[]>>
}

const classNames: any = (...classes) => {
	return classes.filter(Boolean).join(' ')
}

const EditTodo: FC<PropTypes> = ({ editItem, setModalOpen, setData }) => {
	const [active, setActive] = useState<boolean | undefined>(editItem?.active)
	const [task, setTask] = useState<string | undefined>(editItem?.task)

	const handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void = e => {
		setTask(e.target.value)
	}

	useEffect(() => {
		if (editItem) {
			setActive(editItem.active)
			setTask(editItem.task)
		}
	}, [editItem])

	const handleEditTodo: () => Promise<any> = async () => {
		if (editItem) {
			const res = await updateTodo(editItem._id, { active, task })
			setData(prev => {
				const replaceItemIndex = prev.findIndex((item: Data) => item._id === res?._id)
				// @ts-expect-error
				return prev.toSpliced(replaceItemIndex, 1, res)
			})
		}
	}

	return (
		<Modal title="Add Todo" handler={handleEditTodo} isOpen={!!editItem} setIsOpen={setModalOpen}>
			<Switch.Group as="div" className="flex gap-x-4 sm:col-span-2 my-5">
				<div className="flex h-6 items-center">
					<Switch
						checked={!!active}
						onChange={setActive}
						className={classNames(
							!active ? 'bg-indigo-600' : 'bg-gray-200',
							'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						)}
					>
						<span
							aria-hidden="true"
							className={classNames(
								!active ? 'translate-x-3.5' : 'translate-x-0',
								'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
							)}
						/>
					</Switch>
				</div>
				<Switch.Label className="text-sm leading-6 text-gray-600">{active ? 'Active' : 'Done'} task</Switch.Label>
			</Switch.Group>
			<textarea
				value={task}
				onChange={handleInputChange}
				id="about"
				name="about"
				rows={3}
				className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			/>
		</Modal>
	)
}

export default EditTodo
