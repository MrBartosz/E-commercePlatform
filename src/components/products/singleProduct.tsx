import Image from 'next/image'
const SingleProduct = ({ product }) => {
  return (
    <div className='my-10 px-4 mx-2 items-center'>
      <div className='my-7'>
        <Image
          src={product.image.url}
          width={100}
          height={200}
          alt=''
          className='object-cover w-full transition duration-500 ease-in-out hover:scale-110'
        />
      </div>
      <div className='flex-basis-1/2'>
        <h3>{product.name}</h3>
        <p className='text-2xl'>${product.price}</p>
        <div
          dangerouslySetInnerHTML={{
            __html: product.description.html,
          }}
        ></div>
        <a className='bg-green-500 text-white inline-block px-5 py-3 my-2 rounded-md cursor-pointer transition duration-00 ease-in-out hover:bg-green-700'>
          Add to cart 🛒
        </a>
      </div>
    </div>
  )
}
export default SingleProduct
