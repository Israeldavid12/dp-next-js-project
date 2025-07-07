import useUserId from "../../../../hooks/useUserId"
import useUserEmail from "../../../../hooks/useUserEmail"
import { useEffect, useState } from "react"
import axios from "axios"
import Spinner from "../../../../auth/login/_components/Spinner"
import { handleCreateProduct } from "../handlers/createProductsHandles"
import { useRouter } from "next/navigation"



async function setAssetsProduct(banner_file, image_file) {
    try {
        const maxSizeMB = 5;
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        const token = localStorage.getItem('sessionToken')

        if (banner_file.size > maxSizeBytes || image_file.size > maxSizeBytes) {
            throw new Error(`Erro: o arquivo ultrapassa o limite de ${maxSizeMB} MB.`);
        }

        const formDataImage = new FormData();
        formDataImage.append('file', image_file);
        formDataImage.append('dir', 'images');

        const formDataBanner = new FormData();
        formDataBanner.append('file', banner_file);
        formDataBanner.append('dir', 'banners');

        const URL_ENDPOINT = 'http://129.146.58.182:3080/api/upload/images';

        const req_image = axios.post(URL_ENDPOINT, formDataImage, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });

        const req_banner = axios.post(URL_ENDPOINT, formDataBanner, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });

        const [res_image, res_banner] = await Promise.all([req_image, req_banner]);


        return {
            image: {
                url: res_image.data?.url,
                size: parseFloat(res_image.data.convertedSize)
            },
            banner: {
                url: res_banner.data?.url,
                size: parseFloat(res_banner.data?.convertedSize)
            },

        };

    } catch (e) {
        console.log(e)
        return false
    }

}

async function setEbook(ebook_file) {
    try {
        const formData = new FormData();
        formData.append('file', ebook_file);

        const URL_ENDPOINT = 'http://129.146.58.182:3080/api/upload/doc';

        const response = await axios.post('http://129.146.58.182:3080/api/upload/doc', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response?.data?.url

    } catch (e) {
        return false
    }
}

async function getAcessUrl(product_type, formData) {

    if (!product_type) return null

    if (formData?.link) return formData?.link

    if (formData?.ebook_field) {
        if (product_type === 'ebook') {
            const maxSizeMB = 30;
            const maxSizeBytes = maxSizeMB * 1024 * 1024;

            if (formData?.ebook_field.size > maxSizeBytes) {
                throw new Error(`Erro: o arquivo ultrapassa o limite de ${maxSizeMB} MB.`);

            } else {
                const ebookFileUrl = await setEbook(formData?.ebook_field)
                return ebookFileUrl
            }


        }
    }

    if (product_type === 'payments') return 'PAYMENTS-ONLY'

}

async function verifyQuantity(userId) {
    try {
        const req = await axios.post('https://monsterbot.vercel.app/api/products', {
            reqType: 'verify/quantity',
            userId: userId
        });

        if (req.data.status === 200) return true;

    } catch (e) {
        console.log(e)
        return false
    }
}



export default function Submit({ formData, product_type }) {
    const [isActive, setIsActive] = useState(true);
    const userId = useUserId();
    const userEmail = useUserEmail()
    const [isLoading, setIsLoading] = useState(false)
    const [isSucess, setIsSucess] = useState(false)
    const [response, setResponse] = useState(null)
    const [count, setCount] = useState(0)
    const router = useRouter()


    useEffect(() => {
        async function Submit() {
            try {
                setIsLoading(true)
                const verify_ = await verifyQuantity(userId)

                if (!verify_) throw new Error('Limite de produtos atingido');

                const assets = await setAssetsProduct(formData.banner_product_field, formData.image_product_field)

                const accessUrl = await getAcessUrl(product_type, formData)


                if (!product_type || !formData || !assets) {
                    throw new Error("Dados obrigatórios ausentes.");
                }

                const response = await handleCreateProduct(formData, assets, accessUrl)
                if (response.status) {
                    router.push('/dashboard/products')
                }
                setResponse(response?.message)
                setIsLoading(false)

            } catch (e) {
                console.log(e)
                setIsLoading(false)
                setResponse(e.message)
                return false
            }
        }

        if (count !== 0) {
            Submit()
        }
    }, [count])

    if (!isActive) return null;

    return (
        <div className="fixed bg-black/40 left-0 right-0 top-0 bottom-0 flex gap-5 justify-center items-center ease-in-out transition-all duration-200 " >
            <div className="z-100 opacity-100 bg-white p-3 text-black rounded-md w-100" >
                <div className="flex justify-between" >
                    <p className="font-[600]" >Submisao</p>
                    <i onClick={() => setIsActive(false)} class="bi bi-x-lg"></i>
                </div>
                {!isSucess ? (
                    <div className="flex flex-col " >

                        <hr className="text-[silver] my-3" />
                        {response && (
                            <p className="bg-[#FEF2F2] font-[600] p-3 rounded-md text-red-500 text-[14px] " >{response}</p>
                        )}

                        <p className="p-3" >Deseja enviar este produto para análise?
                            Após o envio, ele será revisado pela nossa equipe. Você não poderá editá-lo até que a análise seja concluída.</p>



                        <button onClick={() => setCount(count + 1)} className={`px-6 py-3 rounded-md bg-green-600 text-white m-3
                    hover:bg-green-500 flex justify-center items-center ${isLoading ? 'opacity-50' : ''}`} disabled={isLoading} >
                            {isLoading ? <Spinner /> : 'Enviar para análise'}
                        </button>
                    </div>
                )
                    : (
                        <div className="flex flex-col " >
                            <hr className="text-[silver] my-3" />
                            <p className="p-3" >{response?.message}</p>

                        </div>
                    )
                }

            </div>
        </div>
    )

}