"use client"
import styles from './layout.module.css';
import logo from '../../../public/images/logo.png'
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { Loading } from './_components/LoadindAnim';
import UserModal from './_components/UserInfoModal'
import { Suspense, useRef, useState, useEffect } from 'react';
import MobileMenu from './_components/MobileMenu';
import axios from 'axios';
import useUserId from '../hooks/useUserId'
const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;




export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const [user, setUser] = useState(null);
    const isAuthenticated = useUserId();
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        if (isAuthenticated) {
            const token = localStorage.getItem('sessionToken')
            axios.get(apiUrl+"/api/user/personal/data", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    setUser(res?.data?.user);

                })
                .catch((err) => {
                   
                });
        }
    }, [isAuthenticated]);

    if (!user) return <Loading />




    return (
        <div>

            <div className={styles.layout} >
                <div className={styles.header} >
                    <div className='flex justify-center items-center' >
                        {/* <i className="bi bi-list text-[27px]"></i> */}
                        <MobileMenu />
                        <Image className='w-10 rounded-full' src={logo} alt="logo" />
                        <p className='text-[#062757] font-[800] text-[21px] hidden sm:block' >ROP PAY </p>
                    </div>
                    <div className='flex gap-3 text-[25px]' >
                        <a href="/dashboard/notifications"> <i className="bi bi-bell"></i></a>
                        <Suspense fallback={<Loading />}>
                            <UserModal user={user} />
                        </Suspense>
                    </div>
                </div>

                <div className={styles.sidebar}>
                    <div className='grid gap-0' >
                        <a href="/dashboard" className={`sideItem flex justify-start items-center gap-4   text-[13px] ${pathname === "/dashboard" ? "active-item" : ""}`}> <i className="bi bi-house text-[18px]"></i>  Dashboard</a>

                        <a href="/dashboard/products" className={`sideItem flex justify-start items-center gap-4 text-[13px] ${pathname === "/dashboard/products" ? "active-item" : ""}`}> <i className="bi bi-box text-[18px]"></i>   Meus produtos</a>

                        <a href="/dashboard/sales" className={`sideItem flex justify-start items-center gap-4 text-[13px] ${pathname === "/dashboard/sales" ? "active-item" : ""}`}> <i className="bi bi-graph-up-arrow text-[18px]"></i> Vendas</a>

                        <a href="/dashboard/withdraw" className={`sideItem flex justify-start items-center gap-4 text-[13px] ${pathname === "/dashboard/withdraw" ? "active-item" : ""}`}>
                            <i class="bi bi-cash text-[18px]"></i> Saques</a>

                        <a href="/dashboard/profile" className={`sideItem flex justify-start items-center gap-4 text-[13px] ${pathname === "/dashboard/profile" ? "active-item" : ""}`}> <i className="bi bi-person-circle text-[18px]"></i>   Minha conta</a>

                        <a href="/dashboard/marketplace" className={`sideItem flex justify-start items-center gap-4 text-[13px] ${pathname === "/dashboard/marketplace" ? "active-item" : ""}`}> <i class="bi bi-shop text-[18px]"></i> Afiliação</a>

                        <a href="/dashboard/send_feedback" className={`sideItem flex justify-start items-center gap-4 text-[13px] ${pathname === "/dashboard/send_feedback" ? "active-item" : ""}`}>   <i className="bi bi-chat-right-text-fill text-[18px]"></i>  FeedBack</a>



                    </div>

                    <div className='grid gp-4' >
                        <hr />
                        <a className='sideItem' href="/auth/logout">
                            <i className="bi bi-box-arrow-right"></i>  Terminar sessao</a>
                    </div>

                </div>

                <div className={`${styles.content} shadow-lg`}>
                    <Suspense fallback={<Loading />}>
                        {children}
                    </Suspense>
                    {/* <p className='text-xs mt-5' >&copy; DROP PAGAMENTOS E SERVIÇOS E.I - 2025</p> */}
                </div>


            </div>
        </div>
    );
}
