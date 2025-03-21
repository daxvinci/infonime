import { Link } from "react-router";
import { useThemeContext } from "../ThemeContext";

const Navbar = () => {
        const {darkmode} = useThemeContext()
    
    return ( 
        <>
         <nav className={`flex flex-col sm:flex-row sticky top-0 right-0 left-0 z-50 ${ darkmode ? 'text-white bg-black' : 'text-black bg-white'} sm:justify-between sm:items-center gap-4 p-6`}>
            <Link to='/'>
            <h2 className="text-3xl">Infonime</h2>
            </Link>
            <div className="nav-links flex flex-col sm:justify-between sm:flex-row gap-6 sm:w-[50%]">
                <div className="links flex flex-col text-xl sm:justify-between sm:flex-row gap-4 sm:gap-16">
                    <Link to = '/popular'>popular</Link>
                    <Link to = '/genre'>genre</Link>
                </div>
            <div className="search w-[90%] sm:w-[60%]">
                <input
                  className={`outline-none border ${darkmode ? 'placeholder:text-gray' : 'placeholder:text-black'}  placeholder:italic rounded-2xl w-full px-2 py-1 ring-blue-500`}
                  type="search" name="searh"
                  placeholder="search..."
                  id="searh" 
                  />
            </div>
            </div>

         </nav>
        </>
     );
}
 
export default Navbar;