'use client'
import React, { useState } from 'react';

const faqData = [
  {
    id: '01',
    question: 'Quanto custa para usar a DROP PAYMENTS?',
    answer:
      'A DROP PAYMENTS retém apenas 9,9% do valor de cada saque realizado pelo usuário, sem cobrar nenhuma taxa para o uso da plataforma. Isso significa que o usuário recebe 90,1% do valor sacado. Essa taxa foi reduzida ao máximo para garantir que os usuários obtenham o maior lucro possível.',
  },
  {
    id: '02',
    question: 'A DROP PAYMENTS cobra alguma taxa para envio do saque?',
    answer:
      'Não! A DROP PAYMENTS LTD não cobra nenhuma taxa para envio do saque.',
  },
  {
    id: '03',
    question: 'Por que só pagar quando eu vender faz mais sentido do que pagar mensalidade?',
    answer:
      'Com este modelo, você tem menos riscos e só paga quando tem resultados.',
  },
  {
    id: '04',
    question: 'Quantos produtos posso cadastrar na DROP PAYMENTS MZ?',
    answer:
      'Atualmente temos um limite de 5 produtos por usuário. Caso o usuário necessite cadastrar mais produtos, pode entrar em contato com o suporte para receber a devida assistência.',
  },
  {
    id: '05',
    question: 'Quais são os métodos de pagamento que a DROP PAYMENTS MZ aceita?',
    answer:
      'A DROP PAYMENTS MZ aceita os seguintes métodos de pagamento em seus checkouts: M-PESA, E-MOLA, PAYPAL e cartão de débito/crédito (VISA/MASTERCARD) a partir do gateway de pagamentos do PAYPAL.',
  },
  {
    id: '06',
    question: 'Que tipo de produto posso vender na DROP PAYMENTS MZ?',
    answer:
      'Na DROP PAYMENTS MZ pode hospedar e vender ebooks em formato PDF ou links externos caso seja um curso hospedado em outro local que você queira que os seus compradores acessem.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
     setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="max-w-3xl mx-auto px-4 py-8">
      {faqData.map((item, index) => (
        <div key={item.id} id={item.id} className="faq-item border-b py-4">
          <div
            className="faq-question flex items-center justify-between cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <span className="font-bold text-sm text-gray-500">{item.id}</span>
            <p className="flex-1 mx-3 text-gray-800 font-medium">{item.question}</p>
            <span className="text-xl font-bold text-blue-500">{openIndex === index ? '-' : '+'}</span>
          </div>
          {index === openIndex && (
            <div className=" mt-2 text-black font-bold text-center text-sm leading-relaxed">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
