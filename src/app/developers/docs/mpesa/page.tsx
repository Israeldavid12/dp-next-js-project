'use client'

import React, { useState } from 'react';
import { 
  BookOpen, 
  ArrowRight, 
  ExternalLink, 
  Code, 
  Zap, 
  HelpCircle, 
  FileText,
  Settings,
  Shield,
  Activity,
  CreditCard,
  Smartphone,
  Globe,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';


const DocsPage = () => {
  const apiFeatures = [
    {
      icon: Smartphone,
      title: 'M-PESA Mobile',
      description: 'Integração completa com carteiras móveis M-PESA',
      features: ['Pagamentos instantâneos', 'Verificação de status', 'Webhooks em tempo real']
    },
    {
      icon: Globe,
      title: 'Cobertura Nacional',
      description: 'Disponível em todo território moçambicano',
      features: ['Todas as operadoras', 'Suporte 24/7', 'Alta disponibilidade']
    },
    {
      icon: Activity,
      title: 'Monitoramento',
      description: 'Acompanhe transações em tempo real',
      features: ['Dashboard analytics', 'Logs detalhados', 'Alertas automáticos']
    }
  ];

  const axios = require('axios');

const apiUrl = "https://payment.droopay.com/api/v1/open/payment/mpesa/sandbox";






  const codeExamples = [
    {
      language: 'JavaScript com Axios',
      title: 'Processar Pagamento',
      code: `const apiUrl = "https://payment.droopay.com/api/open/payment/mpesa/sandbox"
const payment = await axios.post(apiUrl, {
  amount: 1000, //Requerido
  payment_number: '258841234567' //Requerido,
  reference: 'ORDER-123', //Opcional
  product_name: "Jhon Doe product", //Opcional
   buyer_name: "JHON DOE" //Opcional
    },
  {
    headers: {
      Authorization: "Bearer eyJDkf....." //Acess token
    }
  });`
    },
    {
      language: 'Json ',
      title: 'Resposta, HTTP Status code: 201/200',
      code: `
      {
        "message": "Transação criada com sucesso"
        "status": 201,
        "transaction_ID": "DPXXX-XXX-...", // ID interno
        "thirdyPartyTransId": "Mpesa transaction Id"
      }`
    },
    {
      language: 'cURL',
      title: 'Gerar token de acesso',
      code: `curl -X POST https://payment.droopay.com/api/oauth/token \\
  -H "Content-Type: application/json" \\
  -d '{"client_id": your client id, "client secret": "your client secret"}'`
    }
  ];

  const resources = [
    {
      icon: FileText,
      title: 'Guias Detalhados',
      description: 'Tutoriais passo a passo para diferentes cenários',
      items: ['Integração para e-commerce', 'Pagamentos recorrentes', 'Refunds e estornos']
    },
    {
      icon: Settings,
      title: 'Configuração',
      description: 'Configure seu ambiente de desenvolvimento',
      items: ['Variáveis de ambiente', 'Certificados SSL', 'Webhooks']
    },
    {
      icon: HelpCircle,
      title: 'FAQ',
      description: 'Perguntas frequentes e resolução de problemas',
      items: ['Erros comuns', 'Limites de API', 'Melhores práticas']
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Documentação da API M-PESA
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          API de pagamentos M-PESA para Moçambique
        </p>
        <p className="text-gray-700 mb-8 leading-relaxed">
          Documentação completa para integração com a API de pagamentos M-PESA, incluindo 
          autenticação, endpoints, exemplos de requisições e respostas.
        </p>

     
       
      </div>

  
      {/* API Features */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Recursos da API
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {apiFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Code Examples */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
          <Code className="mr-3 text-blue-600" size={24} />
          Exemplos de Código
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {codeExamples.map((example, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">{example.title}</h3>
                <p className="text-sm text-gray-600">{example.language}</p>
              </div>
              <div className="p-4">
                <pre className="text-sm text-gray-800 overflow-x-auto">
                  <code>{example.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Icon className="text-blue-600 mr-3" size={24} />
                <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <ul className="space-y-2">
                {resource.items.map((item, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <ArrowRight size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* External Links & Support */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Precisa de mais ajuda?
            </h2>
            <p className="text-gray-600">
              Consulte recursos adicionais ou entre em contato com nossa equipe de suporte.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/developers/support"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <HelpCircle size={16} className="mr-2" />
              Suporte Técnico
            </a>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default DocsPage;