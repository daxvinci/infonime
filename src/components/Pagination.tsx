
import { Paginate } from '../lib/types';
import { motion } from 'framer-motion';
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';



const Pagination = ({animes,currentPage,handleLastPage,setOffset,limit,offset}:Paginate) => {


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

    // arrow animation
  const arrowVariants = {
    hover: {
      scale: 1.2, // Scale up on hover
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.9, // Scale down on tap
    },
  };

 
  return (
    <div className="flex items-center justify-center space-x-4 mt-12">
    {/* First Page Button */}
    <motion.button
      onClick={handleFirstPage}
      disabled={currentPage === 1}
      className={`px-2 py-1 rounded-md text-white cursor-pointer ${
        currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-yellow-500'
      }`}
      variants={arrowVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <FaAngleDoubleLeft className="w-5 h-5" /> {/* Double left arrow */}
    </motion.button>

    {/* Previous Button */}
    <motion.button
      onClick={handlePrev}
      disabled={currentPage === 1}
      className={`px-2 py-1 rounded-md text-white cursor-pointer ${
        currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-yellow-500'
      }`}
      variants={arrowVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <FaAngleLeft className="w-5 h-5" /> {/* Left arrow */}
    </motion.button>

    {/* Current Page Number */}
    <span className="text-lg font-semibold text-gray-700">
      Page {currentPage}
    </span>

    {/* Next Button */}
    <motion.button
      onClick={handleNext}
      disabled={animes?.length < limit}
      className={`px-2 py-1 rounded-md text-white cursor-pointer ${
        animes?.length < limit ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-yellow-500'
      }`}
      variants={arrowVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <FaAngleRight className="w-5 h-5" /> {/* Right arrow */}
    </motion.button>

    {/* Last Button */}
    <motion.button
      onClick={handleLastPage}
      disabled={animes?.length < limit}
      className={`px-2 py-1 rounded-md text-white cursor-pointer ${
        animes?.length < limit ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-yellow-500'
      }`}
      variants={arrowVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <FaAngleDoubleRight className="w-5 h-5" /> {/* Double right arrow */}
    </motion.button>
  </div>
  );
};

export default Pagination;