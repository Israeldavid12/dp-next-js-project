"use client"
import { useState } from "react";
import RadioCard from "./_components/RadioCard";
import { redirect } from "next/navigation";



export default function SelectType() {
    const [selectedRadio, setSelectedRadio] = useState(null);

    const handleRadioSelect = (id) => {
        setSelectedRadio(id); // Atualiza o estado com o id do radio selecionado
        redirect(`/dashboard/products/create?p_type=${id}`)
    };




    return (
        <div className="p-4" >
            <p className="text-2xl mt-4 " >Que tipo produto que irá vender?</p>
            <div className="grid sm:flex mt-4 gap-4 w-full justify-center  " >
                <RadioCard
                    id="ebook"
                    name="option"
                    value="ebook"
                    title='eBook, Docuemtos, Assinaturas digitais'
                    label="EBOOK - LIVROS DIGITAIS EM PDF, EPUB "
                    src='/../../../../../../public/images/PAYMENT-ICON.png'
                    onClick={handleRadioSelect}
                />
                <RadioCard
                    id="payments"
                    name="option"
                    value="payments"
                    label="LINK PARA RECEBER PAGAMENTOS"
                    title='RECEBER PAGAMENTOS '
                    src='/../../../../../../public/images/PAYMENT-ICON.png'
                    onClick={handleRadioSelect}
                />
                <RadioCard
                    id="external"
                    name="option"
                    value="external"
                    label="PRODUTO HOSPEDADO EM OUTRO LUGAR"
                    title='Link Externo'
                    src='/../../../../../../public/images/PAYMENT-ICON.png'
                    onClick={handleRadioSelect}
                />


                {/* <p>Opção Selecionada: {selectedRadio}</p> */}

            </div>
        </div>
    )
} 