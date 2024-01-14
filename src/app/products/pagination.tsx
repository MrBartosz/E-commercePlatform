// Pagination.js
import React from 'react'

const Pagination = ({ productsPerPage, totalProducts, currentPage, onPageChange }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i)
  }

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber)
    window.scrollTo(0, 0)
  }

  return (
    <div className='mb-12 mt-4 pb-12'>
      <ul className='flex justify-center space-x-2'>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`px-3 py-2 border rounded-md cursor-pointer ${
              number === currentPage ? 'bg-blue-500 text-white' : 'border-gray-300'
            }`}
            onClick={() => handlePageChange(number)}
          >
            <button>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination
