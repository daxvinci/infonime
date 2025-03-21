import { Link } from "react-router";
import { Details } from "../lib/types";
import { useThemeContext } from "../ThemeContext";

const Card = ({data}:Details) => {

    const details = data.attributes
    const id = data.id
    const {darkmode} = useThemeContext()

    

    return ( 
        <>
        <div className="card flex justify-between gap-4 h-full">
            <Link to={`/details/${id}`}>
            <div className="img-container h-full hover:opacity-60 flex-shrink-0 w-[150px]">
                <img className="object-cover w-full h-full" src={details.posterImage?.small} alt="poster image Unavailable"/>
            </div>
            </Link>
            <div className="details text-xs flex flex-col gap-1 w-full">
                <Link to={`/details/${id}`}>
                    <div className={`anime-name text-base ${darkmode ? 'text-white/90':'text-black/60'}`}><strong>{details.slug}</strong></div>
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