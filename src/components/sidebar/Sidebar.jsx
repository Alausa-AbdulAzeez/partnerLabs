import React from 'react'
import './sidebar.scss'

import LogoImg from '../../utils/images/sidebarBiopath2.png'
import { BsFillPersonFill } from 'react-icons/bs'

import { FiLogOut } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import AlertDialogSlide from '../Dialogue'
import {
  labScientistData,
  phlebotomistData,
  qualityAssuranceData,
  receptionistData,
  reportOfficerData,
} from '../../utils/data/sidebarData'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  // LOGOUT DIALOGUE
  const [open, setOpen] = React.useState(false)

  // GET CURRENT LOGGED IN USER
  const { currentUser } = useSelector((state) => state?.user)
  const loggedInUserRole = currentUser?.data?.role

  // INITIALIZE SIDEBAR DATA
  let sidebarInfo

  switch (loggedInUserRole) {
    case 'Reception':
      sidebarInfo = receptionistData
      break
    case 'Phlebotomy':
      sidebarInfo = phlebotomistData

      break
    case 'MainLab1':
      sidebarInfo = labScientistData

      break
    case 'Quality assurance':
      sidebarInfo = qualityAssuranceData

      break
    case 'Report':
      sidebarInfo = reportOfficerData
      break

    default:
      break
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className='sidebarWrapper'>
      <AlertDialogSlide open={open} handleClose={handleClose} />
      <div className='sidebarTop'>
        <div className='sidebarTopImageWrapper'>
          <img src={LogoImg} alt='Logo' /> <span>Biopath MedLab</span>
        </div>
      </div>
      <div className='sidebarBottom'>
        <div className='sidebarBottomTop'>
          {sidebarInfo?.map((singleItem, index) => {
            return (
              <ul className='ulTitle' key={index}>
                {singleItem.ulTitle}
                {singleItem.listItems.map((listItem, index) => {
                  return (
                    <NavLink
                      to={listItem.link}
                      style={{ textDecoration: 'none' }}
                      key={index}
                    >
                      {({ isActive }) => (
                        <li
                          className={
                            isActive
                              ? 'activeLink sidebarListItem'
                              : 'sidebarListItem'
                          }
                        >
                          {listItem.icon}
                          <span> {listItem.title}</span>
                        </li>
                      )}
                    </NavLink>
                  )
                })}
              </ul>
            )
          })}
        </div>
        <div className='sidebarBottomBottom'>
          <ul className='ulTitle'>
            USER
            <NavLink to='/profile' style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <li
                  className={
                    isActive ? 'activeLink sidebarListItem' : 'sidebarListItem'
                  }
                >
                  <BsFillPersonFill className='sidebarIcon' />
                  <span> Profile</span>
                </li>
              )}
            </NavLink>
            <li className='sidebarListItem' onClick={handleClickOpen}>
              <FiLogOut className='sidebarIcon' />
              <span> Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
