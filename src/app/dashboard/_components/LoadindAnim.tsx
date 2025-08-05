
// app/dashboard/loading.jsx
export function Loading() {
    return (
        <div className='load-container'>
            <div className='page-loade'>
                <div className='l-container'>
                    <div className='loading-container'>
                        <div className='circle' ></div>
                        <span className='logo' >D</span>
                    </div>
                </div>
            </div>
        </div>
    );
}



export function AddProductsLoad() {
    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
                <div className='load-container '>
                    <div className='page-loade'>
                        <div className='l-container'>
                            <div className='loading-container'>
                                <div className='circle' ></div>
                                <span className='logo' >D</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
