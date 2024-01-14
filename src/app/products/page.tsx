'use client'

import SingleProduct from '@/components/products/singleProduct'
import { mockProduct } from '../api/auth/mocks/mocks'

const ProductsPage = () => {
  return (
    <div className='flex flex-wrap justify-center mx-auto w-4/5'>
      <SingleProduct product={mockProduct} />
      <SingleProduct product={mockProduct} />
      <SingleProduct product={mockProduct} />
      <SingleProduct product={mockProduct} />
      <SingleProduct product={mockProduct} />
    </div>
  )
}

export default ProductsPage
