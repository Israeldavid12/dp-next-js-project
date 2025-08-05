// components/CustomToast.tsx
import React from 'react';


const CustomToast = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow">
      <strong>Erro:</strong> <span>{message}</span>
    </div>
  );
};

export default CustomToast;
