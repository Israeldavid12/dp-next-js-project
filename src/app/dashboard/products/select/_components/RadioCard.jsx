// components/RadioCard.js
import React from "react";
import Image from "next/image";
import ImageIcon from "../../../../../../public/images/create-products-assets/PAYMENT-ICON.jpg";
import EbookIcon from '../../../../../../public/images/create-products-assets/ebook.jpg'
import ImageLink from '../../../../../../public/images/create-products-assets/link.jpg'
import { redirect } from "next/navigation";


const imageMap = {
  payments: ImageIcon,
  ebook: EbookIcon,
  external: ImageLink,
};


const RadioCard = ({ id, name, value, label, onClick, src, title }) => {
  const selectedImage = imageMap[value];

  return (
    <div
      className="grid gap-5 rounded-md shadow-lg justify-center w-80 sm:w-98  p-4 bg-white hover:opacity-70 transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg "
      onClick={() => onClick(id)
        
      } // Chama a função para marcar o radio
      
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        style={{ display: "none" }} // Esconde o radio
      />
      {/* <span>{label}</span> */}
      <Image
      src={selectedImage}
       className="flex justify-center w-full sm:w-60 h-60"
        alt="image"/>
      <p className="text-center text-sm font-bold" >{title}</p>
      <p className="text-center text-md" >{label}</p>
    </div>
  );
};

export default RadioCard;
