'use client'
import axios from "axios";
import { useState, useEffect } from "react";
const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;



const LoadEnv = ({ env }) => {
    switch (env) {
        case 'live':
            return (
                <h1 className="font-[600] text-[#1E2939]" >
                    Ambiente:  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                        Producao
                    </span>
                </h1>
            )
        case 'sandbox':
            return (
                <h1 className="font-[600] text-[#1E2939]" >
                    Ambiente:  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                        Teste
                    </span>
                </h1>
            )

        default:
            return (
                <div>
                    <h1 className="font-[600] text-[#1E2939]" >
                        Ambiente:  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                            N/A
                        </span>
                    </h1>
                </div>
            )
            break;
    }
}



const Profile = () => {
    const [is_toggle, setToggle] = useState(true)
    const [data, setData] = useState([])
    const [toggles, setToggles] = useState({});
    const token = localStorage.getItem('sessionToken')

    const handleToggle = (index) => {
        setToggles((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleData = async () => {
        try {
            const request = await axios.get(apiUrl + '/api/user/api-credentials', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setData(request?.data?.credentials)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        handleData()
    }, [])


    return (
        <div className="sm:flex grid gap-6" >

            <div className="grid gap-5" >
                <h1 className="text-[#1E2939] font-[800]" >
                    Detalhes da API
                </h1>

                {
                    data.map((credential, key) => (
                        <div key={key} className="bg-white grid gap-3 rounded-md p-4">
                            <LoadEnv env={credential?.environment} />

                            <p className="text-[14px]">
                                <span className="font-[500] " >Client ID:</span> {credential?.client_id}
                            </p>
                            <p className="text-[14px] flex gap-3">
                                <span className="font-[500]"> Client Secret:</span> <span>{toggles[key] ? (<spa>******************</spa>) : (<p>{credential?.client_secret}</p>)}   </span>

                                <i
                                    className={`bi ${!toggles[key] ? "bi-eye-slash" : "bi-eye"}`}
                                    onClick={() => handleToggle(key)}
                                    style={{ cursor: "pointer" }}
                                ></i>
                            </p>
                            <p className="text-[11px]" >Mantenha esta chave em segredo</p>

                        </div>
                    ))
                }



            </div>

            <div className="grid gap-5 self-start">
                <h1 className="text-[#1E2939] font-[800]">
                    Dados pessoais
                </h1>

                <div className="bg-white grid gap-3 rounded-md p-4 justify-self-start  self-start">
                    <div>
                        <p className="text-black/60 text-[12px]" >Nome</p>
                        <input className="ring ring-[silver] rounded py-1 px-2 text-[13px]" type="text" value={'ISRAEL DAVIDE'} />
                    </div>
                    <div>
                        <p className="text-black/60 text-[12px]" >Email</p>
                        <input className="ring ring-[silver] rounded py-1 px-2 text-[13px]" type="text" value={'israeldavide35@gmail.com'} />
                    </div>
                    <div>
                        <p className="text-black/60 text-[12px]" >Celular</p>
                        <input className="ring ring-[silver] rounded py-1 px-2 text-[13px]" type="text" value={'8* *** 1147'} />
                    </div>
                </div>


            </div>


        </div>
    )
}


export default Profile;