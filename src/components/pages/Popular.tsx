import { useEffect,useState} from "react"
import axios from "axios"
import Card from "../Card"
import {Bool, Ogdata, Data } from "../../lib/types"



const Popular = ({loading,setLoading = ()=>{},darkmode}:Bool) => {
  const base_url = import.meta.env.VITE_BASE_URL;
  
  const [popular,setPopular] = useState<Data[]>([])
  const [error,setError] = useState<object | string | undefined >()

    useEffect(()=>{
        setLoading(true)
        const animeFetch = async()=>{
          try{
            const response = await axios.get<Ogdata>(base_url + '/anime',
              {
                headers:{
                  'Content-Type':'application/vnd.api+json'
                },
                params:{
                  'sort':'popularityRank',
                  'page[limit]':9,
                  'page[offset]':0
                }
              })
            const data = response.data.data
            setPopular(data)
            console.log(data)
          }
          catch(err){
            // if (err instanceof Error) {
            //   setError(err); // Set error to the error message
            // } else {
            //   setError('An unknown error occurred'); // Fallback message
            // }
            setError('something went wrong ')
            console.log(err)
          }
          finally{
            setLoading(false)
          }
        }
    
        animeFetch()
      },[setPopular,base_url,setLoading])


    if (loading) return <div className={`${darkmode ? 'bg-gray-800 text-amber-50': 'bg-[#f9f9f9] text-gray-700'}`}>Loading...</div>;

    return ( 
        <>
        <section className={`p-6 ${darkmode ? 'bg-gray-800 text-amber-50': 'bg-[#f9f9f9] text-gray-700'}`}>
            <div className="contain home">
                <h2 className="text-2xl font-semibold mb-6">Popular</h2>
                <div className="main-container">
                    {error ? (
                        <div className="contain">{typeof error === 'object' ? 'object error' : error}</div>
                    ):popular?.length < 1 ? (
                        <div className="contain">No data Found</div>
                    ):(
                        <div className="content grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
                            {popular?.map((data:Data)=> < Card key={data.id} data={data} /> )}
                        </div>
                       
                    )}
                    
                </div>
            </div>

        </section>
        </>
     );
}
 
export default Popular;