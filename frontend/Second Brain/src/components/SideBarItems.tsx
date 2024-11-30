import { ReactElement } from "react"

export const SideBarItems = ({text, icon}:{text: string, icon: ReactElement}) => {
    return (
        <>
        <div className="flex flex-row items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md py-2 px-4">
        {icon}
        <span className="text-lg font-semibold text-gray-700">{text}</span>
        </div>
            
        </>
    )
}