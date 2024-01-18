import { PlusIcon } from '@heroicons/react/24/outline'
import { type ChangeEvent, type Dispatch, type FC, type SetStateAction, useState } from 'react'
import { addTodo } from '../../api/api'
import Modal from 'components/Modal/modal'
import { type Data } from '../../types/types'

const AddTodo: FC<{ setData: Dispatch<SetStateAction<Data[]>> }> = ({ setData }) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false)
	const [value, setValue] = useState<string>('')

	const toggleModalOpen = (): void => {
		setModalOpen(prevState => !prevState)
	}

	const handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void = e => {
		setValue(e.target.value)
	}

	const handleAddTodo = async (): Promise<void> => {
		const res: Data = await addTodo(value)
		setValue('')
		setData((prev: Data[]) => [...prev, res])
	}

	return (
		<>
			<button
				onClick={toggleModalOpen}
				type="button"
				className="mx-2 flex items-center rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>
				<PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
				Add
			</button>
			<Modal title="Add Todo" handler={handleAddTodo} isOpen={modalOpen} setIsOpen={setModalOpen}>
				<textarea
					value={value}
					onChange={handleInputChange}
					id="about"
					name="about"
					rows={3}
					className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				/>
			</Modal>
		</>
	)
}

export default AddTodo
