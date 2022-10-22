import axios from 'axios';
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'
import YouTube, { YouTubeProps } from 'react-youtube';
import {movieTrailerUrl} from '../../../Requests'

import React, { useEffect, useState } from 'react'

function Row({title, fetchURL}) {
    const [movies, setMovies] = useState([]);
    const [like, setLike] = useState(false);
    const [trailerUrl,setTrailerUrl]=useState('')

    useEffect(()=>{
        axios.get(fetchURL).then((response)=>{
            setMovies(response.data.results);
        })
    },[fetchURL])

    const slideLeft = () =>{
      console.log("skjsdflsjd")
      var slider = document.getElementById('slider');
      slider.scrollLeft = slider.scrollLeft - 500;
    }

    const slideRight = () =>{
      var slider = document.getElementById('slider');
      slider.scrollRight = slider.scrollRight + 500;
    }

    const opts: YouTubeProps['opts'] = {
      height: '390',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
  };
  const handleMovie = (id) => {
      axios.get(movieTrailerUrl(id)).then((response) => {
          if (response.data.results.length !== 0) {
              setTrailerUrl(response.data.results)
              
          }
      })
  }
 
  return (
    <>
    <h2 className='text-white font-bold  md:text-xl p-4'>{title}</h2>
    <div className="relative flex items-center group">
      <MdChevronLeft 
      onClick={slideLeft}
      className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}/>
        <div id={'slider'} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
          {
            movies.map((item, id) =>{
              return(
               <div key={id} onClick={()=>handleMovie(item.id)} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
              <img className='w-full h-auto block'  src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p className='whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{item?.title}</p>
                <p>
                  {like ? <FaHeart  className='absolute top-4 left-4 text-gray-300'/> : <FaRegHeart className='absolute top-4 left-4 text-gray-300'/>}
                </p>
              </div>
              </div>
              )
            })
          }
        </div>
        <MdChevronRight 
        onClick={slideRight}
        className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}/>
    </div>
    {trailerUrl && <YouTube videoId={trailerUrl[0].key} opts={opts} />}

    </>
  )
}

export default Row