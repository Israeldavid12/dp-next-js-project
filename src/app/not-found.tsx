import Image from "next/image";
import NotFound from '../../public/images/404.jpg'


export default function notFoundPage() {
    return (
        <div className="flex justify-center items-center w-full h-[100vh] ">

            <div className="grid justify-center gap-3 " >
                <Image className="w-48 h-48 ring-2 ring-700-blue" src={NotFound} alt="404 Not Found" />
                <a className="text-center bg-blue-500 text-white rounded-lg p-2 text-[11px] hover:bg-blue-400" href="/dashboard">Dashboard</a>
            </div>
        </div>
    )
}