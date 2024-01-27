'use client'

import React, { useEffect, useState } from 'react'
import SingleProduct from '@/components/products/singleProduct'
import { defaultProductValues } from '../api/auth/constants/constants'
import { mockProducts } from '../api/auth/mocks/mocks'
import Pagination from './pagination'

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [productSelectedId, setProductSelectedId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const productsPerPage = 20

  const filteredProducts = mockProducts.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
  const totalFilteredProducts = filteredProducts.length

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

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
          <div className='flex justify-center mt-5'>
            <input
              type='text'
              placeholder='Search products...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='p-2 border border-gray-300 rounded-md'
            />
          </div>
          {searchQuery && currentProducts.length === 0 && <div className='text-center mt-2 text-gray-600'>No products found.</div>}
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
            totalProducts={totalFilteredProducts}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  )
}

export default ProductsPage
