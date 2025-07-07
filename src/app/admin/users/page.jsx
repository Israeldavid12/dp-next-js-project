'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { useLoading } from "@/contexts/LoadingContext";

const ListUsers = ({ users }) => {
    const [res_limit, setResLimit] = useState(100)
    const [limit, setLimit] = useState(0)

    return (
        <div>
            <div className="overflow-x-auto" >
                <table className="min-w-full divide-y divide-gray-200 text-sm text-left text-[14px]">
                    <thead className="bg-white ">
                        <tr>
                            <th className="px-4 py-3 text-gray-600 font-semibold ">User Name</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">E-mail</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">UID do usuário</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Criação</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Último login</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Provedor</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Acoes</th>

                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {[...users].reverse().slice(0, res_limit).map((user) => (
                            <tr key={user?.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2">{user?.name || 'N/A'}</td>
                                <td className="px-4 py-2">{user?.email || 'N/A'}</td>
                                <td className="px-4 py-2">{user?.uid || 'N/A'}</td>
                                <td className="px-4 py-2">{user?.created_at || 'N/A'}</td>
                                <td className="px-4 py-2">{user?.last_login || 'N/A'}</td>
                                <td className="px-4 py-2">Email</td>
                                <td className="px-4 py-2"><i class="bi bi-three-dots"></i></td>

                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </div>
    )
}



const Users = () => {
    const [users, setUsers] = useState(null)
    const { setIsLoading } = useLoading();


    useEffect(() => {

        async function handleUsers() {
            try {
                const response = await axios.post("http://localhost:3050/api/user", {
                    reqType: "get/users"
                });

                setUsers(response?.data?.users)
                return true

            } catch (err) {
                console.log(err)

            }
        }

        if (!users) {
            handleUsers()
        }

    })

    // if (!users) {
    //     setIsLoading(true)
    // }

    return (
        <div>
            {users && <ListUsers users={users} />}
        </div>
    )
}

export default Users;