import React from 'react'
import { ScaleLoader } from 'react-spinners'
import './Loading.style.css'

const Loading = () => {
  return (
    <div className='loading-containder'>
        <ScaleLoader
        color='red'
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        >
        </ScaleLoader>
    </div>
  )
}

export default Loading
