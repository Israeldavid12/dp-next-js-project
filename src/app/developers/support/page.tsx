const Suporte = () => {
    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Contatos de Suporte</h2>
            
            <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Email</h3>
                    <p className="text-gray-700">suporte@droopay.com</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Telefone</h3>
                    <p className="text-gray-700">+258 85 261 0323</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">WhatsApp</h3>
                    <p className="text-gray-700">+258 85 261 0323</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Horário de Atendimento</h3>
                    <p className="text-gray-700">Segunda a Sexta: 8h às 17h</p>
                    <p className="text-gray-700">Sábado: 8h às 12h</p>
                </div>
            </div>
        </div>
    )
}

export default Suporte;