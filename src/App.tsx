import './App.css'
import { Routes,Route } from 'react-router'
import Home from './components/pages/Home'
import Error from './components/pages/Error'
import Navbar from './components/Navbar'
import Details from './components/pages/Details'
import { useEffect } from 'react'
import Footer from './components/Footer'
import Popular from './components/pages/Popular'
import Genre from './components/pages/Genre'
import GenreAnimes from './components/pages/GenreAnimes'
import { useThemeContext } from './ThemeContext'





function App() {
  // type Anime = {
  //   data:Array<Record<string,unknown>>
  // }
      const {setDarkMode=()=>{}} = useThemeContext()



  useEffect(()=>{
    const theme = localStorage.getItem('theme');
    if(theme){
      const setMode =(theme:string)=>{
        if(theme !== 'light'){
          setDarkMode(false);
        }else{
          setDarkMode(true)
        }
      }
      setMode(theme);
    }
  },[setDarkMode])
  
  
  return (
    <>
    < Navbar />
    <Routes>
      <Route index element={<Home />} />
      <Route path='*' element={< Error />} />
      <Route path='popular' element={< Popular />} />
      <Route path='genre' element={< Genre />} />
      <Route path='/details/:id' element={<Details />} />
      <Route path='/genreAnimes/:id' element={<GenreAnimes />} />
    </Routes>
    < Footer/>
    </>
  )
}

export default App
