'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import PermissionSwitches from '../_components/GrantPermission'
import { Loader2Icon, Save } from "lucide-react"
import { toast } from 'react-toastify';




export default function PermissionsPanel() {
    const [permissions, setPermissions] = useState({})
    const [active, setActiveAdmin] = useState(false)
    const [count, setCount] = useState(0)
    const [output, setOutput] = useState('')
    const [email, setEmailAdmin] = useState('')
    const [admin, setAdminData] = useState('')
    const [currentPermissions, setCurrentPermissions] = useState({});
    const [save, setSave] = useState(false)


    useEffect(() => {
        async function getAdminData() {
            try {
                const token = localStorage.getItem('sessionToken')

                const req = await axios.post('http://localhost:3041/api/admin', {
                    reqType: 'get/admin',
                    email_admin: email
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    });

                setAdminData(req.data)
                setActiveAdmin(req?.data?.active)
                setCurrentPermissions(req?.data?.permissions)
            } catch (err) {
                setAdminData('')
                setOutput(err.message)
            }
        }

        if (count !== 0) getAdminData();

    }, [count]);


    function handleSaveRoles() {
        console.log(active)
        console.log(currentPermissions)
        const token = localStorage.getItem('sessionToken')

        axios.post('http://localhost:3041/api/admin', {
            reqType: 'update/admin',
            email_admin: email,
            data: {
                active,
                ...currentPermissions
            }
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then(response  => {
              toast.success(response.data.message)
            })
            .catch(err => {
               console.log(err)
               toast.error(err.message)
            });


    }






    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4">
            <h2 className="text-lg font-semibold">Gerir administradores</h2>
            <div className='flex justify-between w-full' >
                <Button onClick={() => setCount(count + 1)} >
                    <p>Buscar administrador</p>
                </Button>

                <Button variant="outline" onClick={handleSaveRoles} >
                    {save && <Loader2Icon className="animate-spin" />}
                    <p>Salvar alteracoes</p>
                </Button>

            </div>
            <input
                type="text"
                onChange={e => setEmailAdmin(e.target.value)}
                placeholder="insira o email do administrados"
                className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className='text-red-600 text-center' >{output}</p>

            <div>
                <p>Nome: <strong>{admin?.name || 'n/a'}</strong> </p>
                <p>Email: <strong>{admin?.email || 'n/a'}</strong></p>
                <p>ID: <strong>{admin?.id || 'n/a'}</strong></p>
                <p>Estado: <strong>{admin?.active ? 'Activo' : 'Desativado'}</strong> </p>
                <p>Data de criacao: <strong>{(admin?.created_at || 'n/a').split('T')[0]}</strong> </p>
            </div>

            <div

                className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-md border"
            >
                <span className="text-sm inline-flex gap-2">Estado: {active ? (<p className='text-green-600' >Activo</p>) : (<p className='text-red-600' >Desativado</p>)} </span>


                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={admin?.active || false}
                        onChange={() => setActiveAdmin(!active)}
                        className="sr-only"
                    />
                    <div
                        className={`w-10 h-5 rounded-full transition ${active ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                    >
                        <div
                            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${active ? 'translate-x-5' : ''
                                }`}
                        ></div>
                    </div>
                </label>
            </div>

            <hr className='text-[silver]' />
            <PermissionSwitches
                initialPermissions={currentPermissions}
                onChange={setCurrentPermissions} />


        </div>
    )
}
