import React, { createContext, useState, useContext } from 'react';
import { Loading } from '../app/dashboard/_components/LoadindAnim'; // ajuste o caminho conforme necessário

const LoadingContext = createContext();
export const AuthContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && (
        <div className='flex justify-center items-center h-screen fixed top-0 left-0 w-full bg-white z-50'>
          <Loading /> 
        </div>
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
