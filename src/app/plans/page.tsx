'use client'




const PlansPage = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto p-6">
            {/* PLANO STARTER */}
            <div className="border rounded-2xl p-6 shadow-sm bg-white">
                <h3 className="text-xl font-semibold mb-4 text-center">Starter</h3>
                <p className="text-3xl font-bold text-center mb-6">Grátis</p>
                <ul className="list-none space-y-3 text-gray-700 text-sm">
                    <li>✅ Suporte 24/7</li>
                    <li>✅ Limite de <strong>5 produtos</strong></li>
                    <li>✅ Acesso à API de desenvolvedores</li>
                    <li>✅ Envio de faturas</li>
                    <li>✅ Notificações por e-mail</li>
                    <li>✅ Integração básica com WhatsApp</li>
                    <li>✅ 1 produto em destaque/mês</li>
                    <li>✅ Mini curso de vendas</li>
                </ul>
                <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-semibold">
                    Escolher Starter
                </button>
            </div>

            {/* PLANO PRO */}
            <div className="border-2 border-blue-500 rounded-2xl p-6 shadow-md bg-blue-50">
                <h3 className="text-xl font-semibold mb-4 text-center">Pro</h3>
                <p className="text-3xl font-bold text-center mb-6">1.000 MT / mês</p>
                <ul className="list-none space-y-3 text-gray-800 text-sm">
                    <li>✅ 1 GB de armazenamento</li>
                    <li>✅ Suporte prioritário</li>
                    <li>✅ Produtos ilimitados</li>
                    <li>✅ Acesso total à API</li>
                    <li>✅ Envio automático de faturas</li>
                    <li>✅ WhatsApp + SMS integrados</li>
                    <li>✅ Destaques ilimitados</li>
                    <li>✅ Página de vendas personalizada</li>
                    <li>✅ Área de membros</li>
                </ul>
                <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold">
                    Escolher Pro
                </button>
            </div>

            {/* PLANO PREMIUM */}
            <div className="border rounded-2xl p-6 shadow-sm bg-white">
                <h3 className="text-xl font-semibold mb-4 text-center">Premium</h3>
                <p className="text-3xl font-bold text-center mb-6">2.000 MT / mês</p>
                <ul className="list-none space-y-3 text-gray-700 text-sm">
                    <li>✅ Armazenamento ilimitado</li>
                    <li>✅ Suporte VIP 24/7 (WhatsApp & Zoom)</li>
                    <li>✅ Produtos ilimitados</li>
                    <li>✅ API + Webhooks</li>
                    <li>✅ WhatsApp, SMS, E-mail marketing</li>
                    <li>✅ Checkout personalizado com upsell</li>
                    <li>✅ Programa de afiliados completo</li>
                    <li>✅ Dashboard avançado</li>
                    <li>✅ Suporte para múltiplos usuários</li>
                </ul>
                <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-semibold">
                    Escolher Premium
                </button>
            </div>
        </div>

    )
}

export default PlansPage;