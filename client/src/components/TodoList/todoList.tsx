import TodoItem from 'components/TodoItem/todoItem'
import { type Data } from '../../types/types'
import { type Dispatch, type FC, type SetStateAction, useState } from 'react'
import EditTodo from 'components/EditTodo/editTodo'

interface PropTypes {
	todoItems: Data[] | null
	setData: Dispatch<SetStateAction<Data[]>>
}

const TodoList: FC<PropTypes> = ({ todoItems, setData }) => {
	const [editItem, setEditItem] = useState<Data | null>(null)

	return (
		<>
			<ul role="list" className="divide-y divide-gray-100">
				{todoItems?.map(item => <TodoItem setEditItem={setEditItem} key={item._id} data={item} setData={setData} />)}
			</ul>
			<EditTodo setData={setData} editItem={editItem} setModalOpen={setEditItem} />
		</>
	)
}

export default TodoList
