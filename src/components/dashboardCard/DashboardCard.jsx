/* eslint-disable react/prop-types */
import React from 'react'

import { Link } from 'react-router-dom'
import './dashboardCard.scss'

const DashboardCard = (props) => {
  const cardInfo = props.data

  return (
    <div
      className='dashboardCardWrapper'
      style={{ backgroundColor: cardInfo.backgroundColor }}
    >
      <p className='title'>{cardInfo.title}</p>

      <div className='imgWrapper'>
        {cardInfo.isProfile && <h1>{props.userName}</h1>}
        {cardInfo.isCandidateSearch && (
          <img
            src='https://cdn4.iconfinder.com/data/icons/general08/png/128/binoculars.png'
            alt='binoculars'
            className='candidateSearch'
          />
        )}
        {cardInfo.isPendingCandidates && (
          <img
            src='https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/128x128/Hourglass.png'
            alt='binoculars'
            className='candidateSearch'
          />
        )}
        {cardInfo.isViewClients && (
          <img
            src='https://cdn0.iconfinder.com/data/icons/business-and-management-flat-8/24/PARTNER_team_friends_partners-128.png'
            alt='binoculars'
            className='candidateSearch'
          />
        )}
      </div>
      <div className='cardBottom'>
        <Link to={cardInfo.link} className='cardBottomText'>
          {cardInfo.linkText}
        </Link>
        {cardInfo.icon}
      </div>
    </div>
  )
}

export default DashboardCard
