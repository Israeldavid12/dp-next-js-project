'use client'
import { useEffect, useState, Suspense } from "react"
import { useRouter, usePathname } from 'next/navigation';
import styles from './layout.module.css'
import { Loading } from "../dashboard/_components/LoadindAnim";
import useRoles from '../hooks/useRoles'
import SheetDemo from './_components/MobileBar'
import logo from '../../../public/images/logo.png'
import avatar_icon from '../../../public/images/admin_avatar_male.png'
import Image from "next/image";

export default function Layout({ children }) {
    const pathname = usePathname();
    const roles = useRoles()
   

    if (!roles) {
        return (
            <div className='flex justify-center items-center h-screen' >
                <Loading />
            </div>
        )
    }


    return (
        <>
            <div className={styles.layout} >


                <div className={`${styles.header}  hidden `} >
                    <div className="flex justify-between items-center w-full" >
                        <div className="flex justify-start items-center gap-1" >
                            <Image src={logo} width={40} height={20} />
                            <p className='text-[#062757] font-[600] text-[21px] hidden sm:block'>Drop Payments Admin Painel</p>

                            <p className="ml-3" >Estado: <span className="text-[#17C964] font-bold" >Activo</span></p>

                        </div>

                        <div className="flex justify-start items-center gap-15" >
                            <a href="/admin" className="hidden sm:block" >
                                <p className={`font-bold text-[16px] ${pathname === '/admin' ? 'border-b-blue-800' : ''} border-b-1 cursor-pointer`} >Dasboard</p>
                            </a>

                            <a href="/admin/products" className="hidden sm:block"> <p className={`font-bold text-[16px] ${pathname === '/admin/products' ? 'border-b-blue-800' : ''} border-b-1 cursor-pointer`} >Produtos</p></a>

                            <div className="flex justify-start items-center gap-2" >


                                <div class="relative group inline-block">
                                    <a href="#" class="cursor-pointer flex justify-start items-center gap-2">
                                        <Image src={avatar_icon} width={40} height={40} className="rounded-full shadow-lg" alt="avatar" />
                                        {roles && (<p className="text-[16px] text-[#001737] cursor-pointer" > {roles?.name}</p>)}
                                    </a>

                                    <div
                                        class="absolute left-0 mt-2 w-40 bg-white rounded shadow-lg opacity-0 scale-95 
                                         group-hover:opacity-100 group-hover:scale-100 group-hover:visible 
                                            invisible transform transition-all duration-200 origin-top z-10 text-[13px]"
                                    >
                                        <a href="#" class="block px-5 py-3 hover:bg-gray-100">
                                            <i className="bi bi-house"></i>  Dashboard</a>

                                        <a href="#" class="block px-5 py-3 hover:bg-gray-100"><i class="bi bi-box "></i> Produtos</a>

                                        <a href="#" class="block px-5 py-3 hover:bg-gray-100"><i class="bi bi-people"></i>  Usuarios</a>

                                        <a href="/admin/auth/logout" class="block px-5 py-3 hover:bg-gray-100"><i class="bi bi-box-arrow-right"></i> Sair</a>

                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="block sm:hidden" >
                            <SheetDemo />
                        </div>
                    </div>
                </div>

                <div className={styles.sidebar} >
                    <div className="flex justify-center items-center" >

                    </div>
                    <div className='grid gap-3' >
                        {roles?.level === 'superadmin' && (
                            <a href="/admin" className={`flex justify-start items-center gap-4   text-[13px] ${pathname === "/admin" ? styles.activeSideItem : ""}`}> <i className="bi bi-house text-[18px]"></i> Inicio</a>
                        )}

                        <a href="/admin/saques" className={`flex justify-start items-center gap-4 text-[13px] ${pathname === "/admin/saques" ? styles.activeSideItem : ""}`}>
                            <i class="bi bi-cash text-[18px]"></i> Saques</a>

                        <a href="/admin/products" className={`flex justify-start items-center gap-4 text-[13px] ${pathname === "/admin/products" ? styles.activeSideItem : ""}`}> <i class="bi bi-box text-[18px]"></i>  Aprovar produtos</a>


                        {roles?.level === 'superadmin' && (
                            <a href="/admin/permissions" className={`flex justify-start items-center gap-4 text-[13px] ${pathname === "/admin/permissions" ? styles.activeSideItem : ""}`}> <i className="bi bi-person-circle text-[18px]"></i>  Conceder permissoes</a>
                        )}

                        <a href="/admin/users" className={`flex justify-start items-center gap-4 text-[13px] ${pathname === "/admin/users" ? styles.activeSideItem : ""}`}> <i className="bi bi-people text-[18px]"></i> Usuarios</a>










                    </div>

                </div>

                <div className={styles.content} >

                    <Suspense fallback={<Loading />}>
                        {children}
                        {/* {roles.admin} */}
                    </Suspense>
                </div>

            </div>
        </>
    )
}