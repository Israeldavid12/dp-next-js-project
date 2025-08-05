"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // ícones bonitos (instale com: npm i lucide-react)
import { usePathname, redirect } from "next/navigation";

export default function MobileMenu() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden relative z-50">
            {/* Botão de abrir/fechar o menu */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-700 focus:outline-none"
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Menu dropdown */}
            {isOpen && (
                <>
                    <div className="fixed inset-0  z-50 flex items-center justify-center">
                        <div className="bg-white/80 h-[100%] grid backdrop-blur-md pt-0 p-2 rounded-2xl shadow-2xl max-w-md w-full">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 text-gray-700 focus:outline-none"
                            >
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                            <div className="grid gap-3" >
                                <a href="/dashboard" className={`sideItemMobile ${pathname === "/dashboard" ? "active-item-mobile" : ""}`}> <i className="bi bi-house"></i>  Dashboard</a>

                                <a href="/dashboard/products" className={`sideItemMobile ${pathname === "/dashboard/products" ? "active-item-mobile" : ""}`}> <i className="bi bi-box"></i>  Meus produtos</a>

                                <a href="/dashboard/sales" className={`sideItemMobile ${pathname === "/dashboard/sales" ? "active-item-mobile" : ""}`}><i className="bi bi-graph-up-arrow"></i>  Vendas</a>

                                <a href="/dashboard/withdraw" className={`sideItemMobile ${pathname === "/dashboard/withdraw" ? "active-item-mobile" : ""}`}> <i className="bi bi-credit-card-2-back"></i>  Saques</a>

                                <a href="/dashboard/profile" className={`sideItemMobile ${pathname === "/dashboard/profile" ? "active-item-mobile" : ""}`}> <i className="bi bi-person-circle text-[18px]"></i> Minha conta</a>

                                <a href="/dashboard/send_feedback" className={`sideItemMobile ${pathname === "/dashboard/send_feedback" ? "active-item-mobile" : ""}`}> <i className="bi bi-chat-right-text-fill text-[18px]"></i>   Dar FeedBack</a>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
