import partnerIcon from '../../../public/images/landing-page-assets/M-Pesa-modified.png'
import Image from 'next/image'






export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-grid">
                <div className="footer-column">
                    <h3><strong>Drop payments</strong></h3>
                    <a href="https://www.dropaymentsmz.online/produtos">Meus Produtos</a>
                    <a href="https://www.dropaymentsmz.online/criar-conta">Criar minha conta</a>
                    <a href="https://www.dropaymentsmz.online/criar-conta">Vender curso online</a>

                </div>
                <div className="footer-column">
                    <h3><strong>Parceiros</strong></h3>
                    <Image src={partnerIcon}  alt="M-pesa" />
                </div>
                <div className="footer-column">
                    <h3><strong>Comunidade</strong></h3>
                    <a href="https://chat.whatsapp.com/EWw6uuMvY91DIp0sDZm1MT">Comunidade no whatsapp</a>
                </div>
                <div className="footer-column">
                    <h3><strong>Suporte</strong></h3>
                    <a href="https://api.whatsapp.com/send?phone=258863814050&text=Preciso%20de%20ajuda...">Centro de
                        ajuda</a>
                    <a href="https://api.whatsapp.com/send?phone=258863814050">Fale conosco</a>
                </div>
            </div>
            <p className="mt-4 text-center text-[13px]" >&copy; DROP PAY é operado pela DROP PAGAMENTOS
                E SERVIÇOS DIGITAIS E.I
                - Todos direitos reservados - LICENÇA N°: 16665/10/01/PS/2025 </p>
        </footer>
    )
}