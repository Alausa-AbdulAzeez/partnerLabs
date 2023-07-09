import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import './profile.scss'
import { useSelector } from 'react-redux'

const Profile = () => {
  // GET CURRENT LOGGED IN USER
  const { currentUser } = useSelector((state) => state?.user)
  const loggedInUserRole = currentUser?.data?.role
  const { fullName, phoneNumber, email } = currentUser?.data?.profile

  return (
    <div className='profileWrapper'>
      <Sidebar />
      <div className='profileRight'>
        <Topber />
        <div className='profileMainWrapper'>
          <h2>User Profile</h2>
          <div className='formWrapper'>
            <div className='inputsWrapper'>
              <div className='singleInput'>
                <p>Full Name</p>
                <div className='inputWrapper'>
                  <input
                    type='text'
                    className='input'
                    disabled
                    value={fullName}
                  />
                </div>
              </div>

              <div className='singleInput'>
                <p>Email</p>
                <div className='inputWrapper'>
                  <input
                    type='email'
                    className='input'
                    value={email}
                    disabled
                  />
                </div>
              </div>
              <div className='singleInput'>
                <p>Phone Number</p>
                <div className='inputWrapper'>
                  <input
                    type='number'
                    className='input'
                    disabled
                    value={phoneNumber}
                  />
                </div>
              </div>
              <div className='singleInput'>
                <p>Role</p>
                <div className='inputWrapper'>
                  <select
                    name='roleSelect'
                    id='roleSelect'
                    disabled
                    className='input'
                    defaultValue={loggedInUserRole}
                  >
                    <option value={loggedInUserRole}>{loggedInUserRole}</option>
                    <option value='Admin'>Admin</option>
                    <option value='labScientist'>Lab Scientist</option>
                  </select>
                </div>
              </div>
            </div>
            {/* <div className='editWrapper'>
              <button className='profileEditBtn'>Edit</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
