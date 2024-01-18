import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import IconStyled from 'components/IconStyled/iconStyled'
import { type Data } from '../../types/types'
import { type Dispatch, type FC, type SetStateAction } from 'react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { deleteTodo, updateTodo } from '../../api/api'

interface PropTypes {
	data: Data
	setData: Dispatch<SetStateAction<Data[] | null>>
	setEditItem: Dispatch<SetStateAction<Data>>
}

const TodoItem: FC<PropTypes> = ({ data, setData, setEditItem }) => {
	const handleOnChange: (data: Data) => () => void = data => () => {
		setEditItem(data)
	}
	const handleOnDelete: (id: number) => () => Promise<void> = id => async () => {
		const res = await deleteTodo(id)
		if (res) {
			setData((prev: Data[]) => prev?.filter(item => item?._id !== id))
		}
	}

	const handleEditTodo: (editItem: Data) => () => Promise<any> = editItem => async () => {
		const res = await updateTodo(editItem._id, { active: !editItem.active })
		setData(prev => {
			const replaceItemIndex = prev?.findIndex((item: Data) => item._id === res?._id)
			// @ts-expect-error
			return prev.toSpliced(replaceItemIndex, 1, res)
		})
	}

	return (
		<li className={`flex justify-between gap-x-6 py-4 relative cursor-pointer ${!data.active ? 'line-through' : ''}`}>
			<div className="flex min-w-0 gap-x-4 grow" onClick={handleEditTodo(data)}>
				<div className="min-w-0 flex-auto flex">
					{!data.active && (
						<div className="-ml-5">
							<IconStyled color="green" Icon={CheckIcon} />
						</div>
					)}
					<p className="text-sm font-semibold leading-6 text-gray-900">{data.task}</p>
				</div>
			</div>
			<div className="shrink-0 flex">
				<IconStyled handler={handleOnChange(data)} Icon={PencilIcon} />
				<IconStyled handler={handleOnDelete(data._id)} Icon={TrashIcon} />
			</div>
		</li>
	)
}

export default TodoItem
