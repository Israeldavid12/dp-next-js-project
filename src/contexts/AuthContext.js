import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        // exemplo de validação simples: pedir dados do usuário usando o token
        const res = await axios.get(apiUrl+"/api/user/personal/data", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token inválido ou expirado", error);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, setToken, user, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
