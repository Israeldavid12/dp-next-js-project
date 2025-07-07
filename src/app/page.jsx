'use client'
import { useState } from "react";
import Image from "next/image";
import dashboardImage from '../../public/images/dashboards.png'
import taxImage from '../../public/images/landing-page-assets/tax-corporate.jpg'
import saqueImage from '../../public/images/landing-page-assets/saque.png'
import FAQSection from './_components/FAQ'
import Footer from './_components/Footer'
import FloatingButton from './_components/FloatSupportButton';
import RealTimeChat from './_components/ChatSupportLabel';



function SideMenu({ isOpen, setSideMenu }) {
  return (
    <div
      id="side_menu"
      className={`fixed inset-0 bg-white h-screen transition-all duration-[500ms] ease-in-out z-50
        ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none'}
      `}
    >
      <div className="bg-white overflow-x-auto h-full">
        <div
          className={`flex justify-between px-8 py-0 border transition-all duration-[500ms] ease-in-out
            border-t-0 border-x-0 border-b-[silver]
            ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}
          `}
        >
          <img
            className="w-16 h-16"
            src="https://megaofertasco.store/unnamed%20(3).png"
            alt="logo"
          />
          <i
            onClick={() => setSideMenu(!isOpen)}
            className="bi bi-x-lg cursor-pointer text-[25px] px-6 py-3 rounded-full text-black"
          ></i>
        </div>

        <div className="flex flex-col justify-between h-full">
          <ul className="grid gap-3 py-2 px-2">
            <li className="hover:bg-gray-200 px-6 py-3 rounded-full">
              <a href="#">Soluções</a>
            </li>
            <li className="hover:bg-gray-100 px-6 py-3 rounded-full">
              <a href="#tax">Taxas</a>
            </li>
            <li className="hover:bg-gray-100 px-6 py-3 rounded-full">
              <a href="#faq">FAQ</a>
            </li>
            <li className="hover:bg-gray-100 px-6 py-3 rounded-full">
              <a href="https://api.whatsapp.com/send?phone=258863814050">Suporte</a>
            </li>
            <button className="hover:bg-gray-100 px-6 py-3 rounded-full login ring ring-[silver] shadow-md">
              <a href="auth/login/">Entrar</a>
            </button>
            <button className="hover:bg-blue-600 px-6 py-3 rounded-full signup bg-blue-700 text-white shadow-md">
              <a href="auth/register/">Criar conta</a>
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}


function Section1() {
  return (
    <div className="bg-[url('/images/background.png')] bg-cover bg-center h-full" >
      <div className="grid sm:flex justify-center w-full p-4 gap-4" >
        <div className="grid gap-3" >
          <p className="sm:text-3xl text-2xl font-[800] text-center mt-12" >Crie e venda produtos digitais <br />
            de maneira simplificada</p>
          {/* <div className="text-[12px] sm:text-[15px] " >
            <p className="font-bold" > ✓ Aqui é possivel monetizar o seu conhecimento de maneira simplificada.</p>
            <p className=" mt-3" > ✓ Não cobramos nenhuma taxa de adesão e nem mensalidades</p>
          </div> */}
          <a
            className="bg-blue-700 flex justify-center items-center text-white rounded-full w-50 h-12 shadow-md"
            href="/auth/login">Começar</a>
        </div>
        <Image className="w-100" src={dashboardImage} alt="dash" />
      </div>
      <hr className="text-[silver] mx-20" />
    </div>
  )
}

function Section2() {
  return (
    <div id="tax" className="flex flex-col-reverse sm:flex-row  sm:flex justify-center w-full px-4 gap-4" >
      <Image className="w-100" src={taxImage} alt="tax" />
      <div className="grid p-1">
        <p className="sm:text-3xl text-2xl font-[800] text-center mt-12">Quanto cobramos por cada venda sua realizada?</p>
        <div>
          <p>✓ Nao cobramos nenhuma taxa por venda realizada.</p>
          <p>✓ Atualmente cobramos uma taxa unica de <span className="text-[24px] font-[700] text-green-600">9.9 % </span>por cada saque realizado
            pelo vendedor.</p>
          <a
            className="bg-blue-950 flex justify-center items-center text-white rounded-full w-50 h-12 mt-4"
            href="/auth/login">Começar</a>
        </div>
      </div>

    </div>
  )
}

function Section3() {
  return (
    <div>
      <div className="flex flex-col-reverse sm:flex-row-reverse  sm:flex justify-center w-full px-4 gap-4">
        <Image className="w-100" src={saqueImage} alt="saque" />
        <div className="grid p-5 gap-6">
          <p className="sm:text-3xl text-2xl font-[800] text-center mt-12" >Saques rápidos</p>
          <div>
            <p>Saque de vendas realizads via eMola e M-pesa é processado em até 24h. <br /> Com valor minimo de
              retirada igual a <strong className="text-[#3674B5]"> 100 MT.</strong></p>
            <br />
            <p>Saque de vendas realizads via PayPal é processado em até 7 dias. <br /> Com valor minimo de
              retirada igual a <strong className="text-[#3674B5]">3500 MT.</strong></p>

          </div>
          <a
            className="bg-blue-950 shadow-md flex justify-center items-center text-white rounded-full w-50 h-12 mt-4"
            href="/auth/login">Começar</a>
        </div>

      </div>
    </div>
  )
}






export default function Home() {
  const [side_menu, setSideMenu] = useState(false)
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => setShowChat(prev => !prev);


  return (
    <div className="grid  transition-all duration-200" >
      <div className="flex justify-between items-center px-8 py-0 shadow-xs " >

        <img className="w-16" src='https://megaofertasco.store/unnamed%20(3).png' alt="logo" />
        <div>
          <i onClick={() => {
            const sideMenu = document.querySelector('#side_menu')
            setSideMenu(!side_menu)
            setTimeout(() => {
              sideMenu.classList.remove('opacity-0')
            }, 300)

          }} className="bi bi-list block sm:hidden text-[25px] hover:bg-gray-100 px-6 py-3 rounded-full
      cursor-pointer"></i>
          {side_menu && <SideMenu isOpen={side_menu} setSideMenu={setSideMenu} />}
          <div className="hidden sm:block " >
            <ul className="flex gap-2">
              <li className="hover:bg-gray-100 px-6 py-3 rounded-full"  ><a href="#">Soluções</a></li>
              <li className="hover:bg-gray-100 px-6 py-3 rounded-full" ><a href="#tax">Taxas</a></li>
              <li className="hover:bg-gray-100 px-6 py-3 rounded-full" ><a href="#faq">FAQ</a></li>
              <li className="hover:bg-gray-100 px-6 py-3 rounded-full" ><a href="https://api.whatsapp.com/send?phone=258863814050">Suporte</a></li>
              <button className="hover:bg-gray-100 px-6 py-3 rounded-full login ring ring-[silver] shadow-md" ><a href="auth/login/">Entrar</a></button>
              <button className="hover:bg-blue-600 px-6 py-3 rounded-full signup bg-blue-700 text-white shadow-md" ><a href="auth/register/">Criar conta</a></button>
            </ul>
          </div>
        </div>
      </div>

      <FloatingButton toggle={toggleChat} />
      <RealTimeChat isOpen={showChat} toggle={toggleChat} />
      <Section1 /> 
      <Section2 />
      <hr className="text-[silver] sm:mx-50 mx-20" />
      <Section3 />
      <FAQSection />
      <Footer />

    </div>
  );
}
