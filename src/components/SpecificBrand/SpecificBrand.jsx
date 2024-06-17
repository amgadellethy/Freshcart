import React, { useState } from 'react'

export default function SpecificBrand() {

    const [specificBrand , setSpecificBrand] = useState(null)

    async function getSpecificBrands({id}) {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
            method : "GET"
        }

        let { data } = await axios.request(options);
        setSpecificBrand(data)
        
    }


  return (
      <>
            {specificBrand === null ? "" :  <div className='fixed left-0 right-0 bottom-0 top-0 z-[99]  bg-black  flex justify-center items-center'>
                <div className='bg-white rounded-lg w-[500px] h-[300px] overflow-hidden '>
                    <div className='text-end p-3 border border-b-2'>
                    <i className="fa-solid fa-x"></i>
                    </div>
                    <div className='flex justify-between items-center p-8'>
                        <div>
                            <h2 className='text-primary text-[40px] font-bold'>Dell</h2>
                            <h3 className=''>dell</h3>
                        </div>
                        <div>
                            <img src="https://ecommerce.routemisr.com/Route-Academy-brands/1678286767914.png" className='w-full' alt="" />
                        </div>
                    </div>
                    <div className='text-end '>
                        <button className='p-2 text-white bg-gray-600'>close</button>
                    </div>
                </div>

            </div>}
      </>
  )
}
