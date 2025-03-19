import {Bool,Data,Ogdata} from '../../lib/types'
import {useParams} from 'react-router'
import {useEffect, useState} from 'react'
import axios from 'axios'


const GenreAnimes = ({darkmode}:Bool) => {
    const base_url = import.meta.env.VITE_BASE_URL
    const genreSlug = useParams();

    const [error,setError] = useState<object | string | undefined >()
    const [loading,setLoading] = useState<boolean>(true)
    const [filteredGenre,setFilteredGenre] = useState<Data[]>([])

    console.log(genreSlug)

    useEffect(() => {
        setLoading(true)
        const animeFetch = async()=>{
          try{
            const response = await axios.get<Ogdata>( base_url + '/anime',
              {
                headers:{
                  'Content-Type':'application/vnd.api+json'
                },
                params:{
                  'filter[genres]': genreSlug.id,
                  'page[limit]':20,
                  'page[offset]':0
                }
              })
            const data = response.data.data
            setFilteredGenre(data)
            console.log(data)
          }
          catch(err){
            setError(' error something went wrong ')
            console.log(' err: ' + err)
            console.log(' error: ' + error)
          }
          finally{
            setLoading(false)
          }
        }
    
        animeFetch()
    }, [base_url,genreSlug,error])
    
    if (loading) return <div className={`${darkmode ? 'bg-gray-800 text-amber-50': 'bg-[#f9f9f9] text-gray-700'}`}>Loading...</div>;

    return ( 
        <> 

          <div className={`contain p-6 ${darkmode ? 'bg-gray-800 text-amber-50': 'bg-[#f9f9f9] text-gray-700'}`}>
            <h2 className="font-semibold text-2xl mb-6 ">{genreSlug.id}</h2>
            <div>
              {filteredGenre ? (
                filteredGenre.length === 0 ?(
                  <div>the genre is not available</div>
                ): filteredGenre.map((genre)=> <div key={genre.id}>{genre.attributes.slug}</div>)
              ):(
                <div>something wrong</div>
              )}
            </div>
          </div>

        </>
     );
}
 
export default GenreAnimes;