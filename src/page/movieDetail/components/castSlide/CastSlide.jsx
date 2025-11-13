import React, { useEffect, useRef } from 'react'
import './CastSlide.style.css'

const CastSlide = ({cast}) => {
  const casting = cast.cast;
  const wrapRef = useRef(null);
  useEffect(() => {
    if(wrapRef.current){
      wrapRef.current.scrollLeft = 0;
    }
  }, [cast])

  return (
    <section className='cast-wrap' ref={wrapRef}>
      {casting.length === 0 ? '출연 정보가 없습니다.'
       :casting?.map((c) =>
        <section className='cast-card'>
          <img className='cast-img' src={!c.profile_path ? '/no_img.png' : `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${c.profile_path}`}></img>            
          <div>{c.character}</div>
          <div>{c.name}</div>
        </section>
    )}
    </section>
  )
}

export default CastSlide
