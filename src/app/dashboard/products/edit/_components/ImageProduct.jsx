

const ImageProduct = ({ url }) => {
    return (
        <div className='grid gap-3'>
            <p>Imagem do produto</p>

            <img className='h-40 w-80 rounded-md' src={url} alt="image" />
        </div>
    )
}

export default ImageProduct;