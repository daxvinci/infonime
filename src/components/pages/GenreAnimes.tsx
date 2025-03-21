import {Count,Data,Ogdata} from '../../lib/types'
import {useParams} from 'react-router'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Loading from '../Loading'
import Card from '../Card'
import Pagination from '../Pagination'
import { useThemeContext } from '../../ThemeContext'


const GenreAnimes = () => {
    const base_url = import.meta.env.VITE_BASE_URL
    const genreSlug = useParams();
    const limit:number = 9
    const [currentPage,setCurrentPage] = useState(1)
    const {darkmode} = useThemeContext()
    

    const [offset,setOffset] = useState<number>(0)
    const [totalAnimes,setTotalAnimes] = useState<Count>()
    // const [error,setError] = useState<object | string | undefined >()
    const [loading,setLoading] = useState<boolean>(true)
    const [filteredGenre,setFilteredGenre] = useState<Data[]>([])

    
    
    useEffect(() => {
      setLoading(true)
      const animeFetch = async(limit:number,offset:number)=>{
        try{
          const response = await axios.get<Ogdata>( base_url + '/anime',
              {
                headers:{
                  'Content-Type':'application/vnd.api+json'
                },
                params:{
                  'filter[genres]': genreSlug.id,
                  'page[limit]':limit,
                  'page[offset]':offset
                }
              })
            const data = response.data.data
            const meta = response.data.meta
            const currentPageNumber = Math.floor(offset/limit)+1;
            setCurrentPage(currentPageNumber)
            setTotalAnimes(meta)
            setFilteredGenre(data)
            console.log(data)
            setLoading(false)
          }
          catch(err){
            // setError(' error something went wrong check logs')
            console.log(' err: ' + err)
          }
          
        }
        
        animeFetch(limit,offset)
      }, [base_url,genreSlug,limit,offset])
      
      const handleLastPage = async () => {
        if (!totalAnimes) {
          console.error('Error maxcount is undefined');
          return;
        }
        const lastPageOffset = Math.floor((totalAnimes.count - 1) / limit) * limit;
        setOffset(lastPageOffset);
      };

    if (loading) return <div className={`${darkmode ? 'bg-gray-800 text-amber-50': 'bg-[#f9f9f9] text-gray-700'}`}>
      <Loading/>
    </div>;

    return ( 
        <> 

          <div className={`contain p-6 ${darkmode ? 'bg-gray-800 text-amber-50': 'bg-[#f9f9f9] text-gray-700'}`}>
            <h2 className="font-semibold text-2xl mb-6 ">{genreSlug.id}</h2>
            <div>
              {filteredGenre ? (
                filteredGenre.length === 0 ?(
                  <div>the genre is not available</div>
                ): 
                <div className="content grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
                  {filteredGenre.map(
                    (genre)=> < Card key={genre.id} data={genre} />)
                  }
                </div>
              ):(
                <div>something wrong try checking logs</div>
              )}
            </div>

              {filteredGenre && <Pagination currentPage={currentPage} handleLastPage={handleLastPage} limit={limit} offset={offset} animes={filteredGenre} setOffset={setOffset} />}

          </div>

        </>
     );
}
 
export default GenreAnimes;