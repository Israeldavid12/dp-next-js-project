'use client'
import Image from "next/image";
import logo from '../../../public/images/logo.png';
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Layout = ({ children }) => {
  const path = usePathname()
  const [is_sidebar, setSideBar] = useState(false)


  return (
    <div className="flex w-screen bg-gray-800 " >
      <AnimatePresence>
        {
          is_sidebar && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-800  w-[100%] h-full "
            >
              <div className="bg-gray-800 text-white p-6 sm:hidden w-[100%] grid gap-3" >
                  <a href="/developers">
              <p className={`py-2 px-4 rounded-full bg-gray-800/70  hover:ring ring-[silver] cursor-pointer hidden  ${path === '/developers' ? 'ring' : ''}`} >
                Home
              </p>
            </a>

            <a href="/developers/home">
              <p className={`py-2 px-4 rounded-full bg-gray-800/70  hover:ring ring-[silver] cursor-pointer   ${path === '/developers/home' ? 'ring' : ''}`} >
                Home
              </p>
            </a>

            <a href="/developers/docs">
              <p className={`py-2 px-4 rounded-full bg-gray-800/70  hover:ring ring-[silver] cursor-pointer   ${path === '/developers/docs' ? 'ring' : ''}`} >
                Documentation
              </p>
            </a>

            <a href="/developers/support">
              <p className={`py-2 px-4 rounded-full bg-gray-800/70  hover:ring ring-[silver] cursor-pointer   ${path === '/developers/support' ? 'ring' : ''}`} >
                Support
              </p>
            </a> 
              </div>
            </motion.div>

          )
        }
      </AnimatePresence>

      <div className="flex flex-col w-full transition-all ">

        <header className="flex sm:justify-evenly justify-between items-center gap-2 bg-gray-800 text-white p-6 shadow-md">

          <div className="sm:flex hidden justify-start items-center gap-3" >
            <Image className="w-8 rounded-full" src={logo} alt="Logo" />
            <h1 className="text-[14px] ">Developer Plataform</h1>

            <a className="hidden" href="/developers">
              <p className={`py-2 px-4 rounded-full bg-gray-800/70  hover:ring ring-[silver] cursor-pointer   ${path === '/developers' ? 'ring' : ''}`} >
                Home
              </p>
            </a>

            <a href="/developers/home">
              <p className={`py-2 px-4 rounded-full bg-gray-800/70  hover:ring ring-[silver] cursor-pointer   ${path === '/developers/home' ? 'ring' : ''}`} >
                Home
              </p>
            </a>

            <a href="/developers/docs">
              <p className={`py-2 px-4 rounded-full bg-gray-800/70  hover:ring ring-[silver] cursor-pointer   ${path === '/developers/docs' ? 'ring' : ''}`} >
                Documentation
              </p>
            </a>

            <a href="/developers/support">
              <p className={`py-2 px-4 rounded-full bg-gray-800/70  hover:ring ring-[silver] cursor-pointer   ${path === '/developers/support' ? 'ring' : ''}`} >
                Support
              </p>
            </a>

          </div>
          <div className="sm:hidden flex">
            <i onClick={() => setSideBar(!is_sidebar)} className="bi bi-list text-2xl"></i>
          </div>

          <div>
            <a href="/auth/logout">
              <p><i className="bi bi-box-arrow-in-left"></i> Sair</p>
            </a>
          </div>
        </header>

        <main className="flex justify-evenly items-start p-4 w-full bg-[#F0F2F9] h-full">
          {children}
        </main>

        <div className="flex justify-center items-center text-black text-center bg-white h-60  shadow-md py-4">
          &copy; {new Date().getFullYear()} Developers Dashboard - All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Layout;


