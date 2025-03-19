import './App.css'
import { Routes,Route } from 'react-router'
import Home from './components/pages/Home'
import Error from './components/pages/Error'
import Navbar from './components/Navbar'
import Details from './components/pages/Details'
import { useState } from 'react'
import Footer from './components/Footer'
import Popular from './components/pages/Popular'
import Genre from './components/pages/Genre'
import GenreAnimes from './components/pages/GenreAnimes'


function App() {
  // type Anime = {
  //   data:Array<Record<string,unknown>>
  // }

  
  
  
  const [darkmode,setDarkMode] = useState<boolean>(true)
  
  const [loading,setLoading] = useState<boolean>(true)
  
  
  return (
    <>
    < Navbar darkmode={darkmode} />
    <Routes>
      <Route index element={<Home darkmode={darkmode} setLoading={setLoading} loading={loading} />} />
      <Route path='*' element={< Error/>} />
      <Route path='popular' element={< Popular loading={loading} darkmode={darkmode} setLoading={setLoading} />} />
      <Route path='genre' element={< Genre/>} />
      <Route path='/details/:id' element={<Details darkmode={darkmode} />} />
      <Route path='/genreAnimes/:id' element={<GenreAnimes darkmode={darkmode} />} />
    </Routes>
    < Footer setDarkMode={setDarkMode} darkmode={darkmode}/>
     
    </>
  )
}

export default App
