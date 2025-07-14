import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;




export async function handleCreateProduct(formData, assets, accessUrl) {
    try {
        const token = localStorage.getItem('sessionToken')
        const payload = {
            name: formData?.name,
            price: formData?.price,
            description: formData?.description,
            category: formData?.category || "-",
            ImageUrl: assets.image.url,
            BannerUrl: assets.banner.url,
            accessUrl: accessUrl,
        }
        const req = await axios.post(apiUrl+'/api/products/create', { ...payload }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(req)
        if (req.status === 200) {
            console.log('Product created successfully')
            return {
                status: true,
                message: 'Produto enviado com sucesso! Você será notificado por e-mail quando a análise for concluída',
                data: req.data
            }
        } else {
            return {
                status: false,
                message: 'Error creating product',
                data: req.data
            }
        }

    } catch (e) {
        console.log(e)
        return {
            status: false,
            message: 'Error creating product',
        }
    }

}




