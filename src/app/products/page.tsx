'use client'

import React, { useState } from 'react'
import SingleProduct from '@/components/products/singleProduct'
import { defaultProductValues } from '../api/auth/constants/constants'
import { mockProducts } from '../api/auth/mocks/mocks'
import Pagination from './pagination'

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [productSelectedId, setProductSelectedId] = useState<number | null>(null)
  const productsPerPage = 20

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = mockProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleProductClick = (productId: number) => {
    setProductSelectedId(productId)
  }

  const selectedProduct = mockProducts.find((product) => product.id === productSelectedId) || defaultProductValues

  return (
    <>
      {productSelectedId ? (
        <div className='flex flex-col items-center mx-auto'>
          <button
            onClick={() => setProductSelectedId(null)}
            className='px-32 py-1 mt-10 bg-red-500 text-white rounded-md'
          >
            X
          </button>
          <SingleProduct
            key={productSelectedId}
            product={selectedProduct}
            productSelected={true}
          />
        </div>
      ) : (
        <>
          <div className='flex flex-wrap justify-center mx-auto lg:w-3/4 mt-5'>
            {currentProducts.map((product) => (
              <SingleProduct
                key={product.id}
                product={product}
                productSelected={false}
                onClick={() => handleProductClick(product.id)}
              />
            ))}
          </div>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={mockProducts.length}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  )
}

export default ProductsPage
