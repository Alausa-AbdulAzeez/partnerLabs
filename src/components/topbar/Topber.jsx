import React from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import './topbar.scss'

const Topber = (props) => {
  return (
    <div className='topbarWrapper'>
      <h3>{props.userName}</h3>
      <BsFillPersonFill className='topbarIcon' />
    </div>
  )
}

export default Topber
