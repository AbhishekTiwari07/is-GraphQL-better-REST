import { useEffect, useState } from 'react';

const Section = ({genre}) =>{

    const [movies, setMovies] = useState(null)

    const fetchdata = async ()=>{
        try{
          const response = await fetch("/.netlify/functions/getMovie")
          const body = await response.json()
          console.log(body.data.movie_by_genre.values)
          setMovies(body.data.movie_by_genre.values)
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
            <div>
                {genre}
            </div>
            {   
                movies && 
                (<div>
                    {
                        movies.map((movie, index)=> (<Card key={index} movie={movie}/>))
                    }
                </div>)
            }
        </div>
    );
}

export default Section