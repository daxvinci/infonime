import Card from "../Card";
import {Bool, Data, Ogdata} from "../../lib/types"
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";


const Home = ({loading,darkmode,setLoading = ()=>{}}:Bool) => {
    
    const base_url = import.meta.env.VITE_BASE_URL;
    const limit:number = 9
    const [offset,setOffset] = useState<number>(0)
    const [animes,setAnimes] = useState<Data[]>([])
    const [error,setError] = useState<object | string | undefined >()

    useEffect(()=>{
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
            setAnimes(data)
            console.log(data)
          }
          catch(err:unknown){
            // if (err instanceof Error) {
            //   setError(err); // Set error to the error message
            // } else {
            //   setError('An unknown error occurred'); // Fallback message
            // }
            setError(err.message)
            console.log(err)
          }
          finally{
            setLoading(false)
          }
        }
    
        animeFetch(limit,offset)
      },[setAnimes,setLoading,limit,offset,base_url])
    

    if (loading) return <div className={`${darkmode ? 'bg-gray-800 text-amber-50': 'bg-[#f9f9f9] text-gray-700'}`}>Loading...</div>;

    return ( 
        <>
        <section className={`p-6 ${darkmode ? 'bg-gray-800 text-amber-50': 'bg-[#f9f9f9] text-gray-700'}`}>
            <div className="contain home">
                <h2 className="text-2xl font-semibold mb-6">Home</h2>
                <div className="main-container py-3">
                    {error ? (
                        <div className="contain">{typeof error === 'object' ? 'object error' : error}</div>
                    ):animes?.length < 1 ? (
                        <div className="contain">No data Found</div>
                    ):(
                        <div className="content grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
                            {animes?.map((data:Data)=> < Card key={data.id} data={data} /> )}
                        </div>
                       
                    )}
                    
                </div>
            </div>

            {/* pagination next and previous button */}
               { animes?.length > 0 && <Pagination setAnimes={setAnimes} limit={limit} offset={offset} animes={animes} setOffset={setOffset} />}


        </section>
        </>
     );
}
 
export default Home;