import './App.css';
import fetch from 'node-fetch'
import { useEffect, useState } from 'react';
import Section from './Components/Section'

const App = ()=>{
  const [genres, setGenres] = useState(null)

  const fetchdata = async ()=>{
    try{
      const response = await fetch("/.netlify/functions/getGenres")
      const body = await response.json()
      setGenres(body.data.reference_list.values)
    }
    catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    fetchdata()
  }, [])

  return (
    <div>
      {genres && Object.values(genres).map(genre => <Section genre={genre.value}/>) }
    </div>
  )
}

export default App;
