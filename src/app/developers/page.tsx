'use client'


const ListTests = ({ testes }) => {
  return (
    <div className="mt-10 overflow-x-auto">
      <div className="min-w-full bg-white rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Nome do produto
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Montante
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                ID da transação
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Pagamento
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Comprador/Celular
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                País
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Data
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-sm text-gray-800">ZERO BARRIGA</td>
              <td className="px-6 py-4 text-sm text-gray-800">100 MT</td>
              <td className="px-6 py-4 text-sm text-gray-800">DP373-343-322</td>
              <td className="px-6 py-4 text-sm text-gray-800">MPESA</td>
              <td className="px-6 py-4 text-sm">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  ACTIVO
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">+258 84 000 0000</td>
              <td className="px-6 py-4 text-sm text-gray-800">Moçambique</td>
              <td className="px-6 py-4 text-sm text-gray-800">2025-07-19</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};




const Home = () => {
  return (
    <div className="flex-col items-center justify-start h-full gap-4">
      <div className="flex-col" >
        <p className="text-start font-bold text-[18px]" >Ultimos <strong>10</strong> testes realizados</p>
      </div>

      {/* <ListTests /> */}
    </div>
  );
}

export default Home;