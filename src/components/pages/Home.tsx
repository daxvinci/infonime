import Card from "../Card";
import Loading from "../Loading";
import { Data, Count, Ogdata} from "../../lib/types"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Pagination from "../Pagination";
import { useThemeContext } from "../../ThemeContext";
import { useLocation } from "react-router";


const Home = () => {
    
    const base_url = import.meta.env.VITE_BASE_URL;
    const limit:number = 9
    
    

    const [totalAnimes,setTotalAnimes] = useState<Count>()
    const [offset,setOffset] = useState<number>(0)
    const [animes,setAnimes] = useState<Data[]>([])
    const [error,setError] = useState<object | string | undefined >()
    const {darkmode,loading,setLoading=()=>{}} = useThemeContext()
    const location = useLocation()
    
    const pageType = "homePersist"
    
    const [currentPage,setCurrentPage] = useState(1)
    const isInitialized = useRef(false);
    

    
    
      // Handle "Last Page" button click
   const handleLastPage = async () => {
    if (!totalAnimes) {
      console.error('Error maxcount is undefined');
      return;
    }
    const lastPageOffset = Math.floor((totalAnimes.count - 1) / limit) * limit;
    setOffset(lastPageOffset);
    localStorage.setItem(pageType,lastPageOffset.toString())
  };

  useEffect(() => {
    const savedOffset = localStorage.getItem(pageType);
    if(savedOffset){
      const intSavedOffset = parseInt(savedOffset,10)
      setOffset(intSavedOffset)
      isInitialized.current = true;
    }
  
  }, [location.key])

//   useEffect(() => {
//     const handlePopState = () => {
//         const savedOffset = localStorage.getItem(pageType);
//         if (savedOffset) {
//             const intSavedOffset = parseInt(savedOffset, 10);
//             setOffset(intSavedOffset);
//         }
//     };

//     window.addEventListener('popstate', handlePopState);

//     return () => {
//         window.removeEventListener('popstate', handlePopState);
//     };
// }, []);
  
  
  useEffect(()=>{
    if (!isInitialized.current) return;
    setLoading(true)
    const animeFetch = async(limit:number,offset:number)=>{
      try{
        const response = await axios.get<Ogdata>( base_url + '/anime',
          {
            headers:{
              'Content-Type':'application/vnd.api+json'
            },
            params:{
              'page[limit]':limit,
              'page[offset]':offset
            }
          })
        const data = response.data.data
        const meta = response.data.meta
        const currentPageNumber = Math.floor(offset/limit)+1;
        setCurrentPage(currentPageNumber)
        setTotalAnimes(meta)
        setAnimes(data)
        // console.log(data)
        setLoading(false)
      }
      catch(err){
        // if (err instanceof Error) {
        //   setError(err); // Set error to the error message
        // } else {
        //   setError('An unknown error occurred'); // Fallback message
        // }
        setError('Error...check console')
        console.log(err)
      }
      
    }

    
        animeFetch(limit,offset)
      },[limit,offset,base_url,setLoading,location])
    

    if (loading) return <div className={`${darkmode ? 'bg-gray-800 text-amber-50': 'bg-[#f9f9f9] text-gray-700'}`}>
      <Loading />
    </div>;

    return ( 
        <>
        <section className={`p-6 ${darkmode ? 'bg-gray-800 text-amber-50': 'bg-[#f9f9f9] text-gray-700'}`}>
            <div className="contain home">
                <h2 className="text-2xl font-semibold mb-6">Home</h2>
                <div className="main-container py-3">
                    {error ? (
                        <div className="contain">{typeof error === 'object' ? 'object error' : error}</div>
                    ):!loading && animes?.length < 1 ? (
                        <div className="contain">No data Found</div>
                    ):(
                        <div className="content grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
                            {animes?.map((data:Data)=> < Card key={data.id} data={data} /> )}
                        </div>
                       
                    )}
                    
                </div>
            </div>

            {/* pagination next and previous button */}
               {!loading && animes?.length > 0 && <Pagination pageType ={pageType} currentPage={currentPage} handleLastPage={handleLastPage} limit={limit} offset={offset} animes={animes} setOffset={setOffset} />}


        </section>
        </>
     );
}
 
export default Home;