

export default function ShareLinks({ id }) {
    return (
        <div className="grid gap-2 mb-3 text-[13px]" >
            <p className="" >Link de divulgação / Pagina de pagamento</p>
            <div className="flex  justify-between outline-none px-5 py-2 rounded-md ring-1 ring-[silver] 
            w-full text-[13px] hover:ring-blue-800 text-blue-500" >
                <input className="w-full outline-none " type="link" value={`https://pay.dropaymentsmz.online/${id}`} />
                <a  target="_blank" href={`https://pay.dropaymentsmz.online/${id}`}><i  class="bi bi-box-arrow-up-right "></i></a>
            </div>
        </div>
    )
}