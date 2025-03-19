import { useState } from 'react';
import { Paginate } from '../lib/types';



const Pagination = ({animes,setAnimes,setOffset,limit,offset}:Paginate) => {

  const currentPage = Math.floor(offset / limit) + 1;

  // Handle "First Page" button click
  const handleFirstPage = () => {
    setOffset(0);
  };

  // Handle "Previous" button click
  const handlePrev = () => {
    if (currentPage > 1) {
      setOffset(offset - limit)
    }
  };

  // Handle "Next" button click
  const handleNext = () => {
    if (animes.length === limit ) {
      setOffset(offset + limit)
    }
  };

   // Handle "Last Page" button click
   const handleLastPage = async () => {
     let currentPageNumber:number = currentPage;
     let currentPageOffset:number = offset;
     
     // Fetch data in chunks until we find the last page
     while (true) {
      const data = await fetchData(currentPageOffset, limit);
      if (data.length < limit) {
        // We've reached the last page
        setAnimes(data)
        break;
      }
      currentPageOffset += limit;
      currentPageNumber++;
    }
    
    setCurrentPage(currentPageNumber);
  };

  return (
    <div className="flex items-center justify-center space-x-4 mt-12">
      {/* First Page Button */}
      <button
        onClick={handleFirstPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md text-white cursor-pointer ${
          currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        First
      </button>
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md text-white cursor-pointer ${
          currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        Previous
      </button>

      {/* Current Page Number */}
      <span className="text-lg font-semibold text-gray-700">
        Page {currentPage}
      </span>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={animes?.length < limit}
        className={`px-4 py-2 rounded-md text-white cursor-pointer ${
          animes?.length < limit ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        Next
      </button>

        {/* last button */}
      <button
        onClick={handleLastPage}
        disabled={animes?.length < limit}
        className={`px-4 py-2 rounded-md text-white cursor-pointer ${
          animes?.length < limit ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;