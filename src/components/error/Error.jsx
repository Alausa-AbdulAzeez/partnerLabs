import React from 'react'
import './error.scss'

const Error = (props) => {
  const { errorMessage: error } = props
  /*error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          'Something went wrong, please try again' */

  // FUNCTION TO RELOAD PAGE
  const handleReload = () => {
    window.location.reload()
  }
  // END OF FUNCTION TO RELOAD PAGE

  return (
    <div className='errorWrapper'>
      <div className='mainLoadingWrapper'>
        {error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          'Something went wrong, please try again'}
        <div className='reloadBtn' onClick={handleReload}>
          Reload
        </div>
      </div>
    </div>
  )
}

export default Error
