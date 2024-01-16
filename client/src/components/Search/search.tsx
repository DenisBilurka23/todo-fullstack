import { type ChangeEventHandler, type Dispatch, type FC, type SetStateAction, useMemo, useState } from 'react'
import { getData } from '../../api/api'
import { type Data } from '../../types/types'

const Search: FC<{ setData: Dispatch<SetStateAction<Data[]>> }> = ({ setData }) => {
	const [searchValue, setSearchValue] = useState<string>('')

	const debounce: any = (func, delay: number) => {
		let timeoutId: number

		return function (...args) {
			clearTimeout(timeoutId)

			timeoutId = setTimeout(() => {
				func.apply(this, args)
			}, delay)
		}
	}

	const debouncedApiRequest = useMemo(
		() =>
			debounce(async (search: string) => {
				const res = await getData(search)
				if (res) {
					setData(res)
				}
			}, 300),
		[]
	)

	const handleSearch: ChangeEventHandler<HTMLInputElement> = e => {
		setSearchValue(e.target.value)
		debouncedApiRequest(e.target.value)
	}

	return (
		<input
			value={searchValue}
			onChange={handleSearch}
			placeholder="Search..."
			type="text"
			className="block mx-2 w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
		/>
	)
}

export default Search
