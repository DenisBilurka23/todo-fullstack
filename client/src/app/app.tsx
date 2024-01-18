import TodoList from 'components/TodoList/todoList'
import { type FC, useEffect, useState } from 'react'
import { getData } from '../api/api'
import { type Data } from '../types/types'
import Search from 'components/Search/search'
import AddTodo from 'components/AddTodo/addTodo'

const App: FC = () => {
	const [data, setData] = useState<Data[] | null>(null)

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			const res = await getData()
			setData(res)
		}
		void fetchData()
	}, [])

	return (
		<main className="container mx-auto border-2 px-7 py-4 mt-10 border-r-2 rounded-2xl">
			<div className="flex -mx-2">
				{/* @ts-expect-error */}
				<Search data={data} setData={setData} />
				<AddTodo setData={setData} />
			</div>
			<TodoList todoItems={data} setData={setData} />
		</main>
	)
}

export default App
