'use client'

import React, { useState } from 'react'
import SingleProduct from '@/components/products/singleProduct'
import { mockProducts } from '../api/auth/mocks/mocks'
import Pagination from './pagination'

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 20

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = mockProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <div className='flex flex-wrap justify-center mx-auto lg:w-3/4'>
        {currentProducts.map((product) => (
          <SingleProduct
            key={product.id}
            product={product}
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
  )
}

export default ProductsPage
