import React from "react";

type Dark = {
    setDarkMode:React.Dispatch<React.SetStateAction<boolean>>,
    darkmode:boolean
}

const Footer = ({setDarkMode,darkmode}:Dark) => {
    const year:Date = new Date
    return ( 
        <>
         <footer className={`flex gap-4 ${darkmode ? 'bg-gray-800 text-amber-50': 'bg-[#f9f9f9] text-gray-700'} justify-end p-6`}>
         <p className="self-center">&copy; {year.getFullYear()} Davinci. All rights reserved.</p>
         <div className="hover:cursor-pointer" onClick={()=> setDarkMode(!darkmode)}>{darkmode ? 'Light' : 'Dark'}</div>
         </footer>
        </>
     );
}
 
export default Footer;