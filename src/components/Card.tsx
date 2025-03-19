import { Link } from "react-router";

type Data = {
    data:{
        id:string;
        attributes:Attribs;
    }
}
type Attribs = {
    slug: string;
    synopsis?: string;
    averageRating?: string;
    episodeCount?: number;
    showType?: string;
    titles?:{
        en:string;
        en_jp:string;
        ja_jp:string;

    }
    posterImage?: {
      tiny?: string;
      large?: string;
      small?: string;
      medium?:string;
      original?: string;
    };
    status:string;
    [key: string]: unknown; // Allow additional unknown properties
  };

const Card = ({data}:Data) => {

    const details = data.attributes
    const id = data.id


    return ( 
        <>
        <div className="card flex justify-between gap-4 h-full">
            <div className="img-container h-full flex-shrink-0 w-[150px]">
                <img className="object-cover w-full h-full" src={details.posterImage?.small} alt="poster image Unavailable"/>
            </div>
            <div className="details text-xs flex flex-col gap-1 w-full">
                <Link to={`/details/${id}`}>
                    <div className="anime-name text-base text-gray-500"><strong>{details.slug}</strong></div>
                </Link>
                <div className="synopsis w-full mt-2 text-gray-500">
                        {details.synopsis
                            ? details.synopsis.length >= 100
                                ? details.synopsis.substring(0, 100) + '...'
                            : details.synopsis
                        : 'No synopsis available'
                        }
                </div>
                <div className="rating text-gray-500"><strong>Rating: {details.averageRating}%</strong></div>
                <div className="episode-count text-gray-500"><strong>episodes: </strong>{details.episodeCount}</div>
                <div className="showtype text-gray-500"><strong>{details.showType}</strong></div>
                <div className="stats text-gray-400">{details.status}</div>
            </div>
        </div>
        </>
     );
}
 
export default Card;