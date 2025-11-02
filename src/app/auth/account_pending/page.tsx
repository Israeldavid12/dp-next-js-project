import { Clock, Mail, ShieldCheck } from 'lucide-react';

const AccountPending = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 text-center border border-gray-100">
          {/* Ícone de espera com animação suave */}
          <div className="mx-auto mb-6 w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
            <Clock className="w-10 h-10 text-blue-600" />
          </div>

          {/* Título principal */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Conta em Análise
          </h1>

          {/* Subtítulo explicativo */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            Sua conta está <span className="font-medium text-blue-600">aguardando aprovação</span> por um administrador. 
            Você receberá um e-mail assim que sua conta for aprovada.
          </p>

          {/* Card de status com ícones */}
          <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-200">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <ShieldCheck className="w-5 h-5 text-amber-500" />
              <span>Revisão manual em andamento</span>
            </div>
          </div>

          {/* Informações úteis */}
          <div className="space-y-4 text-left bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
              <p>Verifique sua caixa de entrada (e spam) em até <strong>24 horas</strong>.</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 mt-0.5 rounded-full bg-blue-600 flex-shrink-0"></div>
              <p>Não é necessário reenviar a solicitação.</p>
            </div>
          </div>

          {/* Botão opcional de suporte (pode ser removido se não houver) */}
          <div className="mt-8">
            <a
              href="mailto:droppaymentsinc@gmail.com"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium underline-offset-4 hover:underline transition-colors"
            >
              Precisa de ajuda? Entre em contato
            </a>
          </div>
        </div>

        {/* Rodapé discreto */}
        <p className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Drop Payments. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default AccountPending;