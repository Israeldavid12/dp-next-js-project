import styles from '../../styles.auth.module.css';
import logo from '../../../../../public/images/logo.png';
import registerIcon from '../../../../../public/images/register-art.png';
import Image from 'next/image';




export default function PlataformInfo() {
    return (
        <>
            <div className='hidden md:grid gap-4 p-4 h-[100vh] w-[100%] bg-[#344CB7]'>
                <div className="grid gap-4">

                    <p className="grid text-[22px] font-[800] text-[#ffffff] gap-1">
                        <Image className="w-10 rounded-full" src={logo} alt="Logo" />
                        Com o que você sabe, é possível criar um negócio online de sucesso.
                        <br /> Estamos aqui para ajudar você a começar.
                    </p>
                    <span className="text-[16px] font-[500] text-[#ffffff]">
                        Nós ajudaremos você a dar o próximo passo. Faça login ou crie uma conta.
                    </span>
                    <Image className={styles.loginIcon} src={registerIcon} alt="Login Icon" />
                </div>
            </div>
        </>
    )
}