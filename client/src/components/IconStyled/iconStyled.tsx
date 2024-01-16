import { type FC } from 'react'

interface propTypes {
	Icon: any
	handler?: () => any
	color?: string
}

const IconStyled: FC<propTypes> = ({ Icon, handler, color }) => (
	<div
		onClick={handler}
		className={`mx-1.5 flex items-center
		${handler ? 'hover:bg-gray-200' : ''}  bg-opacity-50 rounded-full p-1`}
	>
		<Icon width={20} color={color} />
	</div>
)

export default IconStyled
