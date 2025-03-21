import { useEffect,useState } from 'react';
import {Link, useParams} from 'react-router'
import axios from 'axios';
import { DetailsData, InsideData, Ogdata, Data} from '../../lib/types';
import { useThemeContext } from '../../ThemeContext';
import Loading from '../Loading';


const Details = () => {
    const base_url = import.meta.env.VITE_BASE_URL
    const {id} = useParams()

    const [details,setDetails] = useState<InsideData>()
    const [genres,setGenres] = useState<Data[]>([])
    const [error,setError] = useState<object | string | undefined >()
    const {darkmode,loading,setLoading=()=>{}} = useThemeContext()
    
    
    //Fetching Details
    useEffect(()=>{
      setLoading(true)
      const animeFetch = async()=>{
        try{
          const response = await axios.get<DetailsData>( base_url + '/anime/' + id,
            {
              headers:{
                'Content-Type':'application/vnd.api+json'
              }
            })
          const data = response.data.data
          setDetails(data)
          console.log(data)
        }
        catch(err){
          setError('something went wrong ')
          console.log(err)
        }
        finally{
          setLoading(false)
        }
      }
  
      animeFetch()
    },[base_url,id,setLoading])

    //Fetching Genre
    useEffect(()=>{
      setLoading(true)
      const genreFetch = async()=>{
        try{
          const response = await axios.get<Ogdata>( base_url + '/anime/' + id + '/genres',
            {
              headers:{
                'Content-Type':'application/vnd.api+json'
              }
            })
          const data = response.data.data
          setGenres(data)
          console.log(data)
        }
        catch(err){
          setError('something went wrong ')
          console.log(err)
        }
        finally{
          setLoading(false)
        }
      }
  
      genreFetch()
    },[base_url,id,setLoading])

    if (loading) return <Loading/>;

    return (
        <>
        <div className={`p-2 ${darkmode ? 'bg-gray-800 text-amber-50': 'bg-[#f9f9f9] text-gray-700'}`}>
          {error ? (
              <div className="contain">{typeof error === 'object' ? 'object error' : error}</div>
                    ): details? (
                        
                        <div className={`flex flex-col md:flex-row gap-8 p-6 max-w-6xl mx-auto `}>
                            <div className="flex-1">
                                <img
                                src={details?.attributes?.posterImage?.original}
                                alt={details?.attributes?.title?.en || 'image not available'}
                                className="w-full h-auto rounded-lg shadow-lg"
                                />
                            </div>
                    
                      
                            <div className={`flex-2 ${darkmode ? 'text-amber-50':'text-black'} space-y-4`}>
                                <h1 className={`text-3xl ${darkmode ? 'text-amber-50':'text-black'} font-bold`}>{details?.attributes?.slug}</h1>
                                {/* <p className="text-gray-600 text-lg">{details?.id}</p> */}
                                <p className={`${darkmode ? 'text-gray-300 ':'text-black'} leading-relaxed`}>{details?.attributes?.synopsis}</p>
                                <div className="space-y-2">
                                <p>
                                    <strong className ={`${darkmode ? 'text-amber-50':'text-black/80'} font-bold`}>Rating:</strong> {details?.attributes?.averageRating}
                                </p>
                                <p>
                                    <strong className ={`${darkmode ? 'text-amber-50':'text-black/80'} font-bold`}>Episodes:</strong> {details?.attributes?.episodeCount}
                                </p>
                                <p>
                                    <strong className ={`${darkmode ? 'text-amber-50':'text-black/80'} font-bold`}>Status:</strong> {details?.attributes?.status}
                                </p>
                                <p className='flex gap-3'>
                                    
                                    <strong className ={`${darkmode ? 'text-amber-50':'text-black/80'} font-bold`}>Genre: </strong>
                                    <span className='flex gap-2'>
                                     {genres ? (
                                      genres.length === 0 ? (
                                        <span>N/A</span>
                                      ) : (
                                        genres.map((genre:Data) => 
                                        <Link to={`/genreAnimes/${genre.attributes.slug}`}>
                                          <span className={`${darkmode ? 'bg-gray-600':'bg-gray-400'} hover:bg-amber-500 px-2 rounded-2xl`} key={genre.id}>{genre.attributes.slug}</span>
                                        </Link> )
                                      )
                                    ) : (
                                      <span>Something wrong</span>
                                    )}
                                    </span>
                                </p>
                                <p>
                                    <strong className ={`${darkmode ? 'text-amber-50':'text-black/80'} font-bold`}>Release Date:</strong> {details?.attributes?.startDate}
                                </p>
                                <p>
                                    <strong className ={`${darkmode ? 'text-amber-50':'text-black/80'} font-bold`}>End Date:</strong> {details?.attributes?.endDate || 'N/A'}
                                </p>
                                </div>
                            </div>
                        </div>
                    ):(
                        <div>nothing here</div>
                    )}
        </div>
          
        </>
      );
}
 
export default Details;