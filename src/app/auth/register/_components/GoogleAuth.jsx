import googleIcon from '../../../../../public/images/goolge-icon.png';
import styles from '../../styles.auth.module.css';
import Image from 'next/image';





export default function GoolgeAuth() {
    return (
        <>
            <div className={`${styles.googleAuth} hidden`} id="google-auth">
                <Image src={googleIcon} alt="Google" />
            </div>
            <hr className='text-[silver]' />
        </>
    )
}