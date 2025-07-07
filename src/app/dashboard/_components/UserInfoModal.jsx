"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function UserModal({ user }) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(user?.email || "");
    setName(user?.name || "");
  }, [user]);

  return (
    <>
      <button
        onClick={() => setShowModal((prev) => !prev)}
        className="w-[40px] bg-blue-800 p-0 text-white rounded-full hover:bg-blue-400"
      >
        <i className="bi bi-person-fill"></i>
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.2 }}
            className="fixed top-5 right-5 z-50 w-60 mt-15 bg-[#ffffff]"
          >
            <div className="bg-white/80 backdrop-blur-md h-full w-full overflow-y-auto p-4 rounded-xl shadow-2xl grid gap-3">
              <p className="text-[14px]">{name}</p>
              <p className="text-[14px]">{email}</p>

              <hr />

              <a className="text-[14px]" href="/dashboard/profile">
                <i className="bi bi-person"></i> Meu perfil
              </a>

              <a className="text-[14px]" href="/dashboard/notifications">
                <i className="bi bi-bell"></i> Notificações
              </a>

              <a className="text-[14px]" href="/dashboard/send_feedback">
                <i className="bi bi-send"></i> Dar feedback e sugestão
              </a>

              {/* <a className="text-[14px]" href="/donate">
                <i className="bi bi-box2-heart"></i> Apoie este projeto
              </a> */}

              <a className="text-[14px]" href="/auth/logout">
                <i className="bi bi-box-arrow-right"></i> Sair
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
